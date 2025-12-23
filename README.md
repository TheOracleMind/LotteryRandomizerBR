# Gerador de Números da Loteria

Um site moderno e emocionante para gerar números aleatórios para todos os jogos da loteria brasileira.

## Jogos Disponíveis

- **Mega-Sena**: 6 números (1-60)
- **Quina**: 5 números (1-80)
- **Lotofácil**: 15 números (1-25)
- **Lotomania**: 50 números (1-100)
- **Dupla Sena**: 6 números (1-50)
- **Timemania**: 10 números (1-80) + Time do Coração
- **Dia de Sorte**: 7 números (1-31) + Mês da Sorte
- **Super Sete**: 7 colunas (0-9)
- **+Milionária**: 6 números (1-50) + 2 trevos (1-6)

## Recursos

### Gerador de Números
- Design minimalista e emocional
- Animações de suspense ao estilo caça-níquel
- Alavanca interativa para gerar números
- Bolinhas brancas girando antes de revelar números
- Efeitos visuais com rotação e brilho
- Totalmente responsivo (mobile-first)

### Informações em Tempo Real
- **Integração com API oficial da Caixa**
- Último resultado do sorteio com números sorteados
- Informações do próximo concurso
- Valor estimado do prêmio
- Status de acumulação
- Detalhes de premiação por faixa
- Número de ganhadores
- Data dos sorteios
- Todas as informações atualizadas automaticamente

### SEO e Performance
- Otimizado para SEO
- Metadata completa para cada jogo
- Sitemap XML automático
- Static Site Generation (SSG)
- Requests client-side para evitar bloqueios

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Deploy no Vercel

Este projeto foi criado para ser facilmente hospedado no Vercel:

1. Faça push do código para um repositório GitHub
2. Importe o projeto no Vercel
3. O deploy será feito automaticamente

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Server Components

## Aviso Legal

Este site gera números de forma totalmente aleatória. Os números gerados não possuem qualquer relação com resultados oficiais e não aumentam suas chances de ganhar. Use apenas como ferramenta de entretenimento.

## Licença

Livre para uso pessoal e comercial.
