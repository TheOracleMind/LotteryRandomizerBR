// Types for API response
export type LotteryAPIResponse = {
  acumulado: boolean;
  dataApuracao: string;
  dataProximoConcurso: string;
  dezenas?: string[];
  dezenasOrdemSorteio?: string[];
  exibirDetalhamentoPorCidade: boolean;
  id: number | null;
  indicadorConcursoEspecial: number;
  listaDezenas?: string[];
  listaDezenasSegundoSorteio?: string[];
  listaMunicipioUFGanhadores: unknown[];
  listaRateioPremio: {
    descricaoFaixa: string;
    faixa: number;
    numeroDeGanhadores: number;
    valorPremio: number;
  }[];
  listaResultadoEquipeEsportiva?: {
    nomeTimeCoracaoMesSorte: string;
    posicao: number;
  }[];
  localSorteio: string;
  nomeMunicipioUFSorteio: string;
  nomeTimeCoracaoMesSorte?: string;
  numero: number;
  numeroConcursoAnterior: number;
  numeroConcursoFinal5: number;
  numeroConcursoProximo: number;
  numeroJogo: number;
  observacao: string;
  premiacaoContingencia: string | null;
  tipoJogo: string;
  tipoPublicacao: number;
  ultimoConcurso: boolean;
  valorArrecadado: number;
  valorAcumuladoConcurso5: number;
  valorAcumuladoConcursoEspecial: number;
  valorAcumuladoProximoConcurso: number;
  valorEstimadoProximoConcurso: number;
  valorSaldoReservaGarantidora: number;
  valorTotalPremioFaixaUm: number;
};

const API_BASE_URL = 'https://servicebus2.caixa.gov.br/portaldeloterias/api';

// Map game IDs to API endpoints
const API_ENDPOINTS: Record<string, string> = {
  'mega-sena': '/megasena',
  'quina': '/quina',
  'lotofacil': '/lotofacil',
  'lotomania': '/lotomania',
  'dupla-sena': '/duplasena',
  'timemania': '/timemania',
  'dia-de-sorte': '/diadesorte',
  'super-sete': '/supersete',
  'mais-milionaria': '/maismilionaria',
};

export async function fetchLotteryData(gameId: string): Promise<LotteryAPIResponse | null> {
  const endpoint = API_ENDPOINTS[gameId];

  if (!endpoint) {
    console.error(`No API endpoint found for game: ${gameId}`);
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store', // Always get fresh data
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: LotteryAPIResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching lottery data for ${gameId}:`, error);
    return null;
  }
}

// Format currency in BRL
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

// Format date
export function formatDate(dateString: string): string {
  const [day, month, year] = dateString.split('/');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

// Format short date
export function formatShortDate(dateString: string): string {
  return dateString; // Already in DD/MM/YYYY format
}
