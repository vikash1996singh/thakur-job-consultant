import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Laptop, 
  Building2, 
  Cpu, 
  Truck, 
  HeartPulse, 
  Headphones, 
  ShoppingBag, 
  HardHat, 
  GraduationCap, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export const industriesData = [
  {
    id: 'it',
    name: 'Information Technology & Software',
    categoryFilter: 'IT & Software',
    icon: Laptop,
    badge: '480+ Openings',
    desc: 'Cutting-edge tech recruitment from modern full-stack web and mobile apps to enterprise cloud, cybersecurity, and AI/ML architectures.',
    roles: ['React / Node Developers', 'DevOps & Cloud Engineers', 'QA Automation Leads', 'Data Analysts', 'Tech Project Managers'],
    clients: 'TCS, HCL, Tech Mahindra, Infosys, and high-growth SaaS startups.'
  },
  {
    id: 'bfsi',
    name: 'Banking, Financial Services & Insurance (BFSI)',
    categoryFilter: 'Finance & Accounts',
    icon: Building2,
    badge: '160+ Openings',
    desc: 'Specialized finance staffing covering wealth management, chartered accountancy, commercial banking, loan disbursement, and GST auditing.',
    roles: ['GST & Tally Accountants', 'Branch Managers', 'Wealth Relationship Mgrs', 'Credit Risk Officers', 'Internal Auditors'],
    clients: 'FinEdge Advisory, HDFC Bank partners, ICICI Prudential associates.'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing, Heavy Industry & Automotive',
    categoryFilter: 'Manufacturing & Engineering',
    icon: Cpu,
    badge: '185+ Openings',
    desc: 'Core industrial staffing powering manufacturing plants, automotive assembly lines, electrical equipment factories, and tooling units.',
    roles: ['Plant Maintenance Engineers', 'CNC / VMC Operators', 'Quality Control (QC/QA)', 'Production Supervisors', 'EHS Officers'],
    clients: 'Industrial corridors across Greater Noida, Manesar, Faridabad, and Baddi.'
  },
  {
    id: 'logistics',
    name: 'Supply Chain, Logistics & Warehousing',
    categoryFilter: 'Operations & Logistics',
    icon: Truck,
    badge: '210+ Openings',
    desc: 'End-to-end supply chain hiring for fulfillment centers, cold storage warehouses, last-mile express couriers, and third-party logistics.',
    roles: ['Warehouse Supervisors', 'Fleet Dispatchers', 'Inventory Auditors', 'Logistics Coordinators', 'Hub Operations Heads'],
    clients: 'Apex Logistics India, Delhivery partners, Flipkart & Amazon 3PL vendors.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare, Pharmaceuticals & Life Sciences',
    categoryFilter: 'Healthcare & Pharma',
    icon: HeartPulse,
    badge: '70+ Openings',
    desc: 'Recruitment for leading multi-specialty hospitals, clinical diagnostic networks, pharmaceutical formulations, and medical equipment distributors.',
    roles: ['Hospital Administrators', 'Medical Representatives', 'Clinical Research Coordinators', 'Pharmacists', 'Nursing Supervisors'],
    clients: 'Apollo Clinics, Fortis affiliate hospitals, and pharma formulation labs.'
  },
  {
    id: 'bpo',
    name: 'BPO, KPO & Customer Support Services',
    categoryFilter: 'Customer Support / BPO',
    icon: Headphones,
    badge: '310+ Openings',
    desc: 'High-volume voice and non-voice recruitment for domestic and international contact centers, KYC verification desks, and technical helpdesks.',
    roles: ['Inbound Customer Care', 'Technical Support Agents', 'Escalations Executives', 'Quality Coaches', 'BPO Team Leaders'],
    clients: 'Teleperformance partners, Concentrix vendors, domestic fintech support desks.'
  },
  {
    id: 'retail',
    name: 'Retail, FMCG & E-Commerce',
    categoryFilter: 'Sales & Marketing',
    icon: ShoppingBag,
    badge: '340+ Openings',
    desc: 'Staffing for shopping malls, hypermarkets, FMCG consumer brands, electronic showroom chains, and modern dark-store operations.',
    roles: ['Store Managers', 'Visual Merchandisers', 'Area Sales Officers (ASO)', 'Field Marketing Executives', 'Cashier Supervisors'],
    clients: 'Reliance Retail partners, Tata Croma network, DMart regional distribution.'
  },
  {
    id: 'construction',
    name: 'Real Estate, Infrastructure & Construction',
    categoryFilter: 'Manufacturing & Engineering',
    icon: HardHat,
    badge: '95+ Openings',
    desc: 'Civil engineering and site execution talent for commercial high-rises, residential townships, highway expressways, and metro infra projects.',
    roles: ['Civil Site Engineers', 'Quantity Surveyors (QS)', 'Billing Engineers', 'Real Estate Sales Associates', 'Safety Coordinators'],
    clients: 'DLF partners, Godrej Properties contractors, NBCC sub-contractors.'
  },
  {
    id: 'education',
    name: 'Education, EdTech & Academic Institutions',
    categoryFilter: 'HR & Recruitment',
    icon: GraduationCap,
    badge: '80+ Openings',
    desc: 'Academic and administrative talent acquisition for CBSE/ICSE schools, private universities, coaching institutes, and digital EdTech ventures.',
    roles: ['Academic Counselors', 'Subject Matter Experts (SME)', 'Faculty Lecturers', 'School Administrators', 'Student Relationship Officers'],
    clients: 'Amity network, Allen institutes, Physics Wallah regional branches.'
  }
];

export const IndustriesSection = () => {
  const { setSelectedCategory, setActiveTab } = useApp();

  const handleSelectIndustry = (categoryFilter) => {
    setSelectedCategory(categoryFilter);
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="industries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>Industry Expertise</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          Industries We Specialize In
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Thakur Job Consultant possesses dedicated recruitment desks tailored to each industry vertical. Our domain recruiters understand technical specifications, regulatory nuances, and salary standards.
        </p>
      </div>

      {/* 9 Industries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industriesData.map((ind) => {
          const IconComp = ind.icon;
          return (
            <div
              key={ind.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {ind.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                {/* Popular In-Demand Roles */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Popular In-Demand Roles:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ind.roles.map((role, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clients Highlight */}
                <p className="text-[11px] text-slate-400 italic">
                  <strong>Partner Ecosystem:</strong> {ind.clients}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-5 border-t border-slate-100 mt-5">
                <button
                  type="button"
                  onClick={() => handleSelectIndustry(ind.categoryFilter)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-sky-600 hover:text-white bg-sky-50 hover:bg-sky-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Explore {ind.name.split(' ')[0]} Vacancies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Industrial Corridor Reach Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 p-6 sm:p-8 text-white border border-slate-700/80 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1 text-xs text-amber-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Industrial Footprint Across North India</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Noida • Greater Noida • Gurugram • Delhi NCR • Manesar • Faridabad
          </h4>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            With on-ground candidate screening desks in Delhi NCR industrial hubs, Thakur Job Consultant offers unmatched local agility and rapid vacancy turnarounds.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory('All');
            setActiveTab('search');
          }}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md transition-all shrink-0 cursor-pointer"
        >
          View All Live Jobs
        </button>
      </div>

    </section>
  );
};
