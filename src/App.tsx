import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StudyModeSelector } from './components/StudyModeSelector';
import { StudySession } from './components/StudySession';
import { DeckModal } from './components/DeckModal';

function AppContent() {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <Header />
      
      {state.deck.length === 0 ? (
        <WelcomeScreen />
      ) : state.session ? (
        <StudySession />
      ) : (
        <StudyModeSelector />
      )}

      <DeckModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;