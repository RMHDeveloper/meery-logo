import { generateOrnamentImage, isGeminiConfigured } from "./geminiService";
import { generateOrnamentDescription, isOpenRouterConfigured } from "./openrouterService";
import { buildOrnamentImageUrl, preloadImage } from "./pollinationsService";

export interface AiOrnamentResult {
  imageUrl: string;
  /** true if this came from the free text-to-image fallback rather than real image editing. */
  isApproximate: boolean;
}

/**
 * Tries Gemini first (true image-to-image — it actually sees the uploaded logo, so shape
 * fidelity is accurate). If Gemini isn't configured or fails (e.g. free-tier quota), falls
 * back to OpenRouter (free, writes a description) + Pollinations (free, text-to-image from
 * that description) — which only approximates the logo's colors/mood, not its exact shape.
 */
export const generateAiOrnament = async (
  logoBase64: string,
  logoMimeType: string,
  companyName: string
): Promise<AiOrnamentResult> => {
  if (isGeminiConfigured()) {
    try {
      const imageUrl = await generateOrnamentImage(logoBase64, logoMimeType, companyName);
      return { imageUrl, isApproximate: false };
    } catch (err) {
      // fall through to the OpenRouter/Pollinations fallback below
      console.warn("Gemini generation failed, falling back to OpenRouter + Pollinations:", err);
    }
  }

  if (!isOpenRouterConfigured()) {
    throw new Error(
      isGeminiConfigured()
        ? "Gemini generation failed and no OpenRouter fallback is configured. Please try again."
        : "No AI provider is configured. Set GEMINI_API_KEY and/or OPENROUTER_API_KEY in .env."
    );
  }

  const description = await generateOrnamentDescription(logoBase64, logoMimeType, companyName);
  const imageUrl = buildOrnamentImageUrl(description);
  await preloadImage(imageUrl);
  return { imageUrl, isApproximate: true };
};
