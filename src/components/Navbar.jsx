import React from 'react';
import { useApp } from '../context/AppContext';
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
  X
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    activeTab, 
    setActiveTab, 
    candidateProfile,
    setIsResumeModalOpen,
    applications
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-xs bg-white">
      
      {/* 🧭 TOP BAR (Harmonized with website's corporate Navy & Indigo palette) */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Left Contact Items */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[12px]">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Toll Free:</span>
              <a href="tel:18008909231" className="font-bold text-white hover:text-indigo-300 transition-colors">
                1800-890-9231
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">WhatsApp:</span>
              <a 
                href="https://wa.me/918852249966" 
                target="_blank" 
                rel="noreferrer"
                className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                +91 88522 49966
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <a href="mailto:info@thakurconsultancy.in" className="text-slate-300 hover:text-white transition-colors">
                info@thakurconsultancy.in
              </a>
            </div>
          </div>

          {/* Right Social Media Links */}
          <div className="flex items-center gap-3 text-[12px]">
            <span className="text-slate-400 font-medium">Follow Us:</span>
            <div className="flex items-center gap-3 text-slate-300">
              {/* Facebook */}
              <a href="#facebook" title="Facebook" className="hover:text-indigo-400 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="#instagram" title="Instagram" className="hover:text-indigo-400 transition-colors">
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#linkedin" title="LinkedIn" className="hover:text-indigo-400 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#youtube" title="YouTube" className="hover:text-indigo-400 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 🏢 MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo in matching Navy & Indigo Theme */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            {/* Emblem icon */}
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border-2 border-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6 text-indigo-600 stroke-[2.2]" />
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight leading-none">
                  THAKUR
                </span>
                <span className="text-[10px] font-bold text-indigo-600 -mt-1">®</span>
              </div>
              <div className="font-heading font-extrabold text-xs text-indigo-600 tracking-widest uppercase mt-0.5">
                JOB CONSULTANCY
              </div>
              <p className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase">
                RECRUITMENT | CORPORATE HR | PLACEMENT
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button
              onClick={() => setActiveTab('home')}
              className={`hover:text-indigo-600 transition-colors ${
                activeTab === 'home' ? 'text-indigo-600 font-bold' : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`hover:text-indigo-600 transition-colors ${
                activeTab === 'search' ? 'text-indigo-600 font-bold' : ''
              }`}
            >
              Jobs
            </button>

            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="hover:text-indigo-600 transition-colors"
            >
              Upload Resume
            </button>

            <button
              onClick={() => {
                setCurrentRole('employer');
                setActiveTab('employer');
              }}
              className={`hover:text-indigo-600 transition-colors ${
                activeTab === 'employer' ? 'text-indigo-600 font-bold' : ''
              }`}
            >
              For Employers
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`hover:text-indigo-600 transition-colors ${
                activeTab === 'dashboard' ? 'text-indigo-600 font-bold' : ''
              }`}
            >
              Candidate Hub
            </button>

            <button
              onClick={() => {
                setCurrentRole('admin');
                setActiveTab('admin');
              }}
              className={`hover:text-purple-700 text-xs px-2.5 py-1 rounded-md bg-purple-50 border border-purple-200 transition-colors ${
                activeTab === 'admin' ? 'font-bold' : ''
              }`}
            >
              Admin Desk
            </button>
          </nav>

          {/* Right Action: Pill-shaped CTA Button (Matching Theme Indigo/Blue) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-7 py-3 rounded-full text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 transition-all hover:scale-105 flex items-center gap-2"
            >
              <span>Get Free Job Alert</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-2">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
          >
            Home
          </button>
          <button
            onClick={() => { setActiveTab('search'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
          >
            Jobs
          </button>
          <button
            onClick={() => { setIsResumeModalOpen(true); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
          >
            Upload Resume
          </button>
          <button
            onClick={() => { setActiveTab('employer'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
          >
            For Employers
          </button>
          <button
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
          >
            Candidate Hub
          </button>
          <button
            onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-purple-700 rounded-lg hover:bg-purple-50"
          >
            Admin Desk
          </button>

          <div className="pt-2">
            <button
              onClick={() => { setIsResumeModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-full text-sm font-bold bg-indigo-600 text-white shadow-sm"
            >
              Get Free Job Alert
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
