import {Globe, Instagram, Twitter, Youtube, Facebook, Shield, MapPin, Mail, Phone} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
               <div className="bg-accent text-primary p-2 rounded-lg">
                 <Globe className="w-5 h-5" />
               </div>
               <span className="text-2xl font-black tracking-tighter uppercase">Market 2026</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              The official marketplace for the 2026 Global Event. Travel, tickets, and luxury hospitaly across three great nations.
            </p>
            <div className="flex items-center gap-4">
              <Instagram className="w-5 h-5 text-white/40 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-white/40 hover:text-accent cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-white/40 hover:text-accent cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-white/40 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Navigation</h4>
            <nav className="flex flex-col gap-4 text-sm font-bold">
              <Link to="/cities" className="hover:text-accent transition-colors">Cities & Routes</Link>
              <Link to="/stadiums" className="hover:text-accent transition-colors">The Stadiums</Link>
              <Link to="/events" className="hover:text-accent transition-colors">Hospitality Packs</Link>
              <Link to="/ai-planner" className="hover:text-accent transition-colors">AI Concierge</Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Support</h4>
            <nav className="flex flex-col gap-4 text-sm font-bold">
              <span className="hover:text-accent transition-colors cursor-pointer">Help Center</span>
              <span className="hover:text-accent transition-colors cursor-pointer">Partner Portal</span>
              <span className="hover:text-accent transition-colors cursor-pointer">Safety Guidelines</span>
              <span className="hover:text-accent transition-colors cursor-pointer">Visa Information</span>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Global HQ</h4>
            <div className="space-y-4 text-sm font-bold text-white/60">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                <span>One World Trade Center<br/>New York, NY 10007</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>support@travel2026.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+1 (800) 2026-FIFA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black tracking-[0.2em] text-white/40 uppercase">
          <div className="flex items-center gap-12">
            <span>USA • MÉXICO • CANADA</span>
            <span className="hidden sm:inline">Certified Official Reseller</span>
          </div>
          
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
               <span className="text-white/60">CURRENCY:</span> USD
            </div>
            <div className="flex items-center gap-2">
               <span className="text-white/60">LANGUAGE:</span> EN (US)
            </div>
            <span className="text-accent">© 2026 TRAVEL MARKET LTD.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
