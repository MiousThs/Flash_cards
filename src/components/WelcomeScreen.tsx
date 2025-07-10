import React from 'react';
import { Upload, BookOpen, Zap, Globe, Type } from 'lucide-react';

export function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <BookOpen className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            FlashCards
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Master vocabulary with beautiful, interactive flashcards
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Get Started
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-12 h-12 mx-auto mb-3">
                <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Upload CSV File
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload a CSV file from your device
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 w-12 h-12 mx-auto mb-3">
                <Type className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Paste CSV Text
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy and paste CSV data directly
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 w-12 h-12 mx-auto mb-3">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Choose Mode
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Study L1→L2, L2→L1, or mixed
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-left">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              CSV Format Example:
            </h4>
            <pre className="text-sm text-gray-600 dark:text-gray-400 font-mono">
{`lang1,lang2
house,casa
cat,gato
book,libro`}
            </pre>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Use "Upload CSV" or "Paste CSV" in the header to get started
          </p>
        </div>
      </div>
    </div>
  );
}