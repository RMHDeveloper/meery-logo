
export interface GenerationResult {
  imageUrl: string;
  timestamp: number;
}

export interface AppState {
  logo: string | null; // base64
  logoMimeType: string | null;
  companyName: string;
  isGenerating: boolean;
  result: GenerationResult | null;
  error: string | null;
}
