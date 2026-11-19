import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Code, 
  Award, 
  Layers, 
  Clock, 
  ShieldCheck, 
  GraduationCap, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  Sparkles
} from 'lucide-react';

export const servicesData = [
  {
    id: 'permanent',
    title: 'Permanent Staffing & Direct Placement',
    shortDesc: 'End-to-end recruitment across junior, mid, and senior corporate positions with pre-screened talent.',
    icon: Users,
    badge: 'Most Popular',
    details: [
      'Tailored candidate matching against technical and cultural benchmarks',
      'Preliminary telephonic and video screening by seasoned HR specialists',
      '90-day candidate replacement guarantee for corporate employers',
      'Zero upfront retainers — fee payable strictly upon successful candidate joining'
    ],
    roles: ['Software Engineers', 'Finance Specialists', 'Sales Managers', 'Operations Leads']
  },
  {
    id: 'it-tech',
    title: 'Specialized IT & Tech Recruitment',
    shortDesc: 'Dedicated tech talent sourcing for Full Stack, DevOps, Cloud Architecture, and Data Science roles.',
    icon: Code,
    badge: 'High Demand',
    details: [
      'Deep domain recruiters fluent in modern tech stacks (React, Node, Python, AWS)',
      'Practical code verification, Git portfolio inspection & architecture evaluation',
      'Rapid turnaround of verified technical profiles within 24 to 48 hours',
      'Access to passive engineering candidates not active on traditional job boards'
    ],
    roles: ['Full-Stack Devs', 'Cloud & DevOps', 'Cybersecurity', 'Data Engineers']
  },
  {
    id: 'executive',
    title: 'Executive Search & CXO Leadership',
    shortDesc: 'Confidential headhunting and discreet talent acquisition for VP, Director, and C-Suite leadership.',
    icon: Award,
    badge: 'Executive',
    details: [
      'Discreet and confidential outreach preserving corporate brand integrity',
      'Competency-based behavioral interviewing and reference benchmarking',
      'Comprehensive industry talent mapping and compensation structuring',
      'Dedicated Senior Partner oversight throughout the executive search process'
    ],
    roles: ['Chief Technology Officer', 'VP of Operations', 'Finance Director', 'Head of HR']
  },
  {
    id: 'bulk',
    title: 'Bulk & Volume Hiring Drives',
    shortDesc: 'Mass recruitment solutions for manufacturing plants, warehousing facilities, and customer support centers.',
    icon: Layers,
    badge: 'Turnkey',
    details: [
      'Turnkey walk-in drives capable of screening 500+ candidates in a single day',
      'On-ground logistical coordination, token systems, and instant document collection',
      'Strict verification ensuring candidates meet minimum educational and age criteria',
      'Proven capacity to fulfill 100+ positions within 7 business days'
    ],
    roles: ['Warehouse Associates', 'BPO Voice Agents', 'Assembly Operators', 'Field Sales']
  },
  {
    id: 'contract',
    title: 'Contract Staffing & Flexi-Workforce',
    shortDesc: 'Scalable on-demand workforce to manage project deadlines, seasonal surges, and interim vacancies.',
    icon: Clock,
    badge: 'Flexible',
    details: [
      'Immediate deployment of pre-screened professionals on short-notice contracts',
      'Flexible deployment tenures from 3 months to 24+ months',
      'Seamless contract-to-hire transition pathways when required',
      'Mitigates employer headcount liability and long-term overhead costs'
    ],
    roles: ['Project Engineers', 'Interim Accountants', 'Seasonal Supervisors', 'QA Testers']
  },
  {
    id: 'payroll',
    title: 'Payroll & Statutory HR Compliance',
    shortDesc: 'Comprehensive payroll management, PF, ESI, gratuity, and regulatory labor law compliance handling.',
    icon: ShieldCheck,
    badge: 'Compliant',
    details: [
      'Accurate monthly salary computations, automated payslips, and TDS calculations',
      'Full management of Provident Fund (PF), ESIC, and Professional Tax filings',
      'Zero-penalty statutory audit documentation and government registry maintenance',
      'Dedicated employee grievance helpdesk for payroll and benefit queries'
    ],
    roles: ['PF & ESIC Liaison', 'Monthly Payroll', 'Labor Law Filing', 'Form 16 Issuance']
  },
  {
    id: 'campus',
    title: 'Campus Placement & Fresher Programs',
    shortDesc: 'Bridging tier-1 and tier-2 academic institutes with top companies looking for fresh, vibrant talent.',
    icon: GraduationCap,
    badge: 'Campus Connect',
    details: [
      'MoU partnerships with 80+ engineering, management, and polytechnic colleges',
      'Aptitude test administration, group discussions, and round-1 technical panels',
      'Structured fresher orientation kits and pre-joining grooming sessions',
      'Ideal for building young corporate pipelines with exceptional loyalty'
    ],
    roles: ['Graduate Engineer Trainees', 'Management Trainees', 'Diploma Apprentices']
  },
  {
    id: 'bgv',
    title: 'Background Verification & KYC Audits',
    shortDesc: 'Rigorous physical and digital credential vetting protecting employers from identity fraud.',
    icon: FileCheck2,
    badge: 'Security Verified',
    details: [
      'Permanent address physical check and neighborhood background reference',
      'Direct University degree authenticity verification and transcript checks',
      'Past employer tenure, designation, and exit clearance confirmation',
      'Criminal record check through court database and local police jurisdiction'
    ],
    roles: ['Identity Verification', 'Address Audit', 'Degree Authentication', 'Past HR Check']
  }
];

export const ServicesSection = () => {
  const { setActiveTab, setIsResumeModalOpen, siteSettings } = useApp();
  const [activeServiceId, setActiveServiceId] = useState('permanent');

  const selectedService = servicesData.find(s => s.id === activeServiceId) || servicesData[0];

  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Our Recruitment Capabilities</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          Comprehensive Talent & Staffing Services
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          From specialized niche leadership headhunting to high-volume recruitment drives, Thakur Job Consultant provides tailored, verified recruitment infrastructure designed for sustainable business growth.
        </p>
      </div>

      {/* Grid of 8 Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {servicesData.map((svc) => {
          const IconComp = svc.icon;
          const isSelected = svc.id === activeServiceId;
          return (
            <div
              key={svc.id}
              onClick={() => setActiveServiceId(svc.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-sky-50/80 to-white border-sky-400 shadow-md ring-2 ring-sky-300/40'
                  : 'bg-white border-slate-200/90 hover:border-sky-300 hover:shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-sky-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {svc.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                  {svc.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {svc.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold text-sky-600">
                <span>View Details</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Active Service Showcase Card */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold">
              <span>Service Deep-Dive</span>
              <span>•</span>
              <span>{selectedService.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              {selectedService.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedService.shortDesc}
            </p>

            {/* Highlights */}
            <div className="space-y-2.5 pt-2">
              {selectedService.details.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Common roles hired */}
            <div className="pt-3">
              <span className="text-xs text-slate-400 block mb-2 font-medium">Commonly Placed Positions:</span>
              <div className="flex flex-wrap gap-2">
                {selectedService.roles.map((role, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800/90 text-sky-200 border border-slate-700 text-xs font-medium">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Box on the right */}
          <div className="lg:col-span-5 bg-slate-800/80 p-6 sm:p-8 rounded-2xl border border-slate-700/80 space-y-5">
            <h4 className="font-heading font-bold text-lg text-white">
              Ready to Hire or Apply?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Thakur Job Consultant manages everything from job requisition parsing to final onboard verification. Zero charges for candidates.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setActiveTab('employer');
                }}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Post Requirement for Employers</span>
              </button>

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Upload Candidate CV (Free)</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>WhatsApp: {siteSettings.whatsappNumber}</span>
              <span className="text-sky-300 font-semibold">24-48h Response</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
