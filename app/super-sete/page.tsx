import { Metadata } from "next";
import { lotteryGames } from "../types";
import LotteryGenerator from "@/components/LotteryGenerator";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Gerador de Números do Super Sete - 7 Colunas de Sorte",
  description: "Gere números aleatórios para o Super Sete. Sorteie 7 números, um para cada coluna de 0 a 9!",
  keywords: "super sete, super-sete, gerador super sete, números super sete, sorteio super sete, loteria",
};

export default function SuperSetePage() {
  const game = lotteryGames.find(g => g.id === "super-sete")!;

  return (
    <>
      <LotteryGenerator game={game} />
      <LegalDisclaimer />
    </>
  );
}
