const POLLINATIONS_URL = "https://image.pollinations.ai/prompt";

export const buildOrnamentImageUrl = (prompt: string): string => {
  const seed = Math.floor(Math.random() * 1_000_000);
  return `${POLLINATIONS_URL}/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;
};

export const preloadImage = (url: string, timeoutMs = 90_000): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const timer = setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      reject(new Error("Image generation is taking too long. Please try again."));
    }, timeoutMs);

    img.onload = () => {
      clearTimeout(timer);
      resolve();
    };
    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error("Failed to generate the ornament image. Please try again."));
    };
    img.src = url;
  });
};
