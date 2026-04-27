import { motion } from 'motion/react';
import { Shield, Star, Users, MapPin, ArrowRight, Calendar, Beer, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const packages = [
  {
    id: 'platinum',
    title: 'Platinum Hospitality',
    price: '$4,500',
    venue: 'MetLife Stadium, NJ',
    access: 'Private Suite',
    features: ['5-Course Dining', 'Open Bar', 'Pitch-side Access', 'Private Entry'],
    img: 'https://images.unsplash.com/photo-1540747735232-e7f67bd3571c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'gold',
    title: 'Gold Lounge',
    price: '$2,800',
    venue: 'Azteca Stadium, CDMX',
    access: 'Shared Terrace',
    features: ['Premium Buffet', 'Dedicated Host', 'Pre-match Show', 'Buffet Dining'],
    img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'club',
    title: 'Club 2026',
    price: '$1,200',
    venue: 'BC Place, Vancouver',
    access: 'Category 1 Seating',
    features: ['Standard Bar', 'Light Snacks', 'Match Program', 'Souvenir Gift'],
    img: 'https://images.unsplash.com/photo-1510051640316-cee39563ddab?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function Experiences() {
  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <section className="container mx-auto px-6 md:px-12 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="editorial-badge mb-6 inline-block bg-accent text-primary">Luxury & Access</span>
          <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tighter text-primary mb-6 uppercase leading-[0.9]">
            PREMIUM <br /> <span className="italic font-light">EXPERIENCES</span>
          </h1>
          <p className="text-primary text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            Elevate your tournament journey with world-class hospitality, exclusive access, and white-glove service at every match.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 md:px-12">
        <div className="space-y-32">
          {packages.map((pkg, idx) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
            >
              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-4 border-primary shadow-2xl shadow-black/10">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover" />
                  <div className="absolute top-8 left-8 bg-black/90 backdrop-blur-md text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-white/20">
                    LIMITED AVAILABILITY
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-black tracking-[0.2em] text-accent uppercase">
                    <Star className="w-4 h-4 fill-current" />
                    {pkg.access}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-primary uppercase leading-none">
                    {pkg.title}
                  </h2>
                  <div className="flex items-center gap-2 text-primary font-black uppercase text-sm tracking-widest">
                    <MapPin className="w-4 h-4 text-accent" />
                    {pkg.venue}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {pkg.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3 text-sm font-bold text-primary">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 block mb-1">Starting from</span>
                    <span className="text-4xl font-black text-primary font-mono">{pkg.price}</span>
                    <span className="text-[10px] text-neutral-400 font-bold ml-2 uppercase">/ Person</span>
                  </div>
                  <Button className="editorial-button h-16 px-12 rounded-xl text-xs font-black tracking-widest uppercase bg-primary text-white hover:bg-neutral-800 transition-all w-full sm:w-auto">
                    Reserve Access
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Services Section */}
      <section className="mt-40 bg-primary py-32 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto border border-white/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black tracking-tighter uppercase">Guaranteed Authenticity</h3>
              <p className="text-white/60 text-sm leading-relaxed">Secure 100% official hospitality packages verified by the organizing committee.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto border border-white/20">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black tracking-tighter uppercase">Dedicated Concierge</h3>
              <p className="text-white/60 text-sm leading-relaxed">24/7 personal support for travel, logistics, and on-site requirements.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto border border-white/20">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black tracking-tighter uppercase">Seamless Logistics</h3>
              <p className="text-white/60 text-sm leading-relaxed">Door-to-door transportation and airport transfers included in all premium tiers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
