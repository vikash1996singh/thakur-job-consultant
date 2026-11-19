import React from 'react';
import { useApp } from '../context/AppContext';
import { ServicesSection } from '../components/ServicesSection';
import { Sparkles, Home, Building2, FileText, CheckCircle2 } from 'lucide-react';

export const ServicesPage = () => {
  const { setActiveTab, setIsResumeModalOpen } = useApp();

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      
      {/* 🧭 Page Header Banner */}
      <section className="bg-[#0B1528] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>
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
            <span className="text-sky-400 font-semibold">Services</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-xs text-sky-300 font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Recruitment & Staffing Capabilities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Comprehensive Recruitment Services
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            From lateral permanent placements and executive search to high-volume hiring and payroll compliance, Thakur Job Consultant delivers customized talent solutions.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('employer')}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4" />
              <span>Post Employer Requirement</span>
            </button>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Upload Candidate CV</span>
            </button>
          </div>

        </div>
      </section>

      {/* 💼 Full Services Section */}
      <ServicesSection />

    </div>
  );
};
