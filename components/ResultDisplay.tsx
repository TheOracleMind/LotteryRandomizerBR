"use client";

import { useState, useEffect } from "react";
import { LotteryGame } from "@/app/types";
import NumberBall from "./NumberBall";

type ResultDisplayProps = {
  game: LotteryGame;
  primaryNumbers: number[];
  secondaryNumber: number | null;
  secondaryText: string;
  onGenerateNew: () => void;
  onCopy: () => void;
};

export default function ResultDisplay({
  game,
  primaryNumbers,
  secondaryNumber,
  secondaryText,
  onGenerateNew,
  onCopy
}: ResultDisplayProps) {
  const [gameId, setGameId] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [saved, setSaved] = useState(false);

  // Generate unique ID for this game
  useEffect(() => {
    const id = `${game.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    setGameId(id);

    // Show confetti after all numbers are revealed
    const timer = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, primaryNumbers.length * 400 + 1000);

    return () => clearTimeout(timer);
  }, [primaryNumbers, game.id]);

  const formatSecondaryDisplay = () => {
    if (game.id === "timemania" || game.id === "dia-de-sorte") {
      return secondaryText;
    }
    if (game.id === "mais-milionaria") {
      return secondaryText;
    }
    return secondaryNumber?.toString().padStart(2, '0');
  };

  const handleSave = () => {
    const gameData = {
      id: gameId,
      game: game.name,
      numbers: primaryNumbers,
      secondary: secondaryText || secondaryNumber,
      date: new Date().toISOString()
    };

    const saved = JSON.parse(localStorage.getItem('savedGames') || '[]');
    saved.unshift(gameData);
    localStorage.setItem('savedGames', JSON.stringify(saved.slice(0, 10))); // Keep last 10

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mt-16 mb-12 relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                backgroundColor: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* DRAMATIC Title */}
      <div className="text-center mb-12">
        <div className="inline-block">
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 mb-4 animate-pulse">
            SEUS NÚMEROS DA SORTE
          </h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        </div>
      </div>

      {/* Game ID - Unique Identity */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-400 mb-1">ID do Jogo</p>
        <p className="text-2xl md:text-3xl font-mono font-bold text-yellow-400 tracking-wider">
          {gameId}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Este é o seu jogo único • Guarde este código
        </p>
      </div>

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

      {/* POST-RESULTADO - O MAIS IMPORTANTE */}
      <div className="mt-16 max-w-2xl mx-auto">
        {/* Primary Actions - GRANDES E CLARAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={handleSave}
            className="group relative px-6 py-6 bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 rounded-2xl font-bold text-lg text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-green-400/30"
          >
            <span className="text-3xl block mb-2">{saved ? '✓' : '💾'}</span>
            {saved ? 'Salvo!' : 'Salvar Jogo'}
            <span className="block text-xs font-normal mt-1 text-green-100">
              Histórico local
            </span>
          </button>

          <button
            onClick={onCopy}
            className="group relative px-6 py-6 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-2xl font-bold text-lg text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-blue-400/30"
          >
            <span className="text-3xl block mb-2">📋</span>
            Copiar
            <span className="block text-xs font-normal mt-1 text-blue-100">
              Para área de transferência
            </span>
          </button>

          <button
            onClick={onGenerateNew}
            className={`group relative px-6 py-6 ${game.gradient} rounded-2xl font-bold text-lg text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/30`}
          >
            <span className="text-3xl block mb-2">🎲</span>
            Novo Jogo
            <span className="block text-xs font-normal mt-1 text-white/90">
              Puxar alavanca novamente
            </span>
          </button>
        </div>

        {/* Context Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span>🎯</span>
              Próximos Passos
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">→</span>
                <span>Copie ou salve seus números</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">→</span>
                <span>Aposte em uma lotérica autorizada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">→</span>
                <span>Guarde seu ID para consultas futuras</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span>✨</span>
              Sobre Este Jogo
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-400">Jogo:</span>
                <span className="font-semibold">{game.name}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Gerado em:</span>
                <span className="font-semibold">{new Date().toLocaleDateString('pt-BR')}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Números:</span>
                <span className="font-semibold">{primaryNumbers.length}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
