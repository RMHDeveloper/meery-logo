// Composites the user's actual uploaded logo into a decorative gold circular ornament
// badge, entirely client-side. Because it draws the real logo pixels (not an AI
// approximation from a text description), fidelity is perfect and generation is instant —
// no API calls, no keys, no cost, no rate limits.

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Couldn't read the uploaded logo image."));
    img.src = src;
  });

export const generateOrnamentBadge = async (logoDataUrl: string): Promise<string> => {
  const logo = await loadImage(logoDataUrl);

  const SIZE = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  const cx = SIZE / 2;
  const cy = SIZE / 2 + 40; // leave room above for the cap + loop
  const outerR = SIZE * 0.38;
  const ringWidth = SIZE * 0.035;
  const innerR = outerR - ringWidth;

  // Soft drop shadow under the whole medallion.
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 18;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fillStyle = "#D4AF37";
  ctx.fill();
  ctx.restore();

  // Gold ring: gradient-filled outer circle.
  const goldGradient = ctx.createLinearGradient(cx - outerR, cy - outerR, cx + outerR, cy + outerR);
  goldGradient.addColorStop(0, "#F5D77E");
  goldGradient.addColorStop(0.35, "#D4AF37");
  goldGradient.addColorStop(0.65, "#B8860B");
  goldGradient.addColorStop(1, "#E8C766");
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fillStyle = goldGradient;
  ctx.fill();

  // Thin inner bevel line between the ring and the logo photo.
  ctx.beginPath();
  ctx.arc(cx, cy, innerR + 2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Logo image, cover-fit and clipped to the inner circle.
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.clip();

  const boxSize = innerR * 2;
  const scale = Math.max(boxSize / logo.width, boxSize / logo.height);
  const drawW = logo.width * scale;
  const drawH = logo.height * scale;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(cx - innerR, cy - innerR, boxSize, boxSize);
  ctx.drawImage(logo, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
  ctx.restore();

  // Metal cap at the top of the medallion.
  const capW = SIZE * 0.09;
  const capH = SIZE * 0.045;
  const capY = cy - outerR - capH * 0.4;
  const capGradient = ctx.createLinearGradient(cx - capW / 2, 0, cx + capW / 2, 0);
  capGradient.addColorStop(0, "#F5D77E");
  capGradient.addColorStop(0.5, "#B8860B");
  capGradient.addColorStop(1, "#F5D77E");
  ctx.beginPath();
  ctx.moveTo(cx - capW / 2, capY + capH);
  ctx.lineTo(cx - capW * 0.35, capY);
  ctx.lineTo(cx + capW * 0.35, capY);
  ctx.lineTo(cx + capW / 2, capY + capH);
  ctx.closePath();
  ctx.fillStyle = capGradient;
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Twine/loop above the cap.
  ctx.beginPath();
  ctx.ellipse(cx, capY - capH * 0.6, capW * 0.22, capH * 0.6, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "#8a6d3b";
  ctx.lineWidth = SIZE * 0.008;
  ctx.stroke();

  return canvas.toDataURL("image/png");
};

export const canvasToJpegDataUrl = async (pngDataUrl: string): Promise<string> => {
  const img = await loadImage(pngDataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.92);
};
