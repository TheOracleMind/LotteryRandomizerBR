"use client";

import { useState } from "react";
import { LotteryGame } from "@/app/types";
import NumberBall from "./NumberBall";
import SlotMachine from "./SlotMachine";
import NextDrawBanner from "./NextDrawBanner";
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

  const formatSecondaryDisplay = () => {
    if (game.id === "timemania" || game.id === "dia-de-sorte") {
      return secondaryText;
    }
    if (game.id === "mais-milionaria") {
      return secondaryText;
    }
    return secondaryNumber?.toString().padStart(2, '0');
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
        <SlotMachine onGenerate={generateNumbers} isGenerating={isGenerating} />

        {/* Generated Numbers Display */}
        {primaryNumbers.length > 0 && (
          <div className="mt-16 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
              Seus números da sorte:
            </h2>

            {/* Primary Numbers */}
            <div className={`
              flex flex-wrap justify-center gap-4 md:gap-6 mb-8
              ${game.id === 'lotomania' || game.id === 'lotofacil' ? 'max-w-5xl mx-auto' : ''}
            `}>
              {primaryNumbers.map((num, index) => (
                <NumberBall
                  key={index}
                  number={num}
                  delay={index * 400}
                  isRevealed={true}
                  gradient={game.gradient}
                  label={game.id === 'super-sete' ? `Col ${index + 1}` : undefined}
                />
              ))}
            </div>

            {/* Secondary Numbers */}
            {game.secondaryNumbers && (secondaryNumber !== null || secondaryText) && (
              <div className="mt-12">
                <h3 className="text-xl md:text-2xl font-bold text-center text-white mb-6">
                  {game.secondaryNumbers.label}:
                </h3>
                <div className="flex justify-center">
                  {game.id === "mais-milionaria" ? (
                    // Display two clovers for Mais Milionária
                    <div className="flex gap-4">
                      {secondaryText.split(", ").map((trevo, index) => (
                        <NumberBall
                          key={index}
                          number={parseInt(trevo)}
                          delay={primaryNumbers.length * 400 + index * 400}
                          isRevealed={true}
                          gradient="bg-gradient-to-br from-green-400 to-green-600"
                          isSecondary={true}
                          label={`Trevo ${index + 1}`}
                        />
                      ))}
                    </div>
                  ) : game.id === "timemania" || game.id === "dia-de-sorte" ? (
                    // Display text for Timemania and Dia de Sorte
                    <div className={`
                      px-8 py-6 rounded-2xl ${game.gradient}
                      shadow-2xl border-4 border-white/20
                      animate-reveal
                    `}
                    style={{ animationDelay: `${primaryNumbers.length * 400}ms` }}>
                      <p className="text-2xl md:text-3xl font-bold text-white text-center">
                        {formatSecondaryDisplay()}
                      </p>
                    </div>
                  ) : (
                    <NumberBall
                      number={secondaryNumber!}
                      delay={primaryNumbers.length * 400}
                      isRevealed={true}
                      gradient={game.gradient}
                      isSecondary={true}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <button
                onClick={generateNumbers}
                disabled={isGenerating}
                className={`
                  px-8 py-4 rounded-xl font-bold text-lg
                  ${game.gradient}
                  text-white shadow-xl
                  hover:scale-105 active:scale-95
                  transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  border-2 border-white/20
                `}
              >
                🎲 Gerar novos números
              </button>
              <button
                onClick={() => {
                  const text = `${game.name}: ${primaryNumbers.join(", ")}${
                    secondaryText ? ` | ${game.secondaryNumbers?.label}: ${formatSecondaryDisplay()}` : ""
                  }`;
                  navigator.clipboard.writeText(text);
                  alert("Números copiados para a área de transferência!");
                }}
                className="px-8 py-4 rounded-xl font-bold text-lg bg-gray-800 hover:bg-gray-700 text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-gray-600"
              >
                📋 Copiar números
              </button>
            </div>
          </div>
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
