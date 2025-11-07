import React, { useState, useCallback } from 'react';
import WeekSelector from './components/WeekSelector';
import Game from './components/Game';

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<{ words: string[]; id: string } | null>(null);

  const handleSelectWeek = useCallback((words: string[], id: string) => {
    setSelectedGame({ words, id });
  }, []);

  const handleBackToMenu = useCallback(() => {
    setSelectedGame(null);
  }, []);

  return (
    <div className="min-h-screen bg-sky-50 text-gray-800 flex flex-col items-center p-4">
      <header className="w-full max-w-5xl text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-700 drop-shadow-md">
          Les dictées de maîtresse Claire
        </h1>
      </header>
      <main className="w-full max-w-5xl flex-grow">
        {!selectedGame ? (
          <WeekSelector onSelectWeek={handleSelectWeek} />
        ) : (
          <Game words={selectedGame.words} weekId={selectedGame.id} onBackToMenu={handleBackToMenu} />
        )}
      </main>
      <footer className="text-center p-4 text-sm text-slate-500">
        Créé avec ♥ pour les élèves.
      </footer>
    </div>
  );
};

export default App;