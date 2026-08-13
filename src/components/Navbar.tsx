import React, { useState, useRef, useEffect } from 'react';
import { 
  Clapperboard, Search, Coins, Plus, Bell, User, Heart, 
  Menu, X, Sparkles, Flame, Check, ExternalLink, Gamepad2
} from 'lucide-react';
import { Game } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onNavigateHome: () => void;
  onNavigateFavorites: () => void;
  onSelectGame: (game: Game) => void;
  allGames: Game[];
  coins: number;
  onOpenDailyBonus: () => void;
  onOpenSubmitGame: () => void;
  onOpenLogin: () => void;
  user: { name: string; avatar: string; loggedIn: boolean } | null;
  favoritesCount: number;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  searchQuery,
  onNavigateHome,
  onNavigateFavorites,
  onSelectGame,
  allGames,
  coins,
  onOpenDailyBonus,
  onOpenSubmitGame,
  onOpenLogin,
  user,
  favoritesCount,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Filter games for live dropdown search
  const filteredSuggestions = searchQuery.trim()
    ? allGames
        .filter(g => 
          g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 8)
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-[64px] bg-[#1a1a1a] border-b border-gray-800 px-3 sm:px-6 flex items-center transition-all">
      <div className="max-w-[1920px] w-full mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            id="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-xl transition-colors md:flex items-center justify-center cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            id="brand-logo-btn"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFB800] text-black shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clapperboard className="w-5 h-5 text-black group-hover:rotate-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white flex items-center">
                Bollywood<span className="text-[#FFB800]">Game</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold -mt-1 hidden sm:block">
                .online • Free Portal
              </span>
            </div>
          </button>
        </div>

        {/* Center: Live Search Bar */}
        <div ref={searchContainerRef} className="flex-1 max-w-xl relative mx-1 sm:mx-4">
          <div className={`relative flex items-center rounded-full bg-[#2a2a2a] border transition-all duration-200 ${
            isSearchFocused ? 'border-[#FFB800] ring-2 ring-[#FFB800]/20 bg-[#333333]' : 'border-gray-700 hover:border-gray-600'
          }`}>
            <Search className="w-4 h-4 text-gray-400 ml-4 shrink-0 pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search 5,000+ games & genres (e.g. Cricket, CineQuiz, Racing)..."
              className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                className="p-1.5 text-gray-400 hover:text-white mr-2.5 rounded-full cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Live Search Suggestions Popover */}
          {isSearchFocused && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#222222] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-800 flex justify-between">
                <span>Games Matching "{searchQuery}"</span>
                <span className="text-[#FFB800]">{filteredSuggestions.length} found</span>
              </div>
              {filteredSuggestions.length > 0 ? (
                <div className="divide-y divide-gray-800 max-h-80 overflow-y-auto">
                  {filteredSuggestions.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        onSelectGame(g);
                        setIsSearchFocused(false);
                      }}
                      className="w-full p-2.5 flex items-center gap-3 hover:bg-[#2e2e2e] text-left transition-colors cursor-pointer"
                    >
                      <img
                        src={g.thumbnail}
                        alt={g.title}
                        className="w-12 h-8 rounded-lg object-cover bg-gray-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white truncate">{g.title}</div>
                        <div className="text-xs text-gray-400 capitalize flex items-center gap-2">
                          <span>{g.category}</span>
                          <span>•</span>
                          <span className="text-[#FFB800] font-semibold">{g.rating}% score</span>
                        </div>
                      </div>
                      <span className="text-xs bg-[#FFB800]/10 text-[#FFB800] px-2.5 py-1 rounded-full font-bold shrink-0 border border-[#FFB800]/20">
                        Play
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-gray-400">
                  No games found matching "{searchQuery}". Try genres like "Quiz", "Cricket", or "Action".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions, Coins, Notifications, Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Coin Points Counter + Bonus */}
          <button
            id="daily-bonus-btn"
            onClick={onOpenDailyBonus}
            className="flex items-center gap-1.5 bg-[#2a2a2a] hover:bg-[#333333] border border-gray-700 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#FFB800] transition-all cursor-pointer shadow-sm group"
            title="Earn Free Coins Daily"
          >
            <Coins className="w-4 h-4 text-[#FFB800] group-hover:rotate-12 transition-transform" />
            <span className="hidden xs:inline">{coins}</span>
            <span className="text-[10px] bg-[#FFB800] text-black w-4 h-4 rounded-full flex items-center justify-center font-black">+</span>
          </button>

          {/* '+' Submit / Add Game Button */}
          <button
            id="submit-game-btn"
            onClick={onOpenSubmitGame}
            className="hidden sm:flex items-center gap-1.5 bg-[#2a2a2a] hover:bg-[#333333] border border-gray-700 text-gray-200 hover:text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
            title="Submit an HTML5 Game"
          >
            <Plus className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>Add Game</span>
          </button>

          {/* Favorites Button */}
          <button
            id="nav-favorites-btn"
            onClick={onNavigateFavorites}
            className="relative p-2 text-gray-300 hover:text-[#E63946] hover:bg-[#2a2a2a] rounded-full transition-colors cursor-pointer"
            title="Saved Favorites"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#E63946] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Notifications Bell */}
          <div ref={notifRef} className="relative">
            <button
              id="notifications-bell-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-300 hover:text-white hover:bg-[#2a2a2a] rounded-full transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFB800] rounded-full ring-2 ring-[#1a1a1a]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-[#222222] border border-gray-800 rounded-2xl shadow-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Updates & News</span>
                  <span className="text-[10px] text-[#FFB800] font-semibold">Live</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#2a2a2a] border border-gray-700/60 text-xs">
                    <div className="font-bold text-[#FFB800] flex items-center gap-1 mb-0.5">
                      <Sparkles className="w-3.5 h-3.5" /> New Bollywood CineQuiz!
                    </div>
                    <p className="text-gray-400 text-[11px]">Play the updated dialogue trivia round and earn 50 bonus coins.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#2a2a2a] border border-gray-700/60 text-xs">
                    <div className="font-bold text-white flex items-center gap-1 mb-0.5">
                      <Flame className="w-3.5 h-3.5 text-red-500" /> Weekend Tournament
                    </div>
                    <p className="text-gray-400 text-[11px]">Mumbai Rickshaw Rush leaderboard is now live.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Login Pill Button */}
          {user?.loggedIn ? (
            <button
              id="user-profile-btn"
              onClick={onOpenLogin}
              className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333333] border border-gray-700 p-1 pr-3 rounded-full text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#FFB800] flex items-center justify-center text-black font-black text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              id="login-modal-btn"
              onClick={onOpenLogin}
              className="bg-[#FFB800] text-black font-bold px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm hover:brightness-110 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Log in
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
