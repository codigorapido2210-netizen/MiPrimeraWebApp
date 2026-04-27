import { motion } from 'motion/react';
import { Search, MapPin, Calendar, Users, ArrowRight, Sparkles, Map, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const featuredCities = [
  { id: 'cdmx', name: 'Mexico City', country: 'Mexico', img: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&q=80&w=800', event: 'Opening Match' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', img: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&q=80&w=800', event: 'Group Stage' },
  { id: 'la', name: 'Los Angeles', country: 'USA', img: 'https://images.unsplash.com/photo-1549419131-01f705e46639?auto=format&fit=crop&q=80&w=800', event: 'Quarter Finals' },
  { id: 'ny', name: 'New York', country: 'USA', img: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&q=80&w=800', event: 'The Final' },
];

export default function Home() {
  return (
    <div className="flex flex-col bg-surface">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Stadium"
            className="w-full h-full object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/40 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="editorial-badge mb-6 bg-accent text-primary !border-accent inline-block uppercase font-black px-4 py-2">
              The Matrix of Football 2026
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase">
              THE ROAD <br /> <span className="text-accent underline decoration-white/20 underline-offset-8 italic font-light">TO GLORY</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-2xl mb-12 font-medium leading-relaxed drop-shadow-md uppercase tracking-tight">
              A neural-optimized travel ecosystem for the biggest event in human history. 16 cities, infinite luxury, one legendary destination.
            </p>

            {/* Redesigned Search Panel integrated into hero */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white rounded-[2.5rem] p-4 shadow-2xl shadow-black/40 border-4 border-white/10 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-all border border-neutral-100 group">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2 group-hover:text-accent">Global Hub</p>
                  <Input placeholder="Enter City..." className="border-none p-0 h-auto focus-visible:ring-0 text-lg font-black placeholder:text-neutral-300 bg-transparent" />
                </div>
                <div className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-all border border-neutral-100">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2">Temporal Sync</p>
                  <div className="text-lg font-black text-primary font-mono">JUNE 2026</div>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-all border border-neutral-100 hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2">Unit Capacity</p>
                  <div className="text-lg font-black text-primary uppercase">2 ADULTS / VIP</div>
                </div>
                <Button className="editorial-button h-16 md:h-auto rounded-xl bg-primary text-white hover:bg-accent text-xs font-black tracking-widest uppercase shadow-xl transition-all">
                  INITIALIZE SEARCH
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Cities Section */}
      <section className="pt-24 pb-32 container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-4 md:mb-6 block">Selection 2026</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-primary uppercase leading-[0.9]">
              THE HOST <br /> <span className="italic font-light">COLLECTION</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:gap-6 border-l-4 border-accent pl-6 md:pl-8 py-2">
            <p className="text-primary font-black text-md md:text-lg max-w-sm leading-relaxed uppercase">
              16 Cities. 3 Nations. One vision of football excellence.
            </p>
            <Link to="/cities">
              <Button variant="outline" className="h-12 md:h-14 px-6 md:px-8 border-primary text-primary font-black tracking-widest text-[10px] rounded-0 hover:bg-primary hover:text-white transition-all uppercase">
                Full Directory
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {[
            { id: 'cdmx', name: 'Mexico City', country: 'MEXICO', desc: 'Historical culinary routes and luxury terraces.', img: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&q=80&w=800', price: 240 },
            { id: 'toronto', name: 'Toronto', country: 'CANADA', desc: 'Waterfront premium stays with CN Tower views.', img: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&q=80&w=800', price: 310 },
            { id: 'la', name: 'Los Angeles', country: 'USA', desc: 'Hollywood glamour meets world-class football.', img: 'https://images.unsplash.com/photo-1549419131-01f705e46639?auto=format&fit=crop&q=80&w=800', price: 380 },
          ].map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative h-64 w-full bg-neutral-100 rounded-2xl overflow-hidden mb-6">
                <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold tracking-widest">{city.country}</div>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-primary uppercase">{city.name}</h3>
              <p className="text-sm text-primary mt-2 leading-relaxed line-clamp-2 font-bold">{city.desc}</p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-accent font-black text-sm">${city.price}</span>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">/ avg night</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Planner CTA Block */}
      <section className="px-6 md:px-12 pb-32 container mx-auto">
        <div className="bg-primary rounded-[2rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between border-4 border-accent group hover:border-white transition-all duration-500 shadow-2xl gap-10 md:gap-0 text-center lg:text-left">
           <div className="max-w-xl">
             <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent text-primary flex items-center justify-center mb-6 md:mb-8 shadow-lg mx-auto lg:mx-0">
               <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
             </div>
             <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-4 md:mb-6 text-white uppercase">BUILD YOUR <br className="hidden md:block" /> DREAM FINAL TOUR</h3>
             <p className="text-white/90 font-black text-lg md:text-xl leading-relaxed">Use our AI engine to optimize tickets, flights, and stays. Personalized routes for the ultimate 2026 experience.</p>
           </div>
           <Link to="/ai-planner" className="w-full lg:w-auto">
             <Button className="editorial-button bg-accent text-primary hover:bg-white h-16 md:h-24 px-8 md:px-16 text-xs md:text-sm font-black tracking-[0.3em] flex items-center gap-4 shadow-xl active:scale-95 transition-all w-full lg:w-auto">
               DESIGN TRIP <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-4 transition-transform duration-300" />
             </Button>
           </Link>
        </div>
      </section>
    </div>
  );
}
