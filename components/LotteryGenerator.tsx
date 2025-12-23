"use client";

import { useState } from "react";
import { LotteryGame } from "@/app/types";
import SlotMachine from "./SlotMachine";
import NextDrawBanner from "./NextDrawBanner";
import ResultDisplay from "./ResultDisplay";
import LotteryInfo from "./LotteryInfo";
import Link from "next/link";

type LotteryGeneratorProps = {
  game: LotteryGame;
};

export default function LotteryGenerator({ game }: LotteryGeneratorProps) {
  const [primaryNumbers, setPrimaryNumbers] = useState<number[]>([]);
  const [secondaryNumber, setSecondaryNumber] = useState<number | null>(null);
  const [secondaryText, setSecondaryText] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNumbers = () => {
    setIsGenerating(true);
    setPrimaryNumbers([]);
    setSecondaryNumber(null);
    setSecondaryText("");

    // Sound of drums rolling...
    setTimeout(() => {
      const generated = new Set<number>();

      // For Super Sete, we can have repeated numbers (one per column)
      if (game.id === "super-sete") {
        const columns: number[] = [];
        for (let i = 0; i < game.primaryNumbers.count; i++) {
          columns.push(Math.floor(Math.random() * game.primaryNumbers.max));
        }
        setPrimaryNumbers(columns);
      } else {
        // For other games, generate unique numbers
        while (generated.size < game.primaryNumbers.count) {
          const num = Math.floor(Math.random() * game.primaryNumbers.max) + 1;
          generated.add(num);
        }
        setPrimaryNumbers(Array.from(generated).sort((a, b) => a - b));
      }

      // Generate secondary number/option if needed
      if (game.secondaryNumbers) {
        if (game.secondaryNumbers.options) {
          // For Timemania and Dia de Sorte - pick from options
          const randomIndex = Math.floor(Math.random() * game.secondaryNumbers.options.length);
          setSecondaryText(game.secondaryNumbers.options[randomIndex]);
          setSecondaryNumber(randomIndex + 1);
        } else {
          // For Mais Milionária - generate random trevos
          const trevos = new Set<number>();
          while (trevos.size < game.secondaryNumbers.count) {
            const num = Math.floor(Math.random() * game.secondaryNumbers.max) + 1;
            trevos.add(num);
          }
          setSecondaryNumber(Array.from(trevos).sort((a, b) => a - b)[0]);
          if (game.secondaryNumbers.count === 2) {
            const trevosArray = Array.from(trevos).sort((a, b) => a - b);
            setSecondaryText(trevosArray.join(", "));
          }
        }
      }

      setTimeout(() => {
        setIsGenerating(false);
      }, primaryNumbers.length * 400 + 2000);
    }, 1500);
  };

  const handleCopy = () => {
    const formatSecondaryDisplay = () => {
      if (game.id === "timemania" || game.id === "dia-de-sorte") {
        return secondaryText;
      }
      if (game.id === "mais-milionaria") {
        return secondaryText;
      }
      return secondaryNumber?.toString().padStart(2, '0');
    };

    const text = `${game.name}: ${primaryNumbers.join(", ")}${
      secondaryText ? ` | ${game.secondaryNumbers?.label}: ${formatSecondaryDisplay()}` : ""
    }`;
    navigator.clipboard.writeText(text);
    alert("Números copiados para a área de transferência!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para todos os jogos
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${game.color} bg-clip-text text-transparent`}>
            {game.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">{game.description}</p>
          <p className="text-gray-400">
            {game.primaryNumbers.count} {game.primaryNumbers.label}
            {game.secondaryNumbers && ` + ${game.secondaryNumbers.count} ${game.secondaryNumbers.label}`}
          </p>
        </div>

        {/* Next Draw Info - Above the Fold */}
        <NextDrawBanner game={game} />

        {/* Slot Machine / Lever */}
        <SlotMachine onGenerate={generateNumbers} isGenerating={isGenerating} gameGradient={game.gradient} />

        {/* Generated Numbers Display - NEW DRAMATIC RESULT */}
        {primaryNumbers.length > 0 && (
          <ResultDisplay
            game={game}
            primaryNumbers={primaryNumbers}
            secondaryNumber={secondaryNumber}
            secondaryText={secondaryText}
            onGenerateNew={generateNumbers}
            onCopy={handleCopy}
          />
        )}

        {/* Game Info */}
        <div className="mt-16 max-w-2xl mx-auto bg-gray-900/50 rounded-2xl p-6 border border-gray-800 mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Como funciona?</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <span>Clique na alavanca vermelha para iniciar o sorteio</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <span>Aguarde enquanto os números são sorteados um por um</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <span>Copie seus números e boa sorte!</span>
            </li>
          </ul>
        </div>

        {/* Detailed Lottery Info - Below the Fold */}
        <LotteryInfo game={game} />
      </div>
    </div>
  );
}
