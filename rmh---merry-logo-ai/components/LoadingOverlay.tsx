
import React from 'react';
import { SnowflakeIcon } from '../constants';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <SnowflakeIcon />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#2D5016]">Crafting Your Ornament...</h3>
        <p className="text-gray-500 mt-2">Setting your logo into its gold medallion.</p>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingOverlay;
