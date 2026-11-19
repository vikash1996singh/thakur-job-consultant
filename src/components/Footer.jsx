import React from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import { 
  Briefcase, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  FileCheck2, 
  Lock, 
  CheckCircle2, 
  Globe,
  ArrowRight,
  FileText
} from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, setIsResumeModalOpen, setSelectedCategory, setIsAdminAuthModalOpen, siteSettings } = useApp();

  const navigateToPage = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 5-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/90">
          
          {/* Brand & Mission with Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-xl shadow-xs border border-white/20 flex items-center justify-center">
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
                  className="h-10 w-auto object-contain" 
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                  THAKUR JOB CONSULTANT
                </span>
                <p className="text-[11px] text-slate-400 font-medium">
                  Verified Candidate & Corporate Recruitment Network
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Thakur Job Consultant is an authorized recruitment consultancy bridging skilled candidates and top-tier employers across IT, Manufacturing, BFSI, Logistics, and Corporate operations with absolute transparency.
            </p>

            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-amber-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Zero Candidate Charges:</strong> Candidates are strictly never charged for registration, resumes, or interview scheduling.
              </p>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Recruitment Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateToPage('services')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  Permanent Staffing
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('services')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  Specialized IT Recruitment
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('services')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  Executive Search & CXO
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('services')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  Bulk & Volume Hiring
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('services')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  Contract & Flexi-Staffing
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('services')} className="hover:text-sky-400 transition-colors cursor-pointer">
                  Payroll & HR Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Industries Served */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Industries Served
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setSelectedCategory('IT & Software'); setActiveTab('search'); }} 
                  className="hover:text-sky-400 transition-colors"
                >
                  IT & Software Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Finance & Accounts'); setActiveTab('search'); }} 
                  className="hover:text-sky-400 transition-colors"
                >
                  Banking & Financial (BFSI)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Manufacturing & Engineering'); setActiveTab('search'); }} 
                  className="hover:text-sky-400 transition-colors"
                >
                  Manufacturing & Auto
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Operations & Logistics'); setActiveTab('search'); }} 
                  className="hover:text-sky-400 transition-colors"
                >
                  Logistics & Warehousing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Customer Support / BPO'); setActiveTab('search'); }} 
                  className="hover:text-sky-400 transition-colors"
                >
                  BPO & Customer Experience
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Healthcare & Pharma'); setActiveTab('search'); }} 
                  className="hover:text-sky-400 transition-colors"
                >
                  Healthcare & Life Sciences
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Physical Office */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Office & Helpline
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{siteSettings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[11px] text-emerald-400">{siteSettings.whatsappNumber} (WhatsApp)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-white transition-colors">
                  {siteSettings.email}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Fast CV Drop</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Thakur Job Consultant. All Rights Reserved. Pan-India Recruitment & Staffing.</span>
            <button
              type="button"
              onClick={() => setIsAdminAuthModalOpen(true)}
              className="text-slate-800 hover:text-slate-600 transition-colors p-0.5 cursor-pointer"
              title="Staff Gate"
            >
              <Lock className="w-2.5 h-2.5" />
            </button>
          </p>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <button onClick={() => navigateToPage('about')} className="hover:text-white transition-colors cursor-pointer">
              About Us
            </button>
            <span>•</span>
            <button onClick={() => navigateToPage('services')} className="hover:text-white transition-colors cursor-pointer">
              Services
            </button>
            <span>•</span>
            <button onClick={() => navigateToPage('industries')} className="hover:text-white transition-colors cursor-pointer">
              Industries
            </button>
            <span>•</span>
            <button onClick={() => navigateToPage('employer')} className="hover:text-white transition-colors cursor-pointer">
              Employers
            </button>
            <span>•</span>
            <button onClick={() => navigateToPage('contact')} className="hover:text-white transition-colors cursor-pointer">
              Contact
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
