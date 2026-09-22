import { PROMPT_TEMPLATE } from "../constants";

const PROXY_URL = "/api/proxy";
const REQUEST_TIMEOUT_MS = 120_000;

// "openrouter/free" randomly routes across ~20 free models, some of which (e.g. safety
// classifiers) aren't actually suited to captioning/describing an image and will return
// wildly unrelated text. Use specific, known vision-capable free models instead, with a
// fallback in case the first is temporarily unavailable/rate-limited.
const VISION_MODELS = [
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "minimax/minimax-m3:free",
  "dots-studio/dots-3-note-preview:free",
];

// OpenRouter chat completions are now routed through the dashboard proxy, so
// this app no longer needs its own OpenRouter key. Always report
// "configured" so the existing Gemini -> OpenRouter fallback logic in
// aiOrnamentService still tries this path.
export const isOpenRouterConfigured = (): boolean => true;

type ContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

const chatCompletionWithModel = async (
  messages: { role: "system" | "user" | "assistant"; content: string | ContentPart[] }[],
  model: string
): Promise<string> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, messages }),
      signal: controller.signal,
    });
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("The AI is taking longer than usual on the free tier. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`OpenRouter request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
};

export const chatCompletion = async (
  messages: { role: "system" | "user" | "assistant"; content: string | ContentPart[] }[],
  models: string[] = VISION_MODELS
): Promise<string> => {
  let lastError: unknown;
  for (const model of models) {
    try {
      const text = await chatCompletionWithModel(messages, model);
      if (text.trim()) return text;
      lastError = new Error(`${model} returned an empty response.`);
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("All OpenRouter models failed.");
};

export const generateOrnamentDescription = async (
  logoBase64: string,
  logoMimeType: string,
  companyName: string
): Promise<string> => {
  const dataUrl = logoBase64.startsWith("data:")
    ? logoBase64
    : `data:${logoMimeType};base64,${logoBase64}`;

  const text = await chatCompletion([
    {
      role: "user",
      content: [
        { type: "text", text: PROMPT_TEMPLATE(companyName) },
        { type: "image_url", image_url: { url: dataUrl } },
      ],
    },
  ]);

  if (!text.trim()) {
    throw new Error("The AI didn't return a design description. Please try again.");
  }

  return text;
};
