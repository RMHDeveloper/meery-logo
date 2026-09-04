
import React, { useRef, useState } from 'react';
import { TreeIcon } from '../constants';

interface LogoUploaderProps {
  onUpload: (base64: string, mimeType: string) => void;
  currentLogo: string | null;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ onUpload, currentLogo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
      <div
        onClick={triggerUpload}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative cursor-pointer transition-all duration-300 rounded-xl
          flex flex-col items-center justify-center p-8 text-center
          ${currentLogo ? 'border-solid border-[#2D5016] bg-green-50' : 'border-2 border-dashed border-gray-300 hover:border-[#2D5016] hover:bg-green-50'}
          ${isHovered ? 'border-solid border-[#2D5016]' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".png,.jpg,.jpeg,.svg"
        />
        
        {currentLogo ? (
          <div className="space-y-4">
            <img src={currentLogo} alt="Logo preview" className="max-h-24 object-contain mx-auto rounded" />
            <p className="text-xs text-green-700 font-medium">Logo Uploaded Successfully</p>
          </div>
        ) : (
          <>
            <TreeIcon />
            <p className="mt-4 text-sm text-gray-600">
              <span className="font-semibold text-[#2D5016]">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG or SVG (Max. 5MB)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LogoUploader;
