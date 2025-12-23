import { MetadataRoute } from 'next';
import { lotteryGames } from './types';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gerador-loteria.vercel.app'; // Altere para seu domínio real

  const gamePages = lotteryGames.map((game) => ({
    url: `${baseUrl}/${game.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...gamePages,
  ];
}
