
import React, { useState, useRef } from 'react';
import "./App.css"
const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

import { generateCardSvg, generateCardBackSvg } from './makecard';

const generateInitialDeck = () => {
  const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];
  
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
};

export default function DeckWorkout() {
  const cards = useRef(generateInitialDeck());
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aceValue, setAceValue] = useState(14);
  const [updateTrigger, setUpdateTrigger] = useState(0);
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

  const handleShuffleRemaining = () => {
    const remaining = cards.current.slice(cardIndex);
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }
    cards.current = [...cards.current.slice(0, cardIndex), ...remaining];
    setUpdateTrigger(prev => prev + 1);
  };

  // const cards = useRef(shuffle(generateCards()));

  
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
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#171717] text-white overflow-hidden">
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
        className="absolute top-6 right-6 z-[60] p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer duration-300"
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
                className="bg-neutral-800 text-white border border-neutral-700 rounded-md p-3 outline-none focus:border-neutral-500 transition-[border] uppercase duration-300 ease-out font-light tracking-widest"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={() => setSettingsOpen(false)}
          className="mt-12 px-10 py-3 border cursor-pointer border-neutral-700 text-neutral-300 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-sm"
        >
          Save & Close
        </button>
      </div>

      <div className="absolute mx-4 flex gap-4 top-[10%] z-20">
        <button 
          onClick={handleRestart}
          className="group flex items-center gap-2 px-6 py-2 border border-neutral-700 text-neutral-300 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-xs cursor-pointer"
        >
          <svg className="group-hover:stroke-black stroke-white transition-all duration-300 ease-out" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
<path d="M18.364 8.05026L17.6569 7.34315C14.5327 4.21896 9.46734 4.21896 6.34315 7.34315C3.21895 10.4673 3.21895 15.5327 6.34315 18.6569C9.46734 21.7811 14.5327 21.7811 17.6569 18.6569C19.4737 16.84 20.234 14.3668 19.9377 12.0005M18.364 8.05026H14.1213M18.364 8.05026V3.80762"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Restart <span className="hidden md:inline">This Deck</span>
        </button>
        <button 
          onClick={handleShuffleRemaining}
          className="flex items-center gap-2 group px-6 py-2 border border-neutral-700 text-neutral-300 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-xs cursor-pointer"
        >
          <svg className="group-hover:fill-black fill-white transition-all duration-300 ease-out"  xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
<path d="M16.4697 9.46967C16.1768 9.76256 16.1768 10.2374 16.4697 10.5303C16.7626 10.8232 17.2374 10.8232 17.5303 10.5303L16.4697 9.46967ZM19.5303 8.53033C19.8232 8.23744 19.8232 7.76256 19.5303 7.46967C19.2374 7.17678 18.7626 7.17678 18.4697 7.46967L19.5303 8.53033ZM18.4697 8.53033C18.7626 8.82322 19.2374 8.82322 19.5303 8.53033C19.8232 8.23744 19.8232 7.76256 19.5303 7.46967L18.4697 8.53033ZM17.5303 5.46967C17.2374 5.17678 16.7626 5.17678 16.4697 5.46967C16.1768 5.76256 16.1768 6.23744 16.4697 6.53033L17.5303 5.46967ZM19 8.75C19.4142 8.75 19.75 8.41421 19.75 8C19.75 7.58579 19.4142 7.25 19 7.25V8.75ZM16.7 8L16.6993 8.75H16.7V8ZM12.518 10.252L13.1446 10.6642L13.1446 10.6642L12.518 10.252ZM10.7414 11.5878C10.5138 11.9338 10.6097 12.3989 10.9558 12.6266C11.3018 12.8542 11.7669 12.7583 11.9946 12.4122L10.7414 11.5878ZM11.9946 12.4122C12.2222 12.0662 12.1263 11.6011 11.7802 11.3734C11.4342 11.1458 10.9691 11.2417 10.7414 11.5878L11.9946 12.4122ZM10.218 13.748L9.59144 13.3358L9.59143 13.3358L10.218 13.748ZM6.041 16V16.75H6.04102L6.041 16ZM5 15.25C4.58579 15.25 4.25 15.5858 4.25 16C4.25 16.4142 4.58579 16.75 5 16.75V15.25ZM11.9946 11.5878C11.7669 11.2417 11.3018 11.1458 10.9558 11.3734C10.6097 11.6011 10.5138 12.0662 10.7414 12.4122L11.9946 11.5878ZM12.518 13.748L13.1446 13.3358L13.1446 13.3358L12.518 13.748ZM16.7 16V15.25H16.6993L16.7 16ZM19 16.75C19.4142 16.75 19.75 16.4142 19.75 16C19.75 15.5858 19.4142 15.25 19 15.25V16.75ZM10.7414 12.4122C10.9691 12.7583 11.4342 12.8542 11.7802 12.6266C12.1263 12.3989 12.2222 11.9338 11.9946 11.5878L10.7414 12.4122ZM10.218 10.252L9.59143 10.6642L9.59144 10.6642L10.218 10.252ZM6.041 8L6.04102 7.25H6.041V8ZM5 7.25C4.58579 7.25 4.25 7.58579 4.25 8C4.25 8.41421 4.58579 8.75 5 8.75V7.25ZM17.5303 13.4697C17.2374 13.1768 16.7626 13.1768 16.4697 13.4697C16.1768 13.7626 16.1768 14.2374 16.4697 14.5303L17.5303 13.4697ZM18.4697 16.5303C18.7626 16.8232 19.2374 16.8232 19.5303 16.5303C19.8232 16.2374 19.8232 15.7626 19.5303 15.4697L18.4697 16.5303ZM19.5303 16.5303C19.8232 16.2374 19.8232 15.7626 19.5303 15.4697C19.2374 15.1768 18.7626 15.1768 18.4697 15.4697L19.5303 16.5303ZM16.4697 17.4697C16.1768 17.7626 16.1768 18.2374 16.4697 18.5303C16.7626 18.8232 17.2374 18.8232 17.5303 18.5303L16.4697 17.4697ZM17.5303 10.5303L19.5303 8.53033L18.4697 7.46967L16.4697 9.46967L17.5303 10.5303ZM19.5303 7.46967L17.5303 5.46967L16.4697 6.53033L18.4697 8.53033L19.5303 7.46967ZM19 7.25H16.7V8.75H19V7.25ZM16.7007 7.25C14.7638 7.24812 12.956 8.22159 11.8914 9.8398L13.1446 10.6642C13.9314 9.46813 15.2676 8.74861 16.6993 8.75L16.7007 7.25ZM11.8914 9.83979L10.7414 11.5878L11.9946 12.4122L13.1446 10.6642L11.8914 9.83979ZM10.7414 11.5878L9.59144 13.3358L10.8446 14.1602L11.9946 12.4122L10.7414 11.5878ZM9.59143 13.3358C8.80541 14.5306 7.47115 15.25 6.04098 15.25L6.04102 16.75C7.97596 16.7499 9.78113 15.7767 10.8446 14.1602L9.59143 13.3358ZM6.041 15.25H5V16.75H6.041V15.25ZM10.7414 12.4122L11.8914 14.1602L13.1446 13.3358L11.9946 11.5878L10.7414 12.4122ZM11.8914 14.1602C12.956 15.7784 14.7638 16.7519 16.7007 16.75L16.6993 15.25C15.2676 15.2514 13.9314 14.5319 13.1446 13.3358L11.8914 14.1602ZM16.7 16.75H19V15.25H16.7V16.75ZM11.9946 11.5878L10.8446 9.83979L9.59144 10.6642L10.7414 12.4122L11.9946 11.5878ZM10.8446 9.8398C9.78113 8.2233 7.97596 7.25005 6.04102 7.25L6.04098 8.75C7.47115 8.75004 8.80541 9.46939 9.59143 10.6642L10.8446 9.8398ZM6.041 7.25H5V8.75H6.041V7.25ZM16.4697 14.5303L18.4697 16.5303L19.5303 15.4697L17.5303 13.4697L16.4697 14.5303ZM18.4697 15.4697L16.4697 17.4697L17.5303 18.5303L19.5303 16.5303L18.4697 15.4697Z" />
</svg> Shuffle <span className="hidden md:inline">Remaining Deck</span>
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
          className={`absolute top-0 left-0 w-full h-full z-10 cursor-pointer transition-all duration-500 ease-out ${!isRevealed || isAnimatingOut ? "hover:-translate-y-[10px]" : ""} [transform-style:preserve-3d] ${
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

        <button className="group cursor-pointer px-5 py-2 gap-2 flex items-center border border-neutral-700 text-neutral-300 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-xs"
 onClick={handleNext}>
          next 
          <svg className="group-hover:fill-black fill-white transition-all duration-300 ease-out"  xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" />
          </svg>
        </button>

        <span className="text-white font-light opacity-50 tracking-widest">{cardIndex + 1} / {deckLength}</span>
      </div>
    </div>
  );
}