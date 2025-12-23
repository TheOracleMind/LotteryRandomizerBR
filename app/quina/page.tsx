import { Metadata } from "next";
import { lotteryGames } from "../types";
import LotteryGenerator from "@/components/LotteryGenerator";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Gerador de Números da Quina - Sorteios Todos os Dias",
  description: "Gere números aleatórios para a Quina. Sorteie 5 números de 1 a 80 e participe dos sorteios diários!",
  keywords: "quina, gerador quina, números quina, sorteio quina, loteria",
};

export default function QuinaPage() {
  const game = lotteryGames.find(g => g.id === "quina")!;

  return (
    <>
      <LotteryGenerator game={game} />
      <LegalDisclaimer />
    </>
  );
}
