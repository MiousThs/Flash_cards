import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export function useKeyboardShortcuts() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Don't trigger shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Only handle shortcuts when in study session
      if (!state.session) return;

      switch (event.key) {
        case 'ArrowLeft':
        case 'h':
          event.preventDefault();
          dispatch({ type: 'PREV_CARD' });
          break;
        case 'ArrowRight':
        case 'l':
          event.preventDefault();
          dispatch({ type: 'NEXT_CARD' });
          break;
        case ' ':
        case 'f':
          event.preventDefault();
          dispatch({ type: 'FLIP_CARD' });
          break;
        case 's':
          event.preventDefault();
          dispatch({ type: 'SHUFFLE_DECK' });
          break;
        case 'Escape':
          event.preventDefault();
          dispatch({ type: 'END_SESSION' });
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.session, dispatch]);
}