import { Metadata } from "next";
import { lotteryGames } from "../types";
import LotteryGenerator from "@/components/LotteryGenerator";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Gerador de Números da +Milionária - Números e Trevos da Sorte",
  description: "Gere números aleatórios para a +Milionária. Sorteie 6 números de 1 a 50 e 2 trevos de 1 a 6!",
  keywords: "mais milionária, +milionária, gerador mais milionária, números mais milionária, trevos, sorteio, loteria",
};

export default function MaisMilionariaPage() {
  const game = lotteryGames.find(g => g.id === "mais-milionaria")!;

  return (
    <>
      <LotteryGenerator game={game} />
      <LegalDisclaimer />
    </>
  );
}
