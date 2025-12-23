"use client";

import { useEffect, useState } from "react";
import { fetchLotteryData, formatCurrency, formatShortDate, LotteryAPIResponse } from "@/lib/lottery-api";
import { LotteryGame } from "@/app/types";

type NextDrawBannerProps = {
  game: LotteryGame;
};

export default function NextDrawBanner({ game }: NextDrawBannerProps) {
  const [data, setData] = useState<LotteryAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await fetchLotteryData(game.id);
      if (result) {
        setData(result);
      }
      setLoading(false);
    }
    loadData();
  }, [game.id]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className={`${game.gradient} rounded-2xl p-6 border-2 border-white/20 shadow-2xl animate-pulse`}>
          <div className="h-6 bg-white/20 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-white/30 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className={`${game.gradient} rounded-2xl p-6 md:p-8 border-2 border-white/20 shadow-2xl`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Next Draw Info */}
          <div className="flex-1">
            <p className="text-white/80 text-sm md:text-base mb-2">
              🎯 Próximo Sorteio • Concurso #{data.numeroConcursoProximo}
            </p>
            <p className="text-white text-lg md:text-xl font-semibold mb-1">
              📅 {formatShortDate(data.dataProximoConcurso)}
            </p>
          </div>

          {/* Right: Prize Amount */}
          <div className="bg-white/10 rounded-xl p-4 md:p-6 backdrop-blur-sm text-center md:text-right">
            <p className="text-white/80 text-xs md:text-sm mb-1">Prêmio Estimado</p>
            <p className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
              {formatCurrency(data.valorEstimadoProximoConcurso)}
            </p>
            {data.acumulado && data.valorAcumuladoProximoConcurso > 0 && (
              <p className="text-yellow-300 text-sm md:text-base font-semibold mt-2 flex items-center justify-center md:justify-end gap-2">
                <span className="text-xl">🔥</span>
                ACUMULOU!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
