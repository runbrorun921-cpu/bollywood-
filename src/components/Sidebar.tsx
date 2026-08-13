import React from 'react';
import { 
  Home, Sparkles, Flame, Heart, Clapperboard, Swords, 
  Gauge, Puzzle, Ghost, Building, Users, Globe, Shield, 
  Trophy, Dice5, HelpCircle, GraduationCap, Zap, ChevronRight,
  TrendingUp, Compass, Award
} from 'lucide-react';
import { GameCategory, ViewMode } from '../types';
import { CATEGORIES } from '../data/categories';

interface SidebarProps {
  currentView: ViewMode;
  selectedCategory: GameCategory | null;
  onNavigateHome: () => void;
  onNavigateNew: () => void;
  onNavigateTrending: () => void;
  onNavigateFavorites: () => void;
  onSelectCategory: (category: GameCategory) => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
  favoritesCount: number;
}

// Icon mapper for categories
const getCategoryIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case 'Clapperboard': return <Clapperboard className={className} />;
    case 'Swords': return <Swords className={className} />;
    case 'Trophy': return <Trophy className={className} />;
    case 'Gauge': return <Gauge className={className} />;
    case 'Puzzle': return <Puzzle className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'HelpCircle': return <HelpCircle className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Ghost': return <Ghost className={className} />;
    case 'Building': return <Building className={className} />;
    case 'Globe': return <Globe className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Dice5': return <Dice5 className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Users': return <Users className={className} />;
    default: return <Compass className={className} />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  selectedCategory,
  onNavigateHome,
  onNavigateNew,
  onNavigateTrending,
  onNavigateFavorites,
  onSelectCategory,
  isOpen,
  onCloseMobile,
  favoritesCount,
}) => {
  const isNavActive = (view: ViewMode) => currentView === view && !selectedCategory;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed md:sticky top-[64px] left-0 h-[calc(100vh-64px)] bg-[#1a1a1a] border-r border-gray-800 z-30 transition-all duration-300 overflow-y-auto no-scrollbar flex flex-col justify-between ${
          isOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
        }`}
      >
        <div className="p-3 space-y-5">
          
          {/* Primary Main Navigation Rail */}
          <div className="space-y-1">
            <div className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 ${!isOpen && 'hidden md:block md:text-center md:px-0'}`}>
              {isOpen ? 'Main' : '•••'}
            </div>

            {/* Home */}
            <button
              id="sidebar-nav-home"
              onClick={() => { onNavigateHome(); onCloseMobile?.(); }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer group ${
                isNavActive('home')
                  ? 'bg-[#2a2a2a] text-[#FFB800] border border-gray-700 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-[#252525]'
              }`}
              title="Home"
            >
              <Home className="w-5 h-5 shrink-0" />
              {isOpen && <span className="truncate">Home</span>}
            </button>

            {/* New Games */}
            <button
              id="sidebar-nav-new"
              onClick={() => { onNavigateNew(); onCloseMobile?.(); }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer group ${
                isNavActive('new')
                  ? 'bg-[#2a2a2a] text-[#FFB800] border border-gray-700 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-[#252525]'
              }`}
              title="New Games"
            >
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              {isOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="truncate">New Games</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-black">NEW</span>
                </div>
              )}
            </button>

            {/* Trending / Popular */}
            <button
              id="sidebar-nav-trending"
              onClick={() => { onNavigateTrending(); onCloseMobile?.(); }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer group ${
                isNavActive('trending') || isNavActive('popular')
                  ? 'bg-[#2a2a2a] text-[#FFB800] border border-gray-700 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-[#252525]'
              }`}
              title="Popular & Trending"
            >
              <Flame className="w-5 h-5 text-[#E63946] shrink-0 group-hover:scale-110 transition-transform" />
              {isOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="truncate">Trending</span>
                  <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-black">HOT</span>
                </div>
              )}
            </button>

            {/* Favorites */}
            <button
              id="sidebar-nav-favorites"
              onClick={() => { onNavigateFavorites(); onCloseMobile?.(); }}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer group ${
                isNavActive('favorites')
                  ? 'bg-[#2a2a2a] text-[#FFB800] border border-gray-700 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-[#252525]'
              }`}
              title="My Favorites"
            >
              <Heart className="w-5 h-5 text-rose-400 shrink-0 group-hover:scale-110 transition-transform" />
              {isOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="truncate">Favorites</span>
                  {favoritesCount > 0 && (
                    <span className="text-[10px] bg-[#E63946] text-white px-1.5 py-0.5 rounded-full font-bold">
                      {favoritesCount}
                    </span>
                  )}
                </div>
              )}
            </button>
          </div>

          {/* Categories / Genres */}
          <div className="space-y-1 pt-3 border-t border-gray-800">
            <div className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between ${!isOpen && 'hidden md:block md:text-center md:px-0'}`}>
              <span>{isOpen ? 'Genres & Specials' : '•••'}</span>
            </div>

            {CATEGORIES.map((cat) => {
              const isActive = currentView === 'category' && selectedCategory === cat.id;
              const isBollywoodSpecial = cat.id === 'bollywood';

              return (
                <button
                  key={cat.id}
                  id={`sidebar-category-${cat.id}`}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onCloseMobile?.();
                  }}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-[#2a2a2a] text-[#FFB800] font-bold border border-gray-700'
                      : isBollywoodSpecial
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-[#252525]'
                  }`}
                  title={cat.name}
                >
                  <div className={`shrink-0 ${isActive ? 'text-[#FFB800]' : isBollywoodSpecial ? 'text-[#FFB800]' : 'text-gray-400 group-hover:text-white'}`}>
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  {isOpen && (
                    <span className="truncate flex-1 text-left">
                      {cat.name}
                    </span>
                  )}
                  {isOpen && isBollywoodSpecial && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Footer / Status Indicator in Sidebar */}
        <div className="p-3 border-t border-gray-800 bg-[#141414] text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFB800]"></span>
            </span>
            {isOpen && <span className="text-xs text-gray-300 font-semibold truncate">Free Browser Gaming</span>}
          </div>
        </div>
      </aside>
    </>
  );
};
