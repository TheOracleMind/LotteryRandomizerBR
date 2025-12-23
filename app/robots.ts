import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://gerador-loteria.vercel.app/sitemap.xml', // Altere para seu domínio real
  };
}
