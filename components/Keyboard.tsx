import React from 'react';
import { Key } from '../constants';

interface KeyboardProps {
  layout: Key[][];
  onKeyPress: (key: string) => void;
  onSpecialKeyPress: (keyType: 'shift' | 'caps' | 'backspace') => void;
  highlightedKeys: string[];
  isShiftActive: boolean;
  isCapsActive: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ layout, onKeyPress, onSpecialKeyPress, highlightedKeys, isShiftActive, isCapsActive }) => {
  
  const handleKeyClick = (keyObj: Key) => {
    if (keyObj.special) {
      if (keyObj.special === 'space') {
        onKeyPress(' ');
      } else {
        onSpecialKeyPress(keyObj.special as 'shift' | 'caps' | 'backspace');
      }
      return;
    }

    const isLetter = keyObj.key.length === 1 && /[a-z]/.test(keyObj.key);

    // XOR logic for shift and caps lock on letters
    const useShift = isShiftActive !== (isCapsActive && isLetter);

    onKeyPress(useShift && keyObj.shiftKey ? keyObj.shiftKey : keyObj.key);
  };

  return (
    <div className="bg-slate-200/80 backdrop-blur-sm p-1 md:p-2 rounded-xl shadow-lg w-full max-w-4xl mx-auto select-none">
      <div className="space-y-1 md:space-y-1.5">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 md:gap-1.5">
            {row.map((keyObj) => {
              const isHighlighted = highlightedKeys.includes(keyObj.key);
              const isShiftHighlighted = highlightedKeys.includes('Shift') && keyObj.special === 'shift';
              
              const isActive = (keyObj.special === 'shift' && isShiftActive) || (keyObj.special === 'caps' && isCapsActive);

              const keyClasses = `
                flex justify-center items-center relative flex-grow min-h-12 md:h-14 rounded-md md:rounded-lg shadow-sm font-sans transition-all duration-150 border-b-4
                ${keyObj.width ? keyObj.width : 'w-12'}
                ${isHighlighted || isShiftHighlighted
                  ? 'bg-yellow-400 border-yellow-600 text-slate-900 ring-4 ring-yellow-200 scale-105 -translate-y-1'
                  : isActive
                  ? 'bg-sky-400 border-sky-600 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-sky-100 hover:border-sky-300'
                }
              `;
              
              const isLetter = keyObj.key.length === 1 && /[a-z]/.test(keyObj.key);
              const showShiftValue = isShiftActive !== (isCapsActive && isLetter);

              let displayChar = keyObj.display;
              if (showShiftValue && keyObj.shiftDisplay) {
                displayChar = keyObj.shiftDisplay;
              } else if (showShiftValue && isLetter) {
                displayChar = keyObj.display.toUpperCase();
              }
              
              // This is for displaying the small secondary character on the key
              let secondaryChar = showShiftValue ? keyObj.display : keyObj.shiftDisplay;


              return (
                <button
                  key={keyObj.key + keyObj.display}
                  onClick={() => handleKeyClick(keyObj)}
                  className={keyClasses}
                  aria-label={displayChar}
                >
                  <div className="text-center">
                    {secondaryChar && (
                      <span className="absolute top-1 left-2 text-xs text-slate-400">
                        {secondaryChar}
                      </span>
                    )}
                     {keyObj.altGrDisplay && (
                      <span className="absolute bottom-1 right-2 text-xs text-slate-400">
                        {keyObj.altGrDisplay}
                      </span>
                    )}
                    <span className="text-sm md:text-xl font-medium">
                      {keyObj.special === 'space' ? '' : displayChar}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
