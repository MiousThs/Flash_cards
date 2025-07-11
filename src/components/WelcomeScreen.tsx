import React, { useRef, useState } from 'react';
import { Upload, BookOpen, Type, X, FileText, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { parseCsvFile, parseCsvText } from '../utils/csvParser';

export function WelcomeScreen() {
  const { dispatch } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showTextInput, setShowTextInput] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const words = await parseCsvFile(file);
      dispatch({ type: 'LOAD_DECK', payload: words });
    } catch (error) {
      alert(`Error loading CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextSubmit = async () => {
    if (!csvText.trim()) return;

    setIsLoading(true);
    try {
      const words = await parseCsvText(csvText);
      dispatch({ type: 'LOAD_DECK', payload: words });
      setCsvText('');
      setShowTextInput(false);
    } catch (error) {
      alert(`Error parsing CSV text: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryDemo = () => {
    const demoData = `English,Spanish
hello,hola
goodbye,adiós
thank you,gracias
please,por favor
yes,sí
no,no
water,agua
food,comida
house,casa
cat,gato
dog,perro
book,libro
car,coche
friend,amigo
family,familia`;

    setCsvText(demoData);
    setShowTextInput(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 dark:bg-blue-500 rounded-2xl mb-6">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              FlashCards
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Master vocabulary with beautiful, interactive flashcards
            </p>
            
            {/* Quick Start Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Upload className="h-6 w-6" />
                <span>{isLoading ? 'Loading...' : 'Upload CSV File'}</span>
              </button>
              
              <button
                onClick={() => setShowTextInput(true)}
                disabled={isLoading}
                className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Type className="h-6 w-6" />
                <span>Paste CSV Text</span>
              </button>
            </div>

            <button
              onClick={handleTryDemo}
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Try with demo data</span>
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy Import
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload CSV files or paste text directly. Supports any two-column format.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Multiple Modes
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Study L1→L2, L2→L1, or mixed mode. Shuffle for variety.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Mark cards as learned and filter to focus on difficult words.
              </p>
            </div>
          </div>

          {/* CSV Format Help */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              CSV Format Example
            </h3>
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 font-mono text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                <div className="text-green-600 dark:text-green-400 font-semibold">lang1,lang2</div>
                <div>house,casa</div>
                <div>cat,gato</div>
                <div>book,libro</div>
                <div>water,agua</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              <p>First row should contain column headers. Each row represents one flashcard pair.</p>
            </div>
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
                  disabled={!csvText.trim() || isLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  {isLoading ? 'Loading...' : 'Import Data'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}