import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Mail, 
  Info, 
  Send, 
  CheckCircle2, 
  Gamepad2, 
  Sparkles, 
  Globe2, 
  Lock, 
  HelpCircle, 
  ArrowLeft,
  Users,
  Award,
  Zap,
  MessageSquare,
  Clock,
  Check
} from 'lucide-react';
import { ViewMode } from '../types';

interface InfoPagesProps {
  page: 'about' | 'privacy' | 'terms' | 'contact';
  onNavigate: (view: ViewMode) => void;
  onSelectCategory?: (category: any) => void;
}

export const InfoPages: React.FC<InfoPagesProps> = ({ page, onNavigate, onSelectCategory }) => {
  // Contact form state
  const [contactType, setContactType] = useState('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitted(true);
  };

  const resetContactForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Back Button & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#1a1a1a] border border-gray-800">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 px-4 py-2 bg-[#222222] hover:bg-[#282828] text-gray-200 hover:text-white rounded-full text-xs font-bold transition-colors cursor-pointer border border-gray-700"
        >
          <ArrowLeft className="w-4 h-4 text-[#FFB800]" />
          <span>Back to Games</span>
        </button>

        {/* Page Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#222222] p-1 rounded-full border border-gray-800 text-xs">
          <button
            onClick={() => onNavigate('about')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              page === 'about'
                ? 'bg-[#FFB800] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About Us</span>
          </button>

          <button
            onClick={() => onNavigate('privacy')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              page === 'privacy'
                ? 'bg-[#FFB800] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => onNavigate('terms')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              page === 'terms'
                ? 'bg-[#FFB800] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`px-3.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              page === 'contact'
                ? 'bg-[#FFB800] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 1: ABOUT US */}
      {/* ========================================================================= */}
      {page === 'about' && (
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#2a1a1a] via-[#1a1a1a] to-[#141414] border border-gray-800 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] text-xs font-bold border border-[#FFB800]/30">
                <Sparkles className="w-3.5 h-3.5" /> About BollywoodGame.online
              </span>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                India's Ultimate Hub for <span className="text-[#FFB800]">Free Browser Games</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Welcome to <strong>BollywoodGame.online</strong>, the premier digital playground delivering over 5,000 instant HTML5 web games. From high-energy Bollywood movie quizzes and gully cricket showdowns to drift racing, intense action fighters, and brain-teasing puzzles — we believe gaming should be accessible to everyone, everywhere, on any device.
              </p>
            </div>
          </div>

          {/* Bento Stats & Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFB800]/15 text-[#FFB800] flex items-center justify-center border border-[#FFB800]/30">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-black text-white">5,000+ Games</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Hand-curated, zero-download web games spanning 18 genres optimized for low-latency web browsers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-green-500/15 text-green-400 flex items-center justify-center border border-green-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-black text-white">Instant Zero-Install</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                No downloads, no storage consumption, and no app store installs required. Play immediately with one click.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-black text-white">Cross-Platform Ready</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Flawless responsive performance across Android smartphones, iPhones, iPads, Chromebooks, and PCs.
              </p>
            </div>
          </div>

          {/* Our Story & Values */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-5 text-sm text-gray-300 leading-relaxed">
            <h2 className="text-xl font-display font-black text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FFB800]" />
              <span>Our Mission & Vision</span>
            </h2>
            <p>
              Founded in 2026, BollywoodGame.online was created to celebrate the vibrant spirit of Indian pop culture and global casual gaming. We recognized that millions of players want frictionless entertainment without intrusive downloads, expensive hardware, or complex setups.
            </p>
            <p>
              Our platform bridges cultural nostalgia with cutting-edge web technologies like WebGL, HTML5 Canvas, and WebAssembly. Whether you have 5 minutes between work calls or an afternoon to beat your high score in Gully Cricket, BollywoodGame is built for pure, uninhibited fun.
            </p>
            <div className="pt-4 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">Family & Kid Friendly</h4>
                  <p className="text-xs text-gray-400">Content rated and reviewed to ensure a safe environment for all ages.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">Developer Empowerment</h4>
                  <p className="text-xs text-gray-400">Direct portal support for indie game developers to submit and showcase their creations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 2: PRIVACY POLICY */}
      {/* ========================================================================= */}
      {page === 'privacy' && (
        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 text-xs font-bold border border-green-500/30">
                Effective Date: August 13, 2026
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white">Privacy Policy</h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              At BollywoodGame.online, we take your personal privacy seriously. This Privacy Policy details the types of information we collect, how it is used, and the safeguards in place to protect your browsing experience.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
            
            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#FFB800]" /> 1. Information We Collect
              </h2>
              <p>
                <strong>Non-Personal Information:</strong> We may collect anonymous analytical data, such as your browser type, device category, screen resolution, operating system, and pages visited. This helps us optimize game performance and load times.
              </p>
              <p>
                <strong>User-Provided Data:</strong> If you voluntarily create a profile, post reviews, or submit games, we store your chosen username, email address, and gameplay statistics (coins earned, high scores, and favorite lists).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FFB800]" /> 2. Cookies & Local Storage
              </h2>
              <p>
                BollywoodGame uses browser <code>localStorage</code> to remember your sound settings, favorite games, daily lucky bonuses, and saved progress so you don't lose data when reloading the page.
              </p>
              <p>
                We do not use invasive tracking cookies or sell your personal browsing habits to third-party data brokers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFB800]" /> 3. Children's Privacy (COPPA)
              </h2>
              <p>
                BollywoodGame.online complies with the Children's Online Privacy Protection Act (COPPA). We do not knowingly collect personally identifiable information from children under the age of 13. Our educational, puzzle, and family games are designed to be played safely without mandatory registration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#FFB800]" /> 4. Third-Party Game Embeds & Analytics
              </h2>
              <p>
                Some games on our platform are hosted or created by verified third-party HTML5 game developers. When playing embedded titles, these developers may use their own cookies or analytics to facilitate gameplay features. We encourage users to review the privacy notices of external game providers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFB800]" /> 5. Data Privacy Inquiries & Removal
              </h2>
              <p>
                If you have questions about this policy or wish to request the deletion of your account data and reviews, please contact our Data Protection Officer at <a href="mailto:privacy@bollywoodgame.online" className="text-[#FFB800] underline">privacy@bollywoodgame.online</a>.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 3: TERMS OF SERVICE */}
      {/* ========================================================================= */}
      {page === 'terms' && (
        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-bold border border-blue-500/30">
                Last Updated: August 2026
              </span>
            </div>
            <h1 className="text-3xl font-display font-black text-white">Terms of Service</h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Please read these Terms of Service carefully before accessing or using BollywoodGame.online. By visiting our website, playing our games, or using our services, you agree to be bound by these terms.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
            
            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FFB800]" /> 1. Acceptance of Terms
              </h2>
              <p>
                By accessing BollywoodGame.online ("the Service"), you confirm that you are at least 13 years of age or have parental consent to use the website. If you do not agree to all terms and conditions, you must discontinue use immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FFB800]" /> 2. Intellectual Property & Copyright
              </h2>
              <p>
                All original platform branding, UI designs, code, graphics, and interactive features are the proprietary property of BollywoodGame.online.
              </p>
              <p>
                Games hosted on the platform belong to their respective developers, copyright owners, or are distributed under legitimate open-web/HTML5 distribution agreements. If you believe any content infringes your intellectual property, please contact us for prompt DMCA takedown review.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFB800]" /> 3. Permitted User Conduct
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-gray-300 pl-2">
                <li>You agree not to disrupt or tamper with server infrastructure, security systems, or game code.</li>
                <li>You agree not to use automated bots, scrapers, or exploits to unfairly manipulate leaderboard rankings or coin systems.</li>
                <li>You will not post abusive, defamatory, or inappropriate comments in game reviews.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FFB800]" /> 4. Disclaimer of Warranties
              </h2>
              <p>
                BollywoodGame.online is provided on an "as is" and "as available" basis without warranties of any kind. While we strive for 100% uptime and smooth gameplay across all 5,000+ games, we do not guarantee uninterrupted or error-free operation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#FFB800]" /> 5. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the platform following modifications signifies your acceptance of updated conditions.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 4: CONTACT US */}
      {/* ========================================================================= */}
      {page === 'contact' && (
        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 text-[#FFB800] text-xs font-bold border border-[#FFB800]/30">
              <MessageSquare className="w-3.5 h-3.5" /> Support & Inquiries
            </span>
            <h1 className="text-3xl font-display font-black text-white">Contact Our Team</h1>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl">
              Have questions, feedback on a game, partnership inquiries, or need support? We'd love to hear from you. Send us a message and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: Contact Channels & Info */}
            <div className="space-y-4">
              
              <div className="p-5 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FFB800]" /> Direct Emails
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-400 block">General Support:</span>
                    <a href="mailto:support@bollywoodgame.online" className="text-white font-medium hover:text-[#FFB800]">
                      support@bollywoodgame.online
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Game Developers & Publishing:</span>
                    <a href="mailto:developers@bollywoodgame.online" className="text-white font-medium hover:text-[#FFB800]">
                      developers@bollywoodgame.online
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Advertising & Partnerships:</span>
                    <a href="mailto:business@bollywoodgame.online" className="text-white font-medium hover:text-[#FFB800]">
                      business@bollywoodgame.online
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400" /> Response Times
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Our customer support and developer triage teams operate 7 days a week from Mumbai & Bangalore. Average response time is under <strong>24 hours</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a1a1a] border border-gray-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-[#FFB800]" /> Submit a Game
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you an indie game developer? You can also publish games directly to our portal using our interactive submit modal!
                </p>
              </div>

            </div>

            {/* Right 2 Cols: Interactive Contact Form */}
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#1a1a1a] border border-gray-800 shadow-xl">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto border border-green-500/30 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Thank you for reaching out, <strong>{name}</strong>. A support representative will review your inquiry and respond to <strong>{email}</strong> shortly.
                  </p>
                  <button
                    onClick={resetContactForm}
                    className="px-6 py-2.5 bg-[#FFB800] hover:bg-amber-400 text-black font-bold text-xs rounded-full transition-transform active:scale-95 cursor-pointer shadow-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h2 className="text-lg font-display font-black text-white">Send Us a Message</h2>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1.5">Inquiry Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'general', label: 'General Help' },
                        { id: 'dev', label: 'Game Dev' },
                        { id: 'bug', label: 'Report Bug' },
                        { id: 'business', label: 'Business' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setContactType(t.id)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer text-center ${
                            contactType === t.id
                              ? 'bg-[#FFB800] text-black border-[#FFB800]'
                              : 'bg-[#222222] text-gray-300 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full bg-[#222222] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-300 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="priya@example.com"
                        className="w-full bg-[#222222] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What is your message regarding?"
                      className="w-full bg-[#222222] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">Message *</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your feedback, inquiry, or question here..."
                      className="w-full bg-[#222222] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB800] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FFB800] hover:bg-amber-400 text-black font-extrabold text-xs sm:text-sm rounded-full transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support</span>
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
