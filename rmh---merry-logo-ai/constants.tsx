
import React from 'react';

export const COLORS = {
  deepGreen: '#2D5016',
  gold: '#D4AF37',
  white: '#FFFFFF',
};

export const RMH_LOGO_URL = 'https://i.ibb.co/Xxh2Vr9Y/RMH-logo.jpg';

export const PROMPT_TEMPLATE = (companyName: string) => {
  const name = companyName.trim();
  const brandLine = name
    ? `The text '${name}' should be described as elegantly embossed directly beneath the icon in a clean, modern sans-serif font.`
    : `No brand name should be included in the design — describe the icon on its own.`;

  return `You are a premium product designer. Look at the uploaded logo image and write a vivid, detailed design brief (200-300 words) for a professional product photograph of a glossy, transparent crystal-glass Christmas ornament shaped around this exact logo, hanging from a lush green Christmas tree branch.

Describe: how the icon from the uploaded logo is centered and embossed inside the glass while preserving its original shape, colors and proportions; ${brandLine} the premium crystal-glass texture with realistic silver reflections; the small silver metal cap and natural twine loop suspending the ornament; the softly blurred Christmas tree background with warm golden fairy light bokeh and out-of-focus silver and gold baubles; shallow depth of field, cinematic lighting, ultra-realistic reflections, festive luxury mood, professional 4K product photography, vertical composition.

Write it as a single flowing, evocative description (not a bullet list) that a designer or artist could use as a creative brief.`;
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
