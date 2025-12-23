# Estrutura do Projeto

```
GeradorDeNumerosDaLoteria/
├── app/                          # Next.js App Router
│   ├── dia-de-sorte/            # Página do Dia de Sorte
│   │   └── page.tsx
│   ├── dupla-sena/              # Página da Dupla Sena
│   │   └── page.tsx
│   ├── lotofacil/               # Página da Lotofácil
│   │   └── page.tsx
│   ├── lotomania/               # Página da Lotomania
│   │   └── page.tsx
│   ├── mais-milionaria/         # Página da +Milionária
│   │   └── page.tsx
│   ├── mega-sena/               # Página da Mega-Sena
│   │   └── page.tsx
│   ├── quina/                   # Página da Quina
│   │   └── page.tsx
│   ├── super-sete/              # Página do Super Sete
│   │   └── page.tsx
│   ├── timemania/               # Página da Timemania
│   │   └── page.tsx
│   ├── globals.css              # Estilos globais e animações
│   ├── layout.tsx               # Layout principal com metadata
│   ├── page.tsx                 # Página inicial (lista de jogos)
│   ├── types.ts                 # Tipos TypeScript e dados dos jogos
│   ├── robots.ts                # Gerador de robots.txt
│   └── sitemap.ts               # Gerador de sitemap.xml
│
├── components/                   # Componentes React reutilizáveis
│   ├── LegalDisclaimer.tsx      # Aviso legal
│   ├── LotteryGenerator.tsx     # Componente principal do gerador
│   ├── NumberBall.tsx           # Componente de bolinha numerada
│   └── SlotMachine.tsx          # Componente da alavanca
│
├── public/                       # Arquivos estáticos
│   └── manifest.json            # PWA manifest
│
├── .gitignore                   # Arquivos ignorados pelo Git
├── CLAUDE.md                    # Instruções do projeto
├── DEPLOY.md                    # Guia de deploy
├── FEATURES.md                  # Funcionalidades e roadmap
├── next.config.ts               # Configuração do Next.js
├── package.json                 # Dependências do projeto
├── postcss.config.mjs           # Configuração do PostCSS
├── README.md                    # Documentação principal
├── STRUCTURE.md                 # Este arquivo
├── tailwind.config.ts           # Configuração do Tailwind CSS
└── tsconfig.json                # Configuração do TypeScript
```

## Componentes Principais

### `LotteryGenerator.tsx`
Componente genérico que gera números para qualquer jogo. Recebe um objeto `game` e:
- Gera números aleatórios baseado nas regras do jogo
- Controla animações e timing
- Exibe números primários e secundários
- Oferece botões de copiar e gerar novamente

### `NumberBall.tsx`
Bolinha numerada animada com:
- Tamanho configurável
- Gradiente de cor por jogo
- Animação de revelação
- Efeito de brilho
- Suporte a labels

### `SlotMachine.tsx`
Alavanca interativa que:
- Anima ao ser puxada
- Desabilita durante geração
- Fornece feedback visual
- Inclui instruções

### `LegalDisclaimer.tsx`
Aviso legal que protege juridicamente o site.

## Rotas

Todas as rotas são estáticas (SSG):

- `/` - Página inicial com grade de jogos
- `/mega-sena` - Gerador da Mega-Sena
- `/quina` - Gerador da Quina
- `/lotofacil` - Gerador da Lotofácil
- `/lotomania` - Gerador da Lotomania
- `/dupla-sena` - Gerador da Dupla Sena
- `/timemania` - Gerador da Timemania
- `/dia-de-sorte` - Gerador do Dia de Sorte
- `/super-sete` - Gerador do Super Sete
- `/mais-milionaria` - Gerador da +Milionária
- `/sitemap.xml` - Sitemap XML
- `/robots.txt` - Robots.txt

## Dados dos Jogos

Todos os jogos estão definidos em `app/types.ts` no array `lotteryGames`. Cada jogo tem:

```typescript
{
  id: string;              // slug para URL
  name: string;            // nome exibido
  description: string;     // descrição curta
  primaryNumbers: {        // números principais
    count: number;         // quantos sortear
    max: number;           // máximo valor
    label: string;         // "números", "colunas", etc
  };
  secondaryNumbers?: {     // números/opções extras (opcional)
    count: number;
    max: number;
    label: string;
    options?: string[];    // para Timemania e Dia de Sorte
  };
  color: string;           // gradiente Tailwind
  gradient: string;        // gradiente de fundo
}
```

## Fluxo de Geração

1. Usuário clica na alavanca
2. `SlotMachine` chama `onGenerate()`
3. `LotteryGenerator` inicia estado `isGenerating`
4. Números são gerados aleatoriamente
5. Números são salvos no state um a um
6. `NumberBall` aparece com animação sequencial
7. Após todos os números, opções secundárias aparecem
8. Estado volta para `!isGenerating`

## Animações CSS

Definidas em `globals.css`:

- `reveal` - Aparição com escala e rotação
- `shake` - Tremor horizontal
- `glow` - Brilho pulsante
- `spin-slow` - Rotação lenta
- `pulse-slow` - Pulsação lenta

## SEO

Cada página tem metadata otimizada:
- Title único
- Description relevante
- Keywords específicas
- Open Graph tags
- Canonical URLs
