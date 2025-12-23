import Link from "next/link";
import { lotteryGames } from "./types";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8 animate-pulse">
          <span className="text-6xl md:text-8xl">🍀</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
          Gerador de Números da Loteria
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
          Experimente a emoção de sortear seus números da sorte
        </p>
        <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
          Escolha seu jogo favorito e viva a experiência de um sorteio ao vivo
        </p>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {lotteryGames.map((game, index) => (
            <Link
              key={game.id}
              href={`/${game.id}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-gray-600"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 ${game.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {game.name}
                </h2>
                <p className="text-gray-300 mb-4 text-sm md:text-base">
                  {game.description}
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎱</span>
                    <span>
                      {game.primaryNumbers.count} {game.primaryNumbers.label} (1-{game.primaryNumbers.max})
                    </span>
                  </div>
                  {game.secondaryNumbers && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">✨</span>
                      <span>
                        + {game.secondaryNumbers.count} {game.secondaryNumbers.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="mt-6 flex items-center text-yellow-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Gerar números</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Legal Disclaimer */}
      <LegalDisclaimer />

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Gerador de Números da Loteria © {new Date().getFullYear()}</p>
        <p className="mt-2">Boa sorte! 🍀</p>
      </footer>
    </main>
  );
}
