import { motion } from 'motion/react';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, ShoppingBag, Heart, Map as MapIcon, Settings, LogOut, Calendar, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen pt-40 flex flex-col items-center justify-center bg-surface">
      <div className="w-16 h-16 border-4 border-neutral-200 border-t-accent rounded-2xl animate-spin shadow-xl" />
      <span className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-primary">Synchronizing Profile...</span>
    </div>
  );

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-10">
            <div className="bg-white p-8 rounded-[2.5rem] border-4 border-primary shadow-2xl shadow-black/5">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 rounded-[2rem] bg-primary flex items-center justify-center text-white text-4xl font-black shadow-xl ring-4 ring-neutral-50">
                  {user.displayName?.charAt(0)}
                </div>
                <div>
                  <h2 className="font-black text-2xl uppercase tracking-tighter text-primary">{user.displayName}</h2>
                  <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mt-1">{user.email}</p>
                </div>
                <div className="w-full pt-6 border-t border-neutral-100">
                  <Badge className="bg-accent text-primary font-black uppercase tracking-widest text-[9px] hover:bg-accent border-none px-4 py-1.5 rounded-full shadow-lg shadow-accent/20">
                    VIP {user.role}
                  </Badge>
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-3 px-4 lg:px-0">
              <Button variant="ghost" className="justify-start h-14 rounded-2xl text-primary bg-white shadow-xl shadow-black/5 border-2 border-primary/10 font-black uppercase text-[10px] tracking-widest hover:bg-accent transition-all">
                <LayoutDashboard className="w-5 h-5 mr-3 text-accent shrink-0" /> Overview
              </Button>
              <Button variant="ghost" className="justify-start h-14 rounded-2xl text-primary font-black uppercase text-[10px] tracking-widest hover:bg-white hover:shadow-xl transition-all border-2 border-transparent">
                <ShoppingBag className="w-5 h-5 mr-3 text-neutral-300 shrink-0" /> My Bookings
              </Button>
              <Button variant="ghost" className="justify-start h-14 rounded-2xl text-primary font-black uppercase text-[10px] tracking-widest hover:bg-white hover:shadow-xl transition-all border-2 border-transparent">
                <Heart className="w-5 h-5 mr-3 text-neutral-300 shrink-0" /> Favorites
              </Button>
              <div className="pt-8 space-y-3">
                <Button variant="ghost" className="justify-start h-14 rounded-2xl text-primary font-black uppercase text-[10px] tracking-widest hover:bg-white hover:shadow-xl transition-all border-2 border-transparent w-full">
                  <Settings className="w-5 h-5 mr-3 text-neutral-300 shrink-0" /> Settings
                </Button>
                <Button variant="ghost" className="justify-start h-14 rounded-2xl text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-50 transition-all border-2 border-transparent w-full" onClick={handleLogout}>
                  <LogOut className="w-5 h-5 mr-3 shrink-0" /> Terminate Session
                </Button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            <header className="bg-primary text-white p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-700" />
               <div className="relative z-10 space-y-4">
                 <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">Adventure <br/>Control Center</h1>
                 <p className="text-white/60 font-medium text-lg max-w-md">System secure. You have 2 nodes active for the 2026 duration.</p>
                 <div className="pt-4">
                    <Button className="bg-accent text-primary font-black rounded-xl h-14 px-10 hover:bg-white transition-all shadow-xl shadow-accent/20 uppercase tracking-widest text-[11px]">
                      Secure New Experience
                    </Button>
                 </div>
               </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Card className="rounded-[3rem] border-4 border-primary shadow-2xl shadow-black/[0.03] overflow-hidden bg-white">
                <CardHeader className="bg-primary text-white p-8">
                  <CardTitle className="text-xs font-black tracking-[0.3em] uppercase flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-accent" /> Active Reservation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="space-y-8">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center shrink-0 border-2 border-neutral-100">
                        <ShoppingBag className="w-8 h-8 text-neutral-400" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl uppercase tracking-tighter text-primary">BMO Field Hospitality</h4>
                        <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest mt-1">Jun 24, 2026 • Toronto, CA</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-neutral-50 rounded-2xl border-2 border-neutral-100">
                       <span className="text-[11px] font-black uppercase text-neutral-400">Status</span>
                       <Badge className="bg-green-500/10 text-green-600 border-none font-black uppercase tracking-widest text-[9px] px-3">VERIFIED</Badge>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl h-16 border-2 border-primary font-black uppercase tracking-widest text-[11px] hover:bg-primary hover:text-white transition-all">
                      Access Pass (QR)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[3rem] border-4 border-neutral-100 shadow-2xl shadow-black/[0.03] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-[11px] font-black tracking-[0.3em] uppercase text-neutral-400 flex items-center gap-3">
                    <Heart className="w-5 h-5 text-accent" /> Bookmarked Stays
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                   <div className="space-y-6">
                     {[
                       { name: 'Hotel Reforma Luxe', city: 'Mexico City', rating: 4.9, img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=200' },
                       { name: 'The Ritz Seattle', city: 'Seattle', rating: 4.8, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=200' },
                       { name: 'Fairmont Vancouver', city: 'Vancouver', rating: 4.9, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=200' },
                     ].map((stay, i) => (
                       <div key={i} className="flex gap-4 items-center group cursor-pointer hover:bg-neutral-50 p-2 -m-2 rounded-2xl transition-colors">
                         <img src={stay.img} alt={stay.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-neutral-100" />
                         <div className="flex-1">
                           <h5 className="font-black text-xs uppercase tracking-tight text-primary leading-none mb-1">{stay.name}</h5>
                           <p className="text-neutral-400 text-[10px] flex items-center gap-1 font-bold">
                             <MapPin className="w-3 h-3 text-accent" /> {stay.city}
                           </p>
                         </div>
                         <div className="flex items-center gap-1 text-[10px] font-black text-primary bg-accent/10 px-2 py-1 rounded-lg">
                           <Star className="w-3 h-3 text-accent fill-current" /> {stay.rating}
                         </div>
                       </div>
                     ))}
                   </div>
                </CardContent>
              </Card>
            </div>

            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-black tracking-tighter uppercase">Transaction Log</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent cursor-pointer hover:underline">Export Data</span>
              </div>
              <div className="bg-white rounded-[2.5rem] border-4 border-neutral-100 overflow-hidden shadow-xl shadow-black/[0.02]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-neutral-50 text-neutral-400 text-[10px] uppercase tracking-[0.2em] font-black">
                      <tr>
                        <th className="px-10 py-6">Interaction Node</th>
                        <th className="px-10 py-6">Temporal Sync</th>
                        <th className="px-10 py-6">Volume (USD)</th>
                        <th className="px-10 py-6">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-neutral-100">
                      <tr>
                        <td className="px-10 py-8 font-black text-primary uppercase">BMO Field Tour Access</td>
                        <td className="px-10 py-8 text-neutral-400 font-bold uppercase tracking-tight">May 12, 2026</td>
                        <td className="px-10 py-8 font-black text-primary font-mono text-lg">$125.00</td>
                        <td className="px-10 py-8"><Badge className="bg-neutral-100 text-neutral-500 font-black uppercase text-[9px] tracking-widest">SUCCESS</Badge></td>
                      </tr>
                      <tr>
                        <td className="px-10 py-8 font-black text-primary uppercase">Hotel Deposit CDMX</td>
                        <td className="px-10 py-8 text-neutral-400 font-bold uppercase tracking-tight">May 10, 2026</td>
                        <td className="px-10 py-8 font-black text-primary font-mono text-lg">$400.00</td>
                        <td className="px-10 py-8"><Badge className="bg-neutral-100 text-neutral-500 font-black uppercase text-[9px] tracking-widest">SUCCESS</Badge></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

