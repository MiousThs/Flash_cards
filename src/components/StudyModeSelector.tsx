import React from 'react';
import { Play, Shuffle, ArrowRight, ArrowLeft, ArrowLeftRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudyMode } from '../types';

export function StudyModeSelector() {
  const { state, dispatch } = useApp();

  const handleStartSession = (mode: StudyMode, shuffle: boolean = false) => {
    dispatch({ type: 'START_SESSION', payload: { mode, shuffle } });
  };

  const availableCount = state.showOnlyUnlearned 
    ? state.deck.filter(word => !word.learned).length
    : state.deck.length;

  const learnedCount = state.deck.filter(word => word.learned).length;

  if (availableCount === 0 && state.showOnlyUnlearned) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              🎉 All Cards Learned!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You've mastered all the cards in your deck. Great job!
            </p>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_UNLEARNED_FILTER' })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Review All Cards
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Study Mode
          </h2>
          <div className="flex justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <span>Total: {state.deck.length} cards</span>
            <span>Learned: {learnedCount}</span>
            <span>Available: {availableCount}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* L1 to L2 Mode */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
                <ArrowRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              L1 → L2
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              See the first language, guess the second
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleStartSession('l1-to-l2')}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>Start</span>
              </button>
              <button
                onClick={() => handleStartSession('l1-to-l2', true)}
                className="w-full flex items-center justify-center space-x-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg transition-colors"
              >
                <Shuffle className="h-4 w-4" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>

          {/* L2 to L1 Mode */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
                <ArrowLeft className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              L2 → L1
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              See the second language, guess the first
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleStartSession('l2-to-l1')}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>Start</span>
              </button>
              <button
                onClick={() => handleStartSession('l2-to-l1', true)}
                className="w-full flex items-center justify-center space-x-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg transition-colors"
              >
                <Shuffle className="h-4 w-4" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>

          {/* Mixed Mode */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:col-span-2">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3">
                <ArrowLeftRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              Mixed Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Random direction for each card - the ultimate challenge
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleStartSession('mixed')}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>Start</span>
              </button>
              <button
                onClick={() => handleStartSession('mixed', true)}
                className="flex items-center space-x-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-lg transition-colors"
              >
                <Shuffle className="h-4 w-4" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}