import React, { useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Shuffle, 
  X, 
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { Flashcard } from './Flashcard';

export function StudySession() {
  const { state, dispatch } = useApp();
  const { session, deck } = state;

  useKeyboardShortcuts();

  if (!session) return null;

  const currentWord = deck.find(word => word.id === session.queue[session.currentIndex]);
  if (!currentWord) return null;

  const progress = ((session.currentIndex + 1) / session.queue.length) * 100;
  const isFirst = session.currentIndex === 0;
  const isLast = session.currentIndex === session.queue.length - 1;

  const getModeIcon = () => {
    switch (session.mode) {
      case 'l1-to-l2':
        return <ArrowRight className="h-4 w-4" />;
      case 'l2-to-l1':
        return <ArrowLeft className="h-4 w-4" />;
      case 'mixed':
        return <ArrowLeftRight className="h-4 w-4" />;
    }
  };

  const getModeLabel = () => {
    switch (session.mode) {
      case 'l1-to-l2':
        return 'L1 → L2';
      case 'l2-to-l1':
        return 'L2 → L1';
      case 'mixed':
        return 'Mixed';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => dispatch({ type: 'END_SESSION' })}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title="End session (Esc)"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                {getModeIcon()}
                <span className="hidden sm:inline text-sm font-medium text-gray-900 dark:text-white">
                  {getModeLabel()}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {session.currentIndex + 1} / {session.queue.length}
              </span>
              <button
                onClick={() => dispatch({ type: 'SHUFFLE_DECK' })}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title="Shuffle deck (S)"
              >
                <Shuffle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 dark:bg-gray-700 h-1">
        <div 
          className="bg-blue-600 h-1 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4">
        <div className="w-full max-w-4xl">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={() => dispatch({ type: 'PREV_CARD' })}
              disabled={isFirst}
              className={`p-3 rounded-full transition-all ${
                isFirst
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg'
              }`}
              title="Previous card (←)"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Flashcard */}
            <div className="flex-1 flex justify-center">
              <Flashcard
                word={currentWord}
                mode={session.mode}
                showAnswer={session.showAnswer}
                onFlip={() => dispatch({ type: 'FLIP_CARD' })}
                onToggleLearned={() => dispatch({ type: 'TOGGLE_LEARNED', payload: currentWord.id })}
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() => dispatch({ type: 'NEXT_CARD' })}
              disabled={isLast}
              className={`p-3 rounded-full transition-all ${
                isLast
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg'
              }`}
              title="Next card (→)"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span>←/→ Navigate</span>
              <span>Space/F Flip</span>
              <span>S Shuffle</span>
              <span>Esc Exit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}