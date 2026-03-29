import { motion } from 'motion/react';

interface ProgressIndicatorProps {
  progress: number; // 0-100
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  // Calculate how many flowers to show based on progress (0-10 flowers)
  const totalFlowers = 10;
  const filledFlowers = Math.floor((progress / 100) * totalFlowers);

  return (
    <div className="flex items-center gap-2 justify-center">
      {[...Array(totalFlowers)].map((_, index) => {
        const isFilled = index < filledFlowers;
        const isActive = index === filledFlowers;

        return (
          <motion.div
            key={index}
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: isFilled || isActive ? 1 : 0.7,
              rotate: 0,
              y: isActive ? [0, -5, 0] : 0
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              y: {
                duration: 1,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut"
              }
            }}
          >
            {/* Hand-drawn flower */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-300"
            >
              {/* Petals */}
              <path
                d="M20 15 C18 12, 14 12, 13 15 C12 18, 15 19, 17 18 Z"
                fill={isFilled ? "#8b7355" : "none"}
                stroke="#2d2d2d"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 15 C27 12, 31 12, 32 15 C33 18, 30 19, 28 18 Z"
                fill={isFilled ? "#8b7355" : "none"}
                stroke="#2d2d2d"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 25 C18 28, 14 28, 13 25 C12 22, 15 21, 17 22 Z"
                fill={isFilled ? "#8b7355" : "none"}
                stroke="#2d2d2d"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 25 C27 28, 31 28, 32 25 C33 22, 30 21, 28 22 Z"
                fill={isFilled ? "#8b7355" : "none"}
                stroke="#2d2d2d"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Center */}
              <circle
                cx="22.5"
                cy="20"
                r="4"
                fill={isFilled ? "#a8956c" : "#f3f0ea"}
                stroke="#2d2d2d"
                strokeWidth="1.5"
              />
            </svg>
            {isActive && (
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-[#8b7355] rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
