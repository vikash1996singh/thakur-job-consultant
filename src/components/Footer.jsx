import React from 'react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../utils/theme';
import { 
  Briefcase, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  FileCheck2, 
  Lock, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';

export const Footer = () => {
  const { setActiveTab, theme } = useApp();
  const themeClasses = getThemeClasses(theme);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${themeClasses.primary}`}>
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                  THAKUR JOB CONSULTANT
                </span>
                <p className="text-[11px] text-slate-400 font-medium">
                  Verified Candidate & Employer Recruitment Network
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Thakur Job Consultant is a dedicated recruitment portal connecting job seekers with authorized vacancies across IT, Manufacturing, Logistics, and Corporate Sectors with complete transparency.
            </p>

            <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-xs text-amber-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Zero Fee Policy:</strong> Candidates are never charged for job applications or interview calls. Report any suspicious requests immediately.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Candidate Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('search')} className="hover:text-white transition-colors">
                  Search All Vacancies
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('search')} className="hover:text-white transition-colors">
                  IT & Software Roles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('search')} className="hover:text-white transition-colors">
                  Work From Home / Remote
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">
                  Application Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">
                  My Resume & Alerts
                </button>
              </li>
            </ul>
          </div>

          {/* Employer & Consultancy */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              For Employers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('employer')} className="hover:text-white transition-colors">
                  Post a New Job
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('employer')} className="hover:text-white transition-colors">
                  Employer Verification
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('employer')} className="hover:text-white transition-colors">
                  Applicant Tracking System
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors">
                  Admin Governance Desk
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How Verification Works
                </a>
              </li>
            </ul>
          </div>

          {/* Official Contact & Legal */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Official Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Sector 62, Electronic City, Noida, Uttar Pradesh, 201309</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>+91 (0120) 456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>support@thakurconsultant.com</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 block">Grievance Officer:</span>
              <span className="text-xs text-slate-300 font-medium">Mr. S. Thakur (grievance@thakurconsultant.com)</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Thakur Job Consultant. All rights reserved. Designed strictly as per official product specification.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#cookies" className="hover:text-slate-400 transition-colors">Cookie Notice</a>
            <span>•</span>
            <a href="#security" className="hover:text-slate-400 transition-colors">Data Security & Encryption</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
