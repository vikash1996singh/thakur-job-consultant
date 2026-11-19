import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import { getThemeClasses } from '../utils/theme';
import { JobCard } from '../components/JobCard';
import { initialCategories } from '../data/mockData';
import { ServicesSection } from '../components/ServicesSection';
import { IndustriesSection } from '../components/IndustriesSection';
import { AboutSection } from '../components/AboutSection';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  FileUp, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Clock, 
  Users,
  FileText
} from 'lucide-react';

export const CandidateHome = () => {
  const { 
    jobs, 
    theme, 
    setActiveTab, 
    setSelectedJobForModal, 
    setIsResumeModalOpen,
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    setSelectedCategory,
    openAuthModal
  } = useApp();

  const themeClasses = getThemeClasses(theme);

  const [localQuery, setLocalQuery] = useState('');
  const [localLocation, setLocalLocation] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    setLocationFilter(localLocation);
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeJobs = jobs.filter(j => j.status === 'active');
  const featuredJobs = activeJobs.slice(0, 4);

  // Curated High-Definition Background Images for the Hero
  const heroBackgrounds = [
    {
      id: 'team',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'skyline',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'meeting',
      url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'workplace',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85'
    }
  ];

  const [activeBgIndex, setActiveBgIndex] = useState(0);

  // Automatic Background Picture Slide (Auto-change every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 🚀 Hero Section with Automatic Cross-Fading Background Pictures */}
      <section className="relative overflow-hidden text-white pt-16 pb-28 px-4 sm:px-6 lg:px-8">
        
        {/* Auto-Changing Background Images with Smooth Cross-Fade */}
        {heroBackgrounds.map((bg, idx) => (
          <div 
            key={bg.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              idx === activeBgIndex ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ 
              backgroundImage: `url('${bg.url}')` 
            }}
          ></div>
        ))}

        {/* Balanced Dark Slate-Navy Gradient Overlay matching Screenshot 3 palette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/90 via-[#0B1528]/80 to-[#0B1528]/95 backdrop-blur-[1px]"></div>

        {/* Subtle Ambient Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Trust Tag with Official Logo */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-sky-200 shadow-sm">
            <div className="bg-white p-0.5 rounded-md flex items-center justify-center">
              <img 
                src={logoImg} 
                onError={(e) => {
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = '1';
                    e.currentTarget.src = './logo.png';
                  } else if (e.currentTarget.dataset.fallback === '1') {
                    e.currentTarget.dataset.fallback = '2';
                    e.currentTarget.src = '/logo.png';
                  }
                }}
                alt="Thakur Logo" 
                className="h-4 w-auto object-contain" 
              />
            </div>
            <span className="font-bold text-white">Thakur Job Consultant</span>
            <span className="text-white/40">•</span>
            <span className="text-amber-300 font-semibold">100% Free For Candidates</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Connecting Top Talent With <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-sky-200 to-indigo-300">
                Verified Career Opportunities
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
              Discover verified vacancies directly submitted by authorized corporate employers and pre-screened by Thakur Job Consultant. Zero candidate fees guaranteed.
            </p>
          </div>

          {/* 🔍 Main Search Box with Location & Role */}
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/80 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 text-slate-800"
          >
            <div className="flex-1 flex items-center gap-3 px-3 w-full border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                maxLength={100}
                placeholder="Job title, skills (e.g. React, HR, Accounts)"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value.slice(0, 100))}
                className="w-full text-sm placeholder:text-slate-400 focus:outline-none bg-transparent font-medium"
              />
            </div>

            <div className="flex-1 flex items-center gap-3 px-3 w-full pb-2 md:pb-0">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                maxLength={80}
                placeholder="City (e.g. Noida, Delhi NCR, Gurugram)"
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value.slice(0, 80))}
                className="w-full text-sm placeholder:text-slate-400 focus:outline-none bg-transparent font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 rounded-xl sm:rounded-2xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 bg-[#0284c7] hover:bg-[#0369a1] text-white cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Jobs</span>
            </button>
          </form>

          {/* Quick Trending Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Popular:
            </span>
            {['React Developer', 'HR Executive', 'Remote Jobs', 'Fresher', 'Logistics', 'Accounts'].map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  setActiveTab('search');
                }}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors border border-white/10 cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Quick Stats Pill */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800">
            <div>
              <div className="font-heading font-extrabold text-2xl text-white">450+</div>
              <div className="text-xs text-slate-400">Verified Companies</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-white">1,200+</div>
              <div className="text-xs text-slate-400">Live Vacancies</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-white">15,000+</div>
              <div className="text-xs text-slate-400">Candidates Placed</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-emerald-400">100% Free</div>
              <div className="text-xs text-slate-400">For Job Seekers</div>
            </div>
          </div>

        </div>
      </section>

      {/* 📁 Upload CV Highlight Card matching user request & Screenshots 1 & 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-900 uppercase tracking-wider mb-1">
                Fast-Track Placement Desk
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl">
                Upload your CV in 30 Seconds — Direct From Your Browser
              </h3>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
                Supported formats: PDF, DOC, DOCX up to 5 MB. Pre-screened and matched with authorized recruiters within 24-48 hours. Zero candidate fee.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="w-full md:w-auto px-7 py-3.5 bg-white text-sky-800 hover:bg-slate-100 rounded-2xl font-heading font-bold text-sm shadow-md transition-all hover:scale-105 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Upload your CV</span>
          </button>
        </div>
      </section>

      {/* 💼 EXPANDED SERVICES SECTION ("sevice bada de") */}
      <ServicesSection />

      {/* 🏭 EXPANDED INDUSTRIES SECTION ("industry bada de") */}
      <IndustriesSection />

      {/* 📂 Popular Job Sectors / Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Explore Sectors
            </span>
            <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
              Popular Job Categories
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 group cursor-pointer"
          >
            <span>View All Sectors</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {initialCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat.name)}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:border-sky-300"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-sky-50 text-slate-700 group-hover:text-sky-600 flex items-center justify-center transition-colors mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                {cat.name}
              </h4>
              <p className="text-xs text-slate-400 mt-1">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌟 Featured Verified Vacancies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Hand-picked
            </span>
            <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
              Latest Verified Job Vacancies
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 group cursor-pointer"
          >
            <span>Explore All {activeJobs.length} Vacancies</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onSelect={(selected) => setSelectedJobForModal(selected)}
            />
          ))}
        </div>
      </section>

      {/* 🏢 EXPANDED ABOUT US SECTION ("about bada de") */}
      <AboutSection />

      {/* 🏢 Employer Hiring Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800 shadow-xl">
          
          {/* High-Rise Corporate Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')` 
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-sky-950/90 backdrop-blur-[1px]"></div>

          <div className="space-y-3 max-w-xl relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              For Corporate Employers & Recruiters
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Looking to Hire Pre-Screened Candidates in Delhi NCR?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Post job openings, receive verified candidate resumes, and manage interview schedules through Thakur Job Consultant's corporate recruitment suite.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0 relative z-10">
            <button
              onClick={() => openAuthModal('register', 'employer')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-xs bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              Post a Vacancy
            </button>
            <button
              onClick={() => openAuthModal('register', 'employer')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-xs bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 transition-colors border border-slate-600 backdrop-blur-md cursor-pointer"
            >
              Register as Employer
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
