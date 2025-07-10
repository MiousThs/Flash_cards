import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppAction, StudyMode, Word } from '../types';

const initialState: AppState = {
  deck: [],
  session: null,
  searchTerm: '',
  showOnlyUnlearned: false,
  showDeckModal: false,
  darkMode: false,
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_DECK':
      return {
        ...state,
        deck: action.payload,
        session: null,
      };

    case 'START_SESSION': {
      const availableCards = state.showOnlyUnlearned 
        ? state.deck.filter(word => !word.learned)
        : state.deck;
      
      if (availableCards.length === 0) return state;

      const queue = action.payload.shuffle 
        ? shuffleArray(availableCards.map(word => word.id))
        : availableCards.map(word => word.id);

      return {
        ...state,
        session: {
          queue,
          currentIndex: 0,
          mode: action.payload.mode,
          showAnswer: false,
        },
        showDeckModal: false,
      };
    }

    case 'END_SESSION':
      return {
        ...state,
        session: null,
      };

    case 'NEXT_CARD':
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          currentIndex: Math.min(state.session.currentIndex + 1, state.session.queue.length - 1),
          showAnswer: false,
        },
      };

    case 'PREV_CARD':
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          currentIndex: Math.max(state.session.currentIndex - 1, 0),
          showAnswer: false,
        },
      };

    case 'FLIP_CARD':
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          showAnswer: !state.session.showAnswer,
        },
      };

    case 'SHUFFLE_DECK':
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          queue: shuffleArray(state.session.queue),
          currentIndex: 0,
          showAnswer: false,
        },
      };

    case 'TOGGLE_LEARNED':
      return {
        ...state,
        deck: state.deck.map(word =>
          word.id === action.payload
            ? { ...word, learned: !word.learned }
            : word
        ),
      };

    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload,
      };

    case 'TOGGLE_UNLEARNED_FILTER':
      return {
        ...state,
        showOnlyUnlearned: !state.showOnlyUnlearned,
      };

    case 'TOGGLE_DECK_MODAL':
      return {
        ...state,
        showDeckModal: !state.showDeckModal,
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize dark mode from system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}