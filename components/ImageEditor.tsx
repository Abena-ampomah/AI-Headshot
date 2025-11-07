import React, { useState } from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { ResetIcon } from './icons/ResetIcon';

interface Edits {
  brightness: number;
  contrast: number;
  saturation: number;
}

interface ImageEditorProps {
  edits: Edits;
  onEditChange: (newEdits: Edits) => void;
  onReset: () => void;
  imageUrl: string;
}

const Slider: React.FC<{
  label: string;
  name: keyof Edits;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, onChange }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label htmlFor={name} className="text-sm font-medium text-gray-300">
        {label}
      </label>
      <span className="text-sm font-mono text-yellow-400 bg-gray-800 px-2 py-1 rounded-md">
        {value}%
      </span>
    </div>
    <input
      type="range"
      id={name}
      name={name}
      min="0"
      max="200"
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400"
    />
  </div>
);

export const ImageEditor: React.FC<ImageEditorProps> = ({ edits, onEditChange, onReset, imageUrl }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEditChange({ ...edits, [e.target.name]: Number(e.target.value) });
  };
  
  const handleDownload = () => {
    setIsDownloading(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error("Could not get canvas context");
        setIsDownloading(false);
        return;
      }

      ctx.filter = `brightness(${edits.brightness}%) contrast(${edits.contrast}%) saturate(${edits.saturation}%)`;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement('a');
      link.download = 'ai-headshot-edited.jpeg';
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    };

    img.onerror = (err) => {
        console.error("Failed to load image for download", err);
        setIsDownloading(false);
    }
  };


  return (
    <div className="mt-6 border-t border-gray-800 pt-6 space-y-4">
       <h3 className="text-lg font-semibold text-yellow-400 text-center">Edit Image</h3>
        <Slider label="Brightness" name="brightness" value={edits.brightness} onChange={handleSliderChange} />
        <Slider label="Contrast" name="contrast" value={edits.contrast} onChange={handleSliderChange} />
        <Slider label="Saturation" name="saturation" value={edits.saturation} onChange={handleSliderChange} />
        <div className="flex items-center space-x-4 pt-2">
            <button 
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <ResetIcon className="w-5 h-5" />
              Reset
            </button>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              <DownloadIcon className="w-5 h-5" />
              {isDownloading ? 'Downloading...' : 'Download'}
            </button>
        </div>
    </div>
  );
};