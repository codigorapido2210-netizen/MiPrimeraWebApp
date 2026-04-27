import { motion } from 'motion/react';
import { Search, MapPin, Wind, Globe, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const cities = [
  { id: 'nyc', name: 'New York', country: 'USA', venue: 'MetLife Stadium', description: 'The cultural capital and host of the final.', climate: 'Continental', img: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&q=80&w=800' },
  { id: 'la', name: 'Los Angeles', country: 'USA', venue: 'SoFi Stadium', description: 'Hollywood glamour meets world-class football.', climate: 'Mediterranean', img: 'https://images.unsplash.com/photo-1549419131-01f705e46639?auto=format&fit=crop&q=80&w=800' },
  { id: 'cdmx', name: 'Mexico City', country: 'Mexico', venue: 'Estadio Azteca', description: 'The heart of Mexican football history.', climate: 'Subtropical', img: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&q=80&w=800' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', venue: 'BMO Field', description: 'Canadas world-class multicultural hub.', climate: 'Continental', img: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&q=80&w=800' },
  { id: 'miami', name: 'Miami', country: 'USA', venue: 'Hard Rock Stadium', description: 'Tropical vibes and high-energy nightlife.', climate: 'Tropical', img: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800' },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', venue: 'BC Place', description: 'Stunning nature meets urban sophistication.', climate: 'Oceanic', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800' },
  { id: 'guadalajara', name: 'Guadalajara', country: 'Mexico', venue: 'Estadio Akron', description: 'The home of Mariachi and Tequila.', climate: 'Semiarid', img: 'https://images.unsplash.com/photo-1612441304227-31421446655f?auto=format&fit=crop&q=80&w=800' },
  { id: 'seattle', name: 'Seattle', country: 'USA', venue: 'Lumen Field', description: 'The Emerald City, a tech and nature paradise.', climate: 'Oceanic', img: 'https://images.unsplash.com/photo-1444076784383-69fe7bae1b0a?auto=format&fit=crop&q=80&w=800' },
];

export default function Cities() {
  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-12 md:mb-16">
          <span className="editorial-badge mb-6 inline-block">Explore 2026</span>
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-primary mb-6 uppercase leading-[0.9]">
            THE WORLD CUP <br /> <span className="italic font-light">DESTINATIONS</span>
          </h1>
          <p className="text-primary text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            16 cities across 3 nations. Each offering a unique cultural tapestry and world-class hospitality. Choose your base for the global stage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
          {cities.map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[4/5] w-full bg-neutral-100 rounded-xl overflow-hidden mb-6 md:mb-8 border border-neutral-100 shadow-sm">
                <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 editorial-badge bg-white/95 text-primary backdrop-blur-sm border-none shadow-md py-1 px-3">
                  {city.country}
                </div>
                <div className="absolute bottom-6 left-6 text-white z-10 right-6">
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none drop-shadow-xl">{city.name}</h3>
                  <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mt-3 flex items-center gap-1 drop-shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> {city.venue}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <p className="text-primary font-black text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
                {city.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3 text-[9px] font-black tracking-widest uppercase text-primary">
                   <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-accent" /> {city.climate}</span>
                </div>
                <Link to={`/cities/${city.id}`} className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-accent border-b border-primary hover:border-accent pb-0.5 transition-all">
                  SECURE SPOT
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

