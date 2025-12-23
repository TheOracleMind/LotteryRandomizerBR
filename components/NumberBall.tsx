"use client";

import { useState, useEffect } from "react";

type NumberBallProps = {
  number: number;
  delay: number;
  isRevealed: boolean;
  gradient: string;
  isSecondary?: boolean;
  label?: string;
};

export default function NumberBall({
  number,
  delay,
  isRevealed,
  gradient,
  isSecondary = false,
  label
}: NumberBallProps) {
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      // Primeiro mostra a bolinha branca, depois revela o número
      const timer = setTimeout(() => {
        setShowNumber(true);
      }, delay + 600); // 600ms após a bolinha aparecer

      return () => clearTimeout(timer);
    } else {
      setShowNumber(false);
    }
  }, [isRevealed, delay]);

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <span className="text-xs text-gray-400 font-medium">{label}</span>
      )}
      <div
        className={`
          relative flex items-center justify-center
          ${isSecondary ? 'w-16 h-16 md:w-20 md:h-20' : 'w-20 h-20 md:w-24 md:h-24'}
          rounded-full
          ${isRevealed ? 'animate-reveal' : 'opacity-0'}
          ${showNumber ? gradient : 'bg-white animate-spin-continuous'}
          shadow-2xl
          border-4 border-white/20
          transition-all duration-500
        `}
        style={{
          animationDelay: `${delay}ms`,
        }}
      >
        <div className={`absolute inset-0 rounded-full ${showNumber ? 'bg-white/10 animate-glow' : ''}`}></div>

        {/* Question mark while spinning */}
        {!showNumber && (
          <span className={`
            relative z-10 font-bold text-gray-300
            ${isSecondary ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'}
          `}>
            ?
          </span>
        )}

        {/* Number when revealed */}
        <span className={`
          relative z-10 font-bold transition-all duration-500
          ${isSecondary ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'}
          ${showNumber ? 'text-white opacity-100 scale-100' : 'text-transparent opacity-0 scale-0 absolute'}
        `}>
          {number.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
