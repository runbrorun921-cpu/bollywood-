import React, { useState } from 'react';
import { CategoryInfo, Game } from '../types';
import { GameCard } from './GameCard';
import { Sparkles, ArrowUpDown, ChevronRight, Gamepad2, Info, ChevronDown } from 'lucide-react';

interface CategoryViewProps {
  category: CategoryInfo;
  games: Game[];
  onSelectGame: (game: Game) => void;
  onNavigateHome: () => void;
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, game: Game) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  games,
  onSelectGame,
  onNavigateHome,
  favorites,
  onToggleFavorite,
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'title'>('popular');
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Sort games
  const sortedGames = [...games].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return b.playsCount - a.playsCount; // default popular
  });

  const displayedGames = sortedGames.slice(0, visibleCount);
  const hasMore = visibleCount < sortedGames.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 24);
      setIsLoadingMore(false);
    }, 300);
  };


  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400">
        <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-semibold capitalize">
          {category.name}
        </span>
      </nav>

      {/* 2. Category Hero Header */}
      <header className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-r ${category.bannerColor} border border-gray-700 shadow-xl relative overflow-hidden`}>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#FFB800] text-xs font-bold border border-white/10">
              {games.length} Free Games Available
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
            Free {category.name} Games Online
          </h1>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
            {category.longDescription}
          </p>

          {/* AEO TL;DR Direct Answer Box */}
          <div className="mt-4 p-4 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-gray-300">
            <strong className="text-[#FFB800] block mb-1">⚡ Quick Summary (TL;DR):</strong>
            Play {games.length}+ free {category.name.toLowerCase()} browser games directly on mobile or PC with no downloads or registration. Includes top hits like <em>{games[0]?.title || 'popular titles'}</em> with instant click-to-play support.
          </div>

          {/* Featured Tag Chips */}
          <div className="pt-2 flex flex-wrap gap-1.5">
            {category.featuredTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-white text-xs font-medium border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* 3. Toolbar / Sorting Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#1a1a1a] p-4 rounded-2xl border border-gray-800">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-[#FFB800]" />
          <span>Showing {sortedGames.length} games</span>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400 font-semibold flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#222222] text-white border border-gray-700 rounded-full px-3.5 py-1.5 font-bold focus:outline-none focus:border-[#FFB800] cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest Releases</option>
            <option value="title">Title (A - Z)</option>
          </select>
        </div>
      </div>

      {/* 4. Category Games Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {displayedGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onSelect={onSelectGame}
            isFavorite={favorites.includes(game.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}

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

      {/* 5. Load More Button */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2.5 bg-[#222222] hover:bg-[#2a2a2a] text-white font-bold text-sm rounded-full border border-gray-700 transition-all flex items-center gap-2 hover:border-[#FFB800]/50 shadow-md cursor-pointer disabled:opacity-50"
          >
            <span>{isLoadingMore ? 'Loading More Games...' : `Load More ${category.name} Games (${visibleCount} of ${sortedGames.length})`}</span>
            <ChevronDown className={`w-4 h-4 text-[#FFB800] ${isLoadingMore ? 'animate-spin' : ''}`} />
          </button>
        </div>
      )}

    </div>
  );
};
