<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/55062b11-f173-4715-8721-59dcdf0bcb6b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. In [.env](.env), set:
   - `GEMINI_API_KEY` — a free key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey), used to generate the actual ornament image from your logo
   - `OPENROUTER_API_KEY` — a free key from [openrouter.ai](https://openrouter.ai/settings/keys), used for the "Design brief" text panel
3. Run the app:
   `npm run dev`

When deploying (e.g. Vercel), set both env vars in the hosting dashboard too — `.env` is gitignored and never reaches the deployed build on its own.
