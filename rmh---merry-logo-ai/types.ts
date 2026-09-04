
export type GenerationMode = 'instant' | 'ai';

export interface GenerationResult {
  imageUrl: string;
  timestamp: number;
  /** true if the image only approximates the logo (AI mode's free-tier fallback), not an exact composite. */
  isApproximate?: boolean;
}

export interface AppState {
  logo: string | null; // base64
  logoMimeType: string | null;
  companyName: string;
  mode: GenerationMode;
  isGenerating: boolean;
  result: GenerationResult | null;
  error: string | null;
}
