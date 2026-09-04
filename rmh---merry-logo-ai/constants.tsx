
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

  return `You are a premium product designer. Look carefully at the uploaded logo image — it is the only subject of this task. Base every detail strictly on what is actually visible in that image (its real shape, icon, and colors); never invent or describe any other person, object, or scene.

Write a vivid, detailed design brief (200-300 words) for a professional product photograph of a glossy, transparent crystal-glass Christmas ornament shaped around this exact logo, hanging from a lush green Christmas tree branch.

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

export const CloudUploadIcon = () => (
  <svg className="w-12 h-12 text-[#2D5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5.5 5.5 0 0116.9 6.55 4.5 4.5 0 0117.5 16M12 11v9m0-9l-3 3m3-3l3 3" />
  </svg>
);

export const BuildingIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V6a1 1 0 011-1h5a1 1 0 011 1v15M15 21V10a1 1 0 011-1h3a1 1 0 011 1v11M8 8h.01M8 11h.01M8 14h.01" />
  </svg>
);

export const LockIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const SparkleIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l1.8 5.6L19.4 9l-5.6 1.8L12 16.4l-1.8-5.6L4.6 9l5.6-1.4L12 2zM19 14l.9 2.8L22.7 18l-2.8.9L19 21.7l-.9-2.8-2.8-.9 2.8-.9L19 14zM5 14l.8 2.4L8.2 17l-2.4.8L5 20.2l-.8-2.4L1.8 17l2.4-.6L5 14z" />
  </svg>
);
