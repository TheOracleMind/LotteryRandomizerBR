import { Metadata } from "next";
import { lotteryGames } from "../types";
import LotteryGenerator from "@/components/LotteryGenerator";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Gerador de Números da Mega-Sena - Sorteie seus Números da Sorte",
  description: "Gere números aleatórios para a Mega-Sena com uma experiência emocionante. Sorteie 6 números de 1 a 60 e sinta a emoção de um sorteio ao vivo!",
  keywords: "mega-sena, mega sena, gerador mega-sena, números mega-sena, sorteio mega-sena, números da sorte, loteria",
  openGraph: {
    title: "Gerador de Números da Mega-Sena",
    description: "Sorteie seus números da Mega-Sena com emoção e suspense!",
  },
};

export default function MegaSenaPage() {
  const game = lotteryGames.find(g => g.id === "mega-sena")!;

  return (
    <>
      <LotteryGenerator game={game} />
      <LegalDisclaimer />
    </>
  );
}
