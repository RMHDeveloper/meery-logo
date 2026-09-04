
import React from 'react';

export const COLORS = {
  deepGreen: '#2D5016',
  gold: '#D4AF37',
  white: '#FFFFFF',
};

export const RMH_LOGO_URL = 'https://i.ibb.co/Xxh2Vr9Y/RMH-logo.jpg';

export const PROMPT_TEMPLATE = (companyName: string) => {
  const name = companyName.trim();
  
  if (name) {
    // Prompt for when a company name is provided
    return `A close-up, front-view photograph of a glossy, transparent glass ornament hanging from a lush green Christmas tree branch. The ornament is shaped like the uploaded icon, accurately matching its clean edges and minimalist style. Centered inside the glass, the icon is prominently displayed with the text '${name}' elegantly embossed directly beneath it in a clean, modern sans-serif font. Both the icon and text maintain a premium crystal-glass texture with realistic silver reflections. The ornament is suspended using a small silver metal cap and natural twine loop. The background features a softly blurred Christmas tree with warm golden fairy lights creating elegant bokeh. Shallow depth of field, cinematic lighting, ultra-realistic reflections, festive luxury mood, professional product photography, 4K quality, vertical composition.`;
  }

  // Prompt for when no company name is provided (as per user request)
  return `A close-up, front-view photograph of a glossy, transparent glass ornament hanging from a lush green Christmas tree branch. The ornament is shaped like the uploaded icon, accurately matching the provided icon with clean edges and a premium crystal-glass texture. The icon appears centered, smooth, and embossed inside the ornament, maintaining its original colors and proportions. The ornament is suspended from a pine branch using a small silver metal cap and natural twine loop. The background features a softly blurred Christmas tree with warm golden fairy lights creating elegant bokeh, along with out-of-focus silver and gold baubles. Shallow depth of field, cinematic lighting, ultra-realistic reflections, festive luxury mood, professional product photography, high detail, 4K quality, vertical composition.`;
};

export const TreeIcon = () => (
  <svg className="w-12 h-12 text-[#2D5016]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
  </svg>
);

export const SnowflakeIcon = () => (
  <svg className="w-8 h-8 text-[#D4AF37] animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
