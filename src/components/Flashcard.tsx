import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, StarOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Word, StudyMode } from '../types';

interface FlashcardProps {
  word: Word;
  mode: StudyMode;
  showAnswer: boolean;
  onFlip: () => void;
  onToggleLearned: () => void;
}

export function Flashcard({ word, mode, showAnswer, onFlip, onToggleLearned }: FlashcardProps) {
  const [isFlipping, setIsFlipping] = useState(false);

  const getDisplayDirection = () => {
    if (mode === 'mixed') {
      // For mixed mode, randomly choose direction based on word ID
      const hash = word.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return hash % 2 === 0 ? 'l1-to-l2' : 'l2-to-l1';
    }
    return mode;
  };

  const displayMode = getDisplayDirection();
  const questionText = displayMode === 'l1-to-l2' ? word.l1 : word.l2;
  const answerText = displayMode === 'l1-to-l2' ? word.l2 : word.l1;

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      onFlip();
      setIsFlipping(false);
    }, 150);
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
      <motion.div
        className="relative w-full h-64 sm:h-80 cursor-pointer"
        onClick={handleFlip}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={isFlipping ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center p-4 sm:p-8 ${
            showAnswer ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-4">
              {questionText}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Tap to reveal answer
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-800 border border-blue-200 dark:border-blue-600 flex items-center justify-center p-4 sm:p-8 ${
            showAnswer ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
              {questionText}
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-4">
              {answerText}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Tap to flip back
            </div>
          </div>
        </div>
      </motion.div>

      {/* Learned toggle button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleLearned();
        }}
        className={`absolute -top-2 -right-2 p-2 rounded-full shadow-lg transition-colors ${
          word.learned
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
            : 'bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-400'
        }`}
        title={word.learned ? 'Mark as unlearned' : 'Mark as learned'}
      >
        {word.learned ? (
          <Star className="h-5 w-5 fill-current" />
        ) : (
          <StarOff className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}