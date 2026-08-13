import React from 'react';
import { Play, Flame, Sparkles, Heart } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent, game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelect,
  isFavorite = false,
  onToggleFavorite,
}) => {
  // Metacritic-style rating color (green > 85, yellow 70-85, red < 70)
  const getRatingColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500 text-black shadow-emerald-500/30';
    if (score >= 80) return 'bg-lime-400 text-black shadow-lime-400/30';
    if (score >= 70) return 'bg-amber-400 text-black shadow-amber-400/30';
    return 'bg-rose-500 text-white shadow-rose-500/30';
  };

  return (
    <div
      id={`game-card-${game.slug}`}
      onClick={() => onSelect(game)}
      className="group relative flex flex-col cursor-pointer select-none rounded-2xl bg-[#222222] border border-gray-800 hover:border-[#FFB800]/60 p-2.5 sm:p-3 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none shadow-md"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(game);
        }
      }}
    >
      {/* 16:9 Thumbnail Box */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#333333] border border-gray-800/80 shadow-sm transition-all duration-300">
        
        {/* Lazy-loaded Thumbnail Image */}
        <img
          src={game.thumbnail}
          alt={`${game.title} — free browser game screenshot`}
          loading="lazy"
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Vignette Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#FFB800] text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
            <Play className="w-5 h-5 fill-black ml-0.5" />
          </div>
        </div>

        {/* Top-Left: New or Trending Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
          {game.isNew && (
            <span className="px-2 py-0.5 rounded-md bg-green-500 text-white text-[9px] font-black uppercase tracking-wider shadow-md flex items-center gap-0.5">
              <Sparkles className="w-3 h-3 fill-white" />
              <span>NEW</span>
            </span>
          )}
          {game.isTrending && (
            <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-black uppercase tracking-wider shadow-md flex items-center gap-0.5">
              <Flame className="w-3 h-3 fill-white" />
              <span>HOT</span>
            </span>
          )}
        </div>

        {/* Top-Right: Age Rating Badge & Favorite Heart */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
          {game.ageRating && game.ageRating !== 'All Ages' && (
            <span className="px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-gray-300 border border-gray-700 text-[9px] font-bold">
              {game.ageRating}
            </span>
          )}
          
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(e, game);
              }}
              className={`p-1.5 rounded-full backdrop-blur-sm transition-transform active:scale-90 cursor-pointer ${
                isFavorite 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-black/50 text-white/70 hover:text-white hover:bg-black/80'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          )}
        </div>

        {/* Bottom-Left: Metacritic Numeric Rating Badge (0 - 100) */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black shadow-md ${getRatingColor(game.rating)}`}>
            {game.rating}%
          </span>
        </div>

        {/* Bottom-Right: Mobile-ready indicator */}
        {game.mobileSupported && (
          <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[9px] font-bold text-gray-300">
              📱 Mobile
            </span>
          </div>
        )}
      </div>

      {/* Title & Metadata Info */}
      <div className="mt-2.5 flex flex-col">
        <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#FFB800] transition-colors truncate">
          {game.title}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1 pt-1.5 border-t border-gray-800/80">
          <span className="capitalize truncate">{game.category.replace('-', ' ')}</span>
          <span className="text-[10px] text-gray-400 font-medium">{(game.playsCount / 1000).toFixed(0)}k plays</span>
        </div>
      </div>
    </div>
  );
};
