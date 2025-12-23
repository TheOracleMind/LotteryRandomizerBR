export type LotteryGame = {
  id: string;
  name: string;
  description: string;
  primaryNumbers: {
    count: number;
    max: number;
    label: string;
  };
  secondaryNumbers?: {
    count: number;
    max: number;
    label: string;
    options?: string[];
  };
  color: string;
  gradient: string;
};

export const lotteryGames: LotteryGame[] = [
  {
    id: "mega-sena",
    name: "Mega-Sena",
    description: "O maior prêmio do Brasil",
    primaryNumbers: {
      count: 6,
      max: 60,
      label: "números"
    },
    color: "from-green-600 to-green-800",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-700"
  },
  {
    id: "quina",
    name: "Quina",
    description: "Sorteios todos os dias",
    primaryNumbers: {
      count: 5,
      max: 80,
      label: "números"
    },
    color: "from-blue-600 to-blue-800",
    gradient: "bg-gradient-to-br from-blue-500 to-blue-700"
  },
  {
    id: "lotofacil",
    name: "Lotofácil",
    description: "Fácil de ganhar",
    primaryNumbers: {
      count: 15,
      max: 25,
      label: "números"
    },
    color: "from-purple-600 to-purple-800",
    gradient: "bg-gradient-to-br from-purple-500 to-purple-700"
  },
  {
    id: "lotomania",
    name: "Lotomania",
    description: "50 chances de ganhar",
    primaryNumbers: {
      count: 50,
      max: 100,
      label: "números"
    },
    color: "from-orange-600 to-orange-800",
    gradient: "bg-gradient-to-br from-orange-500 to-orange-700"
  },
  {
    id: "dupla-sena",
    name: "Dupla Sena",
    description: "Dois sorteios, mais chances",
    primaryNumbers: {
      count: 6,
      max: 50,
      label: "números"
    },
    color: "from-red-600 to-red-800",
    gradient: "bg-gradient-to-br from-red-500 to-red-700"
  },
  {
    id: "timemania",
    name: "Timemania",
    description: "Para os amantes do futebol",
    primaryNumbers: {
      count: 10,
      max: 80,
      label: "números"
    },
    secondaryNumbers: {
      count: 1,
      max: 80,
      label: "Time do Coração",
      options: [
        "ABC/RN", "Altos/PI", "Americana/SP", "América/MG", "América/RN", "Athletico/PR",
        "Atlético/GO", "Atlético/MG", "Avaí/SC", "Bahia/BA", "Bangu/RJ", "Botafogo/PB",
        "Botafogo/RJ", "Botafogo/SP", "Brasiliense/DF", "Ceará/CE", "Chapecoense/SC",
        "Corinthians/SP", "Coritiba/PR", "CRB/AL", "Criciúma/SC", "Cruzeiro/MG",
        "CSA/AL", "Cuiabá/MT", "Figueirense/SC", "Flamengo/RJ", "Fluminense/RJ",
        "Fortaleza/CE", "Goiás/GO", "Grêmio/RS", "Guarani/SP", "Internacional/RS",
        "Ituano/SP", "Joinville/SC", "Juventude/RS", "Londrina/PR", "Mirassol/SP",
        "Náutico/PE", "Novorizontino/SP", "Operário/PR", "Palmeiras/SP", "Paysandu/PA",
        "Ponte Preta/SP", "Portuguesa/SP", "Remo/PA", "River/PI", "Santa Cruz/PE",
        "Santo André/SP", "Santos/SP", "São Bento/SP", "São Paulo/SP", "São Caetano/SP",
        "Sampaio Corrêa/MA", "Sampaio Corrêa/RJ", "Serra/ES", "Sport/PE", "Tombense/MG",
        "Tuna Luso/PA", "Vila Nova/GO", "Vasco/RJ", "Vitória/BA", "Volta Redonda/RJ"
      ]
    },
    color: "from-lime-600 to-lime-800",
    gradient: "bg-gradient-to-br from-lime-500 to-lime-700"
  },
  {
    id: "dia-de-sorte",
    name: "Dia de Sorte",
    description: "Escolha seu mês da sorte",
    primaryNumbers: {
      count: 7,
      max: 31,
      label: "números"
    },
    secondaryNumbers: {
      count: 1,
      max: 12,
      label: "Mês da Sorte",
      options: [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ]
    },
    color: "from-amber-600 to-amber-800",
    gradient: "bg-gradient-to-br from-amber-500 to-amber-700"
  },
  {
    id: "super-sete",
    name: "Super Sete",
    description: "7 colunas de números",
    primaryNumbers: {
      count: 7,
      max: 10,
      label: "colunas (0-9)"
    },
    color: "from-pink-600 to-pink-800",
    gradient: "bg-gradient-to-br from-pink-500 to-pink-700"
  },
  {
    id: "mais-milionaria",
    name: "+Milionária",
    description: "Números e trevos da sorte",
    primaryNumbers: {
      count: 6,
      max: 50,
      label: "números"
    },
    secondaryNumbers: {
      count: 2,
      max: 6,
      label: "trevos"
    },
    color: "from-teal-600 to-teal-800",
    gradient: "bg-gradient-to-br from-teal-500 to-teal-700"
  }
];
