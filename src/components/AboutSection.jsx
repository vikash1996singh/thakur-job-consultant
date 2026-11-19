import React from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Sparkles, 
  ArrowRight,
  Clock,
  HeartHandshake,
  Target
} from 'lucide-react';

export const AboutSection = () => {
  const { setActiveTab, setIsResumeModalOpen, siteSettings } = useApp();

  const values = [
    {
      title: '100% Free for Job Seekers',
      desc: 'Strict zero-charge policy. We never collect any registration fees, interview charges, or security deposits from job seekers.',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      title: 'Verified Employer Guarantee',
      desc: 'Every vacancy is verified with authorized HR departments. We eliminate ghost job posts and fraudulent recruitment schemes.',
      icon: CheckCircle2,
      color: 'text-sky-600 bg-sky-50'
    },
    {
      title: 'Fast 24-48h Profile Matching',
      desc: 'Our proprietary candidate indexing and direct HR connections ensure rapid scheduling of preliminary and technical interviews.',
      icon: Clock,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      title: 'Long-Term Candidate Support',
      desc: 'From resume refinement and salary negotiation to first-day onboarding, our team stands with candidates at every step.',
      icon: HeartHandshake,
      color: 'text-amber-600 bg-amber-50'
    }
  ];

  const milestones = [
    { label: 'Candidates Placed', count: '15,000+' },
    { label: 'Corporate Partners', count: '450+' },
    { label: 'Industry Sectors', count: '12+' },
    { label: 'Retention Rate', count: '98%' }
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Brand & Vision Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Official Logo & Identity */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-gradient-to-b from-sky-50/60 to-slate-50/80 rounded-2xl border border-sky-100/80">
            <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200/80 mb-4 transform hover:scale-105 transition-transform duration-300">
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
                alt="Thakur Job Consultant Official Logo" 
                className="h-28 sm:h-36 w-auto object-contain" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <h3 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
                  THAKUR
                </h3>
                <span className="text-xs font-bold text-sky-600">®</span>
              </div>
              <p className="font-heading font-extrabold text-sm text-sky-600 tracking-widest uppercase">
                JOB CONSULTANT
              </p>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Recruitment • Staffing • Corporate HR
              </p>
            </div>

            <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Government Registered Recruitment Desk</span>
            </div>
          </div>

          {/* Right Column: Mission & About Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>About Thakur Job Consultant</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
              Empowering Careers & Powering Corporate Growth Across India
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded with the resolute vision of bringing honesty, speed, and transparency to recruitment, <strong className="text-slate-900">Thakur Job Consultant</strong> has grown into one of North India's most trusted recruitment consultancies.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We eliminate deceptive middleman practices by maintaining a strict <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Zero Fee Policy for Candidates</span>. We connect genuine talent directly with authorized hiring managers across Information Technology, Banking & Finance, Industrial Manufacturing, Logistics, and Corporate Operations.
            </p>

            {/* Quick Milestones Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {milestones.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="font-heading font-extrabold text-xl text-sky-600">{m.count}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Upload Your CV (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('employer')}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-slate-600" />
                <span>Partner With Us As Employer</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 4 Core Pillars of Trust */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {values.map((val, idx) => {
          const IconComp = val.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${val.color}`}>
                <IconComp className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900">
                {val.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* 6-Step Recruitment Process */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            Our Quality Framework
          </span>
          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            The Thakur 6-Step Verified Hiring Process
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            A structured, quality-controlled methodology ensuring candidates and employers achieve perfect career alignments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { step: '01', title: 'Role Mapping', desc: 'Understanding job criteria, culture & compensation' },
            { step: '02', title: 'Talent Sourcing', desc: 'Screening 100,000+ verified talent database' },
            { step: '03', title: '3-Tier Vetting', desc: 'Technical aptitude & past background verification' },
            { step: '04', title: 'Interview Sync', desc: 'Coordinating client schedules with zero friction' },
            { step: '05', title: 'Offer Advisory', desc: 'Transparent compensation and notice period handling' },
            { step: '06', title: 'Joining Care', desc: 'Smooth day-1 onboarding and 90-day retention support' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/60 space-y-2">
              <span className="text-xs font-mono font-bold text-sky-400">{item.step}</span>
              <h5 className="font-heading font-bold text-sm text-white">{item.title}</h5>
              <p className="text-[11px] text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Office & Direct Contact Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900">
              Registered Head Office
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {siteSettings.officeAddress}
            </p>
            <p className="text-[11px] text-slate-400">
              Regional Branch: Connaught Place, New Delhi & Cyber City, Gurugram
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900">
              WhatsApp Support Desk
            </h4>
            <div className="space-y-1 text-xs">
              <p className="text-slate-600">
                WhatsApp Desk:{' '}
                <a href={`https://wa.me/${siteSettings.whatsappDigits}`} target="_blank" rel="noreferrer" className="font-bold text-emerald-600 hover:text-emerald-700">
                  {siteSettings.whatsappNumber}
                </a>
              </p>
              <p className="text-[11px] text-slate-400">
                Operational: {siteSettings.supportHours}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900">
              Direct Communication
            </h4>
            <div className="space-y-1 text-xs">
              <p className="text-slate-600">
                Inquiries:{' '}
                <a href={`mailto:${siteSettings.email}`} className="font-semibold text-slate-900 hover:text-sky-600">
                  {siteSettings.email}
                </a>
              </p>
              <p className="text-slate-600">
                Employer Requisitions:{' '}
                <a href={`mailto:${siteSettings.employerEmail}`} className="font-semibold text-slate-900 hover:text-sky-600">
                  {siteSettings.employerEmail}
                </a>
              </p>
              <p className="text-[11px] text-slate-400">
                Verification Desk: verifications@thakurconsultancy.in
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
