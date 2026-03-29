import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ComicPanelProps {
  children: ReactNode;
  delay?: number;
  quote?: string;
}

export function ComicPanel({ children, delay = 0, quote }: ComicPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="relative bg-white/80 backdrop-blur-sm rounded-lg p-6 border-2 border-[#2d2d2d] shadow-md"
    >
      {/* Hand-drawn border effect */}
      <div className="absolute inset-0 rounded-lg pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            fill="none"
            stroke="#2d2d2d"
            strokeWidth="2"
            strokeDasharray="5,3"
            opacity="0.3"
            rx="8"
          />
        </svg>
      </div>

      <div className="relative z-10">
        {children}
      </div>

      {quote && (
        <div className="mt-4 pt-4 border-t border-[#2d2d2d]/10">
          <p className="text-sm text-[#6b6b6b] italic">
            "{quote}"
          </p>
        </div>
      )}
    </motion.div>
  );
}

interface IllustrationProps {
  type: 'book' | 'heart' | 'star' | 'plant';
  size?: number;
}

export function Illustration({ type, size = 120 }: IllustrationProps) {
  const illustrations = {
    book: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Open book */}
        <path
          d="M20 40 C20 35, 25 30, 30 30 L60 30 L60 85 L30 85 C25 85, 20 80, 20 75 Z"
          fill="#a8956c"
          stroke="#2d2d2d"
          strokeWidth="2"
        />
        <path
          d="M100 40 C100 35, 95 30, 90 30 L60 30 L60 85 L90 85 C95 85, 100 80, 100 75 Z"
          fill="#8b7355"
          stroke="#2d2d2d"
          strokeWidth="2"
        />
        {/* Pages */}
        <line x1="30" y1="45" x2="55" y2="45" stroke="#2d2d2d" strokeWidth="1" opacity="0.3" />
        <line x1="30" y1="55" x2="55" y2="55" stroke="#2d2d2d" strokeWidth="1" opacity="0.3" />
        <line x1="30" y1="65" x2="55" y2="65" stroke="#2d2d2d" strokeWidth="1" opacity="0.3" />
        <line x1="65" y1="45" x2="90" y2="45" stroke="#2d2d2d" strokeWidth="1" opacity="0.3" />
        <line x1="65" y1="55" x2="90" y2="55" stroke="#2d2d2d" strokeWidth="1" opacity="0.3" />
        <line x1="65" y1="65" x2="90" y2="65" stroke="#2d2d2d" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M60 35 C50 20, 25 25, 25 45 C25 65, 60 90, 60 90 C60 90, 95 65, 95 45 C95 25, 70 20, 60 35 Z"
          fill="#b8a99a"
          stroke="#2d2d2d"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="45" cy="45" r="3" fill="#fff" opacity="0.6" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M60 20 L68 52 L100 52 L74 70 L82 102 L60 84 L38 102 L46 70 L20 52 L52 52 Z"
          fill="#9fa8a3"
          stroke="#2d2d2d"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="60" cy="55" r="5" fill="#fff" opacity="0.5" />
      </svg>
    ),
    plant: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pot */}
        <path
          d="M40 80 L45 100 L75 100 L80 80 Z"
          fill="#a8956c"
          stroke="#2d2d2d"
          strokeWidth="2"
        />
        {/* Stem */}
        <path
          d="M60 80 Q55 60, 60 40"
          stroke="#6b8e7f"
          strokeWidth="3"
          fill="none"
        />
        {/* Leaves */}
        <path
          d="M60 60 Q45 55, 45 45 Q45 55, 60 60"
          fill="#6b8e7f"
          stroke="#2d2d2d"
          strokeWidth="1.5"
        />
        <path
          d="M60 50 Q75 45, 75 35 Q75 45, 60 50"
          fill="#6b8e7f"
          stroke="#2d2d2d"
          strokeWidth="1.5"
        />
        {/* Flower */}
        <circle cx="60" cy="35" r="8" fill="#b8a99a" stroke="#2d2d2d" strokeWidth="2" />
        <circle cx="60" cy="35" r="3" fill="#8b7355" />
      </svg>
    ),
  };

  return (
    <motion.div
      className="mx-auto"
      style={{ width: size, height: size }}
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {illustrations[type]}
    </motion.div>
  );
}
