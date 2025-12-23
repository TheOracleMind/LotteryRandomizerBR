"use client";

import { useState } from "react";

type SlotMachineProps = {
  onGenerate: () => void;
  isGenerating: boolean;
  gameGradient: string;
};

export default function SlotMachine({ onGenerate, isGenerating, gameGradient }: SlotMachineProps) {
  const [isPulled, setIsPulled] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handlePull = () => {
    if (isGenerating) return;

    setIsPulled(true);
    setShowFlash(true);
    onGenerate();

    setTimeout(() => {
      setIsPulled(false);
    }, 1000);

    setTimeout(() => {
      setShowFlash(false);
    }, 300);
  };

  return (
    <div className="relative flex flex-col items-center gap-8 my-16">
      {/* Flash Effect */}
      {showFlash && (
        <div className="fixed inset-0 bg-white pointer-events-none z-50 animate-flash"></div>
      )}

      {/* Machine Frame - Visual Context */}
      <div className={`relative ${gameGradient} rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-white/20 backdrop-blur-sm`}>
        {/* Top Decorative Elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 bg-yellow-400 rounded-full shadow-2xl flex items-center justify-center border-4 border-yellow-600 animate-pulse">
            <span className="text-4xl">🎰</span>
          </div>
        </div>

        {/* Lever Handle - MUCH BIGGER */}
        <div className="relative flex flex-col items-center">
          {/* Base/Mount */}
          <div className="w-20 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-inner mb-4 border-2 border-gray-600"></div>

          {/* Lever */}
          <button
            onClick={handlePull}
            disabled={isGenerating}
            className={`
              group relative
              transition-all duration-500
              ${isPulled ? 'translate-y-24' : 'translate-y-0'}
              disabled:opacity-70 disabled:cursor-not-allowed
              focus:outline-none
            `}
            aria-label="Puxar alavanca para gerar números"
          >
            {/* Lever Handle Ball */}
            <div className={`
              w-24 h-24 md:w-32 md:h-32
              bg-gradient-to-br from-red-400 via-red-500 to-red-700
              rounded-full
              shadow-2xl
              border-8 border-red-900/50
              flex items-center justify-center
              transition-all duration-300
              ${isGenerating ? 'animate-pulse' : 'group-hover:scale-110 group-active:scale-95'}
              ${!isGenerating && 'cursor-grab group-active:cursor-grabbing'}
            `}>
              {/* Shine effect */}
              <div className="absolute inset-2 bg-gradient-to-br from-white/40 to-transparent rounded-full"></div>

              {/* Grip texture */}
              <div className="absolute inset-4 border-4 border-red-900/30 rounded-full"></div>
              <div className="absolute inset-6 border-4 border-red-900/30 rounded-full"></div>

              {/* Icon */}
              <span className="relative z-10 text-4xl md:text-5xl">
                {isGenerating ? '⏳' : '👇'}
              </span>
            </div>

            {/* Lever Arm */}
            <div className={`
              absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2
              w-6 md:w-8 h-32 md:h-40
              bg-gradient-to-b from-red-600 to-red-800
              rounded-full
              shadow-xl
              border-4 border-red-900
              ${isPulled ? 'h-56 md:h-64' : ''}
              transition-all duration-500
            `}>
              {/* Metallic shine */}
              <div className="absolute inset-0 left-0 w-1/3 bg-gradient-to-r from-white/20 to-transparent rounded-l-full"></div>
            </div>
          </button>

          {/* Shadow */}
          <div className={`
            absolute bottom-0 w-32 h-4 bg-black/30 rounded-full blur-xl
            transition-all duration-500
            ${isPulled ? 'scale-150 opacity-50' : 'scale-100'}
          `}></div>
        </div>

        {/* Decorative lights */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-500/50 animate-pulse"></div>
        <div className="absolute top-4 right-4 w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-500/50 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-red-400 rounded-full shadow-lg shadow-red-500/50 animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Instructions - DRAMATIC */}
      <div className="text-center max-w-md">
        {!isGenerating ? (
          <>
            <p className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              PUXE A ALAVANCA
            </p>
            <p className="text-lg md:text-xl text-gray-300 font-semibold">
              e revele seus números da sorte
            </p>
          </>
        ) : (
          <>
            <p className="text-3xl md:text-4xl font-black text-yellow-400 mb-3 tracking-tight animate-pulse">
              SORTEANDO...
            </p>
            <p className="text-lg md:text-xl text-gray-300 font-semibold">
              Aguarde a revelação ✨
            </p>
          </>
        )}
      </div>
    </div>
  );
}
