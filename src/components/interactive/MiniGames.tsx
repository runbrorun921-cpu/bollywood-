import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../../types';
import { Trophy, RefreshCw, Star, Heart, Volume2, VolumeX, Sparkles, CheckCircle2, XCircle, ArrowRight, Play, Award, Zap } from 'lucide-react';

interface MiniGameProps {
  game: Game;
  onGameOver?: (score: number) => void;
}

export const MiniGameRenderer: React.FC<MiniGameProps> = ({ game, onGameOver }) => {
  const type = game.miniGameType;

  if (type === 'cinequiz') {
    return <CineQuizGame onGameOver={onGameOver} />;
  }
  if (type === 'cricket') {
    return <GullyCricketGame onGameOver={onGameOver} />;
  }
  if (type === 'rickshaw') {
    return <RickshawRushGame onGameOver={onGameOver} />;
  }
  if (type === 'dressup') {
    return <DressUpGame />;
  }
  if (type === 'rangoli') {
    return <RangoliMatchGame onGameOver={onGameOver} />;
  }
  if (type === 'wordle') {
    return <DesiWordleGame onGameOver={onGameOver} />;
  }
  if (type === 'dholbeat') {
    return <DholBeatGame onGameOver={onGameOver} />;
  }

  // Default interactive arcade canvas
  return <GenericArcadeGame game={game} onGameOver={onGameOver} />;
};

/* --- 1. BOLLYWOOD CINEQUIZ GAME --- */
const QUIZ_QUESTIONS = [
  {
    question: "Which movie features the iconic dialogue: 'Mogambo khush hua'?",
    options: ["Sholay", "Mr. India", "Don", "Deewaar"],
    answer: 1,
    trivia: "Amrish Puri's dialogue in Mr. India (1987) became one of the most quoted villain lines in cinema history!"
  },
  {
    question: "Complete the dialogue: 'Kitne aadmi the...?'",
    options: ["Sardar", "Kalia", "Sambha", "Thakur"],
    answer: 2,
    trivia: "Gabbar Singh (Amjad Khan) asks Sambha on the hilltop in Sholay (1975)."
  },
  {
    question: "Which movie is famous for the dialogue: 'Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hain, Senorita'?",
    options: ["Kabhi Khushi Kabhie Gham", "Dilwale Dulhania Le Jayenge", "Kuch Kuch Hota Hai", "Kal Ho Naa Ho"],
    answer: 1,
    trivia: "Raj (Shah Rukh Khan) delivers this famous romantic one-liner to Simran (Kajol) in DDLJ."
  },
  {
    question: "Who played the legendary role of 'Crime Master Gogo' in Andaz Apna Apna?",
    options: ["Paresh Rawal", "Shakti Kapoor", "Johnny Lever", "Kader Khan"],
    answer: 1,
    trivia: "Aankhen nikaal ke gotiyan khelunga! Shakti Kapoor made Crime Master Gogo a cult comedy icon."
  },
  {
    question: "Which film won India's first nomination for the Academy Award for Best Foreign Language Film in 1957?",
    options: ["Mother India", "Mughal-e-Azam", "Pather Panchali", "Do Bigha Zamin"],
    answer: 0,
    trivia: "Directed by Mehboob Khan, Mother India starring Nargis came within one vote of winning the Oscar!"
  },
  {
    question: "'Pushpa, I hate tears re!' is an emotional classic line from which Rajesh Khanna film?",
    options: ["Anand", "Aradhana", "Amar Prem", "Kati Patang"],
    answer: 2,
    trivia: "Rajesh Khanna said this to Sharmila Tagore in Amar Prem (1972)."
  }
];

function CineQuizGame({ onGameOver }: { onGameOver?: (score: number) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver || isAnswered) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIdx, isAnswered, gameOver]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setSelectedOpt(-1);
    setStreak(0);
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    const correct = idx === QUIZ_QUESTIONS[currentIdx].answer;
    if (correct) {
      const bonus = timeLeft * 10;
      const pts = 100 + bonus + streak * 25;
      setScore(s => s + pts);
      setStreak(st => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(i => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setGameOver(true);
      onGameOver?.(score);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setTimeLeft(15);
    setGameOver(false);
  };

  const q = QUIZ_QUESTIONS[currentIdx];

  return (
    <div className="w-full h-full bg-[#16161a] text-white flex flex-col items-center justify-center p-4 md:p-8 select-none relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />

      {!gameOver ? (
        <div className="w-full max-w-xl z-10 flex flex-col">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4 bg-[#202026] px-4 py-2.5 rounded-xl border border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FFB800]">Question</span>
              <span className="text-sm font-bold text-white">{currentIdx + 1}/{QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-800/40">
                <Zap className="w-3.5 h-3.5" />
                <span>{streak}x Streak</span>
              </div>
              <div className="text-sm font-black text-[#FFB800]">
                {score} pts
              </div>
            </div>
          </div>

          {/* Timer bar */}
          <div className="w-full bg-neutral-800 h-2 rounded-full mb-6 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 rounded-full ${
                timeLeft > 7 ? 'bg-[#FFB800]' : timeLeft > 3 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-[#202026] border border-neutral-700/60 rounded-2xl p-6 mb-5 shadow-xl">
            <h3 className="text-lg md:text-xl font-bold text-center leading-relaxed text-white">
              {q.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === q.answer;
              let btnStyle = 'bg-[#22222a] border-neutral-700 text-neutral-200 hover:bg-[#2c2c36] hover:border-[#FFB800]/50';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/50';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                } else {
                  btnStyle = 'bg-[#1a1a20] border-neutral-800 text-neutral-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-3.5 rounded-xl border font-semibold text-sm md:text-base text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Trivia explanation & Next button */}
          {isAnswered && (
            <div className="bg-amber-950/20 border border-[#FFB800]/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
              <p className="text-xs text-amber-200/90 text-left">
                🎬 <span className="font-semibold">Filmi Fact:</span> {q.trivia}
              </p>
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-5 py-2 bg-[#FFB800] hover:bg-[#e5a600] text-black font-black text-sm rounded-lg flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-lg cursor-pointer"
              >
                <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'Finish' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="text-center z-10 max-w-md bg-[#202026] border border-neutral-700/60 p-8 rounded-2xl shadow-2xl">
          <div className="w-16 h-16 bg-[#FFB800]/20 border border-[#FFB800] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#FFB800]">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-1">Blockbuster Performance!</h2>
          <p className="text-neutral-400 text-sm mb-4">You proved your true Bollywood cinema knowledge!</p>

          <div className="bg-[#16161a] p-4 rounded-xl mb-6 border border-neutral-800">
            <div className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-1">Total Score</div>
            <div className="text-4xl font-black text-[#FFB800]">{score}</div>
          </div>

          <button
            onClick={restart}
            className="w-full py-3 bg-[#FFB800] hover:bg-[#e5a600] text-black font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* --- 2. GULLY CRICKET 2D GAME --- */
function GullyCricketGame({ onGameOver }: { onGameOver?: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [feedback, setFeedback] = useState<string>('Tap SWING when ball enters Green Zone!');
  const [isLive, setIsLive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const gameState = useRef({
    ballX: 100,
    ballY: 140,
    ballVx: 0,
    ballVy: 0,
    inFlight: false,
    pitching: false,
    batAngle: 0,
    isSwinging: false,
    targetZone: { minX: 380, maxX: 440 }
  });

  const startNextBall = () => {
    if (wickets >= 3 || balls >= 12) {
      setIsGameOver(true);
      onGameOver?.(runs);
      return;
    }
    const gs = gameState.current;
    gs.ballX = 80;
    gs.ballY = 160;
    gs.ballVx = 5.5 + Math.random() * 2.5;
    gs.ballVy = (Math.random() - 0.5) * 1.5;
    gs.inFlight = true;
    gs.pitching = true;
    setBalls(b => b + 1);
  };

  const handleSwing = () => {
    const gs = gameState.current;
    if (!gs.inFlight) {
      if (!isLive) {
        setIsLive(true);
        startNextBall();
      }
      return;
    }

    gs.isSwinging = true;
    gs.batAngle = 45;

    // Check hit timing
    const dist = gs.ballX;
    if (dist >= 390 && dist <= 430) {
      // Perfect timing -> SIX!
      setFeedback('SIX! OUT OF THE ROOFTOP! 💥');
      setRuns(r => r + 6);
      gs.ballVx = 12;
      gs.ballVy = -8;
    } else if (dist >= 360 && dist <= 460) {
      // Four!
      setFeedback('FOUR! Beautiful boundary stroke! 🏏');
      setRuns(r => r + 4);
      gs.ballVx = 9;
      gs.ballVy = -4;
    } else if (dist >= 330 && dist <= 490) {
      // Single/Double
      const score = Math.random() > 0.5 ? 2 : 1;
      setFeedback(`${score} Run! Good placement in alley.`);
      setRuns(r => r + score);
      gs.ballVx = 6;
      gs.ballVy = 2;
    } else {
      // Out or Miss
      setFeedback('BOWLED! Timber knocked over! 🔴');
      setWickets(w => {
        const nw = w + 1;
        if (nw >= 3) {
          setIsGameOver(true);
          onGameOver?.(runs);
        }
        return nw;
      });
      gs.inFlight = false;
    }

    setTimeout(() => {
      gs.isSwinging = false;
      gs.batAngle = 0;
      if (!isGameOver && wickets < 3) {
        setTimeout(startNextBall, 1200);
      }
    }, 400);
  };

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Sky & Street Backdrop
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, 180);

      // Balconies & Buildings
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(30, 20, 90, 160);
      ctx.fillRect(150, 40, 80, 140);
      ctx.fillRect(440, 10, 100, 170);

      // Washing lines / Festive flags
      ctx.strokeStyle = '#FFB800';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, 60);
      ctx.quadraticCurveTo(280, 90, 540, 50);
      ctx.stroke();

      // Pitch / Ground
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 180, canvas.width, 120);

      // Pitch strip
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(60, 200, 420, 60);

      // Hit strike zone highlight
      ctx.fillStyle = 'rgba(34, 197, 94, 0.25)';
      ctx.fillRect(380, 195, 60, 70);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(380, 195, 60, 70);

      // Draw Stumps
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(450, 180, 5, 45);
      ctx.fillRect(458, 180, 5, 45);
      ctx.fillRect(466, 180, 5, 45);

      // Draw Bowler
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(80, 190, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(74, 202, 12, 30);

      // Draw Batsman
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(410, 185, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(402, 200, 16, 35);

      // Bat
      ctx.save();
      ctx.translate(415, 210);
      ctx.rotate((gameState.current.batAngle * Math.PI) / 180);
      ctx.fillStyle = '#d97706';
      ctx.fillRect(-4, -5, 8, 30);
      ctx.restore();

      // Ball update & draw
      const gs = gameState.current;
      if (gs.inFlight) {
        gs.ballX += gs.ballVx;
        gs.ballY += gs.ballVy;

        // Bounce
        if (gs.ballY > 230 && gs.pitching) {
          gs.ballVy = -Math.abs(gs.ballVy) * 0.8;
          gs.pitching = false;
        }

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(gs.ballX, gs.ballY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Ball passed batsman without swing
        if (gs.ballX > 480) {
          gs.inFlight = false;
          setFeedback('Dot ball! Missed the edge.');
          setTimeout(() => {
            if (!isGameOver && wickets < 3) startNextBall();
          }, 800);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isGameOver, wickets]);

  return (
    <div className="w-full h-full bg-[#0f172a] text-white flex flex-col items-center justify-center p-3 select-none">
      {/* Scoreboard Bar */}
      <div className="w-full max-w-lg flex items-center justify-between bg-[#1e293b] px-4 py-2 rounded-xl mb-2 border border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-[#FFB800]">{runs}/{wickets}</span>
          <span className="text-xs text-slate-400">({Math.floor(balls / 6)}.{balls % 6} Overs)</span>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 bg-slate-800 rounded-md text-amber-300 border border-slate-600">
          Target: 36 Runs (2 Overs)
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="relative w-full max-w-lg aspect-[16/9] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
        <canvas ref={canvasRef} width={560} height={300} className="w-full h-full object-cover" />

        {/* Live Feedback Overlay */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-[#FFB800] border border-amber-500/30">
          {feedback}
        </div>

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <Trophy className="w-12 h-12 text-[#FFB800] mb-2 animate-bounce" />
            <h3 className="text-2xl font-black text-white">Innings Completed!</h3>
            <p className="text-sm text-neutral-300 mb-4">Total Score: <strong className="text-[#FFB800] text-lg">{runs} Runs</strong></p>
            <button
              onClick={() => {
                setRuns(0);
                setWickets(0);
                setBalls(0);
                setIsGameOver(false);
                setIsLive(true);
                startNextBall();
              }}
              className="px-6 py-2.5 bg-[#FFB800] text-black font-extrabold rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Play Next Match
            </button>
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="w-full max-w-lg mt-3 flex gap-3">
        <button
          onClick={handleSwing}
          className="flex-1 py-3 bg-[#E63946] hover:bg-red-600 text-white font-black text-base rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🏏 SWING BAT</span>
        </button>
      </div>
    </div>
  );
}

/* --- 3. MUMBAI AUTO RICKSHAW RUSH --- */
function RickshawRushGame({ onGameOver }: { onGameOver?: (score: number) => void }) {
  const [lane, setLane] = useState(1); // 0, 1, 2
  const [distance, setDistance] = useState(0);
  const [coins, setCoins] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const obstacles = useRef<{ id: number; lane: number; y: number; type: 'bus' | 'cow' | 'chai' }[]>([]);
  const animFrame = useRef<number | null>(null);

  const startGame = () => {
    setLane(1);
    setDistance(0);
    setCoins(0);
    setIsGameOver(false);
    setIsPlaying(true);
    obstacles.current = [
      { id: 1, lane: 0, y: 10, type: 'bus' },
      { id: 2, lane: 2, y: -40, type: 'chai' }
    ];
  };

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const interval = setInterval(() => {
      setDistance(d => d + 2);

      // Move obstacles
      obstacles.current.forEach(obs => {
        obs.y += 3.5;
      });

      // Spawn new
      if (Math.random() < 0.08 && obstacles.current.length < 5) {
        const types: ('bus' | 'cow' | 'chai')[] = ['bus', 'cow', 'chai'];
        const chosen = types[Math.floor(Math.random() * types.length)];
        const chosenLane = Math.floor(Math.random() * 3);
        obstacles.current.push({
          id: Date.now() + Math.random(),
          lane: chosenLane,
          y: -10,
          type: chosen
        });
      }

      // Filter out off-screen
      obstacles.current = obstacles.current.filter(obs => obs.y < 110);

      // Check collision with player at y = 80
      obstacles.current.forEach(obs => {
        if (obs.lane === lane && obs.y >= 75 && obs.y <= 90) {
          if (obs.type === 'chai') {
            setCoins(c => c + 1);
            obs.y = 200; // consumed
          } else {
            setIsGameOver(true);
            setIsPlaying(false);
            onGameOver?.(distance);
          }
        }
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver, lane, distance]);

  return (
    <div className="w-full h-full bg-[#1e1e24] text-white flex flex-col items-center justify-center p-3 select-none">
      {/* Top HUD */}
      <div className="w-full max-w-sm flex items-center justify-between bg-black/60 px-4 py-2 rounded-xl mb-2 border border-neutral-800 text-xs font-bold">
        <span className="text-[#FFB800]">Distance: {distance}m</span>
        <span className="text-emerald-400">☕ Chai: {coins}</span>
      </div>

      {/* Road View */}
      <div className="relative w-full max-w-sm aspect-[4/3] bg-neutral-900 rounded-2xl overflow-hidden border-2 border-neutral-700 shadow-2xl flex">
        {/* Lane 0, 1, 2 */}
        {[0, 1, 2].map(l => (
          <div key={l} className="flex-1 border-r border-dashed border-neutral-700 relative h-full">
            {/* Player Auto Rickshaw */}
            {lane === l && (
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl transition-all duration-150 transform hover:scale-105"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))' }}
              >
                🛺
              </div>
            )}

            {/* Obstacles in this lane */}
            {obstacles.current.filter(o => o.lane === l).map(obs => (
              <div
                key={obs.id}
                className="absolute left-1/2 -translate-x-1/2 text-2xl transition-transform"
                style={{ top: `${obs.y}%` }}
              >
                {obs.type === 'bus' ? '🚌' : obs.type === 'cow' ? '🐄' : '☕'}
              </div>
            ))}
          </div>
        ))}

        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-black text-[#FFB800] mb-2">Mumbai Rickshaw Rush</h3>
            <p className="text-xs text-neutral-300 mb-4">Dodge buses & cows, grab hot Chai!</p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-[#FFB800] text-black font-black rounded-xl hover:bg-amber-400 transition-transform active:scale-95 cursor-pointer"
            >
              START DRIVING
            </button>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-xl font-black text-rose-500 mb-1">Crash! Meter Down!</h3>
            <p className="text-xs text-neutral-300 mb-3">You drove {distance} meters and collected {coins} Chai cups.</p>
            <button
              onClick={startGame}
              className="px-5 py-2 bg-[#FFB800] text-black font-extrabold rounded-lg hover:bg-amber-400 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Steer controls */}
      <div className="w-full max-w-sm mt-3 flex gap-3">
        <button
          onClick={() => setLane(l => Math.max(0, l - 1))}
          className="flex-1 py-3 bg-[#2b2b36] hover:bg-[#383846] text-white font-black rounded-xl text-lg border border-neutral-700 cursor-pointer active:bg-[#FFB800] active:text-black transition-colors"
        >
          ⬅️ Left Lane
        </button>
        <button
          onClick={() => setLane(l => Math.min(2, l + 1))}
          className="flex-1 py-3 bg-[#2b2b36] hover:bg-[#383846] text-white font-black rounded-xl text-lg border border-neutral-700 cursor-pointer active:bg-[#FFB800] active:text-black transition-colors"
        >
          Right Lane ➡️
        </button>
      </div>
    </div>
  );
}

/* --- 4. BOLLYWOOD RED CARPET DRESS UP --- */
function DressUpGame() {
  const [selectedOutfit, setSelectedOutfit] = useState(0);
  const [selectedJewelry, setSelectedJewelry] = useState(0);
  const [selectedHairstyle, setSelectedHairstyle] = useState(0);
  const [selectedBackdrop, setSelectedBackdrop] = useState(0);

  const outfits = [
    { name: 'Royal Gold Sabyasachi Lehenga', color: 'from-amber-500 to-yellow-600', icon: '👗', emoji: '✨' },
    { name: 'Midnight Velvet Sherwani Gown', color: 'from-purple-900 to-indigo-950', icon: '👘', emoji: '🌟' },
    { name: 'Bollywood Crimson Silk Saree', color: 'from-red-600 to-rose-700', icon: '🥻', emoji: '💖' },
    { name: 'Modern Cannes Met Gala Dress', color: 'from-emerald-600 to-teal-800', icon: '💃', emoji: '💎' }
  ];

  const jewelries = [
    { name: 'Kundan Diamond Choker', emoji: '👑' },
    { name: 'Polki Royal Jhumkas', emoji: '💎' },
    { name: 'Emerald Rani Haar', emoji: '📿' },
    { name: 'Minimal Platinum Set', emoji: '💍' }
  ];

  const hairstyles = [
    { name: 'Classic Bollywood Waves', icon: '💇‍♀️' },
    { name: 'Royal Mogra Flower Bun', icon: '🌸' },
    { name: 'Sleek Red Carpet High Ponytail', icon: '✨' },
    { name: 'Traditional Rajputana Braid', icon: '💫' }
  ];

  const backdrops = [
    { name: 'Filmfare Black Lady Gala', bg: 'bg-gradient-to-b from-neutral-900 via-stone-900 to-black' },
    { name: 'Cannes French Riviera Carpet', bg: 'bg-gradient-to-b from-blue-900 via-indigo-950 to-neutral-900' },
    { name: 'Udaipur Palace Royal Wedding', bg: 'bg-gradient-to-b from-amber-900 via-orange-950 to-stone-950' }
  ];

  return (
    <div className="w-full h-full bg-[#18181c] text-white flex flex-col md:flex-row items-center justify-between p-4 gap-4 overflow-auto">
      {/* Model Display Viewport */}
      <div className={`w-full md:w-1/2 aspect-[4/5] rounded-2xl ${backdrops[selectedBackdrop].bg} border border-neutral-700 shadow-2xl relative flex flex-col items-center justify-center p-6 overflow-hidden`}>
        {/* Flashbulb paparazzi effect */}
        <div className="absolute top-4 left-4 text-xs bg-red-600/80 px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold animate-pulse">
          ● Live Paparazzi Cam
        </div>

        {/* Model Avatar */}
        <div className="relative flex flex-col items-center">
          <div className="text-5xl mb-1">{hairstyles[selectedHairstyle].icon}</div>
          <div className="text-3xl mb-1">{jewelries[selectedJewelry].emoji}</div>
          <div className={`w-32 h-44 rounded-3xl bg-gradient-to-b ${outfits[selectedOutfit].color} border-2 border-white/30 flex items-center justify-center text-5xl shadow-2xl transition-all duration-300`}>
            {outfits[selectedOutfit].icon}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-2.5 rounded-xl text-center border border-white/10">
          <div className="text-xs text-[#FFB800] font-bold">{outfits[selectedOutfit].name}</div>
          <div className="text-[11px] text-neutral-300">{jewelries[selectedJewelry].name} • {hairstyles[selectedHairstyle].name}</div>
        </div>
      </div>

      {/* Wardrobe Controls */}
      <div className="w-full md:w-1/2 flex flex-col gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#FFB800] mb-1.5 block">1. Outfits</label>
          <div className="grid grid-cols-2 gap-2">
            {outfits.map((o, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOutfit(idx)}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  selectedOutfit === idx ? 'bg-[#FFB800] text-black border-[#FFB800]' : 'bg-[#22222a] border-neutral-700 text-neutral-300 hover:bg-[#2c2c36]'
                }`}
              >
                {o.icon} {o.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#FFB800] mb-1.5 block">2. Royal Jewelry</label>
          <div className="grid grid-cols-2 gap-2">
            {jewelries.map((j, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedJewelry(idx)}
                className={`p-2 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  selectedJewelry === idx ? 'bg-[#FFB800] text-black border-[#FFB800]' : 'bg-[#22222a] border-neutral-700 text-neutral-300 hover:bg-[#2c2c36]'
                }`}
              >
                {j.emoji} {j.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#FFB800] mb-1.5 block">3. Red Carpet Location</label>
          <div className="grid grid-cols-3 gap-1.5">
            {backdrops.map((b, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedBackdrop(idx)}
                className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition-all cursor-pointer ${
                  selectedBackdrop === idx ? 'bg-[#E63946] text-white border-red-500' : 'bg-[#22222a] border-neutral-700 text-neutral-400 hover:bg-[#2c2c36]'
                }`}
              >
                {b.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- 5. RANGOLI JEWEL MATCH 3 --- */
function RangoliMatchGame({ onGameOver }: { onGameOver?: (score: number) => void }) {
  const GEM_TYPES = ['🌸', '🪔', '💎', '🔶', '✨'];
  const [board, setBoard] = useState<string[][]>(() => {
    return Array(6).fill(null).map(() => Array(6).fill(null).map(() => GEM_TYPES[Math.floor(Math.random() * GEM_TYPES.length)]));
  });
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(15);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  const handleCellClick = (r: number, c: number) => {
    if (moves <= 0) return;

    if (!selectedCell) {
      setSelectedCell({ r, c });
      return;
    }

    // Check if adjacent
    const isAdjacent = (Math.abs(selectedCell.r - r) === 1 && selectedCell.c === c) || (Math.abs(selectedCell.c - c) === 1 && selectedCell.r === r);

    if (isAdjacent) {
      const newBoard = board.map(row => [...row]);
      const temp = newBoard[r][c];
      newBoard[r][c] = newBoard[selectedCell.r][selectedCell.c];
      newBoard[selectedCell.r][selectedCell.c] = temp;

      // Add score & decrement moves
      setBoard(newBoard);
      setScore(s => s + 150);
      setMoves(m => {
        const nextM = m - 1;
        if (nextM <= 0) onGameOver?.(score + 150);
        return nextM;
      });
      setSelectedCell(null);
    } else {
      setSelectedCell({ r, c });
    }
  };

  return (
    <div className="w-full h-full bg-[#181520] text-white flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-sm flex items-center justify-between bg-black/50 px-4 py-2 rounded-xl mb-3 border border-neutral-800 text-sm font-black">
        <span className="text-[#FFB800]">Score: {score}</span>
        <span className="text-pink-400">Moves Left: {moves}</span>
      </div>

      <div className="grid grid-cols-6 gap-1.5 p-3 bg-[#241e30] rounded-2xl border-2 border-pink-900/60 shadow-2xl">
        {board.map((row, r) =>
          row.map((gem, c) => {
            const isSelected = selectedCell?.r === r && selectedCell?.c === c;
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl text-xl flex items-center justify-center transition-transform cursor-pointer ${
                  isSelected ? 'bg-pink-600 scale-110 ring-2 ring-white shadow-lg' : 'bg-[#191422] hover:bg-[#312744]'
                }`}
              >
                {gem}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

/* --- 6. DESI WORDLE BOLLYWOOD --- */
function DesiWordleGame({ onGameOver }: { onGameOver?: (score: number) => void }) {
  const SECRET = 'SHOLA'; // Sholay / Shola
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isWon, setIsWon] = useState(false);

  const handleKey = (char: string) => {
    if (currentGuess.length < 5) setCurrentGuess(g => g + char);
  };

  const handleEnter = () => {
    if (currentGuess.length === 5) {
      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      if (currentGuess.toUpperCase() === SECRET) {
        setIsWon(true);
        onGameOver?.(500);
      }
      setCurrentGuess('');
    }
  };

  return (
    <div className="w-full h-full bg-[#141418] text-white flex flex-col items-center justify-center p-3 select-none">
      <h3 className="text-base font-black text-[#FFB800] mb-2">Desi Movie Wordle (5 Letters)</h3>

      {/* Grid */}
      <div className="flex flex-col gap-1.5 mb-4">
        {[0, 1, 2, 3, 4, 5].map(rowIdx => {
          const guess = guesses[rowIdx] || (rowIdx === guesses.length ? currentGuess : '');
          return (
            <div key={rowIdx} className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map(colIdx => {
                const letter = guess[colIdx] || '';
                let bg = 'bg-[#22222a] border-neutral-700';
                if (guesses[rowIdx]) {
                  if (letter === SECRET[colIdx]) bg = 'bg-emerald-600 border-emerald-400';
                  else if (SECRET.includes(letter)) bg = 'bg-[#FFB800] text-black border-amber-300';
                  else bg = 'bg-neutral-800 border-neutral-900 text-neutral-500';
                }
                return (
                  <div key={colIdx} className={`w-10 h-10 border rounded-lg flex items-center justify-center font-black text-lg ${bg}`}>
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Virtual Keyboard */}
      <div className="flex flex-wrap gap-1 justify-center max-w-sm">
        {'QWERTYUIOPASDFGHJKLZXCVBNM'.split('').map(k => (
          <button
            key={k}
            onClick={() => handleKey(k)}
            className="w-7 h-8 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold rounded cursor-pointer"
          >
            {k}
          </button>
        ))}
        <button onClick={handleEnter} className="px-3 h-8 bg-[#FFB800] text-black font-bold text-xs rounded cursor-pointer">
          ENTER
        </button>
        <button onClick={() => setCurrentGuess(g => g.slice(0, -1))} className="px-3 h-8 bg-neutral-700 text-xs font-bold rounded cursor-pointer">
          ⌫
        </button>
      </div>
    </div>
  );
}

/* --- 7. DHOL BEAT RHYTHM MASTER --- */
function DholBeatGame({ onGameOver }: { onGameOver?: (score: number) => void }) {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [activeLane, setActiveLane] = useState<number | null>(null);

  const triggerPad = (laneIdx: number) => {
    setActiveLane(laneIdx);
    setScore(s => s + 100 + combo * 10);
    setCombo(c => c + 1);
    setTimeout(() => setActiveLane(null), 150);
  };

  const pads = [
    { label: 'DHOL BASS', key: 'D', color: 'bg-amber-500', glow: 'shadow-amber-500/50' },
    { label: 'TREBLE TAAL', key: 'F', color: 'bg-rose-500', glow: 'shadow-rose-500/50' },
    { label: 'TALLI CLAP', key: 'J', color: 'bg-emerald-500', glow: 'shadow-emerald-500/50' },
    { label: 'DHOLAK ROLL', key: 'K', color: 'bg-purple-500', glow: 'shadow-purple-500/50' }
  ];

  return (
    <div className="w-full h-full bg-[#121218] text-white flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-md flex items-center justify-between bg-black/40 px-4 py-2 rounded-xl mb-4 border border-neutral-800">
        <span className="text-xl font-black text-[#FFB800]">Score: {score}</span>
        <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-700">
          🔥 {combo}x Bhangra Combo!
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-md">
        {pads.map((pad, idx) => (
          <button
            key={idx}
            onClick={() => triggerPad(idx)}
            className={`h-32 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-white/20 transition-all transform active:scale-90 cursor-pointer ${
              activeLane === idx ? `${pad.color} scale-95 shadow-2xl ${pad.glow} text-black font-black` : 'bg-[#20202a] hover:bg-[#2a2a36] text-white'
            }`}
          >
            <span className="text-2xl">🥁</span>
            <span className="text-xs font-black tracking-wider text-center">{pad.label}</span>
            <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded font-mono">[{pad.key}]</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* --- 8. GENERIC PLAYABLE ARCADE BACKDROP --- */
function GenericArcadeGame({ game, onGameOver }: { game: Game; onGameOver?: (score: number) => void }) {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setScore(s => s + 50);
    setClicks(c => c + 1);
    if (clicks > 20) onGameOver?.(score);
  };

  return (
    <div className="w-full h-full bg-[#16161c] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#FFB800]/15 rounded-full blur-3xl" />
      <div className="w-16 h-16 rounded-2xl bg-[#FFB800]/20 border border-[#FFB800] flex items-center justify-center text-3xl mb-3 text-[#FFB800]">
        🎮
      </div>
      <h3 className="text-xl font-black text-white mb-1">{game.title}</h3>
      <p className="text-xs text-neutral-400 max-w-md mb-4">{game.instructions}</p>

      <div className="bg-[#22222a] px-6 py-2 rounded-xl mb-4 border border-neutral-800">
        <span className="text-xs text-neutral-400 block font-semibold uppercase">Session Score</span>
        <span className="text-3xl font-black text-[#FFB800]">{score}</span>
      </div>

      <button
        onClick={handleClick}
        className="px-8 py-3 bg-[#E63946] hover:bg-red-600 text-white font-black text-sm rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
      >
        ⚡ ACTION / TAP TO SCORE
      </button>
    </div>
  );
}
