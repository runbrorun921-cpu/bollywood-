import React, { useState } from 'react';
import { 
  Heart, ThumbsUp, Share2, ShieldAlert, Sparkles, Star, 
  ChevronRight, Gamepad2, Info, MessageSquare, Send, Check,
  Calendar, User
} from 'lucide-react';
import { Game, UserReview } from '../types';
import { GamePlayer } from './GamePlayer';
import { GameCard } from './GameCard';

interface GameDetailViewProps {
  game: Game;
  relatedGames: Game[];
  onSelectGame: (game: Game) => void;
  onNavigateHome: () => void;
  onNavigateCategory: (cat: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, game: Game) => void;
  onEarnCoins: (amount: number) => void;
}

const INITIAL_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    gameId: 'bolly-cinequiz',
    userName: 'Aarav Sharma',
    avatar: 'A',
    rating: 5,
    comment: 'Super fun dialogue questions! Loved the Crime Master Gogo quote.',
    createdAt: '2 hours ago',
    likes: 14
  },
  {
    id: 'rev-2',
    gameId: 'bolly-cinequiz',
    userName: 'Pooja Verma',
    avatar: 'P',
    rating: 5,
    comment: 'Runs super smooth on my iPhone without downloading anything. 10/10!',
    createdAt: 'Yesterday',
    likes: 8
  },
  {
    id: 'rev-3',
    gameId: 'mumbai-rickshaw',
    userName: 'Rohan Kulkarni',
    avatar: 'R',
    rating: 5,
    comment: 'The Mumbai street background and dodging buses is hilarious and addictive!',
    createdAt: '3 days ago',
    likes: 19
  }
];

export const GameDetailView: React.FC<GameDetailViewProps> = ({
  game,
  relatedGames,
  onSelectGame,
  onNavigateHome,
  onNavigateCategory,
  isFavorite,
  onToggleFavorite,
  onEarnCoins,
}) => {
  const [likes, setLikes] = useState(game.likesCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Reviews state
  const [reviews, setReviews] = useState<UserReview[]>(INITIAL_REVIEWS);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(l => l + 1);
      setHasLiked(true);
      onEarnCoins(5);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      gameId: game.id,
      userName: reviewerName.trim() || 'Desi Gamer',
      avatar: (reviewerName.trim() || 'D').charAt(0).toUpperCase(),
      rating: newRating,
      comment: newComment.trim(),
      createdAt: 'Just now',
      likes: 0
    };

    setReviews([newRev, ...reviews]);
    setNewComment('');
    setCommentSubmitted(true);
    onEarnCoins(20); // Reward for writing review
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400">
        <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => onNavigateCategory(game.category)}
          className="hover:text-white capitalize transition-colors cursor-pointer"
        >
          {game.category.replace('-', ' ')}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#FFB800] font-semibold truncate max-w-[200px] sm:max-w-none">
          {game.title}
        </span>
      </nav>

      {/* 2. Primary Game Player */}
      <GamePlayer game={game} onEarnCoins={onEarnCoins} />

      {/* 3. Game Title, Ratings & Social Actions Bar */}
      <div className="bg-[#1a1a1a] rounded-2xl p-5 sm:p-6 border border-gray-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Title & Badges */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white">
              {game.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-green-500 text-white font-black text-xs">
              {game.rating}% Score
            </span>
            {game.ageRating && (
              <span className="px-2 py-0.5 rounded-md bg-[#222222] text-gray-300 text-xs font-bold border border-gray-700">
                {game.ageRating}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="capitalize font-semibold text-[#FFB800] bg-[#222222] px-2.5 py-0.5 rounded-full border border-gray-700">
              {game.category.replace('-', ' ')}
            </span>
            <span>•</span>
            <span>By <strong>{game.developer}</strong></span>
            <span>•</span>
            <span>{(game.playsCount / 1000).toFixed(1)}k Plays</span>
            <span>•</span>
            <span>Released: {game.releaseDate}</span>
          </div>
        </div>

        {/* Action Buttons: Like, Favorite, Share */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Like Button */}
          <button
            id="game-like-btn"
            onClick={handleLike}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              hasLiked
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-[#222222] hover:bg-[#282828] text-gray-200 border border-gray-700'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-white' : ''}`} />
            <span>{likes}</span>
          </button>

          {/* Favorite Toggle */}
          <button
            id="game-favorite-toggle-btn"
            onClick={(e) => onToggleFavorite(e, game)}
            className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isFavorite
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-[#222222] hover:bg-[#282828] text-gray-200 border border-gray-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            <span>{isFavorite ? 'Saved' : 'Favorite'}</span>
          </button>

          {/* Share Button */}
          <button
            id="game-share-btn"
            onClick={handleShare}
            className="px-4 py-2 bg-[#222222] hover:bg-[#282828] text-gray-200 border border-gray-700 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-[#FFB800]" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>

        </div>
      </div>

      {/* 4. Instructions & Controls Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Description & Instructions */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-lg space-y-4">
            <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-[#FFB800]" />
              <span>About {game.title}</span>
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {game.description}
            </p>

            <h3 className="text-sm font-bold text-white uppercase tracking-wider pt-2 border-t border-gray-800">
              How to Play & Objective
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {game.instructions}
            </p>

            {/* Tag Pills */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {game.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#222222] text-gray-300 text-xs border border-gray-700 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 5. User Reviews & Rating Widget */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h2 className="text-lg font-display font-black text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FFB800]" />
                <span>Player Reviews ({reviews.length})</span>
              </h2>
              <div className="flex items-center gap-1 text-sm font-black text-[#FFB800]">
                <Star className="w-4 h-4 fill-[#FFB800]" />
                <span>4.9 / 5.0</span>
              </div>
            </div>

            {/* Submit a Review Form */}
            <form onSubmit={handleAddReview} className="bg-[#222222] p-4 rounded-2xl border border-gray-800 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-300">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-gray-500 hover:text-[#FFB800] transition-colors cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${star <= newRating ? 'fill-[#FFB800] text-[#FFB800]' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Your Name (optional)"
                  className="w-full sm:w-48 bg-[#1a1a1a] border border-gray-700 rounded-full px-3.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write what you think of this game..."
                  className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-full px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFB800] hover:bg-amber-400 text-black font-extrabold text-xs rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post (+20 🪙)</span>
                </button>
              </div>

              {commentSubmitted && (
                <div className="text-xs text-green-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Thanks for your review! +20 coins added to your balance.
                </div>
              )}
            </form>

            {/* Reviews List */}
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-2xl bg-[#222222] border border-gray-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFB800] text-black font-black text-xs flex items-center justify-center shrink-0">
                    {rev.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{rev.userName}</span>
                      <span className="text-[10px] text-gray-500">{rev.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-0.5 my-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? 'fill-[#FFB800] text-[#FFB800]' : 'text-gray-700'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Col: Controls Guide & Specs */}
        <div className="space-y-6">
          
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-lg space-y-4">
            <h2 className="text-base font-display font-black text-white flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-[#FFB800]" />
              <span>Game Controls</span>
            </h2>

            <div className="space-y-3 text-xs">
              {game.controls.keyboard && (
                <div className="p-3.5 rounded-2xl bg-[#222222] border border-gray-800">
                  <span className="font-bold text-[#FFB800] block mb-1">⌨️ Keyboard</span>
                  <span className="text-gray-300">{game.controls.keyboard}</span>
                </div>
              )}

              {game.controls.mouse && (
                <div className="p-3.5 rounded-2xl bg-[#222222] border border-gray-800">
                  <span className="font-bold text-amber-300 block mb-1">🖱️ Mouse</span>
                  <span className="text-gray-300">{game.controls.mouse}</span>
                </div>
              )}

              {game.controls.touch && (
                <div className="p-3.5 rounded-2xl bg-[#222222] border border-gray-800">
                  <span className="font-bold text-green-400 block mb-1">📱 Touch / Mobile</span>
                  <span className="text-gray-300">{game.controls.touch}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-lg space-y-3 text-xs">
            <h3 className="font-bold text-white uppercase tracking-wider">Game Specifications</h3>
            <div className="divide-y divide-gray-800 text-gray-400">
              <div className="py-2 flex justify-between">
                <span>Platform</span>
                <span className="text-white font-medium">HTML5 / WebGL</span>
              </div>
              <div className="py-2 flex justify-between">
                <span>Download Required</span>
                <span className="text-green-400 font-bold">No (Instant Play)</span>
              </div>
              <div className="py-2 flex justify-between">
                <span>Price</span>
                <span className="text-[#FFB800] font-bold">100% Free</span>
              </div>
              <div className="py-2 flex justify-between">
                <span>Developer</span>
                <span className="text-white font-medium">{game.developer}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 6. "You Might Also Like" Related Games Grid */}
      <section className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#FFB800]" />
          <h2 className="text-xl font-display font-black text-white">
            You Might Also Like
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {relatedGames.slice(0, 6).map((rel) => (
            <GameCard
              key={rel.id}
              game={rel}
              onSelect={onSelectGame}
              isFavorite={false}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
