export type GameCategory =
  | 'bollywood'
  | 'action'
  | 'sports'
  | 'racing'
  | 'puzzle'
  | 'match-3'
  | 'quiz'
  | 'girls'
  | 'boys'
  | 'strategy'
  | 'horror'
  | 'simulation'
  | 'io-games'
  | 'rpg'
  | 'board'
  | 'educational'
  | 'two-player';

export type AgeRating = 'All Ages' | '7+' | '13+' | '16+' | '18+';

export interface Game {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  category: GameCategory;
  subCategories?: string[];
  rating: number; // 0 - 100
  playsCount: number;
  likesCount: number;
  ageRating: AgeRating;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  playUrl?: string; // External iframe/embed URL
  embedUrl?: string;
  miniGameType?: 'cinequiz' | 'rickshaw' | 'cricket' | 'dressup' | 'rangoli' | 'dholbeat' | 'wordle' | 'ludo' | 'generic';
  aspectRatio?: string; // e.g. '16:9' or '4:3'
  mobileSupported: boolean;
  description: string;
  instructions: string;
  controls: {
    keyboard?: string;
    mouse?: string;
    touch?: string;
  };
  tags: string[];
  releaseDate: string;
  developer: string;
}

export interface CategoryInfo {
  id: GameCategory;
  name: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  bannerColor: string;
  accentColor: string;
  featuredTags: string[];
}

export interface UserReview {
  id: string;
  gameId: string;
  userName: string;
  avatar: string;
  rating: number; // 1 - 5
  comment: string;
  createdAt: string;
  likes: number;
}

export type ViewMode = 
  | 'home' 
  | 'category' 
  | 'game' 
  | 'favorites' 
  | 'new' 
  | 'popular' 
  | 'trending' 
  | 'about' 
  | 'privacy' 
  | 'terms' 
  | 'contact';

export interface BreadcrumbItem {
  label: string;
  url: string;
}
