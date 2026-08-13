import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Flame, Clapperboard } from 'lucide-react';
import { GameCategory, ViewMode } from '../types';
import { CATEGORIES } from '../data/categories';

interface CategoryChipsProps {
  currentView: ViewMode;
  selectedCategory: GameCategory | null;
  onSelectCategory: (cat: GameCategory | 'all') => void;
  onSelectFilter: (filter: 'new' | 'popular' | 'trending') => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  currentView,
  selectedCategory,
  onSelectCategory,
  onSelectFilter,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const isAllActive = currentView === 'home' && !selectedCategory;
  const isNewActive = currentView === 'new';
  const isTrendingActive = currentView === 'trending' || currentView === 'popular';

  return (
    <div className="relative w-full bg-[#1a1a1a] border-b border-gray-800 px-2 sm:px-4 py-2.5 flex items-center gap-1.5 z-20">
      {/* Left Scroll arrow */}
      <button
        onClick={() => scroll('left')}
        className="hidden sm:flex p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-full transition-colors shrink-0 cursor-pointer"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Horizontal Scrollable container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth flex-1"
      >
        {/* All Games Chip */}
        <button
          id="chip-all-games"
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            isAllActive
              ? 'bg-[#FFB800] text-black shadow-md'
              : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333333] hover:text-white border border-gray-700/60'
          }`}
        >
          All Games
        </button>

        {/* Bollywood Specials Chip (Hero) */}
        <button
          id="chip-bollywood"
          onClick={() => onSelectCategory('bollywood')}
          className={`px-4 py-1.5 rounded-full text-xs font-black whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
            selectedCategory === 'bollywood'
              ? 'bg-[#FFB800] text-black shadow-md'
              : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
          }`}
        >
          <Clapperboard className="w-3.5 h-3.5 text-[#FFB800]" />
          <span>Bollywood Specials</span>
        </button>

        {/* New Chip */}
        <button
          id="chip-new"
          onClick={() => onSelectFilter('new')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all cursor-pointer ${
            isNewActive
              ? 'bg-[#FFB800] text-black shadow-md'
              : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333333] hover:text-white border border-gray-700/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>New</span>
        </button>

        {/* Popular / Trending Chip */}
        <button
          id="chip-trending"
          onClick={() => onSelectFilter('trending')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 transition-all cursor-pointer ${
            isTrendingActive
              ? 'bg-[#FFB800] text-black shadow-md'
              : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333333] hover:text-white border border-gray-700/60'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-[#E63946]" />
          <span>Popular</span>
        </button>

        {/* Genre Chips */}
        {CATEGORIES.filter(c => c.id !== 'bollywood').map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`chip-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FFB800] text-black font-bold shadow-md'
                  : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333333] hover:text-white border border-gray-700/60'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Right Scroll arrow */}
      <button
        onClick={() => scroll('right')}
        className="hidden sm:flex p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-full transition-colors shrink-0 cursor-pointer"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
