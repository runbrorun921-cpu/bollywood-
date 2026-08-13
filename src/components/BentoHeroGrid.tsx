import React from 'react';
import { Play, Sparkles, Flame, Trophy, ArrowRight, ShieldCheck, Gamepad2 } from 'lucide-react';
import { Game } from '../types';

interface BentoHeroGridProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  onExploreMore: () => void;
}

export const BentoHeroGrid: React.FC<BentoHeroGridProps> = ({
  games,
  onSelectGame,
  onExploreMore,
}) => {
  if (!games || games.length === 0) return null;

  // Select key games for Bento showcase
  const heroGame = games.find(g => g.category === 'bollywood' || g.id === 'bolly-cinequiz') || games[0];
  const sideGame1 = games.find(g => g.id === 'mumbai-rickshaw') || games[1];
  const sideGame2 = games.find(g => g.id === 'rangoli-blast' || g.id === 'ludo-royal') || games[2];
  const mini1 = games.find(g => g.id === 'gully-cricket') || games[3];
  const mini2 = games.find(g => g.id === 'dhoom-racing' || g.category === 'racing') || games[4];
  const mini3 = games.find(g => g.id === 'bolly-stylist' || g.category === 'girls') || games[5];

  return (
    <section className="w-full mb-8" aria-label="Featured Bento Grid">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* 1. Large Hero Bento Card (col-span-12 lg:col-span-8 lg:row-span-2) */}
        <div
          id={`bento-hero-${heroGame.slug}`}
          onClick={() => onSelectGame(heroGame)}
          className="col-span-12 lg:col-span-8 lg:row-span-2 relative group rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-[#2a2a2a] via-[#1e1e1e] to-[#111111] min-h-[360px] sm:min-h-[400px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:border-[#FFB800]/60 shadow-xl"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectGame(heroGame); }}
        >
          {/* Background Artwork with Gradient Overlay */}
          <img
            src={heroGame.thumbnail}
            alt={heroGame.title}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 group-hover:via-black/50 transition-all duration-300" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" />
              <span>Trending</span>
            </span>
            <span className="bg-[#FFB800] text-black text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-black" />
              <span>Exclusive</span>
            </span>
          </div>

          {/* Score Badge (Bento Circle) */}
          <div className="absolute bottom-6 right-6 hidden sm:flex w-16 h-16 rounded-full bg-[#FFB800] items-center justify-center text-black text-xl font-black border-4 border-black shadow-2xl z-10 group-hover:scale-110 transition-transform">
            {heroGame.rating}%
          </div>

          {/* Content info */}
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider mb-1 block">
              Featured Special • {heroGame.category.replace('-', ' ')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white mb-2 group-hover:text-[#FFB800] transition-colors leading-tight">
              {heroGame.title}
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 max-w-lg mb-4">
              {heroGame.description}
            </p>

            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 bg-white hover:bg-[#FFB800] text-black px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all transform group-hover:scale-105 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectGame(heroGame);
                }}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play Now</span>
              </button>

              <span className="text-xs text-gray-400 font-semibold bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-800">
                {(heroGame.playsCount / 1000).toFixed(0)}k players
              </span>
            </div>
          </div>
        </div>

        {/* 2. Side Bento Card 1 (col-span-12 sm:col-span-6 lg:col-span-4) */}
        {sideGame1 && (
          <div
            id={`bento-side-1-${sideGame1.slug}`}
            onClick={() => onSelectGame(sideGame1)}
            className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl overflow-hidden border border-gray-800 bg-[#222222] p-4 relative group cursor-pointer hover:border-[#FFB800]/50 transition-all flex flex-col justify-between"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectGame(sideGame1); }}
          >
            <div className="relative w-full h-32 sm:h-36 bg-[#333333] rounded-xl overflow-hidden mb-3">
              <img
                src={sideGame1.thumbnail}
                alt={sideGame1.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow">
                NEW
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                ⚡ Instant
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#FFB800] transition-colors truncate">
                {sideGame1.title}
              </h3>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-800">
                <span className="text-xs text-gray-400 capitalize">{sideGame1.category}</span>
                <span className="text-xs text-green-400 font-bold">{sideGame1.rating}% Score</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Side Bento Card 2 (col-span-12 sm:col-span-6 lg:col-span-4) */}
        {sideGame2 && (
          <div
            id={`bento-side-2-${sideGame2.slug}`}
            onClick={() => onSelectGame(sideGame2)}
            className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl overflow-hidden border border-gray-800 bg-[#222222] p-4 relative group cursor-pointer hover:border-[#FFB800]/50 transition-all flex flex-col justify-between"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectGame(sideGame2); }}
          >
            <div className="relative w-full h-32 sm:h-36 bg-[#333333] rounded-xl overflow-hidden mb-3">
              <img
                src={sideGame2.thumbnail}
                alt={sideGame2.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-[#FFB800] text-black text-[9px] font-black px-2 py-0.5 rounded shadow">
                TOP PICK
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                ★ {sideGame2.rating}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#FFB800] transition-colors truncate">
                {sideGame2.title}
              </h3>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-800">
                <span className="text-xs text-gray-400 capitalize">{sideGame2.category}</span>
                <span className="text-xs text-yellow-400 font-bold">{sideGame2.rating}% Match</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. Bottom Bento Mini Card 1 */}
        {mini1 && (
          <div
            id={`bento-mini-1-${mini1.slug}`}
            onClick={() => onSelectGame(mini1)}
            className="col-span-6 sm:col-span-3 rounded-2xl border border-gray-800 bg-[#222222] p-3.5 flex flex-col cursor-pointer group hover:border-[#FFB800]/50 transition-all"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectGame(mini1); }}
          >
            <div className="w-full aspect-video bg-[#333333] rounded-xl overflow-hidden mb-2 relative">
              <img
                src={mini1.thumbnail}
                alt={mini1.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-[#FFB800] truncate transition-colors">
              {mini1.title}
            </h4>
            <span className="text-[10px] text-gray-400 mt-0.5 capitalize">{mini1.category}</span>
          </div>
        )}

        {/* 5. Bottom Bento Mini Card 2 */}
        {mini2 && (
          <div
            id={`bento-mini-2-${mini2.slug}`}
            onClick={() => onSelectGame(mini2)}
            className="col-span-6 sm:col-span-3 rounded-2xl border border-gray-800 bg-[#222222] p-3.5 flex flex-col cursor-pointer group hover:border-[#FFB800]/50 transition-all"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectGame(mini2); }}
          >
            <div className="w-full aspect-video bg-[#333333] rounded-xl overflow-hidden mb-2 relative">
              <img
                src={mini2.thumbnail}
                alt={mini2.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-[#FFB800] truncate transition-colors">
              {mini2.title}
            </h4>
            <span className="text-[10px] text-gray-400 mt-0.5 capitalize">{mini2.category}</span>
          </div>
        )}

        {/* 6. Bottom Bento Mini Card 3 */}
        {mini3 && (
          <div
            id={`bento-mini-3-${mini3.slug}`}
            onClick={() => onSelectGame(mini3)}
            className="col-span-6 sm:col-span-3 rounded-2xl border border-gray-800 bg-[#222222] p-3.5 flex flex-col cursor-pointer group hover:border-[#FFB800]/50 transition-all"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectGame(mini3); }}
          >
            <div className="w-full aspect-video bg-[#333333] rounded-xl overflow-hidden mb-2 relative">
              <img
                src={mini3.thumbnail}
                alt={mini3.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-[#FFB800] truncate transition-colors">
              {mini3.title}
            </h4>
            <span className="text-[10px] text-gray-400 mt-0.5 capitalize">{mini3.category}</span>
          </div>
        )}

        {/* 7. Bottom Bento Stat & Explore Tile */}
        <div
          id="bento-explore-tile"
          onClick={onExploreMore}
          className="col-span-6 sm:col-span-3 rounded-2xl border border-gray-800 bg-[#FFB800] p-4 flex flex-col justify-center items-center text-black cursor-pointer group hover:brightness-110 transition-all shadow-lg"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onExploreMore(); }}
        >
          <span className="text-3xl sm:text-4xl font-display font-black tracking-tight">20K+</span>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider mt-0.5 text-black/90">
            More Games
          </span>
          <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center mt-2 group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
        </div>

      </div>
    </section>
  );
};
