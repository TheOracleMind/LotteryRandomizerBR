import { Metadata } from "next";
import { lotteryGames } from "../types";
import LotteryGenerator from "@/components/LotteryGenerator";
import LegalDisclaimer from "@/components/LegalDisclaimer";

export const metadata: Metadata = {
  title: "Gerador de Números da Dupla Sena - Duas Chances de Ganhar",
  description: "Gere números aleatórios para a Dupla Sena. Sorteie 6 números de 1 a 50 e concorra em dois sorteios!",
  keywords: "dupla sena, dupla-sena, gerador dupla sena, números dupla sena, sorteio dupla sena, loteria",
};

export default function DuplaSenaPage() {
  const game = lotteryGames.find(g => g.id === "dupla-sena")!;

  return (
    <>
      <LotteryGenerator game={game} />
      <LegalDisclaimer />
    </>
  );
}
