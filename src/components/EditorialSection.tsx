import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2, ShieldCheck, Sparkles, Trophy, Gamepad2, Award } from 'lucide-react';
import { Game } from '../types';

interface EditorialSectionProps {
  onSelectGameBySlug?: (slug: string) => void;
}

export const TOP_PICKS = [
  { rank: 1, title: "Bollywood CineQuiz Challenge", slug: "bollywood-cinequiz-challenge", desc: "Master iconic dialogue trivia, box office records, and classic film scenes from Sholay to DDLJ." },
  { rank: 2, title: "Mumbai Auto Rickshaw Rush", slug: "mumbai-rickshaw-rush", desc: "High-octane endless street runner dodging buses, monsoon rain, and chaotic Mumbai city traffic." },
  { rank: 3, title: "Gully Cricket 2D Champions", slug: "gully-cricket-champions", desc: "Realistic alley cricket batting mechanics with rooftop sixes, tight spin balls, and over-the-wall boundaries." },
  { rank: 4, title: "Bollywood Red Carpet Stylist", slug: "bollywood-star-stylist", desc: "Design Filmfare & Cannes gala looks with royal bridal lehengas, silk sherwanis, and diamond jewelry." },
  { rank: 5, title: "Royal Ludo Club Pro", slug: "ludo-royal-club-pro", desc: "Roll lucky sixes in the timeless family board game with 2-player pass & play or smart AI opponents." },
  { rank: 6, title: "Rangoli Jewel Blast", slug: "rangoli-jewel-blast", desc: "Festive match-3 puzzle swapping Diwali diyas, marigold petals, and triggering glowing chakra cascades." },
  { rank: 7, title: "Desi Dhaba Master Chef", slug: "dhaba-tycoon-chef", desc: "Cook sizzling butter chicken, tandoori naan, and masala chai in a fast-paced highway restaurant simulator." },
  { rank: 8, title: "Snake Arena Slither .io", slug: "snake-arena-slither-io", desc: "Multiplayer glowing neon snake arena battling for top global leaderboard supremacy." },
  { rank: 9, title: "Desi Wordle Bollywood Edition", slug: "desi-wordle-bollywood", desc: "Guess 5-letter Hindi cinema words, legendary movie titles, and superstar names in 6 smart tries." },
  { rank: 10, title: "Indian Express Train Simulator", slug: "indian-express-train-sim", desc: "Drive 5,000 HP electric locomotives through scenic mountain ghats with realistic signal controls." }
];

export const FAQS = [
  {
    question: "Is BollywoodGame free to play?",
    answer: "Yes, 100% of the games on BollywoodGame.online are completely free. You can play unlimited sessions on any game without subscriptions, in-app purchases, or credit card requirements."
  },
  {
    question: "Do I need to download or install any files to play?",
    answer: "No downloads or installations are needed. Every game runs directly inside your web browser using modern HTML5, WebAssembly, and WebGL technologies."
  },
  {
    question: "Can I play BollywoodGame on mobile phones and tablets?",
    answer: "Yes! All games are built with responsive mobile layouts and touch controls, fully supporting iOS Safari, Android Chrome, tablets, and desktop computers."
  },
  {
    question: "Is BollywoodGame safe for kids and families?",
    answer: "Yes. All games are strictly vetted and display explicit age-rating badges (All Ages, 13+, 18+). We maintain a family-friendly environment with zero malware or intrusive popups."
  },
  {
    question: "How many games are available on BollywoodGame?",
    answer: "BollywoodGame hosts an expansive library of 5,000+ curated web games across 18+ distinct categories including Bollywood Specials, Cricket, Racing, Puzzles, Action, and 2-Player games, with new titles added regularly."
  }
];

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onSelectGameBySlug }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <article className="w-full mt-12 pt-10 border-t border-gray-800 text-gray-300 space-y-10">
      
      {/* 1. SEO Platform H1 & Editorial Introduction */}
      <section className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FFB800] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>About BollywoodGame.online</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight mb-4 leading-snug">
          Free Online Games — Play Bollywood-Themed Browser Games
        </h1>

        <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-4xl">
          <p>
            Welcome to <strong>BollywoodGame.online</strong>, your premier destination for free browser games celebrating the vibrant spirit of Indian pop culture, Bollywood cinema, and world-class HTML5 arcade entertainment. We bring you instant access to thousands of exciting games with zero downloads, no installations, and seamless performance across mobile phones, tablets, and desktop screens.
          </p>
          <p>
            Whether you want to test your film trivia in the <em>Bollywood CineQuiz</em>, weave through Mumbai traffic in <em>Auto Rickshaw Rush</em>, hit over-the-roof sixes in <em>Gully Cricket</em>, or relax with <em>Rangoli Jewel Match</em>, our catalog is designed for instant fun and endless replayability.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#2a2a2a] text-[#FFB800] border border-gray-700 shrink-0">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white mb-0.5">Instant Web Play</h2>
              <p className="text-xs text-gray-400">Zero waiting. Click play and start gaming in less than two seconds.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 border border-green-500/30 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white mb-0.5">100% Free & Safe</h2>
              <p className="text-xs text-gray-400">Clear age ratings, family-friendly options, and virus-free HTML5 code.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/10 text-red-400 border border-red-500/30 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white mb-0.5">Bollywood & Desi Classics</h2>
              <p className="text-xs text-gray-400">Exclusive cinema quizzes, cricket matches, and traditional festival games.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top 10 Picks List */}
      <section className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FFB800] uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>Editor's Choice</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-black text-white mb-6">
          Top 10 Free Online Games on BollywoodGame
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {TOP_PICKS.map((item) => (
            <div
              key={item.rank}
              onClick={() => onSelectGameBySlug?.(item.slug)}
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#222222] hover:bg-[#282828] border border-gray-800 hover:border-[#FFB800]/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-[#2a2a2a] text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black font-black text-sm flex items-center justify-center shrink-0 border border-gray-700 transition-colors">
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white group-hover:text-[#FFB800] transition-colors truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Explore Categories Block */}
      <section className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-display font-black text-white mb-4">
          Explore Diverse Browser Game Genres
        </h2>
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            Whether you love high-speed highway drifts in our <strong>Racing games</strong>, strategic fortress maneuvers in <strong>Strategy & RPG</strong>, or rolling lucky dice in <strong>Board & 2-Player games</strong>, BollywoodGame is categorized for easy navigation.
          </p>
          <p>
            Our dedicated <strong>Bollywood Specials</strong> section celebrates everything Indian cinema, from retro dialogue trivia and Bollywood box-office riddles to Red Carpet celebrity fashion styling and Punjabi dhol rhythm challenges.
          </p>
        </div>
      </section>

      {/* 4. AEO-Optimized Semantic FAQ Section */}
      <section className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 border border-gray-800 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FFB800] uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-black text-white mb-6">
          Frequently Asked Questions About BollywoodGame
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#222222] border border-gray-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#282828] transition-colors"
                >
                  <h3 className="text-sm sm:text-base font-bold text-white pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FFB800] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </article>
  );
};
