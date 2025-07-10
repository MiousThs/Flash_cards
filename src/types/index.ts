export interface Word {
  id: string;
  l1: string;
  l2: string;
  learned: boolean;
}

export interface StudySession {
  queue: string[];
  currentIndex: number;
  mode: StudyMode;
  showAnswer: boolean;
}

export type StudyMode = 'l1-to-l2' | 'l2-to-l1' | 'mixed';

export interface AppState {
  deck: Word[];
  session: StudySession | null;
  searchTerm: string;
  showOnlyUnlearned: boolean;
  showDeckModal: boolean;
  darkMode: boolean;
}

export type AppAction =
  | { type: 'LOAD_DECK'; payload: Word[] }
  | { type: 'START_SESSION'; payload: { mode: StudyMode; shuffle: boolean } }
  | { type: 'END_SESSION' }
  | { type: 'NEXT_CARD' }
  | { type: 'PREV_CARD' }
  | { type: 'FLIP_CARD' }
  | { type: 'SHUFFLE_DECK' }
  | { type: 'TOGGLE_LEARNED'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'TOGGLE_UNLEARNED_FILTER' }
  | { type: 'TOGGLE_DECK_MODAL' }
  | { type: 'TOGGLE_DARK_MODE' };