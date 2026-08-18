
import React, { useState, useRef } from 'react';
import "./App.css"
const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

import { generateCardSvg, generateCardBackSvg } from './makecard';

export default function DeckWorkout() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aceValue, setAceValue] = useState(14);
  const [exercises, setExercises] = useState({
    spades: 'push-ups',
    hearts: 'sit-ups',
    clubs: 'dips',
    diamonds: 'seconds plank'
  });
  const generateCards = () => {

    return SUITS.flatMap(suit => 
      RANKS.map(rank => ({ rank, suit }))
    );
  }

  const rankToNum = (rank) => {
    if (Number.isInteger(Number(rank))) {
      return Number(rank);
    }
    else {
      return {
        "J": 11,
        "Q": 12,
        "K": 13,
        "A": 14
      }[rank];
    }
  }
  
  const suitToExercise = (suit) => {
    return exercises[suit]
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
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-neutral-900 relative">
      
      <button 
        onClick={() => setSettingsOpen(true)}
        className="absolute top-6 right-6 z-[60] p-2 text-neutral-400 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div className={`absolute inset-0 bg-neutral-900/95 backdrop-blur-sm z-[100] flex flex-col items-center justify-center transition-all duration-300 ${settingsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <h2 className="text-3xl font-light tracking-widest uppercase mb-10 text-white">Settings</h2>

        <div className="flex flex-col gap-6 w-full max-w-xs">
          <div className="flex flex-col gap-2">
            <label className="text-neutral-400 text-sm tracking-widest uppercase">Ace Value</label>
            <select 
              value={aceValue} 
              onChange={(e) => setAceValue(Number(e.target.value))}
              className="bg-neutral-800 text-white border border-neutral-700 rounded-md p-3 outline-none focus:border-neutral-500 transition-[border] duration-300 ease-out appearance-none"
            >
              <option value={1}>1</option>
              <option value={11}>11</option>
              <option value={14}>14</option>
            </select>
          </div>

          {Object.keys(exercises).map((suit) => (
            <div key={suit} className="flex flex-col gap-2">
              <label className="text-neutral-400 text-sm tracking-widest uppercase">{suit}</label>
              <input 
                type="text" 
                value={exercises[suit]} 
                onChange={(e) => setExercises({ ...exercises, [suit]: e.target.value })}
                className="bg-neutral-800 text-white border border-neutral-700 rounded-md p-3 outline-none focus:border-neutral-500 transition-[border] duration-300 ease-out font-light tracking-wide"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={() => setSettingsOpen(false)}
          className="mt-12 px-10 py-3 border border-neutral-700 text-neutral-300 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-sm"
        >
          Save & Close
        </button>
      </div>

      <div className="relative flex items-center justify-center w-[288px] h-[403px] mx-auto [perspective:1000px]">
        
        {cardIndex < deckLength - 2 && (
          <div className="absolute top-[14px] left-[14px] w-full h-full shadow-md z-0 pointer-events-none [transform:scale(0.8333)]">
            {generateCardBackSvg()}
          </div>
        )}

        {cardIndex < deckLength - 1 && (
          <div className="absolute top-0 left-0 w-full h-full shadow-xl z-0 pointer-events-none [transform:scale(0.8333)]">
            {generateCardBackSvg()}
          </div>
        )}

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

      <div className={`absolute flex flex-col items-center gap-4 ${isRevealed && !isAnimatingOut ? 'bottom-[10%] opacity-100' : 'bottom-[5%] opacity-0 pointer-events-none'} transition-all duration-500 ease-out`}>
        <p className="sans-serif text-xl font-bold text-white uppercase tracking-widest">
          {rankToNum(cards.current[cardIndex].rank)} {suitToExercise(cards.current[cardIndex].suit)}
        </p>

        <button className="px-5 py-2 gap-2 flex items-center border border-neutral-700 text-neutral-300 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-sm"
 onClick={handleNext}>
          next 
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#ffffff"/>
          </svg>
        </button>

        <span className="text-white font-light opacity-50 tracking-widest">{cardIndex + 1} / {deckLength}</span>
      </div>
    </div>
  );
}