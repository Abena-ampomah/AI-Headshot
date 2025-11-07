import React from 'react';
import { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  styles: HeadshotStyle[];
  selectedStyle: HeadshotStyle | null;
  onStyleSelect: (style: HeadshotStyle | null) => void;
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
}

const MAX_PROMPT_LENGTH = 280;

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  styles,
  selectedStyle,
  onStyleSelect,
  customPrompt,
  onCustomPromptChange,
}) => {
  // A style is selected if selectedStyle is not null. Otherwise, we're in custom prompt mode.
  const activeTab = selectedStyle ? 'style' : 'background';

  const handleTabClick = (tab: 'style' | 'background') => {
    if (tab === 'style' && activeTab === 'background') {
      onCustomPromptChange('');
      if (styles.length > 0) {
        onStyleSelect(styles[0]);
      }
    } else if (tab === 'background' && activeTab === 'style') {
      onStyleSelect(null);
    }
  };

  const handleStyleClick = (style: HeadshotStyle) => {
    onStyleSelect(style);
    onCustomPromptChange('');
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onCustomPromptChange(e.target.value);
    if (e.target.value) {
      onStyleSelect(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => handleTabClick('style')}
          aria-pressed={activeTab === 'style'}
          className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-t-md ${
            activeTab === 'style'
              ? 'border-b-2 border-yellow-400 text-yellow-400'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          Preset Styles
        </button>
        <button
          onClick={() => handleTabClick('background')}
          aria-pressed={activeTab === 'background'}
          className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-t-md ${
            activeTab === 'background'
              ? 'border-b-2 border-yellow-400 text-yellow-400'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          AI Background
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'style' && selectedStyle && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Thumbnail Grid (takes 3 columns) */}
            <div className="lg:col-span-3 grid grid-cols-3 gap-3">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleClick(style)}
                  aria-pressed={selectedStyle?.id === style.id}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-yellow-400 aspect-square group ${
                    selectedStyle?.id === style.id ? 'border-yellow-400 scale-105 shadow-lg' : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <img src={style.thumbnail} alt={style.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-1 transition-opacity opacity-100 group-hover:opacity-0 group-focus:opacity-0">
                    <span className="text-white text-xs text-center font-semibold">{style.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Style Preview (takes 2 columns) */}
            <div className="lg:col-span-2 bg-black/20 p-4 rounded-lg flex flex-col">
                <h3 className="text-lg font-bold text-yellow-400 mb-3">Style Preview</h3>
                <div className="aspect-square rounded-lg overflow-hidden mb-4 shadow-lg border border-gray-800">
                    <img src={selectedStyle.thumbnail} alt={selectedStyle.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-semibold text-white">{selectedStyle.name}</h4>
                <p className="text-sm text-gray-400 mt-1 flex-grow">{selectedStyle.prompt}</p>
            </div>
          </div>
        )}
        {activeTab === 'background' && (
          <div>
            <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Describe the background you want to generate
            </label>
            <textarea
              id="custom-prompt"
              rows={4}
              value={customPrompt}
              onChange={handlePromptChange}
              maxLength={MAX_PROMPT_LENGTH}
              placeholder='e.g., "A minimalist Scandinavian office with plants" or "A sun-drenched beach during golden hour"'
              className="w-full bg-gray-950 border-2 border-gray-700 rounded-lg p-3 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
            />
             <p className={`text-sm text-right mt-1 ${
                customPrompt.length > MAX_PROMPT_LENGTH ? 'text-red-400' : 'text-gray-400'
              }`}>
              {customPrompt.length} / {MAX_PROMPT_LENGTH}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};