import { useState, useRef } from 'react';

const HoldButton = ({ onConfirm, className, children }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const timerRef = useRef(null);
  const HOLD_DURATION = 800;

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return; 
    setIsHolding(true);
    setIsReady(false);
    timerRef.current = setTimeout(() => {
      setIsReady(true);
    }, HOLD_DURATION);
  };

  const handlePointerUp = () => {
    clearTimeout(timerRef.current);
    if (isReady) {
      onConfirm();
    }
    setIsHolding(false);
    setIsReady(false);
  };

  const handlePointerCancel = () => {
    clearTimeout(timerRef.current);
    setIsHolding(false);
    setIsReady(false);
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerCancel}
      onPointerCancel={handlePointerCancel}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative overflow-hidden select-none touch-none [transform:translateZ(0)] [backface-visibility:hidden] ${className}`}
    >
      {/* Progress Fill */}
      <div 
        className="absolute top-0 left-0 h-full bg-white ease-linear"
        style={{ 
          width: isHolding ? '100%' : '0%', 
          transitionDuration: isHolding ? `${HOLD_DURATION}ms` : '150ms',
          transitionProperty: 'width'
        }}
      />
      
      {/* Content Container */}
      <div className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-150 ${isHolding ? 'text-black' : 'text-neutral-300 group-hover:text-black'}`}>
        {children}
      </div>
    </button>
  );
};

export default HoldButton;