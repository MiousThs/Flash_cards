import React, { useMemo } from 'react';
import { X, Star, StarOff, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function DeckModal() {
  const { state, dispatch } = useApp();

  if (!state.showDeckModal) return null;

  const filteredDeck = useMemo(() => {
    let filtered = state.deck;
    
    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase();
      filtered = filtered.filter(word => 
        word.l1.toLowerCase().includes(searchLower) ||
        word.l2.toLowerCase().includes(searchLower)
      );
    }
    
    if (state.showOnlyUnlearned) {
      filtered = filtered.filter(word => !word.learned);
    }
    
    return filtered;
  }, [state.deck, state.searchTerm, state.showOnlyUnlearned]);

  const learnedCount = state.deck.filter(word => word.learned).length;
  const totalCount = state.deck.length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-4xl w-full my-4 sm:my-0 sm:max-h-[90vh] max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Deck Overview
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredDeck.length} cards shown • {learnedCount} / {totalCount} learned
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_DECK_MODAL' })}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
          {filteredDeck.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No cards found matching your criteria
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredDeck.map((word) => (
                <div
                  key={word.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    word.learned
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                      : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className={`font-medium ${word.learned ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                        {word.l1}
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className={`font-medium ${word.learned ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                        {word.l2}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_LEARNED', payload: word.id })}
                    className={`p-2 rounded-lg transition-colors ${
                      word.learned
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400'
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}