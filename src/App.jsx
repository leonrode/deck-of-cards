
import React, { useState, useEffect, useCallback } from 'react';
import "./App.css"
const SUITS = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

import { generateCardSvg, generateCardBackSvg } from './makecard';

export default function DeckWorkout() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-neutral-900">
      
      {/* Container requires perspective for the 3D flip effect */}
      <div className={`relative flex items-center justify-center w-[240px] h-[336px] mx-auto [perspective:1000px]`}>
        
        {/* Bottom Card / Stack Base (Static) */}
        <div className="absolute top-[12px] left-[12px] w-full h-full shadow-md z-0 pointer-events-none">
          {generateCardBackSvg()}
        </div>

        {/* Top Card (Animated) */}
        <div 
          onClick={() => setIsRevealed(!isRevealed)}
          className={`absolute top-0 left-0 w-full h-full z-10 cursor-pointer transition-all duration-700 ease-out [transform-style:preserve-3d] ${
            isRevealed 
              ? '[transform:rotateY(180deg)_scale(1.2)] -translate-y-12 ' 
              : '[transform:rotateY(0deg)_scale(1)] shadow-xl'
          }`}
        >
          {/* Back Face */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
            {generateCardBackSvg()}
          </div>

          {/* Front Face (Rotated 180deg by default so it faces forward when the parent flips) */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
            {generateCardSvg('A', 'spades')}
          </div>
        </div>

      </div>


          <div className={`absolute flex flex-col items-center gap-4 ${isRevealed ? 'bottom-1/7 opacity-100' : 'bottom-1/8 opacity-0'} transition-all duration-700 ease-out`}>
            <p className={`sans-serif text-xl font-light text-white `}>
              30 pushups
            </p>

            <button className={` flex items-center text-white gap-2`}>
              next <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#ffffff"/>
                </svg>

            </button>

          </div>
    </div>
  );
}