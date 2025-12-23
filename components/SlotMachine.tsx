"use client";

import { useState } from "react";

type SlotMachineProps = {
  onGenerate: () => void;
  isGenerating: boolean;
};

export default function SlotMachine({ onGenerate, isGenerating }: SlotMachineProps) {
  const [isPulled, setIsPulled] = useState(false);

  const handlePull = () => {
    if (isGenerating) return;

    setIsPulled(true);
    onGenerate();

    setTimeout(() => {
      setIsPulled(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-6 my-12">
      {/* Lever Handle */}
      <div className="relative">
        <div className="w-16 h-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-lg"></div>
        <button
          onClick={handlePull}
          disabled={isGenerating}
          className={`
            relative w-8 h-24 mx-auto mt-2
            bg-gradient-to-b from-red-500 to-red-700
            rounded-full
            shadow-2xl
            border-4 border-red-800
            transition-all duration-300
            hover:scale-105
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isPulled ? 'translate-y-12' : 'translate-y-0'}
          `}
          aria-label="Puxar alavanca para gerar números"
        >
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-900/50 rounded-full"></div>
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center">
        <p className="text-xl md:text-2xl font-bold text-white mb-2 animate-pulse">
          {isGenerating ? '🎰 Sorteando...' : '⬇️ Puxe a alavanca!'}
        </p>
        <p className="text-sm text-gray-400">
          {isGenerating ? 'Preparando seus números da sorte...' : 'Clique na alavanca vermelha'}
        </p>
      </div>
    </div>
  );
}
