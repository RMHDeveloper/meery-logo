
import React from 'react';
import { GenerationResult } from '../types';
import { canvasToJpegDataUrl } from '../services/badgeService';

interface ResultViewProps {
  result: GenerationResult;
  companyName: string;
  onRestart: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, companyName, onRestart }) => {
  const downloadDataUrl = (dataUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // The AI-approximate fallback path (OpenRouter + Pollinations) returns an external https:
  // URL, not a data: URL — canvas re-encoding would fail on that (cross-origin taint), so
  // JPG conversion and the split PNG/JPG UI only apply to data: URLs (instant badge, Gemini).
  const isDataUrl = result.imageUrl.startsWith('data:');

  const handleDownloadPng = () => {
    downloadDataUrl(result.imageUrl, `ornament_${result.timestamp}.png`);
  };

  const handleDownloadJpg = async () => {
    const jpgUrl = await canvasToJpegDataUrl(result.imageUrl);
    downloadDataUrl(jpgUrl, `ornament_${result.timestamp}.jpg`);
  };

  const handleDownloadExternal = () => {
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = `ornament_${result.timestamp}.jpg`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Check out our festive ornament for ${companyName || 'our brand'}! Crafted with Merry Logo AI. 🎄✨`);
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="bg-white p-2 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden group">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={result.imageUrl}
            alt="Generated Ornament"
            className="w-full aspect-square object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      {result.isApproximate && (
        <div className="bg-amber-50 border border-amber-100 text-amber-700 text-sm p-4 rounded-xl flex items-start space-x-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>This is an AI approximation of your logo's colors and style, not an exact match — the free-tier image model couldn't be reached.</span>
        </div>
      )}

      {isDataUrl ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleDownloadPng}
            className="flex items-center justify-center space-x-2 bg-[#2D5016] hover:bg-[#1a310d] text-white py-3 px-6 rounded-lg transition-all shadow-lg active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="font-semibold">Download PNG</span>
          </button>

          <button
            onClick={handleDownloadJpg}
            className="flex items-center justify-center space-x-2 bg-[#D4AF37] hover:bg-[#B8860B] text-white py-3 px-6 rounded-lg transition-all shadow-lg active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="font-semibold">Download JPG</span>
          </button>
        </div>
      ) : (
        <button
          onClick={handleDownloadExternal}
          className="w-full flex items-center justify-center space-x-2 bg-[#2D5016] hover:bg-[#1a310d] text-white py-3 px-6 rounded-lg transition-all shadow-lg active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="font-semibold">Download Image</span>
        </button>
      )}

      <button
        onClick={handleWhatsAppShare}
        className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-6 rounded-lg transition-all shadow-lg active:scale-95"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.63 1.435h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="font-semibold">Share on WhatsApp</span>
      </button>

      <button
        onClick={onRestart}
        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg active:scale-95"
      >
        Create Another Ornament
      </button>
    </div>
  );
};

export default ResultView;
