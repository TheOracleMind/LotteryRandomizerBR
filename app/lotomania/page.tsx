import { Metadata } from "next";
import { lotteryGames } from "../types";
import LotteryGenerator from "@/components/LotteryGenerator";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Gerador de Números da Lotomania - 50 Números da Sorte",
  description: "Gere números aleatórios para a Lotomania. Sorteie 50 números de 1 a 100 e teste sua sorte!",
  keywords: "lotomania, gerador lotomania, números lotomania, sorteio lotomania, loteria",
};

export default function LotomaniaPage() {
  const game = lotteryGames.find(g => g.id === "lotomania")!;

  return (
    <>
      <LotteryGenerator game={game} />
      <LegalDisclaimer />
    </>
  );
}
