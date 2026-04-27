import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, MapPin, Users, Wifi, Wind, Coffee, Shield, Calendar, ArrowLeft, Heart, Share2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const hotelData = {
  id: '1',
  name: 'THE RITZ REFORMA LUXE',
  location: 'Mexico City, MX',
  address: 'Paseo de la Reforma 234, CDMX',
  description: 'A sanctuary of modern luxury rising above the historic heart of Mexico City. Features panoramic views of Chapultepec Park and world-class amenities designed for the international elite during the 2026 games.',
  rating: 4.9,
  reviews: 1240,
  price: '$850',
  images: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800'
  ],
  amenities: [
    { name: 'Ultra-fast Wifi', icon: Wifi },
    { name: 'Climate Control', icon: Wind },
    { name: 'Artisanal Coffee', icon: Coffee },
    { name: '24/7 Security', icon: Shield },
    { name: 'Stadium Shuttle', icon: Users },
    { name: 'VIP Concierge', icon: Star }
  ],
  policies: [
    'Check-in: 3:00 PM',
    'Check-out: 11:00 AM',
    'Cancellation: 48h before arrival',
    'No smoking in rooms'
  ]
};

export default function HotelDetail() {
  const { id } = useParams();

  const handleBooking = () => {
    toast.success('Reservation request submitted. Awaiting concierge approval.');
  };

  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        {/* Back Navigation */}
        <Link to="/cities" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Destinations
        </Link>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Gallery Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border-4 border-primary shadow-2xl"
            >
              <img src={hotelData.images[0]} alt={hotelData.name} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 flex gap-3">
                <Badge className="bg-white/90 text-primary border-none font-black text-[9px] tracking-widest px-4 py-2 rounded-xl backdrop-blur-md">OFFICIAL PARTNER</Badge>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {hotelData.images.slice(1).map((img, i) => (
                <div key={i} className="aspect-video rounded-[1.5rem] overflow-hidden border-2 border-neutral-100 shadow-lg">
                  <img src={img} alt={hotelData.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-4">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    <span className="text-primary font-black text-xs ml-2 tracking-tight">{hotelData.rating} ({hotelData.reviews} Verified Reviews)</span>
                  </div>
                  <div className="flex gap-4">
                    <button className="p-3 rounded-full border-2 border-neutral-100 hover:border-accent hover:text-accent transition-all">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-full border-2 border-neutral-100 hover:border-accent hover:text-accent transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-primary leading-none uppercase">
                  {hotelData.name} <br /> <span className="italic font-light">EST. 2022</span>
                </h1>
                <p className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                  <MapPin className="w-4 h-4 text-accent" />
                  {hotelData.location} • {hotelData.address}
                </p>
              </div>

              <p className="text-primary text-lg font-medium leading-relaxed">
                {hotelData.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                {hotelData.amenities.map(item => (
                  <div key={item.name} className="flex flex-col gap-3">
                    <item.icon className="w-6 h-6 text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-tight">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Box */}
            <div className="mt-12 p-10 bg-primary text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700" />
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent block mb-2">Neural Dynamic Pricing</span>
                    <span className="text-5xl font-black text-white font-mono">{hotelData.price}</span>
                    <span className="text-[10px] font-bold text-white/40 ml-2 uppercase">/ NIGHT</span>
                  </div>
                  <Button 
                    onClick={handleBooking}
                    className="editorial-button h-20 px-16 bg-accent text-primary font-black uppercase tracking-widest text-xs hover:bg-white active:scale-95 transition-all shadow-xl shadow-accent/20 w-full md:w-auto"
                  >
                    Hold Space
                  </Button>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-neutral-100 pt-20">
          <div className="space-y-6">
            <h3 className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
              <Info className="w-6 h-6 text-accent" /> Arrival Protocol
            </h3>
            <ul className="space-y-4">
              {hotelData.policies.map(p => (
                <li key={p} className="text-sm font-bold text-primary/60 border-l-2 border-accent pl-4">{p}</li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
              <Users className="w-6 h-6 text-accent" /> 2026 Special Access
            </h3>
            <p className="text-primary/60 text-sm font-bold leading-relaxed">
              This property is designated as a Top-Tier Node for international supporters. Guests receive priority access to official shuttle routes, pre-match briefings in the Atlas Lounge, and curated security escort services if requested via the concierge dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
