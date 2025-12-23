import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerador de Números da Loteria - Mega-Sena, Quina, Lotofácil e Mais",
  description: "Gere números aleatórios para Mega-Sena, Quina, Lotofácil, Lotomania, Dupla Sena, Timemania, Dia de Sorte, Super Sete e Mais Milionária. Experimente a emoção de sortear seus números da sorte!",
  keywords: "gerador de números, loteria, mega-sena, quina, lotofácil, lotomania, dupla sena, timemania, dia de sorte, super sete, mais milionária, números da sorte, sorteio",
  authors: [{ name: "Gerador Loteria" }],
  openGraph: {
    title: "Gerador de Números da Loteria",
    description: "Gere números aleatórios para todos os jogos da loteria brasileira",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
