import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../utils/theme';
import { JobCard } from '../components/JobCard';
import { initialCategories } from '../data/mockData';
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
  Users 
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
    setSelectedCategory
  } = useApp();

  const themeClasses = getThemeClasses(theme);

  const [localQuery, setLocalQuery] = useState('');
  const [localLocation, setLocalLocation] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    setLocationFilter(localLocation);
    setActiveTab('search');
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveTab('search');
  };

  const activeJobs = jobs.filter(j => j.status === 'active');
  const featuredJobs = activeJobs.slice(0, 4);

  // Curated High-Definition Background Images for the Hero
  const heroBackgrounds = [
    {
      id: 'team',
      label: 'Corporate Team',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'skyline',
      label: 'Glass Skyline',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85'
    },
    {
      id: 'meeting',
      label: 'Professional Interview',
      url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85'
    }
  ];
  const [activeBg, setActiveBg] = useState(heroBackgrounds[0].url);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 🚀 Hero Section with High-Resolution Corporate Background Image & Balanced Elegant Overlay */}
      <section className="relative overflow-hidden text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        
        {/* Active High-Resolution Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ 
            backgroundImage: `url('${activeBg}')` 
          }}
        ></div>

        {/* Balanced Dark Slate-Navy Gradient Overlay (Image is beautifully visible while text remains sharp) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/65 to-slate-950/88 backdrop-blur-[1px]"></div>

        {/* Subtle Ambient Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Quick Background Selector Pill on Hero */}
        <div className="absolute top-5 right-5 z-20 hidden sm:flex items-center gap-1 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/20 text-[11px]">
          <span className="text-slate-300 pl-2.5 pr-1 font-medium">Photo:</span>
          {heroBackgrounds.map(bg => (
            <button
              key={bg.id}
              onClick={() => setActiveBg(bg.url)}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                activeBg === bg.url 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {bg.label}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Trust Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-indigo-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="font-semibold">Thakur Job Consultancy 2.0</span>
            <span className="text-white/40">•</span>
            <span>Verified Employer Vacancies Only</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white leading-tight">
              Connecting Top Talent With <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                theme === 'emerald' 
                  ? 'from-emerald-400 to-teal-200' 
                  : theme === 'slate'
                  ? 'from-sky-300 to-indigo-300'
                  : 'from-indigo-400 via-sky-300 to-indigo-200'
              }`}>
                Verified Opportunities
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
              Discover vacancies directly submitted by verified companies and pre-screened by Thakur Job Consultant. Apply directly without paying any unofficial charges.
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
                placeholder="Job title, skills (e.g. React, HR, Accounts)"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="w-full text-sm placeholder:text-slate-400 focus:outline-none bg-transparent font-medium"
              />
            </div>

            <div className="flex-1 flex items-center gap-3 px-3 w-full pb-2 md:pb-0">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="City (e.g. Noida, Delhi NCR, Gurugram)"
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full text-sm placeholder:text-slate-400 focus:outline-none bg-transparent font-medium"
              />
            </div>

            <button
              type="submit"
              className={`w-full md:w-auto px-8 py-3.5 rounded-xl sm:rounded-2xl text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 ${themeClasses.primary}`}
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
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors border border-white/10"
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
              <div className="font-heading font-extrabold text-2xl text-white">100% Free</div>
              <div className="text-xs text-slate-400">For Job Seekers</div>
            </div>
          </div>

        </div>
      </section>

      {/* 📁 Upload Resume Highlight Card (PDF Page 8 Rule: No mobile app required) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <FileUp className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-900 uppercase tracking-wider mb-1">
                Fast-Track Hiring
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl">
                Upload Resume in 30 Seconds — Direct From Your Browser
              </h3>
              <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-xl">
                No mobile app installation required. Supported in PDF, DOC, DOCX formats with built-in malware verification and instant private cloud storage.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="w-full md:w-auto px-7 py-3.5 bg-white text-indigo-800 hover:bg-slate-100 rounded-2xl font-heading font-bold text-sm shadow-md transition-all hover:scale-105 shrink-0 flex items-center justify-center gap-2"
          >
            <FileUp className="w-4 h-4 text-indigo-600" />
            <span>Upload Resume Now</span>
          </button>
        </div>
      </section>

      {/* 📂 Popular Job Sectors / Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Explore Sectors
            </span>
            <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
              Popular Job Categories
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
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
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:border-indigo-300"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-50 text-slate-700 group-hover:text-indigo-600 flex items-center justify-center transition-colors mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
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
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Hand-picked
            </span>
            <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
              Latest Verified Job Vacancies
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-indigo-950/90 backdrop-blur-[1px]"></div>

          <div className="space-y-3 max-w-xl relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              For Corporate Employers & Recruiters
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Looking to Hire Pre-Screened Candidates in Delhi NCR?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Post job openings, receive verified candidate resumes, and manage interview schedules through Thakur Job Consultancy's employer management suite.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0 relative z-10">
            <button
              onClick={() => setActiveTab('employer')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all hover:scale-105"
            >
              Post a Vacancy
            </button>
            <button
              onClick={() => setActiveTab('employer')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-xs bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 transition-colors border border-slate-600 backdrop-blur-md"
            >
              Register Company Profile
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
