import React, { useState } from 'react';
import { X, Sparkles, Coins, Gift, Check, Trophy, User, Gamepad2, Send, ShieldCheck, Heart } from 'lucide-react';
import { Game } from '../types';

/* --- 1. LOGIN / PROFILE MODAL --- */
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; avatar: string; loggedIn: boolean } | null;
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
  coins: number;
  playedCount: number;
  favoritesCount: number;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  coins,
  playedCount,
  favoritesCount,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin(name.trim(), email.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#222222] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {user?.loggedIn ? (
          /* Logged In Profile View */
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFB800] flex items-center justify-center text-black font-black text-2xl shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{user.name}</h3>
                <span className="text-xs text-gray-400 font-medium">BollywoodGame Member</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#222222] p-3 rounded-2xl border border-gray-800 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Coins</span>
                <span className="text-lg font-black text-[#FFB800]">{coins} 🪙</span>
              </div>
              <div className="bg-[#222222] p-3 rounded-2xl border border-gray-800 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Played</span>
                <span className="text-lg font-black text-white">{playedCount}</span>
              </div>
              <div className="bg-[#222222] p-3 rounded-2xl border border-gray-800 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Favorites</span>
                <span className="text-lg font-black text-rose-400">{favoritesCount}</span>
              </div>
            </div>

            <button
              onClick={() => { onLogout(); onClose(); }}
              className="w-full py-2.5 bg-[#222222] hover:bg-[#282828] border border-gray-700 text-gray-300 font-bold text-xs rounded-full transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        ) : (
          /* Login Form */
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#2a2a2a] text-[#FFB800] flex items-center justify-center mx-auto mb-2 border border-gray-700">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Join BollywoodGame</h3>
              <p className="text-xs text-gray-400 mt-1">
                Save your high scores, earn daily coins, and favorite games across devices!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Gamer Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. RahulGamer"
                  className="w-full bg-[#222222] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com (optional)"
                  className="w-full bg-[#222222] border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FFB800] hover:bg-amber-400 text-black font-extrabold text-sm rounded-full transition-transform active:scale-95 shadow-lg cursor-pointer"
              >
                Create Account / Log In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

/* --- 2. DAILY BONUS COIN REWARD MODAL --- */
interface DailyBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (amount: number) => void;
  currentCoins: number;
}

export const DailyBonusModal: React.FC<DailyBonusModalProps> = ({
  isOpen,
  onClose,
  onClaim,
  currentCoins,
}) => {
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  const handleClaim = () => {
    onClaim(100);
    setClaimed(true);
    setTimeout(() => {
      setClaimed(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-amber-500/40 rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#222222] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-[#2a2a2a] text-[#FFB800] flex items-center justify-center mx-auto mb-3 border border-amber-500/40">
          <Gift className="w-7 h-7" />
        </div>

        <h3 className="text-2xl font-black text-white mb-1">Daily Lucky Bonus!</h3>
        <p className="text-xs text-gray-300 mb-6">
          Come back every day to claim free Bollywood coins to customize your profile and unlock rewards.
        </p>

        <div className="p-4 rounded-2xl bg-[#222222] border border-amber-500/40 mb-6">
          <span className="text-xs text-amber-300 font-bold block mb-1">Today's Reward</span>
          <span className="text-3xl font-black text-[#FFB800] flex items-center justify-center gap-1.5">
            <Coins className="w-6 h-6" /> +100 Coins
          </span>
        </div>

        <button
          onClick={handleClaim}
          disabled={claimed}
          className={`w-full py-3 rounded-full font-extrabold text-sm transition-all cursor-pointer ${
            claimed
              ? 'bg-emerald-600 text-white'
              : 'bg-[#FFB800] hover:bg-amber-400 text-black shadow-lg shadow-[#FFB800]/20 active:scale-95'
          }`}
        >
          {claimed ? '🎉 Claimed 100 Coins!' : 'Claim 100 Coins Now'}
        </button>
      </div>
    </div>
  );
};

/* --- 3. SUBMIT / ADD GAME MODAL --- */
interface SubmitGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitNewGame: (newGame: Partial<Game>) => void;
}

export const SubmitGameModal: React.FC<SubmitGameModalProps> = ({
  isOpen,
  onClose,
  onSubmitNewGame,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('action');
  const [embedUrl, setEmbedUrl] = useState('');
  const [developer, setDeveloper] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmitNewGame({
      title: title.trim(),
      category: category as any,
      playUrl: embedUrl.trim() || undefined,
      developer: developer.trim() || 'Independent Creator'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#222222] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] text-[#FFB800] border border-gray-700 flex items-center justify-center">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Submit an HTML5 Game</h3>
            <p className="text-xs text-gray-400">Publish your browser game to BollywoodGame.online</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Game Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Masala Cricket Derby"
              className="w-full bg-[#222222] border border-gray-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#FFB800]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Genre Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#222222] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
              >
                <option value="bollywood">Bollywood Specials</option>
                <option value="action">Action</option>
                <option value="sports">Sports / Cricket</option>
                <option value="racing">Racing</option>
                <option value="puzzle">Puzzle</option>
                <option value="match-3">Match-3</option>
                <option value="quiz">Quiz</option>
                <option value="girls">Girls & Fashion</option>
                <option value="simulation">Simulation</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Studio / Author</label>
              <input
                type="text"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                placeholder="Developer name"
                className="w-full bg-[#222222] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1">Playable Embed URL (HTTPS iframe)</label>
            <input
              type="url"
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              placeholder="https://example.com/game-embed"
              className="w-full bg-[#222222] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
            />
            <p className="text-[10px] text-gray-400 mt-1">Optional: Leave blank to use our default game engine template.</p>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3 bg-[#FFB800] hover:bg-amber-400 text-black font-extrabold text-sm rounded-full transition-all cursor-pointer"
          >
            {submitted ? '✓ Game Added Successfully!' : 'Publish Game to Portal'}
          </button>
        </form>
      </div>
    </div>
  );
};
