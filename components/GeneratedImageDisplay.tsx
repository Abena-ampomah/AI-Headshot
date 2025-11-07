import React from 'react';
import { Loader } from './Loader';

interface GeneratedImageDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedImage: string | null;
  edits: {
    brightness: number;
    contrast: number;
    saturation: number;
  };
}

export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ isLoading, error, generatedImage, edits }) => {
  const imageStyle = {
    filter: `brightness(${edits.brightness}%) contrast(${edits.contrast}%) saturate(${edits.saturation}%)`,
  };

  return (
    <div className="w-full aspect-square bg-gray-950 rounded-lg flex items-center justify-center relative overflow-hidden">
      {isLoading && <Loader />}
      {/* FIX: Corrected a JSX syntax error. An extra closing div tag was breaking the component's return statement. */}
      {!isLoading && error && (
        <div className="text-center p-4">
          <p className="text-red-400 font-semibold">Generation Failed</p>
          <p className="text-gray-400 text-sm mt-1">{error}</p>
        </div>
      )}
      {!isLoading && !error && generatedImage && (
        <img 
          src={generatedImage} 
          alt="Generated headshot" 
          className="w-full h-full object-contain transition-all duration-200"
          style={imageStyle} 
        />
      )}
      {!isLoading && !error && !generatedImage && (
        <div className="text-center text-gray-500">
          <p className="font-semibold">Your AI headshot will appear here</p>
          <p className="text-sm">Upload a photo and choose a style to begin</p>
        </div>
      )}
    </div>
  );
};