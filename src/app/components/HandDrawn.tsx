import { motion } from 'motion/react';
import { ReactNode } from 'react';

// Hand-drawn style divider line
export function HandDrawnDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full h-2 ${className}`}
      viewBox="0 0 400 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 4 Q10 3, 20 4 T40 4 T60 4 T80 4 T100 4 T120 4 T140 4 T160 4 T180 4 T200 4 T220 4 T240 4 T260 4 T280 4 T300 4 T320 4 T340 4 T360 4 T380 4 T400 4"
        stroke="#2d2d2d"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

// Hand-drawn card with sketch effect
interface HandDrawnCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function HandDrawnCard({ children, className = '', onClick, hover = true }: HandDrawnCardProps) {
  return (
    <motion.div
      className={`relative bg-white/80 backdrop-blur-sm p-6 ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      style={{
        clipPath: 'path("M 2 8 Q 2 2, 8 2 L 92 2 Q 98 2, 98 8 L 98 92 Q 98 98, 92 98 L 8 98 Q 2 98, 2 92 Z")',
        clipPath: 'polygon(0.5% 3%, 3% 0.5%, 97% 0.5%, 99.5% 3%, 99.5% 97%, 97% 99.5%, 3% 99.5%, 0.5% 97%)',
      }}
    >
      {/* Sketch border overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          fill="none"
          stroke="#2d2d2d"
          strokeWidth="1.5"
          opacity="0.6"
          rx="4"
          style={{
            strokeDasharray: '5, 3, 2, 3',
            filter: 'url(#roughen)',
          }}
        />
        <defs>
          <filter id="roughen">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
          </filter>
        </defs>
      </svg>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Washi tape decoration
interface WashiTapeProps {
  color?: string;
  rotation?: number;
  className?: string;
}

export function WashiTape({ color = '#a8d5e2', rotation = -2, className = '' }: WashiTapeProps) {
  return (
    <div
      className={`absolute h-8 w-32 opacity-40 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        background: `repeating-linear-gradient(
          90deg,
          ${color},
          ${color} 10px,
          transparent 10px,
          transparent 12px
        )`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    />
  );
}

// Hand-drawn button
interface HandDrawnButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export function HandDrawnButton({ children, onClick, variant = 'primary', className = '' }: HandDrawnButtonProps) {
  const variants = {
    primary: 'bg-[#2d2d2d] text-white hover:bg-[#2d2d2d]/90',
    secondary: 'bg-white text-[#2d2d2d] hover:bg-[#e8e6e0]',
    ghost: 'bg-transparent text-[#2d2d2d] hover:bg-[#e8e6e0]/50',
  };

  return (
    <motion.button
      className={`relative px-6 py-3 font-medium rounded-lg transition-all ${variants[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        border: '2px solid #2d2d2d',
        boxShadow: '2px 2px 0 #2d2d2d',
      }}
    >
      {/* Sketch effect overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke="#2d2d2d"
          strokeWidth="1"
          opacity="0.2"
          rx="8"
          strokeDasharray="4,2"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Doodle arrow
export function DoodleArrow({ direction = 'right', className = '' }: { direction?: 'left' | 'right' | 'up' | 'down'; className?: string }) {
  const paths = {
    right: 'M5 12 L25 12 M20 7 L25 12 L20 17',
    left: 'M25 12 L5 12 M10 7 L5 12 L10 17',
    up: 'M12 25 L12 5 M7 10 L12 5 L17 10',
    down: 'M12 5 L12 25 M7 20 L12 25 L17 20',
  };

  return (
    <svg
      className={`w-8 h-8 ${className}`}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={paths[direction]}
        stroke="#2d2d2d"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

// Sketchy circle for highlighting
export function SketchyCircle({ children, color = '#a8d5e2', className = '' }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full -m-1 pointer-events-none"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="50"
          cy="20"
          rx="48"
          ry="18"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.3"
          strokeDasharray="3,2"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}

// Hand-drawn checkbox
export function HandDrawnCheckbox({ checked, label }: { checked: boolean; label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-6 h-6">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            fill={checked ? '#2d2d2d' : 'white'}
            stroke="#2d2d2d"
            strokeWidth="2"
            rx="2"
          />
          {checked && (
            <path
              d="M6 12 L10 16 L18 8"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </div>
      {label && <span className="text-[#2d2d2d]">{label}</span>}
    </div>
  );
}

// Paper texture background
export function PaperTexture() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")
        `,
        backgroundBlendMode: 'multiply',
      }}
    />
  );
}
