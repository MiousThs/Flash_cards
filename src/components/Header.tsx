import React, { useRef } from 'react';
import { 
  Upload, 
  List, 
  Settings, 
  Moon, 
  Sun, 
  BookOpen,
  Filter,
  Search,
  Type,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { parseCsvFile, parseCsvText } from '../utils/csvParser';

export function Header() {
  const { state, dispatch } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showTextInput, setShowTextInput] = React.useState(false);
  const [csvText, setCsvText] = React.useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const words = await parseCsvFile(file);
      dispatch({ type: 'LOAD_DECK', payload: words });
    } catch (error) {
      alert(`Error loading CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextSubmit = async () => {
    if (!csvText.trim()) return;

    try {
      const words = await parseCsvText(csvText);
      dispatch({ type: 'LOAD_DECK', payload: words });
      setCsvText('');
      setShowTextInput(false);
    } catch (error) {
      alert(`Error parsing CSV text: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  return (
    <>
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              FlashCards
            </h1>
          </div>

          {/* Search Bar */}
          {state.deck.length > 0 && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={state.searchTerm}
                  onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Filter Toggle */}
            {state.deck.length > 0 && (
              <button
                onClick={() => dispatch({ type: 'TOGGLE_UNLEARNED_FILTER' })}
                className={`p-2 rounded-lg transition-colors ${
                  state.showOnlyUnlearned
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
                title="Show only unlearned cards"
              >
                <Filter className="h-5 w-5" />
              </button>
            )}

            {/* Deck View */}
            {state.deck.length > 0 && (
              <button
                onClick={() => dispatch({ type: 'TOGGLE_DECK_MODAL' })}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title="View all cards"
              >
                <List className="h-5 w-5" />
              </button>
            )}

            {/* Import Options */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setShowTextInput(true)}
                className="flex items-center space-x-1 sm:space-x-2 bg-green-600 hover:bg-green-700 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors"
                title="Paste CSV text"
              >
                <Type className="h-4 w-4" />
                <span className="hidden lg:inline">Paste CSV</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-lg transition-colors"
                title="Upload CSV file"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden lg:inline">Upload CSV</span>
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle dark mode"
            >
              {state.darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </header>

      {/* CSV Text Input Modal */}
      {showTextInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Paste CSV Text
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Paste your CSV data directly into the text area below
                </p>
              </div>
              <button
                onClick={() => {
                  setShowTextInput(false);
                  setCsvText('');
                }}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="csv-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CSV Data
                </label>
                <textarea
                  id="csv-text"
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder="lang1,lang2&#10;house,casa&#10;cat,gato&#10;book,libro"
                  className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Format Requirements:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• First row must contain column headers</li>
                  <li>• Each row should have two columns separated by commas</li>
                  <li>• Use quotes around values containing commas</li>
                  <li>• Maximum 5,000 rows supported</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowTextInput(false);
                    setCsvText('');
                  }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTextSubmit}
                  disabled={!csvText.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Import Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}