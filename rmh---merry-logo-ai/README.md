<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Merry Logo AI

Turns a company logo into a festive ornament. Two modes:

- **⚡ Instant Badge** (default) — composites the actual uploaded logo into a gold-medallion
  frame entirely in the browser (HTML canvas). Instant, free, pixel-perfect, no API key needed.
- **✨ AI Ornament** (experimental) — asks an AI to reimagine the logo as a 3D glass-ornament
  scene. Tries Gemini first (true image-to-image, needs a billing-enabled `GEMINI_API_KEY`);
  if that's unavailable, falls back to OpenRouter + Pollinations (free, text-only, only
  approximates the logo's colors/style, not its exact shape).

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. (Optional, only for AI Ornament mode) In [.env](.env), set:
   - `GEMINI_API_KEY` — from [aistudio.google.com/apikey](https://aistudio.google.com/apikey); needs billing enabled on the project for image generation
   - `OPENROUTER_API_KEY` — from [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
3. Run the app:
   `npm run dev`

Instant Badge mode works with no setup at all.

When deploying (e.g. Vercel), set the same env vars in the hosting dashboard if you want AI
Ornament mode to work there too — `.env` is gitignored and never reaches the deployed build.
