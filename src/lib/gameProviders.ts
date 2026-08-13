import { Game, GameCategory } from '../types';

/**
 * Normalizes games from external distributor feeds (GameDistribution, CrazyGames, Poki, etc.)
 * into BollywoodGame's standardized internal Game data model.
 */

export interface ExternalFeedItem {
  id?: string | number;
  title?: string;
  name?: string;
  thumbnail?: string;
  thumb?: string;
  image?: string;
  url?: string;
  embed_url?: string;
  game_url?: string;
  category?: string;
  genre?: string;
  rating?: number;
  score?: number;
  description?: string;
  instructions?: string;
  tags?: string[] | string;
  age_rating?: string;
  mobile?: boolean;
  mobile_ready?: boolean;
}

export function normalizeCategory(rawCategory: string = ''): GameCategory {
  const cat = rawCategory.toLowerCase().trim();
  if (cat.includes('bollywood') || cat.includes('desi') || cat.includes('hindi')) return 'bollywood';
  if (cat.includes('cricket') || cat.includes('sport') || cat.includes('football')) return 'sports';
  if (cat.includes('race') || cat.includes('car') || cat.includes('drive') || cat.includes('moto')) return 'racing';
  if (cat.includes('match') || cat.includes('gem') || cat.includes('candy') || cat.includes('bubble')) return 'match-3';
  if (cat.includes('quiz') || cat.includes('trivia') || cat.includes('word')) return 'quiz';
  if (cat.includes('puzzle') || cat.includes('logic') || cat.includes('brain')) return 'puzzle';
  if (cat.includes('action') || cat.includes('shoot') || cat.includes('fight')) return 'action';
  if (cat.includes('horror') || cat.includes('scary') || cat.includes('zombie')) return 'horror';
  if (cat.includes('simulat') || cat.includes('cook') || cat.includes('tycoon')) return 'simulation';
  if (cat.includes('dress') || cat.includes('makeup') || cat.includes('fashion') || cat.includes('girl')) return 'girls';
  if (cat.includes('boy') || cat.includes('ninja') || cat.includes('warrior')) return 'boys';
  if (cat.includes('strat') || cat.includes('tower') || cat.includes('defense')) return 'strategy';
  if (cat.includes('io') || cat.includes('multiplayer')) return 'io-games';
  if (cat.includes('rpg') || cat.includes('quest') || cat.includes('adventure')) return 'rpg';
  if (cat.includes('board') || cat.includes('ludo') || cat.includes('chess') || cat.includes('card')) return 'board';
  if (cat.includes('educat') || cat.includes('learn') || cat.includes('math')) return 'educational';
  if (cat.includes('2 player') || cat.includes('two player') || cat.includes('coop')) return 'two-player';
  return 'action';
}

export function normalizeFeedGame(item: ExternalFeedItem, providerName: string = 'GameDistribution'): Game {
  const title = item.title || item.name || 'Untitled Game';
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = `${providerName.toLowerCase()}-${item.id || slug}`;
  const rawRating = item.rating || item.score || 85;
  const rating = rawRating > 5 ? Math.min(100, Math.round(rawRating)) : Math.round(rawRating * 20);

  return {
    id,
    slug,
    title,
    thumbnail: item.thumbnail || item.thumb || item.image || '',
    category: normalizeCategory(item.category || item.genre),
    rating,
    playsCount: Math.floor(Math.random() * 50000) + 1200,
    likesCount: Math.floor(Math.random() * 4000) + 150,
    ageRating: (item.age_rating as any) || 'All Ages',
    isNew: false,
    isTrending: false,
    playUrl: item.url || item.embed_url || item.game_url || '',
    mobileSupported: item.mobile ?? item.mobile_ready ?? true,
    description: item.description || `Play ${title} online for free. No download needed!`,
    instructions: item.instructions || 'Use mouse, touch or keyboard controls to play.',
    controls: {
      mouse: 'Left Click to interact and select',
      touch: 'Tap and swipe on mobile screens',
      keyboard: 'Arrow keys / WASD to move, Space to action'
    },
    tags: Array.isArray(item.tags) ? item.tags : (typeof item.tags === 'string' ? item.tags.split(',') : [normalizeCategory(item.category)]),
    releaseDate: '2026-01-15',
    developer: providerName
  };
}

/**
 * Analytics tracking hooks for plays
 */
export function trackGameStart(gameId: string, gameTitle: string) {
  try {
    const playHistory = JSON.parse(localStorage.getItem('bollywood_played_games') || '[]');
    if (!playHistory.includes(gameId)) {
      playHistory.unshift(gameId);
      localStorage.setItem('bollywood_played_games', JSON.stringify(playHistory.slice(0, 50)));
    }
    // Update played count
    const stats = JSON.parse(localStorage.getItem('bollywood_user_stats') || '{"plays": 0, "coins": 150}');
    stats.plays = (stats.plays || 0) + 1;
    stats.coins = (stats.coins || 150) + 10; // Earn 10 coins per game session
    localStorage.setItem('bollywood_user_stats', JSON.stringify(stats));
  } catch (e) {
    // ignore in case of quota limits
  }
}
