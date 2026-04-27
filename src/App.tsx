/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import Home from './pages/Home';
import Cities from './pages/Cities';
import Stadiums from './pages/Stadiums';
import HotelDetail from './pages/HotelDetail';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import AiPlanner from './pages/AiPlanner';
import Experiences from './pages/Experiences';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 font-sans selection:bg-neutral-950 selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/stadiums" element={<Stadiums />} />
            <Route path="/events" element={<Experiences />} />
            <Route path="/ai-planner" element={<AiPlanner />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}
