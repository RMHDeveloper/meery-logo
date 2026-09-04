import { PROMPT_TEMPLATE } from "../constants";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openrouter/free";
const REQUEST_TIMEOUT_MS = 120_000;

type ContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export const chatCompletion = async (
  messages: { role: "system" | "user" | "assistant"; content: string | ContentPart[] }[],
  model = MODEL
): Promise<string> => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is missing. Please set OPENROUTER_API_KEY in .env.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
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
