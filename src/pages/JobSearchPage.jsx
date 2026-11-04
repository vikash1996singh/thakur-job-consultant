import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../utils/theme';
import { JobCard } from '../components/JobCard';
import { 
  Search, 
  MapPin, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Briefcase, 
  IndianRupee, 
  Building2, 
  ChevronDown,
  X
} from 'lucide-react';

export const JobSearchPage = () => {
  const { 
    jobs, 
    theme, 
    setSelectedJobForModal, 
    searchQuery, 
    setSearchQuery, 
    locationFilter, 
    setLocationFilter, 
    selectedCategory, 
    setSelectedCategory,
    selectedWorkMode,
    setSelectedWorkMode,
    selectedExperience,
    setSelectedExperience,
    selectedSource,
    setSelectedSource,
    sortBy,
    setSortBy
  } = useApp();

  const themeClasses = getThemeClasses(theme);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active Approved Jobs only (per PDF Page 6)
  const approvedJobs = useMemo(() => {
    return jobs.filter(j => j.status === 'active');
  }, [jobs]);

  // Filter & Search Logic
  const filteredJobs = useMemo(() => {
    return approvedJobs.filter(job => {
      // Search Query
      const queryMatch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Location Filter
      const locationMatch = !locationFilter || 
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      // Category Filter
      const categoryMatch = selectedCategory === 'All' || 
        job.category.toLowerCase().includes(selectedCategory.toLowerCase());

      // Work Mode Filter
      const workModeMatch = selectedWorkMode === 'All' || 
        job.workMode.toLowerCase() === selectedWorkMode.toLowerCase();

      // Experience Filter
      const experienceMatch = selectedExperience === 'All' || 
        (selectedExperience === 'Fresher' && job.experience.toLowerCase().includes('fresher')) ||
        (selectedExperience === '1-3 Years' && job.experience.includes('1 - 3')) ||
        (selectedExperience === '3-6 Years' && (job.experience.includes('3 - 6') || job.experience.includes('4 - 8'))) ||
        (selectedExperience === '5+ Years' && job.experience.includes('4 - 8'));

      // Source Filter
      const sourceMatch = selectedSource === 'All' || job.source === selectedSource;

      return queryMatch && locationMatch && categoryMatch && workModeMatch && experienceMatch && sourceMatch;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });
  }, [approvedJobs, searchQuery, locationFilter, selectedCategory, selectedWorkMode, selectedExperience, selectedSource, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setSelectedCategory('All');
    setSelectedWorkMode('All');
    setSelectedExperience('All');
    setSelectedSource('All');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* 🔍 Top Search Header */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-slate-200/90 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Query Search */}
          <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 w-full focus-within:ring-2 focus-within:ring-indigo-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by job title, skills, or company name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800 font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Location Filter */}
          <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 w-full focus-within:ring-2 focus-within:ring-indigo-500">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Location (e.g. Noida, Delhi NCR, Gurugram)..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800 font-medium"
            />
            {locationFilter && (
              <button onClick={() => setLocationFilter('')} className="text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter toggle button on mobile */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Open Filters</span>
          </button>

        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* 🎛️ Desktop Filters Sidebar */}
        <aside className="hidden md:block col-span-1 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              Filter Vacancies
            </span>
            <button
              onClick={handleResetFilters}
              title="Reset all filters"
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Work Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Work Mode
            </label>
            <div className="space-y-1 text-xs text-slate-600">
              {['All', 'On-site', 'Hybrid', 'Remote'].map((mode) => (
                <label key={mode} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="workMode"
                    checked={selectedWorkMode === mode}
                    onChange={() => setSelectedWorkMode(mode)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{mode}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Experience
            </label>
            <div className="space-y-1 text-xs text-slate-600">
              {['All', 'Fresher', '1-3 Years', '3-6 Years', '5+ Years'].map((exp) => (
                <label key={exp} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    checked={selectedExperience === exp}
                    onChange={() => setSelectedExperience(exp)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{exp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Source Attribution (PDF Requirement) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Listing Source
            </label>
            <div className="space-y-1 text-xs text-slate-600">
              {['All', 'Company Verified', 'Consultancy Listed', 'Partner Feed'].map((src) => (
                <label key={src} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="source"
                    checked={selectedSource === src}
                    onChange={() => setSelectedSource(src)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{src}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Industry Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Categories</option>
              <option value="IT Software">IT & Software</option>
              <option value="HR & Recruitment">HR & Recruitment</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="Operations & Logistics">Operations & Logistics</option>
              <option value="Customer Support / BPO">Customer Support / BPO</option>
              <option value="Finance & Accounts">Finance & Accounts</option>
            </select>
          </div>

        </aside>

        {/* 📋 Results Column */}
        <main className="col-span-1 md:col-span-3 space-y-4">
          
          {/* Results Summary Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="font-heading font-extrabold text-sm text-slate-900">
                {filteredJobs.length} Vacancies Found
              </span>
              <span className="text-slate-400 ml-2">
                Showing active verified openings
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="company">Company Name</option>
              </select>
            </div>
          </div>

          {/* Jobs Listing */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelect={(selected) => setSelectedJobForModal(selected)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800">
                No matching vacancies found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your filters, checking different keywords, or resetting all search options.
              </p>
              <button
                onClick={handleResetFilters}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold ${themeClasses.primary}`}
              >
                Clear All Filters
              </button>
            </div>
          )}

        </main>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-80 bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-heading font-bold text-base text-slate-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Work Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Work Mode</label>
              {['All', 'On-site', 'Hybrid', 'Remote'].map((mode) => (
                <label key={mode} className="flex items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="mobileWorkMode"
                    checked={selectedWorkMode === mode}
                    onChange={() => setSelectedWorkMode(mode)}
                  />
                  <span>{mode}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className={`w-full py-3 rounded-xl text-xs font-bold ${themeClasses.primary}`}
            >
              Apply Filters ({filteredJobs.length} Results)
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
