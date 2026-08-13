import React from 'react';
import { Game } from '../types';
import { GameCard } from './GameCard';
import { Sparkles, Flame, Trophy, ChevronDown, Gamepad2 } from 'lucide-react';

interface GameGridProps {
  title?: string;
  subtitle?: string;
  icon?: 'recommended' | 'trending' | 'new' | 'bollywood';
  games: Game[];
  onSelectGame: (game: Game) => void;
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, game: Game) => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export const GameGrid: React.FC<GameGridProps> = ({
  title,
  subtitle,
  icon = 'recommended',
  games,
  onSelectGame,
  favorites,
  onToggleFavorite,
  isLoadingMore = false,
  hasMore = false,
  onLoadMore,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'bollywood':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#FFB800] p-0.5 flex items-center justify-center text-black shadow-md">
            <Sparkles className="w-4 h-4 fill-black" />
          </div>
        );
      case 'trending':
        return (
          <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
            <Flame className="w-4 h-4 fill-red-500" />
          </div>
        );
      case 'new':
        return (
          <div className="w-8 h-8 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 fill-green-400" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-[#2a2a2a] text-[#FFB800] border border-gray-700 flex items-center justify-center">
            <Trophy className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <section className="w-full mb-8">
      {/* Section Header */}
      {title && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {renderIcon()}
            <div>
              <h2 className="text-lg sm:text-xl font-display font-black text-white tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="text-xs text-gray-400 font-bold bg-[#222222] px-3.5 py-1 rounded-full border border-gray-800 hidden sm:block">
            {games.length} Games
          </div>
        </div>
      )}

      {/* Responsive Grid */}
      {games.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onSelect={onSelectGame}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}

          {/* Skeleton Loaders during load more */}
          {isLoadingMore && (
            <>
              {[1, 2, 3, 4, 5, 6].map((sk) => (
                <div key={sk} className="animate-pulse flex flex-col gap-2 rounded-2xl bg-[#222222] border border-gray-800 p-3">
                  <div className="aspect-video w-full rounded-xl bg-gray-800" />
                  <div className="h-3.5 bg-gray-800 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-800/60 rounded w-1/2" />
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="w-full py-16 px-4 bg-[#1a1a1a] rounded-2xl border border-gray-800 text-center flex flex-col items-center justify-center">
          <Gamepad2 className="w-12 h-12 text-gray-600 mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Games Found</h3>
          <p className="text-xs text-gray-400 max-w-sm">
            We couldn't find any games matching this filter. Try browsing Bollywood Specials or other genres.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2.5 bg-[#222222] hover:bg-[#2a2a2a] text-white font-bold text-sm rounded-full border border-gray-700 transition-all flex items-center gap-2 hover:border-[#FFB800]/50 shadow-md cursor-pointer disabled:opacity-50"
          >
            <span>{isLoadingMore ? 'Loading More Games...' : 'Load More Games'}</span>
            <ChevronDown className={`w-4 h-4 text-[#FFB800] ${isLoadingMore ? 'animate-spin' : ''}`} />
          </button>
        </div>
      )}
    </section>
  );
};
