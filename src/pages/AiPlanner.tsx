import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, DollarSign, Calendar, ArrowRight, Loader2, Hotel, Utensils, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getAiRecommendation, TravelRecommendation } from '@/services/aiService';

export default function AiPlanner() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TravelRecommendation | null>(null);
  
  const [formData, setFormData] = useState({
    city: '',
    budget: '',
    duration: ''
  });

  const generatePlan = async () => {
    if (!formData.city || !formData.budget || !formData.duration) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setPlan(null);
    
    try {
      const data = await getAiRecommendation(formData.city, formData.budget, formData.duration);
      setPlan(data);
      toast.success('Route optimized successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-left mb-16">
          <span className="editorial-badge mb-6 inline-block bg-accent text-primary">Neural Concierge v1.0</span>
          <h1 className="font-sans text-5xl md:text-7xl font-black tracking-tighter text-primary mb-6 uppercase leading-[0.9]">
            PLAN YOUR <br /> <span className="italic font-light">2026 JOURNEY</span>
          </h1>
          <p className="text-primary text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            AI-driven optimization for your World Cup itinerary. Stays, routes, and experiences tailored to the world's biggest stage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Input Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="p-8 border-4 border-primary rounded-[2rem] bg-white shadow-2xl shadow-black/5 space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Target Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                    <Input 
                      placeholder="e.g., Miami, Vancouver" 
                      className="h-16 pl-12 rounded-xl border-neutral-100 bg-neutral-50 focus-visible:ring-accent font-bold text-primary" 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Capital Allocation (USD)</label>
                   <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                    <Input 
                      type="number" 
                      placeholder="e.g., 5000" 
                      className="h-16 pl-12 rounded-xl border-neutral-100 bg-neutral-50 focus-visible:ring-accent font-bold text-primary" 
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Time Horizon</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                    <Input 
                      placeholder="e.g., 7 days" 
                      className="h-16 pl-12 rounded-xl border-neutral-100 bg-neutral-50 focus-visible:ring-accent font-bold text-primary" 
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="editorial-button w-full h-20 rounded-2xl text-white font-black group bg-primary hover:bg-neutral-800 transition-all active:scale-95 shadow-xl shadow-primary/20" 
                onClick={generatePlan}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                    <span className="tracking-[0.2em] uppercase text-xs">Processing Data...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="tracking-[0.2em] uppercase text-xs">Generate Itinerary</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!plan && !loading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-h-[500px] flex flex-col items-center justify-center p-12 border-4 border-dashed border-neutral-200 rounded-[3rem] text-center bg-white/50"
                >
                  <div className="w-24 h-24 bg-neutral-100 rounded-3xl flex items-center justify-center mb-8 rotate-3 border-2 border-neutral-200">
                    <Sparkles className="w-12 h-12 text-neutral-300" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter text-primary mb-4 uppercase">Neural Engine Offline</h3>
                  <p className="text-neutral-500 max-w-sm font-bold leading-relaxed uppercase tracking-wide text-xs">
                    Input your parameters to activate the 2026 travel matrix according to official event nodes.
                  </p>
                </motion.div>
              )}

              {plan && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-16"
                >
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-8 border-2 border-neutral-100 rounded-[2rem] bg-white shadow-xl shadow-black/[0.02] group hover:border-accent transition-all duration-500">
                      <Hotel className="w-8 h-8 text-accent mb-6" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">Base Operations</p>
                      <p className="font-black text-primary text-xl leading-tight uppercase">{plan.hotel}</p>
                    </div>
                    <div className="p-8 border-2 border-neutral-100 rounded-[2rem] bg-white shadow-xl shadow-black/[0.02] group hover:border-accent transition-all duration-500">
                      <Utensils className="w-8 h-8 text-accent mb-6" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">Social Node</p>
                      <p className="font-black text-primary text-xl leading-tight uppercase">{plan.restaurants[0]}</p>
                    </div>
                    <div className="p-8 border-2 border-neutral-100 rounded-[2rem] bg-white shadow-xl shadow-black/[0.02] group hover:border-accent transition-all duration-500">
                      <Compass className="w-8 h-8 text-accent mb-6" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">Peak Experience</p>
                      <p className="font-black text-primary text-xl leading-tight uppercase">{plan.activities[0]}</p>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="space-y-10">
                     <h3 className="text-4xl font-black tracking-tighter flex items-center gap-6 uppercase">
                       <span className="bg-primary text-white px-4 py-1 rounded-lg">LIVE</span> 
                       Itinerary Details
                     </h3>
                     <div className="space-y-0">
                       {plan.itinerary.map((day, i) => (
                         <div key={i} className="flex gap-8 md:gap-12 items-start group relative pb-12 last:pb-0">
                           {i !== plan.itinerary.length - 1 && (
                             <div className="absolute left-6 top-14 bottom-0 w-1 bg-neutral-100 group-hover:bg-accent transition-colors duration-500" />
                           )}
                           <div className="bg-primary text-white w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 font-black text-xl md:text-2xl shadow-lg relative z-10 group-hover:bg-accent transition-colors duration-500">
                             {day.day}
                           </div>
                           <div className="pt-2 md:pt-4">
                             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2">Phase 0{day.day}</h4>
                             <p className="text-primary font-black text-xl md:text-2xl leading-tight uppercase max-w-xl group-hover:text-accent transition-colors duration-500">
                               {day.plan}
                             </p>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>

                  {/* Budget Allocation */}
                  <div className="p-10 md:p-16 bg-primary text-white rounded-[3rem] relative overflow-hidden shadow-2xl">
                     <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/20 blur-[100px] rounded-full" />
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-accent">Financial Projection</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 relative z-10">
                       <div className="border-l-2 border-white/20 pl-8">
                         <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Hospitality</p>
                         <p className="text-4xl md:text-5xl font-black text-white font-mono">{plan.budgetBreakdown.stay}</p>
                       </div>
                       <div className="border-l-2 border-white/20 pl-8">
                         <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Living Space</p>
                         <p className="text-4xl md:text-5xl font-black text-white font-mono">{plan.budgetBreakdown.food}</p>
                       </div>
                       <div className="border-l-2 border-white/20 pl-8">
                         <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Experiences</p>
                         <p className="text-4xl md:text-5xl font-black text-white font-mono">{plan.budgetBreakdown.activities}</p>
                       </div>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

