# Integração com API da Caixa

Este projeto utiliza a API oficial da Caixa Econômica Federal para buscar informações em tempo real sobre os jogos de loteria.

## Endpoints Utilizados

Base URL: `https://servicebus2.caixa.gov.br/portaldeloterias/api`

### Jogos Suportados

| Jogo | Endpoint | ID no Sistema |
|------|----------|---------------|
| Mega-Sena | `/megasena` | `mega-sena` |
| Quina | `/quina` | `quina` |
| Lotofácil | `/lotofacil` | `lotofacil` |
| Lotomania | `/lotomania` | `lotomania` |
| Dupla Sena | `/duplasena` | `dupla-sena` |
| Timemania | `/timemania` | `timemania` |
| Dia de Sorte | `/diadesorte` | `dia-de-sorte` |
| Super Sete | `/supersete` | `super-sete` |
| +Milionária | `/maismilionaria` | `mais-milionaria` |

## Dados Retornados

A API retorna as seguintes informações:

### Concurso Atual
- Número do concurso
- Data da apuração
- Números sorteados
- Local do sorteio

### Próximo Concurso
- Número do próximo concurso
- Data do próximo sorteio
- Valor estimado do prêmio
- Status de acumulação

### Premiação
- Descrição de cada faixa
- Número de ganhadores por faixa
- Valor do prêmio de cada faixa
- Total arrecadado

### Informações Especiais
- **Dupla Sena**: Números de dois sorteios
- **Timemania**: Time do Coração sorteado
- **Dia de Sorte**: Mês da Sorte sorteado
- **+Milionária**: Números principais + trevos

## Implementação

### Client-Side Only

As requisições são feitas **exclusivamente no navegador** (client-side) para:

1. **Evitar carga no servidor** - O Vercel não precisa processar as requisições
2. **Prevenir bloqueios de IP** - Cada usuário faz sua própria requisição
3. **Reduzir custos** - Sem processamento server-side
4. **Melhorar performance** - Dados carregados diretamente do navegador

### Exemplo de Uso

```typescript
import { fetchLotteryData } from '@/lib/lottery-api';

// Buscar dados da Mega-Sena
const data = await fetchLotteryData('mega-sena');

if (data) {
  console.log('Último concurso:', data.numero);
  console.log('Números sorteados:', data.listaDezenas);
  console.log('Próximo prêmio:', data.valorEstimadoProximoConcurso);
}
```

## Tratamento de Erros

O sistema inclui tratamento completo de erros:

- **Loading state**: Skeleton screen enquanto carrega
- **Error state**: Mensagem amigável em caso de falha
- **Cache**: `no-store` para sempre buscar dados frescos
- **Fallback**: Graceful degradation se API falhar

## Formatação de Dados

### Valores Monetários

```typescript
import { formatCurrency } from '@/lib/lottery-api';

formatCurrency(10000000); // "R$ 10.000.000,00"
```

### Datas

```typescript
import { formatShortDate, formatDate } from '@/lib/lottery-api';

formatShortDate("23/12/2024"); // "23/12/2024"
formatDate("23/12/2024");      // "23 de dezembro de 2024"
```

## Limitações

1. **CORS**: A API da Caixa deve permitir requisições cross-origin
2. **Rate Limiting**: Pode haver limites de requisições (não documentado)
3. **Disponibilidade**: API pode ficar offline durante manutenções
4. **Dados**: API retorna sempre o último concurso disponível

## Melhorias Futuras

- [ ] Cache local (localStorage) para reduzir requisições
- [ ] Service Worker para funcionar offline
- [ ] Polling automático para atualizar dados
- [ ] Histórico de concursos anteriores
- [ ] Estatísticas de números mais sorteados
- [ ] Gráficos de evolução de prêmios

## Links Úteis

- [Portal de Loterias da Caixa](https://loterias.caixa.gov.br/)
- API Base: `https://servicebus2.caixa.gov.br/portaldeloterias/api`

## Nota Legal

Esta é uma API pública não oficial. Não há garantias de disponibilidade ou estabilidade. Use por sua conta e risco.
