
import React, { useState, useRef } from 'react';
import "./App.css"
const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

import { generateCardSvg, generateCardBackSvg } from './makecard';

export default function DeckWorkout() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const generateCards = () => {

    return SUITS.flatMap(suit => 
      RANKS.map(rank => ({ rank, suit }))
    );
  }

  const shuffle = (deck) => {
    // Loop from the end of the array to the beginning
    for (let i = deck.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      
      // Swap elements deck[i] and deck[j]
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  const cards = useRef(shuffle(generateCards()));

  
  const deckLength = cards.current.length;
  const isComplete = cardIndex >= deckLength;
  
  const handleNext = () => {
    if (isAnimatingOut) return;
    
    setIsAnimatingOut(true);
    
    setTimeout(() => {
      setIsRevealed(false);
      setIsAnimatingOut(false);
      setCardIndex(prev => prev + 1);
    }, 500); 
  };

  const handleRestart = () => {
    setCardIndex(0);
    setIsRevealed(false);
    setIsAnimatingOut(false);
  };
  if (isComplete) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-900 text-white overflow-hidden">
        <h1 className="text-4xl font-light tracking-widest uppercase mb-6 text-[#e0e0e0]">Session Complete</h1>
        <div className="w-16 h-[1px] bg-neutral-700 mb-8"></div>
        <button 
          onClick={handleRestart}
          className="px-8 py-3 border border-neutral-700 text-neutral-300 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-sm"
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-neutral-900">
      
      <div className="relative flex items-center justify-center w-[288px] h-[403px] mx-auto [perspective:1000px]">
        
        {/* Layer 0: Static stack base for depth */}
        {cardIndex < deckLength - 2 && (
          <div className="absolute top-[14px] left-[14px] w-full h-full shadow-md z-0 pointer-events-none [transform:scale(0.8333)]">
            {generateCardBackSvg()}
          </div>
        )}

        {/* Layer 1: Matches the shadow-xl of the resting top card */}
        {cardIndex < deckLength - 1 && (
          <div className="absolute top-0 left-0 w-full h-full shadow-xl z-0 pointer-events-none [transform:scale(0.8333)]">
            {generateCardBackSvg()}
          </div>
        )}

        {/* Layer 2: The active top card */}
        <div 
          key={cardIndex}
          onClick={() => !isAnimatingOut && setIsRevealed(true)}
          className={`absolute top-0 left-0 w-full h-full z-10 cursor-pointer transition-all duration-500 ease-out [transform-style:preserve-3d] ${
            isAnimatingOut
              ? '[transform:rotateY(180deg)_scale(1)_translate(150%,-3rem)_rotateZ(15deg)] opacity-0'
              : isRevealed 
                ? '[transform:rotateY(180deg)_scale(1)_translateY(-3rem)] shadow-2xl opacity-100' 
                : '[transform:rotateY(0deg)_scale(0.8333)] opacity-100'
          }`}
        >
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
            {generateCardBackSvg()}
          </div>

          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
            {generateCardSvg(cards.current[cardIndex].rank, cards.current[cardIndex].suit)}
          </div>
        </div>

      </div>

      <div className={`absolute flex flex-col items-center gap-4 ${isRevealed && !isAnimatingOut ? 'bottom-[14.28%] opacity-100' : 'bottom-[12.5%] opacity-0 pointer-events-none'} transition-all duration-500 ease-out`}>
        <p className="sans-serif text-xl font-light text-white">
          {/* Implement dynamic logic here mapping suit to exercise/reps */}
          30 pushups
        </p>

        <button className="flex items-center text-white gap-2" onClick={handleNext}>
          next 
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#ffffff"/>
          </svg>
        </button>

        <span className="text-white">{cardIndex + 1} / {deckLength}</span>
      </div>
    </div>
  );
}