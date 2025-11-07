import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { ImageEditor } from './components/ImageEditor';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { HeadshotStyle } from './types';
import { generateHeadshot } from './services/geminiService';
import { HEADSHOT_STYLES } from './constants';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(HEADSHOT_STYLES[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [edits, setEdits] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });

  const resetEdits = useCallback(() => {
    setEdits({
      brightness: 100,
      contrast: 100,
      saturation: 100,
    });
  }, []);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImagePreview(URL.createObjectURL(file));
    setGeneratedImage(null);
    setError(null);
    resetEdits();
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || (!selectedStyle && !customPrompt.trim())) {
      setError("Please upload an image and select a style or enter a prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    resetEdits();

    try {
      const prompt = customPrompt.trim()
        ? `Generate a professional headshot of the person in the image. The background should be: ${customPrompt}`
        : selectedStyle!.prompt;
        
      const result = await generateHeadshot(originalImage, prompt);
      setGeneratedImage(`data:image/jpeg;base64,${result}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle, customPrompt, resetEdits]);

  const canGenerate = originalImage && (selectedStyle || customPrompt.trim().length > 0) && !isLoading;

  return (
    <div className="bg-gray-950 min-h-screen text-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Controls */}
          <div className="flex flex-col space-y-8">
            <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-yellow-400 mb-4">Step 1: Upload Your Photo</h2>
              <ImageUploader onImageUpload={handleImageUpload} preview={originalImagePreview} />
            </div>

            {originalImage && (
              <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                 <h2 className="text-xl font-bold text-yellow-400 mb-4">Step 2: Choose Your Style</h2>
                <StyleSelector
                  styles={HEADSHOT_STYLES}
                  selectedStyle={selectedStyle}
                  onStyleSelect={setSelectedStyle}
                  customPrompt={customPrompt}
                  onCustomPromptChange={setCustomPrompt}
                />
              </div>
            )}
             
            {originalImage && (
                <button
                onClick={handleGenerateClick}
                disabled={!canGenerate}
                className={`w-full flex items-center justify-center text-lg font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    canGenerate
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-950 shadow-lg shadow-yellow-400/30'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
                >
                <SparklesIcon className="w-6 h-6 mr-3" />
                {isLoading ? 'Generating Your Headshot...' : 'Generate Headshot'}
                </button>
            )}

          </div>

          {/* Right Column: Output */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg h-full">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">Result</h2>
            <GeneratedImageDisplay
              isLoading={isLoading}
              error={error}
              generatedImage={generatedImage}
              edits={edits}
            />
             {generatedImage && !isLoading && !error && (
              <ImageEditor
                edits={edits}
                onEditChange={setEdits}
                onReset={resetEdits}
                imageUrl={generatedImage}
              />
            )}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Gemini AI. Generated images may be artistic interpretations.</p>
      </footer>
    </div>
  );
};

export default App;