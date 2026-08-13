import React, { useState, useEffect } from 'react';
import { Game, GameCategory, ViewMode } from './types';
import { GAMES } from './data/games';
import { CATEGORIES } from './data/categories';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CategoryChips } from './components/CategoryChips';
import { GameGrid } from './components/GameGrid';
import { BentoHeroGrid } from './components/BentoHeroGrid';
import { GameDetailView } from './components/GameDetailView';
import { CategoryView } from './components/CategoryView';
import { EditorialSection, FAQS } from './components/EditorialSection';
import { InfoPages } from './components/InfoPages';
import { LoginModal, DailyBonusModal, SubmitGameModal } from './components/Modals';
import { 
  updatePageMeta, injectStructuredData, getWebsiteAndOrgSchema, 
  getGameJsonLd, getBreadcrumbJsonLd, getFaqJsonLd 
} from './lib/seo';
import { Sparkles, Heart, Gamepad2, Trophy } from 'lucide-react';

export default function App() {
  // App state
  const [games, setGames] = useState<Game[]>(GAMES);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // User & Gamification state with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('bollywood_favorites') || '["bolly-cinequiz", "mumbai-rickshaw"]');
    } catch {
      return ["bolly-cinequiz", "mumbai-rickshaw"];
    }
  });

  const [coins, setCoins] = useState<number>(() => {
    try {
      const stats = JSON.parse(localStorage.getItem('bollywood_user_stats') || '{"coins": 150}');
      return stats.coins || 150;
    } catch {
      return 150;
    }
  });

  const [playedCount, setPlayedCount] = useState<number>(() => {
    try {
      const played = JSON.parse(localStorage.getItem('bollywood_played_games') || '[]');
      return played.length;
    } catch {
      return 0;
    }
  });

  const [user, setUser] = useState<{ name: string; avatar: string; loggedIn: boolean } | null>(() => {
    try {
      return JSON.parse(localStorage.getItem('bollywood_user') || 'null');
    } catch {
      return null;
    }
  });

  // Modal dialog states
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [bonusModalOpen, setBonusModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  // Pagination / Load more simulation state
  const [pageLimit, setPageLimit] = useState(18);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('bollywood_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist user coins
  const handleEarnCoins = (amount: number) => {
    setCoins((prev) => {
      const newTotal = prev + amount;
      try {
        const stats = JSON.parse(localStorage.getItem('bollywood_user_stats') || '{}');
        stats.coins = newTotal;
        localStorage.setItem('bollywood_user_stats', JSON.stringify(stats));
      } catch (e) {}
      return newTotal;
    });
  };

  // SEO & URL sync handler
  useEffect(() => {
    if (currentView === 'game' && selectedGame) {
      updatePageMeta(
        `Play ${selectedGame.title} Free Online — No Download | BollywoodGame`,
        `${selectedGame.description} Instant play on mobile and PC without install on BollywoodGame.online!`,
        `/game/${selectedGame.slug}`
      );
      injectStructuredData(getGameJsonLd(selectedGame), 'bollywood-game-ld');
      injectStructuredData(
        getBreadcrumbJsonLd([
          { label: 'Home', url: '/' },
          { label: selectedGame.category, url: `/category/${selectedGame.category}` },
          { label: selectedGame.title, url: `/game/${selectedGame.slug}` }
        ]),
        'bollywood-breadcrumb-ld'
      );
    } else if (currentView === 'category' && selectedCategory) {
      const catInfo = CATEGORIES.find((c) => c.id === selectedCategory);
      const catName = catInfo?.name || selectedCategory;
      updatePageMeta(
        `Free ${catName} Games Online — Play ${catName} No Download | BollywoodGame`,
        `Play ${catName} games online for free on BollywoodGame. High-speed browser games with zero install.`,
        `/category/${selectedCategory}`
      );
      injectStructuredData(
        getBreadcrumbJsonLd([
          { label: 'Home', url: '/' },
          { label: catName, url: `/category/${selectedCategory}` }
        ]),
        'bollywood-breadcrumb-ld'
      );
    } else if (currentView === 'about') {
      updatePageMeta(
        `About Us — BollywoodGame | India's Free Browser Gaming Portal`,
        `Learn about BollywoodGame.online, our mission to deliver 5,000+ zero-download HTML5 games, and our community.`,
        `/about`
      );
      injectStructuredData(
        getBreadcrumbJsonLd([
          { label: 'Home', url: '/' },
          { label: 'About Us', url: '/about' }
        ]),
        'bollywood-breadcrumb-ld'
      );
    } else if (currentView === 'privacy') {
      updatePageMeta(
        `Privacy Policy — BollywoodGame.online`,
        `Read our Privacy Policy, cookie usage, data protection practices, and COPPA compliance on BollywoodGame.online.`,
        `/privacy-policy`
      );
      injectStructuredData(
        getBreadcrumbJsonLd([
          { label: 'Home', url: '/' },
          { label: 'Privacy Policy', url: '/privacy-policy' }
        ]),
        'bollywood-breadcrumb-ld'
      );
    } else if (currentView === 'terms') {
      updatePageMeta(
        `Terms of Service — BollywoodGame.online`,
        `Terms of Service and user agreements for playing and publishing games on BollywoodGame.online.`,
        `/terms-of-service`
      );
      injectStructuredData(
        getBreadcrumbJsonLd([
          { label: 'Home', url: '/' },
          { label: 'Terms of Service', url: '/terms-of-service' }
        ]),
        'bollywood-breadcrumb-ld'
      );
    } else if (currentView === 'contact') {
      updatePageMeta(
        `Contact Us — Support & Developer Inquiries | BollywoodGame`,
        `Contact the BollywoodGame team for game submissions, player support, feedback, and partnerships.`,
        `/contact-us`
      );
      injectStructuredData(
        getBreadcrumbJsonLd([
          { label: 'Home', url: '/' },
          { label: 'Contact Us', url: '/contact-us' }
        ]),
        'bollywood-breadcrumb-ld'
      );
    } else {
      updatePageMeta(
        `BollywoodGame — 5,000+ Free Online Games, No Download | Play Instantly`,
        `Play 5,000+ free online games with Bollywood specials, Action, Cricket, Racing, Puzzles, and Multiplayer. No download or install required on BollywoodGame.online!`,
        '/'
      );
      injectStructuredData(getWebsiteAndOrgSchema(), 'bollywood-org-ld');
      injectStructuredData(getFaqJsonLd(FAQS), 'bollywood-faq-ld');
    }
    // Scroll window smoothly to top when switching views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedGame, selectedCategory]);

  // Navigation handlers
  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedGame(null);
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleSelectCategory = (cat: GameCategory | 'all') => {
    if (cat === 'all') {
      handleNavigateHome();
    } else {
      setSelectedCategory(cat);
      setSelectedGame(null);
      setCurrentView('category');
      setSearchQuery('');
    }
  };

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    setCurrentView('game');
    setPlayedCount((c) => c + 1);
  };

  const handleSelectGameBySlug = (slug: string) => {
    const found = games.find((g) => g.slug === slug);
    if (found) handleSelectGame(found);
  };

  const handleToggleFavorite = (e: React.MouseEvent, game: Game) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(game.id) ? prev.filter((id) => id !== game.id) : [...prev, game.id]
    );
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setPageLimit((p) => p + 18);
      setIsLoadingMore(false);
    }, 400);
  };

  // Submit custom new game
  const handleSubmitNewGame = (newGameData: Partial<Game>) => {
    const newGame: Game = {
      id: `custom-${Date.now()}`,
      slug: (newGameData.title || 'new-game').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newGameData.title || 'Untitled Game',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      category: newGameData.category || 'action',
      rating: 95,
      playsCount: 1,
      likesCount: 1,
      ageRating: 'All Ages',
      isNew: true,
      mobileSupported: true,
      description: `Play ${newGameData.title} online for free on BollywoodGame!`,
      instructions: 'Click play to start.',
      controls: { mouse: 'Click to play', touch: 'Tap to play' },
      tags: ['New', newGameData.category || 'action'],
      releaseDate: '2026-08-13',
      developer: newGameData.developer || 'Community Dev',
      playUrl: newGameData.playUrl
    };

    setGames([newGame, ...games]);
    handleEarnCoins(50); // Reward for game contribution
  };

  // Filtered games based on global search
  const displayGames = searchQuery.trim()
    ? games.filter(
        (g) =>
          g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : games;

  // Category specific games
  const categoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);
  const categoryGames = selectedCategory
    ? games.filter((g) => g.category === selectedCategory || g.subCategories?.includes(selectedCategory))
    : [];

  // Related games for game detail view
  const relatedGames = selectedGame
    ? games.filter((g) => g.id !== selectedGame.id && (g.category === selectedGame.category || g.tags.some(t => selectedGame.tags.includes(t))))
    : [];

  // Categorized Home Rows
  const recommendedGames = displayGames.slice(0, pageLimit);
  const bollywoodSpecialGames = displayGames.filter((g) => g.category === 'bollywood' || g.subCategories?.includes('bollywood')).slice(0, 6);
  const trendingGames = displayGames.filter((g) => g.isTrending || g.rating >= 93).slice(0, 6);
  const newReleasesGames = displayGames.filter((g) => g.isNew || g.releaseDate.startsWith('2026-02')).slice(0, 6);
  const favoriteGames = games.filter((g) => favorites.includes(g.id));

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col selection:bg-[#FFB800] selection:text-black">
      
      {/* 1. Top Sticky Navbar */}
      <Navbar
        onSearch={(q) => {
          setSearchQuery(q);
          if (currentView !== 'home') setCurrentView('home');
        }}
        searchQuery={searchQuery}
        onNavigateHome={handleNavigateHome}
        onNavigateFavorites={() => { setCurrentView('favorites'); setSelectedGame(null); }}
        onSelectGame={handleSelectGame}
        allGames={games}
        coins={coins}
        onOpenDailyBonus={() => setBonusModalOpen(true)}
        onOpenSubmitGame={() => setSubmitModalOpen(true)}
        onOpenLogin={() => setLoginModalOpen(true)}
        user={user}
        favoritesCount={favorites.length}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* 2. Secondary Horizontal Category Chips Bar */}
      <CategoryChips
        currentView={currentView}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onSelectFilter={(filter) => {
          setCurrentView(filter);
          setSelectedCategory(null);
          setSelectedGame(null);
        }}
      />

      {/* 3. Main Layout Wrapper (Sidebar Rail + Content Area) */}
      <div className="flex-1 flex w-full max-w-[1920px] mx-auto">
        
        {/* Left Collapsible Sidebar */}
        <Sidebar
          currentView={currentView}
          selectedCategory={selectedCategory}
          onNavigateHome={handleNavigateHome}
          onNavigateNew={() => { setCurrentView('new'); setSelectedCategory(null); }}
          onNavigateTrending={() => { setCurrentView('trending'); setSelectedCategory(null); }}
          onNavigateFavorites={() => { setCurrentView('favorites'); setSelectedCategory(null); }}
          onSelectCategory={(cat) => handleSelectCategory(cat)}
          isOpen={sidebarOpen}
          onCloseMobile={() => setSidebarOpen(false)}
          favoritesCount={favorites.length}
        />

        {/* Center Main Scrollable Area */}
        <main className="flex-1 px-3 sm:px-6 lg:px-8 py-6 overflow-x-hidden min-w-0">
          
          {/* VIEW 1: GAME PLAY / DETAIL VIEW */}
          {currentView === 'game' && selectedGame && (
            <GameDetailView
              game={selectedGame}
              relatedGames={relatedGames}
              onSelectGame={handleSelectGame}
              onNavigateHome={handleNavigateHome}
              onNavigateCategory={(cat) => handleSelectCategory(cat as GameCategory)}
              isFavorite={favorites.includes(selectedGame.id)}
              onToggleFavorite={handleToggleFavorite}
              onEarnCoins={handleEarnCoins}
            />
          )}

          {/* VIEW 2: CATEGORY VIEW */}
          {currentView === 'category' && categoryInfo && (
            <CategoryView
              category={categoryInfo}
              games={categoryGames}
              onSelectGame={handleSelectGame}
              onNavigateHome={handleNavigateHome}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {/* VIEW 3: FAVORITES VIEW */}
          {currentView === 'favorites' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#1a1a1a] border border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center border border-rose-500/30">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-black text-white">Your Saved Favorites</h1>
                  <p className="text-xs text-gray-400">Quickly jump back into your favorite games.</p>
                </div>
              </div>

              <GameGrid
                games={favoriteGames}
                onSelectGame={handleSelectGame}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          )}

          {/* VIEW 4: NEW GAMES VIEW */}
          {currentView === 'new' && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#1a1a1a] border border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
                  <Sparkles className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-black text-white">New Game Releases</h1>
                  <p className="text-xs text-gray-400">Fresh HTML5 games added to BollywoodGame this week.</p>
                </div>
              </div>

              <GameGrid
                games={newReleasesGames}
                onSelectGame={handleSelectGame}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          )}

          {/* VIEW 5: TRENDING / POPULAR VIEW */}
          {(currentView === 'trending' || currentView === 'popular') && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#1a1a1a] border border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-black text-white">Popular & Trending Now</h1>
                  <p className="text-xs text-gray-400">Top played browser games across India and worldwide.</p>
                </div>
              </div>

              <GameGrid
                games={trendingGames}
                onSelectGame={handleSelectGame}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          )}

          {/* VIEW 6: INFO PAGES (About, Privacy, Terms, Contact) */}
          {(currentView === 'about' || currentView === 'privacy' || currentView === 'terms' || currentView === 'contact') && (
            <InfoPages
              page={currentView}
              onNavigate={(view) => {
                setSelectedCategory(null);
                setSelectedGame(null);
                setSearchQuery('');
                setCurrentView(view);
              }}
              onSelectCategory={handleSelectCategory}
            />
          )}

          {/* VIEW 7: HOMEPAGE (Bento Hero + Curated Rows + Infinite Scroll + SEO Block) */}
          {currentView === 'home' && (
            <div className="max-w-7xl mx-auto space-y-8">
              
              {/* Search active state indicator */}
              {searchQuery && (
                <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-[#FFB800]/50 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    Showing search results for "<strong className="text-[#FFB800]">{searchQuery}</strong>" ({displayGames.length} games)
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[#FFB800] hover:underline font-bold cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* Bento Grid Hero Spotlight (when not searching) */}
              {!searchQuery && (
                <BentoHeroGrid
                  games={games}
                  onSelectGame={handleSelectGame}
                  onExploreMore={() => handleSelectCategory('bollywood')}
                />
              )}

              {/* 1. Recommended Games Row */}
              <GameGrid
                title="Recommended Games"
                subtitle="Curated top-rated picks for you"
                icon="recommended"
                games={recommendedGames}
                onSelectGame={handleSelectGame}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                hasMore={!searchQuery && pageLimit < games.length}
                isLoadingMore={isLoadingMore}
                onLoadMore={handleLoadMore}
              />

              {/* 2. Bollywood Specials Row (Only when not searching) */}
              {!searchQuery && (
                <GameGrid
                  title="Bollywood Specials"
                  subtitle="Cinema trivia, Rickshaw rush, Red Carpet styling & festival games"
                  icon="bollywood"
                  games={bollywoodSpecialGames}
                  onSelectGame={handleSelectGame}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}

              {/* 3. Trending in India Row */}
              {!searchQuery && (
                <GameGrid
                  title="Trending in India"
                  subtitle="Most played titles this week with high player ratings"
                  icon="trending"
                  games={trendingGames}
                  onSelectGame={handleSelectGame}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}

              {/* 4. New Releases Row */}
              {!searchQuery && (
                <GameGrid
                  title="New Games"
                  subtitle="Latest additions to the portal"
                  icon="new"
                  games={newReleasesGames}
                  onSelectGame={handleSelectGame}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}

              {/* 5. Editorial Content Block & FAQ Section (SEO/AEO/GEO) */}
              <EditorialSection onSelectGameBySlug={handleSelectGameBySlug} />

            </div>
          )}

        </main>
      </div>

      {/* 4. Footer */}
      <footer className="w-full bg-[#161616] border-t border-gray-800 text-gray-400 pt-12 pb-10 px-4 sm:px-8 mt-16">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Column 1 & 2: Branding & Statement */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl text-white tracking-tight">
                  Bollywood<span className="text-[#FFB800]">Game</span>.online
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFB800]/15 text-[#FFB800] text-[10px] font-extrabold border border-[#FFB800]/30">
                  5,000+ Games
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                India's premier digital playground for instant HTML5 web gaming. Discover thousands of free Bollywood specials, cricket challenges, car racing, puzzles, and arcade games with zero downloads.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-[#222222] border border-gray-800 text-[11px] text-gray-300 font-medium">⚡ Instant Play</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#222222] border border-gray-800 text-[11px] text-gray-300 font-medium">📱 Mobile & PC</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#222222] border border-gray-800 text-[11px] text-gray-300 font-medium">🛡️ Safe & Free</span>
              </div>
            </div>

            {/* Column 3: Game Genres */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Popular Genres</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => handleSelectCategory('bollywood')} className="text-gray-400 hover:text-[#FFB800] transition-colors cursor-pointer text-left">
                    Bollywood Specials
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('sports')} className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left">
                    Cricket & Sports
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('racing')} className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left">
                    Racing & Driving
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('action')} className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left">
                    Action & Fighter
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('two-player')} className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left">
                    2-Player Games
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSelectCategory('puzzle')} className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left">
                    Brain & Puzzle
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Portal Features */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore Portal</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={handleNavigateHome} className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left">
                    Home Hub
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSelectedGame(null);
                      setSelectedCategory(null);
                      setCurrentView('trending');
                    }} 
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Trending in India
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSelectedGame(null);
                      setSelectedCategory(null);
                      setCurrentView('new');
                    }} 
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    New Game Releases
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSelectedGame(null);
                      setSelectedCategory(null);
                      setCurrentView('favorites');
                    }} 
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Your Saved Favorites ({favorites.length})
                  </button>
                </li>
                <li>
                  <button onClick={() => setSubmitModalOpen(true)} className="text-gray-400 hover:text-[#FFB800] transition-colors cursor-pointer text-left font-semibold">
                    + Publish a Game
                  </button>
                </li>
                <li>
                  <button onClick={() => setBonusModalOpen(true)} className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-left font-bold">
                    🎁 Daily Coin Bonus
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 5: Legal & Support (About, Privacy, Terms, Contact) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFB800]">Company & Legal</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => {
                      setSelectedGame(null);
                      setSelectedCategory(null);
                      setCurrentView('about');
                    }}
                    className={`transition-colors cursor-pointer text-left ${currentView === 'about' ? 'text-[#FFB800] font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSelectedGame(null);
                      setSelectedCategory(null);
                      setCurrentView('privacy');
                    }}
                    className={`transition-colors cursor-pointer text-left ${currentView === 'privacy' ? 'text-[#FFB800] font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSelectedGame(null);
                      setSelectedCategory(null);
                      setCurrentView('terms');
                    }}
                    className={`transition-colors cursor-pointer text-left ${currentView === 'terms' ? 'text-[#FFB800] font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setSelectedGame(null);
                      setSelectedCategory(null);
                      setCurrentView('contact');
                    }}
                    className={`transition-colors cursor-pointer text-left ${currentView === 'contact' ? 'text-[#FFB800] font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Contact Us & Support
                  </button>
                </li>
                <li className="pt-1">
                  <a href="mailto:support@bollywoodgame.online" className="text-[11px] text-gray-500 hover:text-gray-300 block truncate">
                    support@bollywoodgame.online
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar with Copyright */}
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-gray-500 text-[11px] text-center sm:text-left">
              © 2026 <strong>BollywoodGame.online</strong>. All rights reserved. All games are free to play with no downloads required.
            </p>
          </div>

        </div>
      </footer>

      {/* 5. Modals & Dialogs */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        user={user}
        onLogin={(name, email) => {
          const newUser = { name, avatar: name.charAt(0), loggedIn: true };
          setUser(newUser);
          localStorage.setItem('bollywood_user', JSON.stringify(newUser));
        }}
        onLogout={() => {
          setUser(null);
          localStorage.removeItem('bollywood_user');
        }}
        coins={coins}
        playedCount={playedCount}
        favoritesCount={favorites.length}
      />

      <DailyBonusModal
        isOpen={bonusModalOpen}
        onClose={() => setBonusModalOpen(false)}
        onClaim={(amount) => handleEarnCoins(amount)}
        currentCoins={coins}
      />

      <SubmitGameModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onSubmitNewGame={handleSubmitNewGame}
      />

    </div>
  );
}
