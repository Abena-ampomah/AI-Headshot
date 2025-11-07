import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  preview: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, preview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {preview ? (
        <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg border-2 border-gray-600">
            <img src={preview} alt="Uploaded preview" className="w-full h-auto object-cover" />
        </div>
      ) : (
        <div 
          onClick={handleClick}
          className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800/50 hover:border-yellow-500 transition-colors"
        >
          <UploadIcon className="w-12 h-12 text-gray-500 mb-2" />
          <p className="text-gray-400">Click to upload a selfie</p>
          <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
        </div>
      )}
       {preview && (
         <button 
           onClick={handleClick} 
           className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
         >
           Choose a Different Photo
         </button>
       )}
    </div>
  );
};