import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'bollywood',
    name: 'Bollywood Specials',
    shortDescription: 'Cine-quizzes, Rickshaw races, Red Carpet stylist & Bollywood pop-culture games.',
    longDescription: 'Immerse yourself in the magic of Indian cinema with our premier collection of Bollywood games. From guessing iconic dialogues and movie stars to red carpet dress-up, gully cricket, and frantic auto-rickshaw chases across Mumbai streets.',
    iconName: 'Clapperboard',
    bannerColor: 'from-amber-600/30 to-red-600/30',
    accentColor: '#FFB800',
    featuredTags: ['Bollywood Quiz', 'Cinema Trivia', 'Desi Runner', 'Dress Up', 'Dhol Beat', 'Cricket']
  },
  {
    id: 'action',
    name: 'Action',
    shortDescription: 'Thrilling combat, fast-paced shootouts, kung-fu brawlers and hero adventures.',
    longDescription: 'High-octane action games that test your reflexes, precision aiming, and tactical reaction time. Engage in epic hero battles, martial arts showdowns, and rooftop escapes.',
    iconName: 'Swords',
    bannerColor: 'from-red-600/30 to-orange-600/30',
    accentColor: '#E63946',
    featuredTags: ['Shooter', 'Fighting', 'Ninja', 'Street Combat', 'Survival']
  },
  {
    id: 'sports',
    name: 'Sports & Cricket',
    shortDescription: 'Gully cricket tournaments, world cup penalty shootouts, basketball & badminton.',
    longDescription: 'Experience the electric atmosphere of premier cricket leagues, street gully matches, football tournaments, and athletics challenges directly in your browser.',
    iconName: 'Trophy',
    bannerColor: 'from-emerald-600/30 to-teal-600/30',
    accentColor: '#10B981',
    featuredTags: ['Gully Cricket', 'IPL Style', 'Football', 'Penalty Shootout', 'Tennis']
  },
  {
    id: 'racing',
    name: 'Racing',
    shortDescription: 'Auto-rickshaw sprints, supercars, highway traffic dodging, and stunt bikes.',
    longDescription: 'Speed through bustling highways, desert dunes, and city tracks. Master drifting, turbo boosts, and traffic navigation across hundreds of playable vehicles.',
    iconName: 'Gauge',
    bannerColor: 'from-yellow-600/30 to-amber-600/30',
    accentColor: '#F59E0B',
    featuredTags: ['Auto Rickshaw', 'Supercar', 'Bike Stunts', 'Highway Traffic', 'Drift']
  },
  {
    id: 'puzzle',
    name: 'Puzzle',
    shortDescription: 'Brain teasers, physics challenges, logic mazes, and sliding block puzzles.',
    longDescription: 'Sharpen your mind with thoughtful puzzles, pattern recognition, number grids, and creative physics riddles built for casual relaxation or intense brain training.',
    iconName: 'Puzzle',
    bannerColor: 'from-indigo-600/30 to-purple-600/30',
    accentColor: '#818CF8',
    featuredTags: ['Brain Teasers', 'Logic', 'Physics', 'Escape Room', 'Maze']
  },
  {
    id: 'match-3',
    name: 'Match-3',
    shortDescription: 'Vibrant jewel blasts, Rangoli festive swaps, bubble poppers, and tile matching.',
    longDescription: 'Connect three or more matching colorful gems, traditional Indian sweets, and festive Rangoli motifs. Trigger chain-reaction combos and explosive board clears.',
    iconName: 'Sparkles',
    bannerColor: 'from-pink-600/30 to-rose-600/30',
    accentColor: '#F43F5E',
    featuredTags: ['Rangoli Blast', 'Jewel Swap', 'Candy Match', 'Bubble Popper']
  },
  {
    id: 'quiz',
    name: 'Quiz & Trivia',
    shortDescription: 'Bollywood movie knowledge, GK, geography, music identification, and word riddles.',
    longDescription: 'Test your smarts against thousands of trivia questions covering Hindi cinema, world history, science, sports, and language guessing games.',
    iconName: 'HelpCircle',
    bannerColor: 'from-cyan-600/30 to-blue-600/30',
    accentColor: '#06B6D4',
    featuredTags: ['Movie Trivia', 'Dialogue Quiz', 'Desi Wordle', 'General Knowledge']
  },
  {
    id: 'girls',
    name: 'Girls & Fashion',
    shortDescription: 'Red carpet couture, bridal saree makeovers, salon styling, and culinary baking.',
    longDescription: 'Express your creative fashion sense with glamorous wedding couture, celebrity spa makeovers, royal mehndi designs, and gourmet recipe decorating.',
    iconName: 'Heart',
    bannerColor: 'from-fuchsia-600/30 to-pink-600/30',
    accentColor: '#EC4899',
    featuredTags: ['Red Carpet', 'Bridal Makeover', 'Fashion Stylist', 'Nail Art', 'Bakery']
  },
  {
    id: 'boys',
    name: 'Boys & Adventure',
    shortDescription: 'Mech battles, superhero quests, monster trucks, and secret agent missions.',
    longDescription: 'Action-packed adventures featuring armored battle mechs, monster off-roaders, stealth spy stealth runs, and tactical combat arenas.',
    iconName: 'Zap',
    bannerColor: 'from-blue-600/30 to-indigo-600/30',
    accentColor: '#3B82F6',
    featuredTags: ['Superhero', 'Mech Combat', 'Monster Truck', 'Ninja Quest']
  },
  {
    id: 'strategy',
    name: 'Strategy',
    shortDescription: 'Fortress defense, empire building, tactical chess, and resource kingdoms.',
    longDescription: 'Deploy units strategically, manage gold and energy resources, defend royal fortresses, and conquer enemy territory with calculated battlefield tactics.',
    iconName: 'Shield',
    bannerColor: 'from-violet-600/30 to-purple-600/30',
    accentColor: '#A855F7',
    featuredTags: ['Tower Defense', 'Kingdom Wars', 'Tactical Chess', 'Fortress Defense']
  },
  {
    id: 'horror',
    name: 'Horror',
    shortDescription: 'Spooky havelis, haunted mansions, flashlight survival, and eerie escape games.',
    longDescription: 'Experience spine-chilling suspense in dark corridors, ancient haunted palaces, and eerie nighttime labyrinths designed for brave gamers.',
    iconName: 'Ghost',
    bannerColor: 'from-stone-700/30 to-red-950/30',
    accentColor: '#DC2626',
    featuredTags: ['Haunted Haveli', 'Night Escape', 'Survival', 'Spooky Maze']
  },
  {
    id: 'simulation',
    name: 'Simulation',
    shortDescription: 'Desi Dhaba restaurant management, railway driver, farming & city builder.',
    longDescription: 'Step into the shoes of a highway Dhaba master chef, an express train pilot, or a busy airport air-traffic controller in realistic sim sandboxes.',
    iconName: 'Building',
    bannerColor: 'from-amber-600/30 to-lime-600/30',
    accentColor: '#84CC16',
    featuredTags: ['Dhaba Chef', 'Train Simulator', 'Farming', 'Airport Tycoon']
  },
  {
    id: 'io-games',
    name: '.io & Multiplayer',
    shortDescription: 'Real-time multiplayer arena brawlers, snake slithers, and territory capture.',
    longDescription: 'Jump into instant multiplayer arenas and compete live against players worldwide for the top leaderboard spot in fast-respawn .io battles.',
    iconName: 'Globe',
    bannerColor: 'from-teal-600/30 to-cyan-600/30',
    accentColor: '#14B8A6',
    featuredTags: ['Snake Arena', 'Battle Royale', 'Crowd City', 'Worm Slither']
  },
  {
    id: 'rpg',
    name: 'RPG & Fantasy',
    shortDescription: 'Mythic Indian folklore quests, dungeon crawlers, magic spells, and hero leveling.',
    longDescription: 'Embark on mythological journeys inspired by ancient legends. Upgrade divine weapons, level up warrior skills, and vanquish demon kings.',
    iconName: 'Flame',
    bannerColor: 'from-orange-600/30 to-amber-600/30',
    accentColor: '#F97316',
    featuredTags: ['Mythic Warrior', 'Dungeon Crawler', 'Level Up', 'Hero Quest']
  },
  {
    id: 'board',
    name: 'Board & Cards',
    shortDescription: 'Royal Ludo, Carrom King, Teen Patti style card puzzles, and Chess Master.',
    longDescription: 'Enjoy traditional household classics: roll the dice in Royal Ludo, strike the striker in tournament Carrom, and outwit opponents in classic chess.',
    iconName: 'Dice5',
    bannerColor: 'from-red-600/30 to-rose-600/30',
    accentColor: '#EF4444',
    featuredTags: ['Royal Ludo', 'Carrom Board', 'Classic Chess', 'Snake & Ladders']
  },
  {
    id: 'educational',
    name: 'Educational',
    shortDescription: 'Math challenges, typing speed tests, flag geography, and language builders.',
    longDescription: 'Fun, rewarding learning games for all ages. Boost arithmetic mental math speed, geography recognition, and keyboard typing speed.',
    iconName: 'GraduationCap',
    bannerColor: 'from-sky-600/30 to-blue-600/30',
    accentColor: '#0EA5E9',
    featuredTags: ['Math Speed', 'Typing Master', 'World Flags', 'Vocabulary']
  },
  {
    id: 'two-player',
    name: 'Two-Player',
    shortDescription: 'Shared keyboard co-op, head-to-head duels, split-screen racing, and table tennis.',
    longDescription: 'Grab a friend and play together on the same screen or keyboard with 1v1 sports battles, cooperative puzzle solving, and thrilling dual races.',
    iconName: 'Users',
    bannerColor: 'from-purple-600/30 to-pink-600/30',
    accentColor: '#C084FC',
    featuredTags: ['1v1 Duel', 'Co-op', 'Split Screen', 'Shared Keyboard']
  }
];
