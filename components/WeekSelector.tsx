import React from 'react';
import { WORD_LISTS, Period, Week } from '../constants';

interface WeekSelectorProps {
  onSelectWeek: (words: string[], id: string) => void;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const WeekSelector: React.FC<WeekSelectorProps> = ({ onSelectWeek }) => {
  return (
    <div className="space-y-8">
      {WORD_LISTS.map((period: Period) => (
        <div key={period.name} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-sky-100">
          <h2 className="text-3xl font-bold text-sky-600 mb-4 text-center">{period.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {period.weeks.map((week: Week) => {
              const weekId = `dictation-best-time-${period.name}-${week.name}`;
              const bestTimeRaw = localStorage.getItem(weekId);
              const bestTime = bestTimeRaw ? parseInt(bestTimeRaw, 10) : null;

              return (
                <button
                  key={week.name}
                  onClick={() => onSelectWeek(week.words, weekId)}
                  className="p-4 bg-teal-500 text-white rounded-xl shadow-md hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 transform hover:-translate-y-1 transition-all duration-200 ease-in-out"
                >
                  <span className="text-xl font-semibold">{week.name}</span>
                  {bestTime !== null && (
                    <div className="text-xs font-mono text-teal-100 mt-1">
                      🏆 {formatTime(bestTime)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekSelector;