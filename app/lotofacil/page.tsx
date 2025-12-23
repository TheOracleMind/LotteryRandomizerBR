import { Metadata } from "next";
import { lotteryGames } from "../types";
import LotteryGenerator from "@/components/LotteryGenerator";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Gerador de Números da Lotofácil - Fácil de Ganhar",
  description: "Gere números aleatórios para a Lotofácil. Sorteie 15 números de 1 a 25 e aumente suas chances!",
  keywords: "lotofácil, lotofacil, gerador lotofácil, números lotofácil, sorteio lotofácil, loteria",
};

export default function LotofacilPage() {
  const game = lotteryGames.find(g => g.id === "lotofacil")!;

  return (
    <>
      <LotteryGenerator game={game} />
      <LegalDisclaimer />
    </>
  );
}
