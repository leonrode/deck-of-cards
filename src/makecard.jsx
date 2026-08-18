/**
 * Renders an SVG mimicking the design of image_2cbd87.jpg.
 * Translates geometric suit abstractions into standardized suit topologies 
 * while maintaining the minimalist stroke and color constraints.
 * 
 * @param {string} rank - The card rank (e.g., 'A', 'K', '9').
 * @param {string} suit - The card suit ('hearts', 'diamonds', 'clubs', 'spades').
 */
export function generateCardSvg(rank, suit) {
    const isRed = suit === 'hearts' || suit === 'diamonds';
    const strokeColor = isRed ? '#d34b3d' : '#e0e0e0';
  
    const suitPaths = {
      hearts: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
      diamonds: "M12 2 L22 12 L12 22 L2 12 Z",
      spades: "M12 2C7 7 3 11 3 15c0 3.3 2.7 6 6 6 1.8 0 3.3-.8 4.2-2L11 23h2l-2.2-4c.9 1.2 2.4 2 4.2 2 3.3 0 6-2.7 6-6 0-4-4-8-9-13z",
      clubs: "M12 2.5c-1.6 0-3 1.4-3 3.1 0 1.4 1 2.6 2.3 3-2.3.4-4 2.4-4 4.9 0 2.8 2.2 5 5 5 .7 0 1.4-.2 2-.5L11 23h2l-3.3-5.1c.6.3 1.3.5 2 .5 2.8 0 5-2.2 5-5 0-2.4-1.7-4.4-4-4.9 1.3-.4 2.3-1.6 2.3-3 0-1.7-1.4-3.1-3-3.1-1.1 0-2.1.6-2.6 1.6-.5-1-1.5-1.6-2.6-1.6z"
    };
  
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 240 336" 
        width="100%" 
        height="100%" 
        style={{ backgroundColor: '#1a1a1a', borderRadius: '12px' }}
      >
        <g transform="translate(24, 40)">
          <text 
            x="12" 
            y="0" 
            fill={strokeColor} 
            fontSize="28" 
            fontWeight="300" 
            fontFamily="sans-serif" 
            textAnchor="middle"
          >
            {rank}
          </text>
          <path 
            d={suitPaths[suit]} 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth="1.5" 
            transform="translate(0, 16)" 
          />
        </g>
        
        <g transform="translate(84, 132) scale(3)">
          <path 
            d={suitPaths[suit]} 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth="0.5" 
          />
        </g>
  
        <g transform="translate(216, 296) rotate(180)">
          <text 
            x="12" 
            y="0" 
            fill={strokeColor} 
            fontSize="28" 
            fontWeight="300" 
            fontFamily="sans-serif" 
            textAnchor="middle"
          >
            {rank}
          </text>
          <path 
            d={suitPaths[suit]} 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth="1.5" 
            transform="translate(0, 16)" 
          />
        </g>
      </svg>
    );
  }

  export function generateCardBackSvg() {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 240 336" 
        width="100%" 
        height="100%" 
        style={{ backgroundColor: '#1a1a1a', borderRadius: '12px' }}
      >
        <defs>
          <pattern 
            id="minimalist-lines" 
            width="16" 
            height="16" 
            patternUnits="userSpaceOnUse" 
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="16" stroke="#333333" strokeWidth="1.5" />
          </pattern>
        </defs>
        
        <rect 
          x="16" 
          y="16" 
          width="208" 
          height="304" 
          fill="url(#minimalist-lines)" 
          stroke="#333333" 
          strokeWidth="1.5" 
          rx="8" 
        />
        
        <circle cx="120" cy="168" r="40" fill="#1a1a1a" stroke="#333333" strokeWidth="1.5" />
        <circle cx="120" cy="168" r="28" fill="none" stroke="#333333" strokeWidth="1.5" />
      </svg>
    );
  }