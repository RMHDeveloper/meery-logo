
import React, { useState } from 'react';
import { AppState } from './types';
import { RMH_LOGO_URL } from './constants';
import LogoUploader from './components/LogoUploader';
import LoadingOverlay from './components/LoadingOverlay';
import ResultView from './components/ResultView';
import { generateOrnamentDescription } from './services/openrouterService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    logo: null,
    logoMimeType: null,
    companyName: '',
    isGenerating: false,
    result: null,
    error: null,
  });

  const handleLogoUpload = (base64: string, mimeType: string) => {
    setState(prev => ({ ...prev, logo: base64, logoMimeType: mimeType, error: null }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, companyName: e.target.value, error: null }));
  };

  const handleGenerate = async () => {
    if (!state.logo || !state.logoMimeType) {
      setState(prev => ({ ...prev, error: "Please upload a logo to continue." }));
      return;
    }

    setState(prev => ({ ...prev, isGenerating: true, error: null }));

    try {
      const description = await generateOrnamentDescription(state.logo, state.logoMimeType, state.companyName);
      setState(prev => ({
        ...prev,
        isGenerating: false,
        result: {
          description,
          timestamp: Date.now(),
        },
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: err.message || "Something went wrong during generation. Please try again.",
      }));
    }
  };

  const handleRestart = () => {
    setState({
      logo: null,
      logoMimeType: null,
      companyName: '',
      isGenerating: false,
      result: null,
      error: null,
    });
  };

  const isFormValid = !!state.logo;

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
          <a 
            href="https://rabbitmarketinghouse.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
          >
            <img 
              src={RMH_LOGO_URL} 
              alt="Rabbit Marketing House" 
              className="h-12 w-12 object-cover rounded-full border border-gray-100 shadow-sm" 
            />
            <div>
              <h1 className="text-xl font-bold text-[#2D5016]">Merry Logo AI</h1>
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Rabbit Marketing House</p>
            </div>
          </a>
          <div className="hidden sm:block">
            <span className="text-xs text-gray-400 font-medium">Holiday Branding Tool</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 mt-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-display text-[#2D5016] mb-3 leading-tight">
            Magical Christmas Ornaments
          </h2>
          <p className="text-gray-600">
            Turn your company logo into an AI-crafted design brief for a professional 4K crystal-glass ornament.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {state.isGenerating ? (
            <LoadingOverlay />
          ) : state.result ? (
            <ResultView 
              result={state.result} 
              companyName={state.companyName}
              onRestart={handleRestart}
            />
          ) : (
            <div className="space-y-8">
              {/* Logo Upload Section */}
              <LogoUploader 
                onUpload={handleLogoUpload} 
                currentLogo={state.logo}
              />

              {/* Company Name Section */}
              <div>
                <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="company-name"
                  type="text"
                  value={state.companyName}
                  onChange={handleNameChange}
                  placeholder="Enter your brand name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Error Message */}
              {state.error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl flex items-center space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{state.error}</span>
                </div>
              )}

              {/* Generate Button */}
              <button
                disabled={!isFormValid}
                onClick={handleGenerate}
                className={`
                  w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg
                  flex items-center justify-center space-x-2
                  ${isFormValid 
                    ? 'bg-[#2D5016] text-white hover:bg-[#1a310d] transform hover:-translate-y-0.5 active:translate-y-0' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                `}
              >
                <span>Generate Design Brief</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-gray-400 text-xs">
          <p>
            © {new Date().getFullYear()}{' '}
            <a 
              href="https://rabbitmarketinghouse.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#2D5016] transition-colors font-medium underline underline-offset-2"
            >
              Rabbit Marketing House
            </a>
            . All rights reserved.
          </p>
          <div className="mt-2 flex items-center justify-center space-x-4">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">AI Powered</span>
            <span className="bg-gold-100 text-[#D4AF37] px-2 py-1 rounded">Premium Assets</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
