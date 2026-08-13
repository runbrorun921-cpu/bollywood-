import { Game, GameCategory, AgeRating } from '../types';

// Curated Unsplash HD gaming visual assets by thematic archetype
const THUMBNAIL_POOLS: Record<string, string[]> = {
  bollywood: [
    'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
  ],
  action: [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
  ],
  sports: [
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80',
  ],
  racing: [
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80',
  ],
  puzzle: [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585503418537-88331351ad99?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
  ],
  girls: [
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80',
  ],
  board: [
    'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560963689-02e82017fb3c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=600&auto=format&fit=crop&q=80',
  ],
  strategy: [
    'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
  ],
  horror: [
    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
  ],
  retro: [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
  ]
};

// Category theme vocabularies for realistic procedural naming
const THEMES: Record<GameCategory, { prefixes: string[]; roots: string[]; suffixes: string[]; tags: string[]; developers: string[] }> = {
  bollywood: {
    prefixes: ['Bollywood', 'Desi', 'Mumbai', 'Dilwale', 'Sholay', 'Singha', 'Dhoom', 'Dabangg', 'Masala', 'Kabir', 'Don', 'Bhaijaan', 'Chor Police', 'Maharaja', 'Baahubali', 'Singham', 'Pathaan', 'Jawan', 'KGF', 'Pushpa'],
    roots: ['Star', 'Hero', 'Quiz', 'Masala', 'Dhamaka', 'Blockbuster', 'Cine', 'Beat', 'Nights', 'Red Carpet', 'Superstar', 'Showdown', 'Express', 'Tadka', 'Challenge', 'Legends', 'Reel', 'Filmfare', 'Stunt', 'Khiladi'],
    suffixes: ['3D', 'Championship', 'Mania', 'Rush', 'Deluxe', 'Showdown', 'Saga', 'Battle', 'King', 'Clash', 'Quest', 'Unleashed', 'Reborn', 'Ultimate', 'Pro', 'Fever', 'Chronicles', 'Arena', 'Strike', '2026'],
    tags: ['Bollywood', 'Cinema', 'Hindi Movies', 'Desi', 'Movie Quiz', 'Celebrity', 'Mumbai', 'Songs', 'Action Masala'],
    developers: ['BollywoodGame Studios', 'DesiPixels', 'MumbaiPlay Interactive', 'CineMagic Digital', 'BollyFun Games', 'GullyBoys Studio']
  },
  action: {
    prefixes: ['Cyber', 'Shadow', 'Iron', 'Apex', 'Titan', 'Viper', 'Neon', 'Strike', 'Rogue', 'Ghost', 'Inferno', 'Dragon', 'Ninja', 'Thunder', 'Combat', 'Alpha', 'Quantum', 'Blaze', 'Savage', 'Vortex'],
    roots: ['Warrior', 'Fighter', 'Assassin', 'Force', 'Shooter', 'Brawler', 'Commando', 'Hunter', 'Samurai', 'Knight', 'Soldier', 'Striker', 'Slayer', 'Hero', 'Blade', 'Vanguard', 'Gunner', 'Agent', 'Gladiator', 'Havoc'],
    suffixes: ['Arena', 'Showdown', 'Overdrive', 'Reckoning', 'Vengeance', 'Protocol', 'Assault', 'Chaos', 'Rampage', 'Extinction', 'Clash', 'Unleashed', 'Warfare', 'Strike Force', 'Zero', 'Evolution', 'Chronicles', 'X', 'Redux', 'Elite'],
    tags: ['Action', 'Shooter', 'Combat', 'Reflexes', 'Fighting', 'Survival', 'High Score', 'Warfare', 'Battles'],
    developers: ['Apex Action Lab', 'ShadowByte', 'TitanWave Interactive', 'Viper Studios', 'CyberCore Games', 'PulseGames']
  },
  sports: {
    prefixes: ['Pro', 'Street', 'Gully', 'Premier', 'Grand', 'Super', 'Hyper', 'World Cup', 'Champions', 'All-Star', 'Turbo', 'Ultimate', 'Master', 'Extreme', 'National', 'Smash', 'Victory', 'Power', 'Crown', 'Golden'],
    roots: ['Cricket', 'Football', 'Soccer', 'Badminton', 'Kabaddi', 'Basketball', 'Tennis', 'Bowling', 'Volleyball', 'Golf', 'Boxing', 'Athletics', 'Archery', 'Derby', 'Slam', 'Penalty', 'Striker', 'Batter', 'Homerun', 'League'],
    suffixes: ['2026', 'Cup', 'Tournament', 'Showdown', 'League', 'Clash', 'Masters', 'Pro Tour', 'Championship', 'Superstars', 'Strike', 'Hero', 'Frenzy', 'Derby', 'Challenge', 'Open', 'World Tour', 'Blitz', 'Dynasty', 'Elite'],
    tags: ['Cricket', 'Sports', 'Football', 'Gully Cricket', 'Championship', 'Athletics', 'Tournaments', 'Ball Games'],
    developers: ['GullyBoys Studio', 'SportsZone Digital', 'SuperPitch Interactive', 'ChampionPlay', 'ApexAthletics', 'PlayField Media']
  },
  racing: {
    prefixes: ['Nitro', 'Highway', 'Drift', 'Turbo', 'Speed', 'Asphalt', 'Neon', 'Desert', 'Midnight', 'Rally', 'Hyper', 'Extreme', 'Formula', 'Street', 'Auto', 'City', 'Supercar', 'Burnout', 'Drag', 'Apex'],
    roots: ['Racer', 'Drifter', 'Chase', 'Rush', 'Sprint', 'Rally', 'Grand Prix', 'Overdrive', 'Cruiser', 'Speedway', 'Rider', 'Nitro', 'Track', 'Circuit', 'Highway', 'Motor', 'Turbine', 'Freeway', 'Velocity', 'Takedown'],
    suffixes: ['3D', 'GT', 'Turbo', 'Xtreme', 'Fever', 'Unleashed', 'Championship', 'Nitro Rush', 'Showdown', 'Takedown', 'Midnight Run', 'Burnout', 'Overdrive', 'Drift King', 'Pro', 'Heat', 'Rivalry', 'Express', 'Apex', '2026'],
    tags: ['Racing', 'Supercars', 'Drifting', 'Speed', 'Highway', 'Rickshaw', 'Stunts', 'Tuning', 'Burnout'],
    developers: ['DesiWheels Interactive', 'NitroPulse Games', 'AsphaltForge', 'SpeedDemon Studio', 'DriftWorks', 'TurboLane']
  },
  puzzle: {
    prefixes: ['Brain', 'Logic', 'Mind', 'Block', 'Mystery', 'Puzzle', 'Physics', 'Zen', 'Enigma', 'Quantum', 'Cryptic', 'Geometric', 'Riddle', 'Neon', 'Infinite', 'Hexa', 'Number', 'Grid', 'Smart', 'Master'],
    roots: ['Quest', 'Maze', 'Solver', 'Craft', 'Master', 'Escape', 'Connect', 'Challenger', 'Lab', 'Riddle', 'Genius', 'Tangle', 'Forge', 'Path', 'Flow', 'Grid', 'Nexus', 'Illusion', 'Mindset', 'Chronicle'],
    suffixes: ['Classic', 'Deluxe', 'Pro', 'IQ', '3D', 'Challenge', 'Evolved', 'Zenith', 'Infinity', 'Mastery', 'Logic', 'Odyssey', 'Brainiac', 'Chronicles', 'Puzzle Pack', 'Reborn', 'Saga', 'Quest', 'Unravel', 'Plus'],
    tags: ['Puzzle', 'Brain Teaser', 'Logic', 'Physics', 'IQ Test', 'Escape Maze', 'Smart Thinking', 'Relaxing'],
    developers: ['MindSpark Interactive', 'LogicForge Games', 'ZenithPuzzles', 'BrainWave Studio', 'EnigmaWorks', 'PuzzleBox']
  },
  'match-3': {
    prefixes: ['Jewel', 'Gem', 'Candy', 'Rangoli', 'Sweet', 'Mithai', 'Fruit', 'Magic', 'Sugar', 'Crystal', 'Diamond', 'Bubble', 'Sparkle', 'Blossom', 'Cookie', 'Rainbow', 'Festive', 'Royal', 'Choco', 'Berry'],
    roots: ['Crush', 'Blast', 'Match', 'Swap', 'Pop', 'Mania', 'Frenzy', 'Splash', 'Burst', 'Cascade', 'Feast', 'Bloom', 'Spark', 'Dash', 'Drop', 'Sweets', 'Garden', 'Kingdom', 'Party', 'Treasures'],
    suffixes: ['Saga', 'Deluxe', 'Fever', 'Quest', 'Bonanza', 'Mania', 'Kingdom', 'Paradise', 'Blast 3D', 'Frenzy', 'Splash', 'Party', 'Carnival', 'Story', 'Magic', 'Adventure', 'Delight', 'Legends', 'Royal', '2026'],
    tags: ['Match 3', 'Jewel Blast', 'Casual', 'Rangoli', 'Sweets Pop', 'Addictive', 'Chain Combos', 'Colorful'],
    developers: ['SweetSwap Studio', 'GemBlaster Games', 'RangoliPixels', 'CandyWave', 'SparkleForge', 'MatchMasters']
  },
  quiz: {
    prefixes: ['Trivia', 'Cinema', 'GK', 'Bollywood', 'Brain', 'Smart', 'Millionaire', 'Quiz', 'Word', 'Desi', 'Global', 'History', 'Mythology', 'Super', 'Genius', 'Express', 'Speed', 'Mind', 'Master', 'Whiz'],
    roots: ['Master', 'Challenge', 'Showdown', 'Whiz', 'Show', 'Quest', 'Trivia', 'Arena', 'Duel', 'Battle', 'Buzzer', 'Hour', 'Genius', 'Test', 'IQ', 'Clash', 'Quizzer', 'Riddle', 'Guru', 'Champion'],
    suffixes: ['Live', 'Pro', 'Challenge', 'Championship', 'Showdown', 'Deluxe', 'Arena', 'Battle', 'Party', 'Edition', '2026', 'Quest', 'Tournament', 'King', 'Mastery', 'Supreme', 'League', 'Sprint', 'Ultimate', 'Plus'],
    tags: ['Trivia', 'Quiz', 'Cinema Trivia', 'General Knowledge', 'Word Guess', 'IQ Challenge', 'Brain Game'],
    developers: ['QuizMasters Inc', 'BollyQuiz Media', 'MindSmart Digital', 'TriviaPulse', 'GeniusWorks', 'BrainBuzzer']
  },
  girls: {
    prefixes: ['Royal', 'Bridal', 'Fashion', 'Bollywood', 'Glamour', 'Princess', 'Spa', 'Runway', 'Mehndi', 'Beauty', 'Chic', 'Starlet', 'Model', 'Salon', 'Wedding', 'Sweet', 'Couture', 'Glitter', 'Glow', 'Stylist'],
    roots: ['Stylist', 'Makeover', 'Designer', 'Salon', 'Boutique', 'Diva', 'Dress Up', 'Wardrobe', 'Queen', 'Artist', 'Runway', 'Glam', 'Fashionista', 'Studio', 'Nails', 'Jewelry', 'Hairstyle', 'Model', 'Spa', 'Princess'],
    suffixes: ['3D', 'Deluxe', 'Glamour', 'Couture', 'Superstar', 'Red Carpet', 'Fashion Week', 'Makeover', 'Story', 'Dreams', 'Paradise', 'Royal Edition', 'Trends', 'Studio', 'Salon', 'World', 'Fever', '2026', 'Star', 'Elite'],
    tags: ['Dress Up', 'Fashion', 'Bridal', 'Mehndi Art', 'Makeover', 'Princess', 'Salon', 'Royal Jewelry', 'Stylist'],
    developers: ['GlamourCine', 'Fashionista Games', 'RoyalSparkle Studio', 'DivaDesign', 'ChicPlay Interactive', 'StarletDigital']
  },
  boys: {
    prefixes: ['Monster', 'Turbo', 'Stunt', 'Robot', 'Dragon', 'Tank', 'Ninja', 'Mech', 'Battle', 'Speed', 'Cyber', 'Iron', 'Heavy', 'Strike', 'Shadow', 'Super', 'Apocalypse', 'Armored', 'Rage', 'War'],
    roots: ['Truck', 'Bike', 'Brawler', 'Fighter', 'Driver', 'Crusher', 'Mech', 'Commander', 'Destroyer', 'Warrior', 'Shooter', 'Pilot', 'Hero', 'Racer', 'Sniper', 'Champion', 'Squad', 'Beast', 'Storm', 'Siege'],
    suffixes: ['3D', 'Assault', 'Mayhem', 'Showdown', 'Destruction', 'Arena', 'Overdrive', 'Unleashed', 'Warzone', 'Xtreme', 'Assault', 'Frenzy', 'Clash', 'Smash', 'Force', 'Strike', 'Chronicles', 'Fury', '2026', 'Pro'],
    tags: ['Stunt Bike', 'Monster Trucks', 'Robot Battle', 'Tank Warfare', 'Action', 'Shooting', 'Combat'],
    developers: ['IronClaw Studios', 'MechWar Games', 'TurboBeast Interactive', 'HeavyDuty Play', 'TitanForce', 'ShadowRage']
  },
  strategy: {
    prefixes: ['Empire', 'Kingdom', 'Castle', 'Tower', 'War', 'Clash', 'Age of', 'Tactical', 'Civilization', 'Fortress', 'Legion', 'Dynasty', 'Battle', 'Royal', 'Lord', 'Conqueror', 'Vanguard', 'Siege', 'Imperial', 'Frontline'],
    roots: ['Defense', 'Conquest', 'Command', 'Tactics', 'Warfare', 'Kingdom', 'General', 'Reign', 'Overlord', 'Dominion', 'Alliance', 'Siege', 'Commander', 'Colony', 'Warlord', 'Frontier', 'Saga', 'Strike', 'Crusade', 'Master'],
    suffixes: ['Wars', 'Chronicles', 'Tactics', 'Strategy', 'Reborn', 'Empire', 'Clash', 'Dominion', 'Conquer', 'Showdown', 'Age', 'Legion', 'Ascension', 'Dynasty', 'Assault', 'Realms', 'Overlord', 'Command', '2026', 'Deluxe'],
    tags: ['Strategy', 'Tower Defense', 'Empire Building', 'Tactics', 'Castle Siege', 'Warfare', 'Resource Management'],
    developers: ['IronEmpire Games', 'KingdomCraft Interactive', 'TacticalForge', 'VanguardStrategy', 'WarlordStudios', 'DominionPlay']
  },
  horror: {
    prefixes: ['Haunted', 'Ghost', 'Dark', 'Nightmare', 'Midnight', 'Shadow', 'Cursed', 'Zombie', 'Asylum', 'Silent', 'Evil', 'Spooky', 'Grave', 'Crypt', 'Sinister', 'Dead', 'Phantom', 'Dread', 'Fear', 'Abyss'],
    roots: ['Mansion', 'Escape', 'Bunker', 'Forest', 'Hospital', 'Hotel', 'Cellar', 'Labyrinth', 'Chambers', 'Corridor', 'Nights', 'Island', 'Tomb', 'Survival', 'Watcher', 'Cabin', 'Sanitarium', 'Crypt', 'House', 'Shadows'],
    suffixes: ['3D', 'Nightmare', 'Curse', 'Escape', 'Survival', 'Reckoning', 'Terror', 'Origins', 'Whispers', 'Darkness', 'Haunting', 'Silence', 'Awakening', 'Descent', 'Chamber', 'Isolation', 'Horror', 'Fear', 'Chapter 2', '2026'],
    tags: ['Horror', 'Haunted Escape', 'Jumpscare', 'Survival', 'Spooky', 'Dark Mystery', 'Zombie Night', 'Thriller'],
    developers: ['NightmareRealm', 'ShadowCrypt Games', 'DarkSpore Studio', 'SpookyBunker Interactive', 'PhantomGrave', 'DreadWorks']
  },
  simulation: {
    prefixes: ['Chai', 'Rasoi', 'Airport', 'Farm', 'City', 'Supermarket', 'Train', 'Flight', 'Dhaba', 'Indian Bus', 'Hospital', 'Garage', 'Cafe', 'Restaurant', 'Truck', 'Doctor', 'Life', 'Hotel', 'Village', 'Tycoon'],
    roots: ['Simulator', 'Tycoon', 'Manager', 'Builder', 'Operator', 'Chef', 'Pilot', 'Driver', 'Crafter', 'Master', 'Station', 'Empire', 'Express', 'Expressway', 'Kitchen', 'Clinic', 'Workshop', 'Resort', 'Planner', 'Trader'],
    suffixes: ['3D', '2026', 'Tycoon', 'Pro', 'Express', 'Edition', 'Manager', 'Empire', 'Mastery', 'Deluxe', 'Simulator', 'Saga', 'Crafter', 'World', 'Evolution', 'Life', 'Story', 'Expressway', 'Unlimited', 'Plus'],
    tags: ['Simulation', 'Tycoon', 'Cooking Chef', 'Bus Driving', 'City Builder', 'Farming', 'Management', 'Casual'],
    developers: ['DesiSim Interactive', 'CityForge Studios', 'TycoonWave', 'RasoiChef Media', 'SimLife Digital', 'MasterSim']
  },
  'io-games': {
    prefixes: ['Snake', 'Worm', 'Slither', 'Paper', 'Hole', 'Agar', 'Spinner', 'Tank', 'Arrow', 'Blob', 'Crowd', 'Sword', 'Smash', 'Battle', 'Zombie', 'Fish', 'Craft', 'Hex', 'Micro', 'Star'],
    roots: ['io', '.io Arena', 'Zone', 'Royale', 'War', 'Eater', 'Surv', 'Fighter', 'Clash', 'Grow', 'Brawl', 'Swarm', 'Colony', 'Frenzy', 'Rumble', 'Feast', 'Rush', 'Showdown', 'World', 'Smash'],
    suffixes: ['Royale', 'Arena', 'Battle', 'Championship', 'Multiplayer', 'Chaos', 'Rumble', 'Warzone', 'Frenzy', 'Overload', 'Mania', 'Clash', 'Showdown', 'Legends', 'Assault', 'League', 'Dominion', 'Party', '2026', 'X'],
    tags: ['IO Games', 'Multiplayer', 'Snake Arena', 'Battle Royale', 'Eat and Grow', 'Instant Play', 'Leaderboards'],
    developers: ['IOGame Arena', 'SlitherWorks', 'MicroRoyale Interactive', 'SwarmPlay', 'PixelZone Media', 'ArenaIO']
  },
  rpg: {
    prefixes: ['Legend of', 'Dragon', 'Mythic', 'Chrono', 'Shadow', 'Hero', 'Elden', 'Valkyrie', 'Astral', 'Sword of', 'Blade', 'Final', 'Eternal', 'Soul', 'Arcane', 'Ancient', 'Crimson', 'Dungeon', 'Celestial', 'Rune'],
    roots: ['Knight', 'Quest', 'Chronicles', 'Adventure', 'Awakening', 'Reborn', 'Slayer', 'Labyrinth', 'Hero', 'Legends', 'Warrior', 'Kingdom', 'Fate', 'Odyssey', 'Blade', 'Empires', 'Prophecy', 'Echoes', 'Guardian', 'Saga'],
    suffixes: ['Online', 'RPG', 'Awakening', 'Chronicles', 'Legends', 'Rebirth', 'Saga', 'Odyssey', 'Origins', 'Ascension', 'Echoes', 'Infinity', 'Unleashed', 'Redux', 'Heroes', 'Quest 3D', 'Prophecy', 'Eternal', '2026', 'Deluxe'],
    tags: ['RPG', 'Adventure', 'Dungeon Crawler', 'Level Up', 'Hero Quest', 'Magic Spells', 'Fantasy Story', 'Boss Battles'],
    developers: ['MythicBlade RPGs', 'DragonQuest Digital', 'AstralForge Games', 'ChronoCraft', 'EternalHero Studio', 'ArcaneRealm']
  },
  board: {
    prefixes: ['Ludo', 'Carrom', 'Snakes & Ladders', 'Chess', 'Checkers', 'Teen Patti', 'Rummy', 'Domino', 'Backgammon', 'Mahjong', 'Dice', 'Poker', 'Cards', 'Royal', 'Club', 'Desi', 'Classic', 'Grandmaster', 'Master', 'Lucky'],
    roots: ['King', 'Supreme', 'Star', 'Champion', 'Club', 'Master', 'Arena', 'Duel', 'Board', 'Clash', 'Showdown', 'Legends', 'Party', 'Table', 'Challenge', 'Empire', 'Royal', 'Gold', 'Classic', 'World'],
    suffixes: ['Online', 'Club', 'Championship', 'Superstar', 'Multiplayer', 'Classic', '3D', 'Live', 'Pro', 'Party', 'Tournament', 'Deluxe', 'King', 'Mastery', 'Showdown', 'League', 'Arena', '2026', 'Plus', 'Gold'],
    tags: ['Board Games', 'Ludo', 'Carrom', 'Chess', 'Cards', 'Dice', '2 Player', 'Turn Based', 'Traditional'],
    developers: ['DesiBoard Games', 'LudoKing Media', 'ChessGrandmaster Studio', 'RoyalCards Interactive', 'CarromClub', 'ClassicTabletop']
  },
  educational: {
    prefixes: ['Math', 'Word', 'Geography', 'Science', 'Flag', 'Memory', 'ABC', 'Typing', 'Spelling', 'Puzzle', 'Solar', 'Animal', 'History', 'Logic', 'Code', 'Kids', 'Brain', 'Smart', 'Quick', 'Junior'],
    roots: ['Whiz', 'Genius', 'Master', 'Challenge', 'Academy', 'Explorer', 'Trainer', 'Hero', 'Smartie', 'Quest', 'Speed', 'Quiz', 'Lab', 'Adventure', 'Builder', 'Voyage', 'Camp', 'School', 'Brain', 'Craft'],
    suffixes: ['for Kids', 'Learning Fun', 'Pro', 'Trainer', 'Junior', 'Academy', 'Adventure', 'Challenge', 'Whiz 3D', 'Mastery', 'Deluxe', 'Quest', 'Genius', 'Smart 2026', 'Hero', 'Explorer', 'Plus', 'School', 'Kids Edition', 'Class'],
    tags: ['Educational', 'Math Speed', 'Word Search', 'Typing Speed', 'Kids Learning', 'Brain Training', 'Memory', 'Geography'],
    developers: ['EduSmart Interactive', 'KidsBrain Games', 'LearningFun Digital', 'GeniusLab Media', 'AcademyPlay', 'MindWhiz']
  },
  'two-player': {
    prefixes: ['Duo', 'Dual', 'Versus', 'Head to Head', '2-Player', 'Twin', 'Rival', 'Split Screen', 'Co-op', 'Battle', 'Tag Team', 'Friends', 'Double', 'Party', 'Clash of', 'Ultimate', 'Pocket', 'Two', 'Street', 'Fast'],
    roots: ['Duels', 'Brawl', 'Showdown', 'Arena', 'Rivals', 'Clash', 'Tank Battle', 'Air Hockey', 'Tug of War', 'Ping Pong', 'Shooter', 'Race', 'Fighter', 'Foosball', 'Mayhem', 'Combat', 'Party', 'Challenge', 'Smash', 'War'],
    suffixes: ['2P Battle', 'Versus', 'Duel', 'Showdown', 'Party Mode', 'Clash', 'Arena', 'Cup', 'Championship', 'Mayhem', 'Split-Screen', 'Legends', 'Head to Head', 'Frenzy', 'Combat', 'Challenge', '2026', 'Pro', 'Deluxe', 'X'],
    tags: ['2 Player', 'Local Co-op', 'Versus Mode', '1v1 Duel', 'Party Game', 'Split Screen', 'Friendly Battle', 'Multiplayer'],
    developers: ['DuoPlay Games', 'TwoPlayer Zone', 'VersusArena Studio', 'DualStrike Interactive', 'PartyClash Media', 'SplitScreenWorks']
  }
};

// Seeded pseudorandom generator to produce predictable, ultra-fast 5,000 distinct items
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate the 5,000 games catalog
export function generateFullCatalog(baseCuratedGames: Game[], targetCount = 5000): Game[] {
  const catalog: Game[] = [...baseCuratedGames];
  const existingIds = new Set(baseCuratedGames.map(g => g.id));
  const existingSlugs = new Set(baseCuratedGames.map(g => g.slug));

  const allCategories: GameCategory[] = [
    'bollywood',
    'action',
    'sports',
    'racing',
    'puzzle',
    'match-3',
    'quiz',
    'girls',
    'boys',
    'strategy',
    'horror',
    'simulation',
    'io-games',
    'rpg',
    'board',
    'educational',
    'two-player'
  ];

  let counter = baseCuratedGames.length + 1;

  while (catalog.length < targetCount) {
    const seed = counter * 9301 + 49297;
    const catIdx = Math.floor(seededRandom(seed) * allCategories.length);
    const category = allCategories[catIdx];
    const theme = THEMES[category] || THEMES.action;

    const prefixIdx = Math.floor(seededRandom(seed + 1) * theme.prefixes.length);
    const rootIdx = Math.floor(seededRandom(seed + 2) * theme.roots.length);
    const suffixIdx = Math.floor(seededRandom(seed + 3) * theme.suffixes.length);

    const prefix = theme.prefixes[prefixIdx];
    const root = theme.roots[rootIdx];
    const suffix = theme.suffixes[suffixIdx];

    // Combine distinct title variations
    const titlePattern = Math.floor(seededRandom(seed + 4) * 4);
    let title = '';
    if (titlePattern === 0) {
      title = `${prefix} ${root} ${suffix}`;
    } else if (titlePattern === 1) {
      title = `${prefix} ${root}`;
    } else if (titlePattern === 2) {
      title = `${prefix}: ${root} ${suffix}`;
    } else {
      title = `${root} of ${prefix} (${suffix})`;
    }

    // Unique ID and slug
    let rawSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = rawSlug;
    let id = `bg-${category}-${counter}`;
    
    if (existingSlugs.has(slug)) {
      slug = `${slug}-${counter}`;
    }
    existingSlugs.add(slug);
    existingIds.add(id);

    // Pick visual thumbnail from the category pool or fallback
    const pool = THUMBNAIL_POOLS[category] || THUMBNAIL_POOLS.action;
    const thumbIdx = Math.floor(seededRandom(seed + 5) * pool.length);
    const thumbnail = pool[thumbIdx];

    // Randomized realistic metrics
    const rating = 78 + Math.floor(seededRandom(seed + 6) * 22); // 78 - 99%
    const playsCount = 15000 + Math.floor(seededRandom(seed + 7) * 980000) + (seededRandom(seed + 8) > 0.8 ? 2000000 : 0);
    const likesCount = Math.floor(playsCount * (0.05 + seededRandom(seed + 9) * 0.08));

    const ageRatings: AgeRating[] = ['All Ages', '7+', '13+', '16+'];
    const ageRating = category === 'horror' ? '16+' : category === 'educational' || category === 'match-3' || category === 'board' ? 'All Ages' : ageRatings[Math.floor(seededRandom(seed + 10) * ageRatings.length)];

    const isNew = seededRandom(seed + 11) > 0.85;
    const isTrending = seededRandom(seed + 12) > 0.88;
    const isFeatured = seededRandom(seed + 13) > 0.95;

    // Pick developer
    const devIdx = Math.floor(seededRandom(seed + 14) * theme.developers.length);
    const developer = theme.developers[devIdx];

    // Tags
    const tags = Array.from(new Set([
      theme.tags[0],
      theme.tags[Math.floor(seededRandom(seed + 15) * theme.tags.length)],
      theme.tags[Math.floor(seededRandom(seed + 16) * theme.tags.length)],
      category.replace('-', ' ')
    ]));

    // Release date between 2024 and 2026
    const year = 2024 + Math.floor(seededRandom(seed + 17) * 3);
    const month = String(1 + Math.floor(seededRandom(seed + 18) * 12)).padStart(2, '0');
    const day = String(1 + Math.floor(seededRandom(seed + 19) * 28)).padStart(2, '0');
    const releaseDate = `${year}-${month}-${day}`;

    // Rich description & instructions
    const description = `Immerse yourself in ${title}, a high-octane ${category.replace('-', ' ')} browser game. Test your strategy, fast reflexes, and master tricky challenge levels with instant zero-download gameplay!`;
    const instructions = `Navigate using keyboard arrow keys / WASD or touch buttons on mobile. Collect power-ups, defeat obstacles, and aim for maximum high scores across global player rankings.`;

    const game: Game = {
      id,
      slug,
      title,
      thumbnail,
      category,
      subCategories: [
        category,
        allCategories[Math.floor(seededRandom(seed + 20) * allCategories.length)]
      ],
      rating,
      playsCount,
      likesCount,
      ageRating,
      isNew,
      isTrending,
      isFeatured,
      mobileSupported: true,
      description,
      instructions,
      controls: {
        keyboard: 'Arrow Keys or WASD to move / steer, Spacebar for action / jump',
        mouse: 'Left Click to interact and target',
        touch: 'Tap and swipe controls on mobile touchscreens'
      },
      tags,
      releaseDate,
      developer
    };

    catalog.push(game);
    counter++;
  }

  return catalog;
}
