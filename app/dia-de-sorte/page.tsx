import { Metadata } from "next";
import { lotteryGames } from "../types";
import LotteryGenerator from "@/components/LotteryGenerator";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Gerador de Números do Dia de Sorte - Escolha Seu Mês da Sorte",
  description: "Gere números aleatórios para o Dia de Sorte. Sorteie 7 números de 1 a 31 e escolha seu mês da sorte!",
  keywords: "dia de sorte, gerador dia de sorte, números dia de sorte, sorteio dia de sorte, mês da sorte, loteria",
};

export default function DiaDeSortePage() {
  const game = lotteryGames.find(g => g.id === "dia-de-sorte")!;

  return (
    <>
      <LotteryGenerator game={game} />
      <LegalDisclaimer />
    </>
  );
}
