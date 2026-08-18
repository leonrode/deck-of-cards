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
      spades: "M21.51 14.42c0 2.94-2.53 4.28-4.28 4.28-1.95 0-3.43-0.88-4.3-1.61 0.12 2.39 0.68 4.1 3.22 5.44h-8.29c2.54-1.34 3.1-3.05 3.22-5.44-0.88 0.72-2.35 1.61-4.3 1.61-1.75 0-4.28-1.35-4.28-4.28 0-5.37 3.78-3.91 9.51-12.96 5.73 9.05 9.51 7.6 9.51 12.96z",
      clubs: "M22.38 13.835a4.896 4.896 0 0 1-9.481 1.719c-.004 3.222.203 5.365 3.26 6.984h-8.324c3.057-1.619 3.264-3.762 3.26-6.984a4.894 4.894 0 1 1-3.11-6.388 4.896 4.896 0 1 1 8.022 0 4.898 4.898 0 0 1 6.372 4.669z",
      diamonds: "M12 24 L6 12 L12 0 L18 12 Z"
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
            fontWeight="200" 
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