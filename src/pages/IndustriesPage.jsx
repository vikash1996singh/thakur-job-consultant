import React from 'react';
import { useApp } from '../context/AppContext';
import { IndustriesSection } from '../components/IndustriesSection';
import { Sparkles, Home, Briefcase, TrendingUp } from 'lucide-react';

export const IndustriesPage = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      
      {/* 🧭 Page Header Banner */}
      <section className="bg-[#0B1528] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button 
              onClick={() => setActiveTab('home')}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">Industries</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs text-emerald-300 font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sector Specialization</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Industries We Serve & Specialize In
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Thakur Job Consultant maintains dedicated industry recruiting teams across IT, BFSI, Manufacturing, Logistics, Healthcare, and Corporate Services.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('search')}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Briefcase className="w-4 h-4" />
              <span>Browse All Live Vacancies</span>
            </button>
          </div>

        </div>
      </section>

      {/* 🏭 Full Industries Section */}
      <IndustriesSection />

    </div>
  );
};
