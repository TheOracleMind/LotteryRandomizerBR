"use client";

import { useEffect, useState } from "react";
import { fetchLotteryData, formatCurrency, formatShortDate, LotteryAPIResponse } from "@/lib/lottery-api";
import { LotteryGame } from "@/app/types";

type LotteryInfoProps = {
  game: LotteryGame;
};

export default function LotteryInfo({ game }: LotteryInfoProps) {
  const [data, setData] = useState<LotteryAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(false);

      const result = await fetchLotteryData(game.id);

      if (result) {
        setData(result);
      } else {
        setError(true);
      }

      setLoading(false);
    }

    loadData();
  }, [game.id]);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="bg-red-900/20 rounded-2xl p-6 border border-red-800">
          <p className="text-red-300 text-center">
            Não foi possível carregar as informações do concurso no momento.
          </p>
        </div>
      </div>
    );
  }

  // Get the drawn numbers
  const drawnNumbers = data.listaDezenas || data.dezenas || [];
  const secondDrawNumbers = data.listaDezenasSegundoSorteio || [];

  return (
    <div className="w-full max-w-6xl mx-auto mb-12">
      {/* Last Draw Results */}
      <div className="bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          📊 Detalhes do Último Sorteio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Concurso</p>
            <p className="text-white text-2xl font-bold">#{data.numero}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Data do Sorteio</p>
            <p className="text-white text-lg">{formatShortDate(data.dataApuracao)}</p>
          </div>
        </div>

        {/* Drawn Numbers */}
        {drawnNumbers.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">Números Sorteados:</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {drawnNumbers.map((num, idx) => (
                <div
                  key={idx}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${game.gradient} flex items-center justify-center border-2 border-white/20 shadow-lg`}
                >
                  <span className="text-white font-bold text-lg">{num}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Second Draw (Dupla Sena) */}
        {secondDrawNumbers.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-3">Segundo Sorteio:</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {secondDrawNumbers.map((num, idx) => (
                <div
                  key={idx}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${game.gradient} flex items-center justify-center border-2 border-white/20 shadow-lg`}
                >
                  <span className="text-white font-bold text-lg">{num}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Time do Coração (Timemania) or Mês da Sorte (Dia de Sorte) */}
        {data.nomeTimeCoracaoMesSorte && (
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-2">
              {game.id === 'timemania' ? 'Time do Coração:' : 'Mês da Sorte:'}
            </p>
            <div className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 border-2 border-yellow-400/30">
              <p className="text-white font-bold text-lg">{data.nomeTimeCoracaoMesSorte}</p>
            </div>
          </div>
        )}

        {/* Prize Information */}
        <div className="bg-gray-800/50 rounded-xl p-4 md:p-6 mt-6">
          <h3 className="text-xl font-bold text-white mb-4">💰 Premiação</h3>

          {data.listaRateioPremio && data.listaRateioPremio.length > 0 ? (
            <div className="space-y-3">
              {data.listaRateioPremio.slice(0, 3).map((prize, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-gray-700 pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-white font-semibold">{prize.descricaoFaixa}</p>
                    <p className="text-gray-400 text-sm">
                      {prize.numeroDeGanhadores === 0
                        ? 'Nenhum ganhador'
                        : `${prize.numeroDeGanhadores} ${prize.numeroDeGanhadores === 1 ? 'ganhador' : 'ganhadores'}`
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{formatCurrency(prize.valorPremio)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Informações de premiação não disponíveis</p>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">Local</p>
            <p className="text-white text-sm font-semibold">{data.nomeMunicipioUFSorteio || 'São Paulo/SP'}</p>
          </div>

          {data.valorArrecadado > 0 && (
            <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
              <p className="text-gray-400 text-xs mb-1">Arrecadação</p>
              <p className="text-white text-sm font-semibold">{formatCurrency(data.valorArrecadado)}</p>
            </div>
          )}

          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">Concurso Anterior</p>
            <p className="text-white text-sm font-semibold">#{data.numeroConcursoAnterior}</p>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">Status</p>
            <p className="text-green-400 text-sm font-semibold">
              {data.ultimoConcurso ? '✓ Atualizado' : 'Em análise'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
