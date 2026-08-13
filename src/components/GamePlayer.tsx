import React, { useState, useRef, useEffect } from 'react';
import { Play, Maximize2, Minimize2, RotateCcw, AlertTriangle, Smartphone, ShieldCheck, Gamepad2, Volume2, VolumeX } from 'lucide-react';
import { Game } from '../types';
import { MiniGameRenderer } from './interactive/MiniGames';
import { trackGameStart } from '../lib/gameProviders';

interface GamePlayerProps {
  game: Game;
  onEarnCoins?: (amount: number) => void;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ game, onEarnCoins }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state when game changes
  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(false);
    setHasError(false);
    setIsFullscreen(false);
  }, [game.id]);

  // Handle Fullscreen toggle
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  // Listen for fullscreen change event (e.g. Esc key)
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleStartPlay = () => {
    setIsLoading(true);
    setHasError(false);
    trackGameStart(game.id, game.title);

    // Simulate quick loading and reward
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
      onEarnCoins?.(10);
    }, 600);
  };

  const handleGameOver = (score: number) => {
    const bonus = Math.floor(score / 10);
    if (bonus > 0) onEarnCoins?.(bonus);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : ''
      }`}
    >
      {/* 1. Click-to-Play Overlay (Before Start) */}
      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden">
          {/* Blurred Background Artwork */}
          <img
            src={game.thumbnail}
            alt={game.title}
            className="absolute inset-0 w-full h-full object-cover filter blur-md scale-105 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />

          {/* Central Hero Play Trigger */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-lg">
            
            {/* Play Button Icon */}
            <button
              id="game-start-play-btn"
              onClick={handleStartPlay}
              disabled={isLoading}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#E63946] to-[#FFB800] p-1 shadow-2xl shadow-[#FFB800]/30 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center cursor-pointer group mb-4"
              aria-label={`Play ${game.title}`}
            >
              <div className="w-full h-full bg-[#141416] rounded-full flex items-center justify-center group-hover:bg-transparent transition-colors">
                <Play className="w-10 h-10 text-[#FFB800] group-hover:text-black fill-current ml-1 transition-colors" />
              </div>
            </button>

            <h2 className="text-xl sm:text-2xl font-display font-black text-white mb-2">
              {game.title}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 mb-4 line-clamp-2 max-w-md">
              {game.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="bg-[#202026] text-neutral-300 px-3 py-1 rounded-full border border-neutral-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free & Safe
              </span>
              <span className="bg-[#202026] text-neutral-300 px-3 py-1 rounded-full border border-neutral-700 font-semibold flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-[#FFB800]" /> Mobile & Desktop
              </span>
              <span className="bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-700/60 font-bold">
                ★ {game.rating}% Rating
              </span>
            </div>

            {isLoading && (
              <div className="mt-4 flex items-center gap-2 text-xs text-[#FFB800] font-bold animate-pulse">
                <div className="w-4 h-4 border-2 border-[#FFB800] border-t-transparent rounded-full animate-spin" />
                <span>Loading Game Engine...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Active Game Arena (Interactive Canvas or Iframe) */}
      {isPlaying && !hasError && (
        <div className="w-full h-full relative">
          {game.playUrl ? (
            <iframe
              src={game.playUrl}
              title={game.title}
              className="w-full h-full border-0"
              allow="fullscreen; autoplay; gamepad; microphone; camera"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
              onError={() => setHasError(true)}
            />
          ) : (
            <MiniGameRenderer game={game} onGameOver={handleGameOver} />
          )}

          {/* In-Game Floating Top Toolbar */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-white/10 z-30 opacity-70 hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsPlaying(false)}
              className="p-1.5 text-neutral-300 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              title="Restart Game"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-neutral-300 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-neutral-300 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* 3. Error Fallback State */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-6 text-center z-30">
          <AlertTriangle className="w-12 h-12 text-rose-500 mb-2" />
          <h3 className="text-lg font-bold text-white mb-1">Game Couldn't Load</h3>
          <p className="text-xs text-neutral-400 mb-4 max-w-sm">
            There was a connection hiccup with the game server. You can retry loading or play another title.
          </p>
          <button
            onClick={handleStartPlay}
            className="px-5 py-2 bg-[#FFB800] text-black font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Retry Game
          </button>
        </div>
      )}
    </div>
  );
};
