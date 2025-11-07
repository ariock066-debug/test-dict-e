import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Keyboard from './Keyboard';
import { KEYBOARD_LAYOUT } from '../constants';

interface GameProps {
  words: string[];
  weekId: string;
  onBackToMenu: () => void;
}

const getSequenceForChar = (char: string): string[] => {
  const accentMap: { [key: string]: string[] } = {
    'ê': ['^', 'e'], 'ë': ['¨', 'e'], 'î': ['^', 'i'], 'ï': ['¨', 'i'],
    'ô': ['^', 'o'], 'ö': ['¨', 'o'], 'û': ['^', 'u'], 'ü': ['¨', 'u'],
    'â': ['^', 'a'], 'ä': ['¨', 'a']
  };
  return accentMap[char] || [char];
};


const Game: React.FC<GameProps> = ({ words, weekId, onBackToMenu }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'idle'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isCapsActive, setIsCapsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [completionHandled, setCompletionHandled] = useState(false);


  const shuffledWords = useMemo(() => [...words].sort(() => Math.random() - 0.5), [words]);
  const currentWord = useMemo(() => shuffledWords[currentWordIndex], [shuffledWords, currentWordIndex]);
  
  useEffect(() => {
    if (isFinished) return;

    const timerId = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isFinished]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!currentWord || userInput.length >= currentWord.length) {
        setKeySequence([]);
    } else {
        const nextChar = currentWord[userInput.length];
        setKeySequence(getSequenceForChar(nextChar));
    }
    setCurrentKeyIndex(0);
  }, [currentWord, userInput]);

  const highlightedKeys = useMemo(() => {
    if (keySequence.length === 0) return [];
    
    const nextKey = keySequence[currentKeyIndex];

    if (nextKey.length === 1 && nextKey >= 'A' && nextKey <= 'Z') {
        return ['Shift', nextKey.toLowerCase()];
    }

    for (const row of KEYBOARD_LAYOUT) {
        const keyObj = row.find(k => k.key === nextKey || k.shiftKey === nextKey);
        if (keyObj) {
            if (keyObj.shiftKey === nextKey) {
                return ['Shift', keyObj.key];
            }
            return [keyObj.key];
        }
    }
    
    return [nextKey];
  }, [keySequence, currentKeyIndex]);

  const handleSpecialKeyPress = (keyType: 'shift' | 'caps' | 'backspace') => {
    if (keyType === 'shift') {
      setIsShiftActive(prev => !prev);
    } else if (keyType === 'caps') {
      setIsCapsActive(prev => !prev);
    } else if (keyType === 'backspace') {
      if (userInput.length > 0) {
        setUserInput(prev => prev.slice(0, -1));
        setFeedback('idle');
      }
    }
  };

  const handleKeyPress = useCallback((key: string) => {
    if (isFinished || !currentWord || keySequence.length === 0) return;

    const targetKey = keySequence[currentKeyIndex];
    const finalChar = currentWord[userInput.length];

    if (key === targetKey) {
        if (currentKeyIndex < keySequence.length - 1) {
            setCurrentKeyIndex(prev => prev + 1);
        } else {
            setUserInput(prev => prev + currentWord[prev.length]);
        }
        if (isShiftActive) setIsShiftActive(false);
    } else if (key === finalChar && keySequence.length > 1) {
        // This handles the composed character from a physical keyboard (e.g., dead keys)
        setUserInput(prev => prev + finalChar);
        if (isShiftActive) setIsShiftActive(false);
    }
    else {
        setFeedback('incorrect');
        setTimeout(() => setFeedback('idle'), 500);
        if (isShiftActive) setIsShiftActive(false);
    }
  }, [currentWord, isFinished, keySequence, currentKeyIndex, isShiftActive, userInput.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
            setIsShiftActive(true);
        } else if (e.key === 'CapsLock') {
            // Toggle on keydown but check state to avoid flicker
            setIsCapsActive(caps => !caps);
        } else if (e.key === 'Backspace') {
            handleSpecialKeyPress('backspace');
        } else if (!e.ctrlKey && !e.altKey && !e.metaKey) {
             if (e.key.length === 1 || e.key === 'Enter') {
                e.preventDefault();
                handleKeyPress(e.key === 'Enter' ? '\n' : e.key);
             }
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
            setIsShiftActive(false);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyPress]);

  // Reset completion flag when the word changes
  useEffect(() => {
    setCompletionHandled(false);
  }, [currentWordIndex]);

  useEffect(() => {
    if (currentWord && userInput.length === currentWord.length && !completionHandled) {
      if (userInput === currentWord) {
        setCompletionHandled(true); // Prevent this block from re-running
        setFeedback('correct');
        const isLastWord = currentWordIndex >= shuffledWords.length - 1;

        if (isLastWord) {
          const storedBestTimeRaw = localStorage.getItem(weekId);
          const storedBestTime = storedBestTimeRaw ? parseInt(storedBestTimeRaw, 10) : null;
          
          let finalBestTime = storedBestTime;
          if (storedBestTime === null || elapsedTime < storedBestTime) {
            localStorage.setItem(weekId, String(elapsedTime));
            finalBestTime = elapsedTime;
          }
          setBestTime(finalBestTime);
          
          setTimeout(() => setIsFinished(true), 1000);

        } else {
          setTimeout(() => {
            setCurrentWordIndex(prev => prev + 1);
            setUserInput('');
            setFeedback('idle');
          }, 1000);
        }
      } else {
        setFeedback('incorrect');
        setTimeout(() => setFeedback('idle'), 500);
      }
    }
  }, [userInput, currentWord, currentWordIndex, shuffledWords, elapsedTime, weekId, completionHandled]);
  
  const showSpecialKeyHint = keySequence.length > 1;

  if (isFinished) {
    return (
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
        <h2 className="text-4xl font-bold text-green-500 mb-4">Félicitations !</h2>
        <p className="text-xl text-gray-600 mb-2">Tu as terminé tous les mots de la semaine.</p>
        <p className="text-lg text-gray-600">Ton temps : <span className="font-bold text-sky-600">{formatTime(elapsedTime)}</span></p>
        {bestTime !== null && (
          <p className="text-lg text-gray-600 mb-6">
            Meilleur temps : 
            <span className="font-bold text-amber-500"> 🏆 {formatTime(bestTime)}</span>
            {elapsedTime === bestTime && bestTime !== 0 && <span className="ml-2 text-sm bg-green-200 text-green-800 font-bold px-2 py-1 rounded-full">Nouveau record !</span>}
          </p>
        )}
        <button onClick={onBackToMenu} className="px-6 py-3 bg-sky-500 text-white font-bold rounded-lg shadow-md hover:bg-sky-600 transition-colors">
          Choisir une autre semaine
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
      <div className="w-full flex justify-between items-center px-2">
        <p className="text-lg text-slate-600">Mot {currentWordIndex + 1} / {shuffledWords.length}</p>
        <div className="text-xl text-slate-700 font-mono bg-white px-3 py-1 rounded-lg shadow-inner border">
          {formatTime(elapsedTime)}
        </div>
        <button onClick={onBackToMenu} className="px-4 py-2 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 transition-colors text-sm">
          Menu
        </button>
      </div>
      
      <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-sky-100 min-h-[150px] flex flex-col justify-center items-center">
        <p className="text-xl text-slate-500">Recopie le mot :</p>
        <p className="text-5xl font-bold text-sky-800 tracking-widest my-2 select-none">{currentWord}</p>
      </div>

      <div className={`w-full bg-white p-4 rounded-2xl shadow-inner flex justify-center items-center gap-1 transition-transform duration-300 ${feedback === 'incorrect' ? 'animate-shake' : ''}`}>
        {currentWord && currentWord.split('').map((char, index) => (
          <span key={index} className={`flex items-center justify-center text-3xl font-bold w-12 h-16 rounded-md border-2 ${
            index < userInput.length && userInput[index] === currentWord[index] ? 'bg-green-100 border-green-400 text-green-600' : 
            index < userInput.length && userInput[index] !== currentWord[index] ? 'bg-red-100 border-red-400 text-red-600' :
            index === userInput.length ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100 border-gray-300'
          }`}>
            {userInput[index] || ''}
            {index === userInput.length && <span className="animate-pulse">|</span>}
          </span>
        ))}
      </div>

       {showSpecialKeyHint && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-lg shadow-md">
          <p className="font-bold">Astuce !</p>
          <p>Pour faire la lettre <span className="font-bold text-red-500">{currentWord[userInput.length]}</span>, appuie d'abord sur la touche <span className="font-mono bg-white px-2 py-1 rounded shadow-sm">{keySequence[0]}</span>, puis sur <span className="font-mono bg-white px-2 py-1 rounded shadow-sm">{keySequence[1]}</span>.</p>
        </div>
      )}

      <Keyboard 
        layout={KEYBOARD_LAYOUT} 
        onKeyPress={handleKeyPress} 
        onSpecialKeyPress={handleSpecialKeyPress}
        highlightedKeys={highlightedKeys}
        isShiftActive={isShiftActive}
        isCapsActive={isCapsActive}
      />
    </div>
  );
};

// Simple shake animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}`;
document.head.appendChild(style);

export default Game;