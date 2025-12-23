# Guia de Deploy no Vercel

## Passos para Deploy

### 1. Preparar o Repositório

```bash
# Inicializar git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit: Gerador de Números da Loteria"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/seu-usuario/gerador-loteria.git
git branch -M main
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "Add New Project"
4. Importe o repositório `gerador-loteria`
5. Configure o projeto:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (já configurado automaticamente)
   - **Output Directory**: `.next` (já configurado automaticamente)
6. Clique em "Deploy"

### 3. Configurar Domínio Personalizado (Opcional)

1. Na dashboard do Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Siga as instruções para configurar o DNS

### 4. Atualizar URLs no Código

Após o deploy, atualize as URLs nos seguintes arquivos:

- `app/sitemap.ts` - linha com `baseUrl`
- `app/robots.ts` - linha com `sitemap`

Substitua `https://gerador-loteria.vercel.app` pelo seu domínio real do Vercel.

### 5. Verificar SEO

Após o deploy, verifique:

- Google Search Console - adicione seu site
- Bing Webmaster Tools - adicione seu site
- Sitemap acessível em: `seu-dominio.com/sitemap.xml`
- Robots.txt acessível em: `seu-dominio.com/robots.txt`

## Atualizações Futuras

Sempre que fizer alterações:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

O Vercel automaticamente fará o redeploy.

## Variáveis de Ambiente

Não há variáveis de ambiente obrigatórias para este projeto. Tudo funciona out-of-the-box!

## Performance

O site é totalmente estático (SSG - Static Site Generation), então:
- Carregamento extremamente rápido
- Perfeito para SEO
- Sem custos de servidor
- 100% gratuito no Vercel

## Suporte

Se tiver problemas:
- Verifique os logs de build no Vercel
- Certifique-se de que `npm run build` funciona localmente
- Verifique se todas as dependências estão no `package.json`
