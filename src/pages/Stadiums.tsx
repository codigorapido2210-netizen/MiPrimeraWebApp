import { motion } from 'motion/react';
import { Trophy, MapPin, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stadiums = [
  {
    id: 'metlife',
    name: 'MetLife Stadium',
    location: 'New York/New Jersey',
    capacity: '82,500',
    type: 'The Finale Venue',
    img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'azteca',
    name: 'Estadio Azteca',
    location: 'Mexico City',
    capacity: '87,500',
    type: 'Opening Match Venue',
    img: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'sofi',
    name: 'SoFi Stadium',
    location: 'Los Angeles',
    capacity: '70,000',
    type: 'Premier Quarter Venue',
    img: 'https://images.unsplash.com/photo-1549419131-01f705e46639?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'bmo',
    name: 'BMO Field',
    location: 'Toronto',
    capacity: '45,736',
    type: 'Group Stage Hub',
    img: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function Stadiums() {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen font-sans">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 md:mb-20"
        >
          <span className="editorial-badge mb-6 bg-accent text-primary !border-accent inline-block">Infrastructure 2026</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-primary mb-6 uppercase leading-[0.9]">
            THE STAGES OF <br /> <span className="italic font-light">GLORY</span>
          </h1>
          <p className="text-primary text-lg md:text-xl font-black max-w-2xl leading-relaxed">
            Witness the world's greatest athletes in the most advanced sporting cathedrals in history. 16 stadiums, 3 nations, 1 legendary tournament.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {stadiums.map((stadium, idx) => (
            <motion.div 
              key={stadium.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-[2rem] border-4 border-primary shadow-2xl mb-6 md:mb-8">
                <img 
                  src={stadium.img} 
                  alt={stadium.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-2">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-primary border border-primary">
                    {stadium.type}
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white right-6">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-4 drop-shadow-2xl leading-tight">{stadium.name}</h3>
                  <div className="flex flex-col gap-2 md:gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                      <span className="font-black text-[10px] md:text-sm tracking-wide uppercase">{stadium.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                      <span className="font-black text-[10px] md:text-sm tracking-wide uppercase font-mono">{stadium.capacity} CAP.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
                <Button className="editorial-button bg-primary text-white hover:bg-accent h-12 md:h-14 px-8 text-[10px] font-black tracking-widest uppercase w-full sm:w-auto">
                  EXPAND VIEW
                </Button>
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="w-4 h-4" />
                  <span className="font-black text-[10px] uppercase tracking-widest">Available June '26</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
