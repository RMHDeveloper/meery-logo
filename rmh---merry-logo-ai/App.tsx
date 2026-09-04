
import React, { useState } from 'react';
import { AppState } from './types';
import { RMH_LOGO_URL, BuildingIcon, LockIcon, SparkleIcon } from './constants';
import LogoUploader from './components/LogoUploader';
import LoadingOverlay from './components/LoadingOverlay';
import ResultView from './components/ResultView';
import { generateOrnamentBadge } from './services/badgeService';

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
      const imageUrl = await generateOrnamentBadge(state.logo);

      setState(prev => ({
        ...prev,
        isGenerating: false,
        result: {
          imageUrl,
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
      <header className="bg-gradient-to-r from-[#2D5016] to-[#1a310d] border-b border-black/20 shadow-sm sticky top-0 z-50">
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
              className="h-12 w-12 object-cover rounded-full border border-white/20 shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Merry Logo AI</h1>
              <p className="text-[10px] uppercase tracking-widest text-white font-bold">Rabbit Marketing House</p>
            </div>
          </a>
          <div className="hidden sm:block">
            <span className="text-xs text-white font-medium">Holiday Branding Tool</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 mt-12">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-40 h-40 bg-gradient-to-br from-[#2D5016]/30 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
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
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Create Your Ornament
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Upload Your Company Logo
                  </h2>
                  <p className="text-sm text-gray-500">
                    Supports PNG, JPG or SVG (Max 5MB)
                  </p>
                </div>

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
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <BuildingIcon />
                    </span>
                    <input
                      id="company-name"
                      type="text"
                      value={state.companyName}
                      onChange={handleNameChange}
                      placeholder="Enter your brand name"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent outline-none transition-all"
                    />
                  </div>
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
                <div>
                  <button
                    disabled={!isFormValid}
                    onClick={handleGenerate}
                    className={`
                      w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg
                      flex items-center justify-center gap-2
                      ${isFormValid
                        ? 'bg-gradient-to-r from-[#2D5016] to-[#1a310d] text-white hover:brightness-110 transform hover:-translate-y-0.5 active:translate-y-0'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    <SparkleIcon />
                    <span>Generate Ornament</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                    <LockIcon />
                    Your files are secure and will not be shared.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-gray-400 text-xs space-y-2">
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
          <div className="flex items-center justify-center gap-3">
            <span className="text-[#2D5016] font-medium">AI Powered</span>
            <span className="text-gray-300">|</span>
            <span className="text-[#D4AF37] font-medium">Premium Assets</span>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-[#2D5016] transition-colors">Privacy</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-[#2D5016] transition-colors">Terms</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
