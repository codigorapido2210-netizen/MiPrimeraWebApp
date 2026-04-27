import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Search, User, Menu, X, Heart, ShoppingBag, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // On pages other than home, we always want the "scrolled" look (white background)
  const showScrolledStyle = isScrolled || !isHomePage;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-white/95 backdrop-blur-xl border-b border-border-editorial py-2 shadow-sm`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="bg-accent text-primary p-2 rounded-lg flex items-center justify-center shadow-lg shadow-accent/20 group-hover:bg-primary group-hover:text-accent transition-colors duration-300">
              <Trophy className="w-6 h-6 stroke-[2.5px]" />
            </div>
            <span className="font-sans text-2xl font-black tracking-tighter transition-colors duration-300 text-primary">
              2026
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/cities" className="text-[11px] font-black tracking-[0.2em] transition-all uppercase border-b-2 border-transparent hover:border-accent pb-1 text-primary hover:text-accent">Destinations</Link>
            <Link to="/stadiums" className="text-[11px] font-black tracking-[0.2em] transition-all uppercase border-b-2 border-transparent hover:border-accent pb-1 text-primary hover:text-accent">Stadiums</Link>
            <Link to="/events" className="text-[11px] font-black tracking-[0.2em] transition-all uppercase border-b-2 border-transparent hover:border-accent pb-1 text-primary hover:text-accent">Experiences</Link>
            <Link to="/ai-planner" className="flex items-center gap-2 text-[11px] font-black tracking-[0.2em] transition-all uppercase border-b-2 border-transparent hover:border-accent pb-1 text-primary hover:text-accent">
              <span className="bg-accent text-primary text-[9px] px-1.5 py-0.5 rounded-[2px] font-black shadow-sm">AI</span>
              Planner
            </Link>
          </nav>

          <div className="flex items-center gap-8">
            <Button variant="ghost" className="hidden sm:flex text-[10px] font-black tracking-widest uppercase transition-colors px-0 hover:bg-transparent text-primary hover:text-accent font-black">
              Become a Partner
            </Button>
            
            <Link to="/auth">
              <div className="h-11 w-11 rounded-full border-2 overflow-hidden flex items-center justify-center transition-all duration-300 group border-border-editorial bg-neutral-100 shadow-inner hover:border-accent hover:scale-110">
                <User className="w-5 h-5 transition-colors text-primary group-hover:text-accent" />
              </div>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden h-12 w-12 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 shadow-sm transition-all active:scale-95" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-primary" />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed inset-0 z-[10000] bg-white flex flex-col lg:hidden"
          >
            {/* Inner Header */}
            <div className="flex justify-between items-center p-8 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-white p-2.5 rounded-xl shadow-lg">
                  <Trophy className="w-5 h-5 flex-shrink-0" />
                </div>
                <span className="text-xl font-black tracking-tighter text-primary uppercase">FIFA 2026</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-neutral-100 h-12 w-12 transition-transform active:scale-95" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-8 h-8 text-primary" />
              </Button>
            </div>

            {/* Links Section */}
            <nav className="flex-1 flex flex-col justify-center px-10 gap-2 overflow-y-auto">
              {[
                { name: 'Destinations', path: '/cities', desc: '16 Legendary Host Cities' },
                { name: 'Stadiums', path: '/stadiums', desc: 'Stages of World Glory' },
                { name: 'Experiences', path: '/events', desc: 'Luxury Hospitality' },
                { name: 'AI Planner', path: '/ai-planner', desc: 'Neural Travel Engine' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className="group block py-6 border-b border-neutral-50 last:border-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-5xl font-black tracking-tighter text-primary group-hover:text-accent transition-all duration-300 uppercase leading-none">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mt-4 group-hover:text-accent transition-colors">
                          {item.desc}
                        </span>
                      </div>
                      <ArrowRight className="w-8 h-8 text-neutral-200 group-hover:text-accent group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Menu Footer */}
            <div className="p-10 bg-neutral-50 border-t border-neutral-100 mt-auto">
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full h-20 bg-primary text-white rounded-2xl font-black tracking-[0.2em] text-xs uppercase shadow-xl hover:bg-neutral-800 transition-all active:scale-[0.98]">
                  ACCESS FAN PORTAL
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
