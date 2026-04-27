import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Globe, Mail, Lock, User as UserIcon, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Access Granted. Welcome back.');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Authentication sequence failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(user, { displayName: data.name });
      
      await setDoc(doc(db, 'users', user.uid), {
        displayName: data.name,
        email: data.email,
        role: 'USER',
        createdAt: serverTimestamp(),
      });

      toast.success('Registration Complete. Identity verified.');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Identity creation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      
      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName,
        email: user.email,
        role: 'USER',
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
      }, { merge: true });

      toast.success('Cloud Sync Complete. Welcome.');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Google identity sync failed');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-surface px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-white rounded-3xl mb-8 shadow-2xl shadow-primary/20 rotate-3">
            <Globe className="w-10 h-10" />
          </div>
          <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-primary mb-4 uppercase leading-none">
            GLOBAL <br /> <span className="italic font-light">IDENTITY GATE</span>
          </h1>
          <p className="text-primary font-bold text-xs uppercase tracking-[0.3em]">Access the 2026 travel matrix</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-4 border-primary shadow-2xl shadow-black/5">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-16 p-1.5 bg-neutral-50 rounded-2xl mb-10 border border-neutral-100">
              <TabsTrigger value="login" className="rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Register</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="login">
                <motion.form 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={loginForm.handleSubmit(onLogin)} 
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                      <Input 
                        type="email" 
                        placeholder="Neural Address (Email)" 
                        className="h-16 pl-12 rounded-xl border-neutral-100 bg-neutral-50 focus-visible:ring-primary font-bold text-primary" 
                        {...loginForm.register('email')}
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-[10px] font-black uppercase text-red-500 ml-4 tracking-widest">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                      <Input 
                        type="password" 
                        placeholder="Security Key (Password)" 
                        className="h-16 pl-12 rounded-xl border-neutral-100 bg-neutral-50 focus-visible:ring-primary font-bold text-primary"
                        {...loginForm.register('password')}
                      />
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-[10px] font-black uppercase text-red-500 ml-4 tracking-widest">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <Button className="editorial-button w-full h-16 rounded-xl bg-primary text-white font-black text-xs tracking-[0.2em] uppercase group mt-4 shadow-xl shadow-primary/20" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Authorize Session'}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </motion.form>
              </TabsContent>

              <TabsContent value="register">
                <motion.form 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={registerForm.handleSubmit(onRegister)} 
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                      <Input 
                        placeholder="Legal Designation (Full Name)" 
                        className="h-16 pl-12 rounded-xl border-neutral-100 bg-neutral-50 focus-visible:ring-primary font-bold text-primary"
                        {...registerForm.register('name')}
                      />
                    </div>
                    {registerForm.formState.errors.name && (
                      <p className="text-[10px] font-black uppercase text-red-500 ml-4 tracking-widest">{registerForm.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                     <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                      <Input 
                        type="email" 
                        placeholder="Neural Address (Email)" 
                        className="h-16 pl-12 rounded-xl border-neutral-100 bg-neutral-50 focus-visible:ring-primary font-bold text-primary"
                        {...registerForm.register('email')}
                      />
                    </div>
                    {registerForm.formState.errors.email && (
                      <p className="text-[10px] font-black uppercase text-red-500 ml-4 tracking-widest">{registerForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300" />
                      <Input 
                        type="password" 
                        placeholder="New Security Key (Password)" 
                        className="h-16 pl-12 rounded-xl border-neutral-100 bg-neutral-50 focus-visible:ring-primary font-bold text-primary"
                        {...registerForm.register('password')}
                      />
                    </div>
                    {registerForm.formState.errors.password && (
                      <p className="text-[10px] font-black uppercase text-red-500 ml-4 tracking-widest">{registerForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <Button className="editorial-button w-full h-16 rounded-xl bg-primary text-white font-black text-xs tracking-[0.2em] uppercase group mt-4 shadow-xl shadow-primary/20" disabled={isLoading}>
                    {isLoading ? 'Creating Identity...' : 'Initialize Profile'}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </motion.form>
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-neutral-100" />
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-black text-neutral-300">
              <span className="bg-white px-4 italic">Sync via Cloud Protocol</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 rounded-xl border-2 border-neutral-100 font-black uppercase text-[10px] tracking-widest hover:bg-neutral-50 transition-all group" onClick={onGoogleSignIn}>
              <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-16 rounded-xl border-2 border-neutral-100 font-black uppercase text-[10px] tracking-widest hover:bg-neutral-50 transition-all group">
              <Github className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Github
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


