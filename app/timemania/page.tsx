import { Metadata } from "next";
import { lotteryGames } from "../types";
import LotteryGenerator from "@/components/LotteryGenerator";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Gerador de Números da Timemania - Para Amantes do Futebol",
  description: "Gere números aleatórios para a Timemania. Sorteie 10 números de 1 a 80 e escolha seu time do coração!",
  keywords: "timemania, gerador timemania, números timemania, sorteio timemania, time do coração, loteria",
};

export default function TimemaniaPage() {
  const game = lotteryGames.find(g => g.id === "timemania")!;

  return (
    <>
      <LotteryGenerator game={game} />
      <LegalDisclaimer />
    </>
  );
}
