import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import { 
  Briefcase, 
  Search, 
  FileUp, 
  Building2, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ShieldCheck as ShieldIcon,
  Layers,
  Code,
  Award,
  Clock,
  GraduationCap,
  Laptop,
  Cpu,
  Truck,
  HeartPulse,
  Headphones,
  ShoppingBag,
  FileText
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    activeTab, 
    setActiveTab, 
    setIsResumeModalOpen,
    setIsLoginModalOpen,
    openAuthModal,
    setSelectedCategory,
    siteSettings,
    loggedInUser,
    isAdminAuthenticated,
    requestLogout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);

  const servicesRef = useRef(null);
  const industriesRef = useRef(null);

  // Close dropdowns when clicking outside, pressing Escape, or changing page
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesDropdownOpen(false);
      }
      if (industriesRef.current && !industriesRef.current.contains(e.target)) {
        setIndustriesDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setIndustriesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setServicesDropdownOpen(false);
    setIndustriesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [activeTab]);

  const navigateToPage = (tabName) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setIndustriesDropdownOpen(false);
    setActiveTab(tabName);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const servicesList = [
    { title: 'Permanent Staffing', desc: 'Direct corporate recruitment & verified lateral hiring' },
    { title: 'Specialized IT & Tech Desk', desc: 'Full-stack, DevOps, Cloud & AI engineers' },
    { title: 'Executive Search & CXO', desc: 'Confidential leadership & Director talent acquisition' },
    { title: 'Bulk & Volume Hiring Drives', desc: 'Turnkey staffing for warehouses, plants & BPO' },
    { title: 'Contract & Flexi-Staffing', desc: 'On-demand workforce for project deadlines' },
    { title: 'Payroll & HR Compliance', desc: 'PF, ESI, TDS & labor regulations management' },
    { title: 'Campus Placement Drives', desc: 'Fresher hiring programs across 80+ universities' },
    { title: 'Background Verification (BGV)', desc: 'Credential authentication & physical KYC checks' }
  ];

  const industriesList = [
    { name: 'Information Technology & Software', filter: 'IT & Software' },
    { name: 'Banking & Financial Services (BFSI)', filter: 'Finance & Accounts' },
    { name: 'Manufacturing & Automotive', filter: 'Manufacturing & Engineering' },
    { name: 'Supply Chain, Logistics & Warehousing', filter: 'Operations & Logistics' },
    { name: 'Healthcare & Pharmaceuticals', filter: 'Healthcare & Pharma' },
    { name: 'BPO, KPO & Customer Experience', filter: 'Customer Support / BPO' },
    { name: 'Retail, FMCG & E-Commerce', filter: 'Sales & Marketing' },
    { name: 'Real Estate & Construction', filter: 'Manufacturing & Engineering' },
    { name: 'Education & Academic Training', filter: 'HR & Recruitment' }
  ];

  return (
    <header className="sticky top-0 z-40 shadow-md">
      
      {/* 🧭 TOP CONTACT STRIP */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800/90">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Left Contact Items */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-[12px]">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">WhatsApp:</span>
              <a 
                href={`https://wa.me/${siteSettings.whatsappDigits}`}
                target="_blank" 
                rel="noreferrer"
                className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                {siteSettings.whatsappNumber}
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <a href={`mailto:${siteSettings.email}`} className="text-slate-300 hover:text-white transition-colors">
                {siteSettings.email}
              </a>
            </div>
          </div>

          {/* Right Social Media & Trust Tag */}
          <div className="flex items-center gap-3 text-[11px] sm:text-[12px]">
            <span className="text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full text-[10px]">
              {siteSettings.heroTagline}
            </span>
            <span className="text-slate-500">•</span>
            <div className="flex items-center gap-2.5 text-slate-400">
              <a href="#facebook" title="Facebook" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a href="#instagram" title="Instagram" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#linkedin" title="LinkedIn" className="hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 🏢 MAIN NAVIGATION BAR matching Screenshot 3 */}
      <div className="bg-[#0B1528] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 h-20">
            
            {/* OFFICIAL LOGO */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
              onClick={() => navigateToPage('home')}
            >
              <div className="bg-white p-1 rounded-xl shadow-xs border border-white/20 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
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
                  alt="Thakur Job Consultant" 
                  className="h-9 sm:h-11 w-auto object-contain" 
                />
              </div>

              <div className="whitespace-nowrap">
                <div className="flex items-baseline gap-1">
                  <span className="font-heading font-extrabold text-base sm:text-lg text-white tracking-tight leading-none">
                    THAKUR
                  </span>
                  <span className="text-[10px] font-bold text-sky-400">®</span>
                </div>
                <div className="font-heading font-extrabold text-[10px] text-sky-400 tracking-widest uppercase mt-0.5">
                  JOB CONSULTANT
                </div>
                <p className="text-[8px] font-semibold text-slate-400 tracking-wider uppercase hidden xl:block">
                  RECRUITMENT & PLACEMENT SERVICES
                </p>
              </div>
            </div>

            {/* Nav items: Each opens a distinct dedicated page */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs xl:text-sm font-medium text-slate-200 whitespace-nowrap">
              
              {/* Home */}
              <button
                onClick={() => navigateToPage('home')}
                className={`py-2 whitespace-nowrap shrink-0 transition-colors relative cursor-pointer ${
                  activeTab === 'home' 
                    ? 'text-sky-400 font-bold border-b-2 border-sky-400' 
                    : 'text-slate-200 hover:text-sky-400'
                }`}
              >
                Home
              </button>

              {/* About Us */}
              <button
                onClick={() => navigateToPage('about')}
                className={`py-2 whitespace-nowrap shrink-0 transition-colors relative cursor-pointer ${
                  activeTab === 'about' 
                    ? 'text-sky-400 font-bold border-b-2 border-sky-400' 
                    : 'text-slate-200 hover:text-sky-400'
                }`}
              >
                About Us
              </button>

              {/* Jobs */}
              <button
                onClick={() => navigateToPage('search')}
                className={`py-2 whitespace-nowrap shrink-0 transition-colors relative cursor-pointer ${
                  activeTab === 'search' 
                    ? 'text-sky-400 font-bold border-b-2 border-sky-400' 
                    : 'text-slate-200 hover:text-sky-400'
                }`}
              >
                Jobs
              </button>

              {/* Services ▾ Dropdown */}
              <div className="relative shrink-0" ref={servicesRef}>
                <button
                  type="button"
                  onClick={() => {
                    setServicesDropdownOpen(!servicesDropdownOpen);
                    setIndustriesDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1 py-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === 'services' || servicesDropdownOpen
                      ? 'text-sky-400 font-bold'
                      : 'text-slate-200 hover:text-sky-400'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-sky-400' : ''}`} />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 max-h-[65vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 z-50 animate-fadeIn space-y-1">
                    <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Recruitment Solutions</span>
                      <button 
                        onClick={() => navigateToPage('services')}
                        className="text-[10px] text-slate-400 hover:text-white cursor-pointer"
                      >
                        All Services
                      </button>
                    </div>
                    {servicesList.map((svc, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigateToPage('services')}
                        className="px-3 py-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group"
                      >
                        <p className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                          {svc.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {svc.desc}
                        </p>
                      </div>
                    ))}
                    <div className="pt-1.5 border-t border-slate-800 px-3">
                      <button
                        onClick={() => navigateToPage('services')}
                        className="w-full text-center text-xs font-bold text-sky-400 hover:text-sky-300 py-1 cursor-pointer"
                      >
                        Open Full Services Page →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries ▾ Dropdown */}
              <div className="relative shrink-0" ref={industriesRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIndustriesDropdownOpen(!industriesDropdownOpen);
                    setServicesDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1 py-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === 'industries' || industriesDropdownOpen
                      ? 'text-sky-400 font-bold'
                      : 'text-slate-200 hover:text-sky-400'
                  }`}
                >
                  <span>Industries</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${industriesDropdownOpen ? 'rotate-180 text-sky-400' : ''}`} />
                </button>

                {industriesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 max-h-[65vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 z-50 animate-fadeIn space-y-1">
                    <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Industries Served</span>
                      <button 
                        onClick={() => navigateToPage('industries')}
                        className="text-[10px] text-slate-400 hover:text-white"
                      >
                        All Sectors
                      </button>
                    </div>
                    {industriesList.map((ind, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(ind.filter);
                          navigateToPage('search');
                        }}
                        className="px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer text-xs font-semibold text-slate-200 hover:text-emerald-400"
                      >
                        {ind.name}
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-800 px-3">
                      <button
                        onClick={() => navigateToPage('industries')}
                        className="w-full text-center text-xs font-bold text-emerald-400 hover:text-emerald-300 py-1 cursor-pointer"
                      >
                        Open Full Industries Page →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Employers */}
              <button
                onClick={() => {
                  setCurrentRole('employer');
                  navigateToPage('employer');
                }}
                className={`py-2 whitespace-nowrap shrink-0 transition-colors relative cursor-pointer ${
                  activeTab === 'employer' 
                    ? 'text-sky-400 font-bold border-b-2 border-sky-400' 
                    : 'text-slate-200 hover:text-sky-400'
                }`}
              >
                Employers
              </button>

              {/* Contact */}
              <button
                onClick={() => navigateToPage('contact')}
                className={`py-2 whitespace-nowrap shrink-0 transition-colors relative cursor-pointer ${
                  activeTab === 'contact' 
                    ? 'text-sky-400 font-bold border-b-2 border-sky-400' 
                    : 'text-slate-200 hover:text-sky-400'
                }`}
              >
                Contact
              </button>

            </nav>

            {/* Right Action buttons */}
            <div className="hidden md:flex items-center gap-2 shrink-0 whitespace-nowrap">
              {isAdminAuthenticated ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentRole('admin');
                      navigateToPage('admin');
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === 'admin'
                        ? 'border-purple-400 bg-purple-700 text-white shadow-md'
                        : 'border-purple-500/50 bg-purple-950/60 hover:bg-purple-900 text-purple-200'
                    }`}
                  >
                    <ShieldIcon className="w-3.5 h-3.5" />
                    <span>Admin Panel</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => requestLogout('admin')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-rose-500/40 bg-rose-950/50 hover:bg-rose-900/70 text-rose-200 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                    title="Logout Admin"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : loggedInUser?.role === 'employer' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentRole('employer');
                      navigateToPage('employer');
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === 'employer'
                        ? 'border-indigo-400 bg-indigo-900/60 text-indigo-200'
                        : 'border-slate-700 hover:border-slate-500 bg-slate-900/80 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Employer Desk</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => requestLogout('employer')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-rose-500/40 bg-rose-950/50 hover:bg-rose-900/70 text-rose-200 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                    title="Logout Employer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : loggedInUser?.role === 'candidate' ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigateToPage('dashboard')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === 'dashboard'
                        ? 'border-sky-400 bg-sky-900/60 text-sky-300'
                        : 'border-slate-700 hover:border-slate-500 bg-slate-900/80 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-sky-400" />
                    <span>My Dashboard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => requestLogout('candidate')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-rose-500/40 bg-rose-950/50 hover:bg-rose-900/70 text-rose-200 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                    title="Logout Candidate"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openAuthModal('login', 'candidate')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700 hover:border-slate-500 bg-slate-900/80 hover:bg-slate-800 text-white text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-300" />
                    <span>Login</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal('register', 'candidate')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/40 text-xs font-bold whitespace-nowrap transition-all cursor-pointer"
                  >
                    <span>Register</span>
                  </button>
                </div>
              )}

              {/* 📄 Upload CV Button */}
              <button
                type="button"
                onClick={() => setIsResumeModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold whitespace-nowrap shadow-md shadow-sky-500/20 hover:scale-105 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Upload CV</span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsResumeModalOpen(true)}
                className="px-3 py-1.5 rounded-full bg-[#0284c7] text-white text-xs font-bold flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>CV</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0B1528] text-white p-4 space-y-2 max-h-[85vh] overflow-y-auto">
          <button
            onClick={() => navigateToPage('home')}
            className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg ${
              activeTab === 'home' ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => navigateToPage('about')}
            className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg ${
              activeTab === 'about' ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => navigateToPage('search')}
            className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg ${
              activeTab === 'search' ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            Jobs
          </button>

          <button
            onClick={() => navigateToPage('services')}
            className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg ${
              activeTab === 'services' ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            Recruitment Services
          </button>

          <button
            onClick={() => navigateToPage('industries')}
            className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg ${
              activeTab === 'industries' ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            Industries We Serve
          </button>

          <button
            onClick={() => {
              setCurrentRole('employer');
              navigateToPage('employer');
            }}
            className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg ${
              activeTab === 'employer' ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            Employers Desk
          </button>

          <button
            onClick={() => navigateToPage('contact')}
            className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg ${
              activeTab === 'contact' ? 'bg-sky-600 text-white' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            Contact & Office
          </button>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {isAdminAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setCurrentRole('admin');
                    setActiveTab('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-full text-sm font-bold bg-purple-600 text-white flex items-center justify-center gap-1.5"
                >
                  <ShieldIcon className="w-4 h-4" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={() => { requestLogout('admin'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-full text-sm font-bold border border-rose-500/40 bg-rose-950/60 text-rose-200 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : loggedInUser?.role === 'employer' ? (
              <>
                <button
                  onClick={() => {
                    setCurrentRole('employer');
                    navigateToPage('employer');
                  }}
                  className="w-full py-2.5 rounded-full text-sm font-bold border border-indigo-500/50 bg-slate-900 text-indigo-300 flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  <span>Employer Desk</span>
                </button>
                <button
                  onClick={() => { requestLogout('employer'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-full text-sm font-bold border border-rose-500/40 bg-rose-950/60 text-rose-200 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : loggedInUser?.role === 'candidate' ? (
              <>
                <button
                  onClick={() => navigateToPage('dashboard')}
                  className="w-full py-2.5 rounded-full text-sm font-bold border border-sky-500/50 bg-slate-900 text-sky-300 flex items-center justify-center gap-1.5"
                >
                  <User className="w-4 h-4 text-sky-400" />
                  <span>My Dashboard</span>
                </button>
                <button
                  onClick={() => { requestLogout('candidate'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-full text-sm font-bold border border-rose-500/40 bg-rose-950/60 text-rose-200 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { openAuthModal('login', 'candidate'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold border border-slate-700 bg-slate-900 text-white flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-slate-300" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => { openAuthModal('register', 'candidate'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold border border-sky-500/50 bg-sky-950/70 text-sky-300 flex items-center justify-center gap-1.5"
                >
                  <span>Register</span>
                </button>
              </div>
            )}

            <button
              onClick={() => { setIsResumeModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-full text-sm font-bold bg-[#0284c7] text-white flex items-center justify-center gap-1.5 shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Upload CV (Free)</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
