import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import {
  ShieldCheck,
  Users,
  Briefcase,
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Layers,
  TrendingUp,
  Search,
  CheckCircle2,
  Lock,
  LogOut,
  PlusCircle,
  Pencil,
  Trash2,
  Settings,
  RotateCcw,
  X
} from 'lucide-react';

const EMPTY_JOB_FORM = {
  title: '',
  company: '',
  category: 'IT & Software',
  workMode: 'On-Site',
  jobType: 'Full-Time',
  experience: '1 - 3 Years',
  salary: '₹4,00,000 - ₹7,00,000 P.A.',
  location: 'Noida, Sector 62',
  openings: 2,
  status: 'active',
  description: '',
  skillsText: 'Communication, MS Office',
  verifiedCompany: true
};

const EMPTY_COMPANY_FORM = {
  name: '',
  industry: 'IT & Services',
  location: 'Noida / Delhi NCR',
  website: '',
  description: '',
  verified: true
};

const APPLICATION_STATUS_OPTIONS = [
  'Submitted',
  'Viewed',
  'Shortlisted',
  'Interview',
  'Hired',
  'Rejected'
];

export const AdminDashboard = () => {
  const {
    jobs,
    companies,
    applications,
    submittedResumes,
    candidateProfile,
    approveJob,
    rejectJob,
    adminAddJob,
    adminUpdateJob,
    adminDeleteJob,
    verifyCompany,
    toggleCompanyVerify,
    adminAddCompany,
    deleteCompany,
    updateApplicationStatus,
    deleteSubmittedResume,
    siteSettings,
    updateSiteSettings,
    adminCreds,
    updateAdminCreds,
    resetAllSiteData,
    requestLogout,
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'all-jobs' | 'companies' | 'candidates' | 'settings'
  const [jobSearch, setJobSearch] = useState('');
  const [jobStatusFilter, setJobStatusFilter] = useState('all');

  // Job Add/Edit Modal State
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobForm, setJobForm] = useState(EMPTY_JOB_FORM);

  // Company Add Modal State
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [companyForm, setCompanyForm] = useState(EMPTY_COMPANY_FORM);

  // Site Settings & Admin Creds Form State
  const [settingsForm, setSettingsForm] = useState(siteSettings);
  const [newAdminEmail, setNewAdminEmail] = useState(adminCreds.email);
  const [newAdminPassword, setNewAdminPassword] = useState(adminCreds.password);

  const pendingJobs = jobs.filter(j => j.status === 'pending');
  const activeJobs = jobs.filter(j => j.status === 'active');

  const filteredJobs = jobs.filter(j => {
    const matchesStatus = jobStatusFilter === 'all' || j.status === jobStatusFilter;
    const q = jobSearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const openAddJobModal = () => {
    setEditingJobId(null);
    setJobForm(EMPTY_JOB_FORM);
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (job) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title || '',
      company: job.company || '',
      category: job.category || 'IT & Software',
      workMode: job.workMode || 'On-Site',
      jobType: job.jobType || 'Full-Time',
      experience: job.experience || '1 - 3 Years',
      salary: job.salary || '',
      location: job.location || '',
      openings: job.openings || 1,
      status: job.status || 'active',
      description: job.description || '',
      skillsText: Array.isArray(job.skills) ? job.skills.join(', ') : '',
      verifiedCompany: job.verifiedCompany ?? true
    });
    setIsJobModalOpen(true);
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    if (!jobForm.title.trim() || !jobForm.company.trim()) {
      showToast('Please fill in Job Title and Company Name', 'warning');
      return;
    }
    if (jobForm.title.trim().length > 100) {
      showToast('Job Title cannot exceed 100 characters', 'warning');
      return;
    }
    if (jobForm.company.trim().length > 100) {
      showToast('Company Name cannot exceed 100 characters', 'warning');
      return;
    }
    if (jobForm.description.trim().length > 3000) {
      showToast('Description cannot exceed 3000 characters', 'warning');
      return;
    }

    const payload = {
      title: jobForm.title.trim(),
      company: jobForm.company.trim(),
      category: jobForm.category,
      workMode: jobForm.workMode,
      jobType: jobForm.jobType,
      experience: jobForm.experience.trim() || '1 - 3 Years',
      salary: jobForm.salary.trim() || 'As per industry standards',
      location: jobForm.location.trim() || 'Noida / Delhi NCR',
      openings: Number(jobForm.openings) || 1,
      status: jobForm.status,
      description: jobForm.description.trim() || 'Role managed via Thakur Job Consultant.',
      skills: jobForm.skillsText
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      verifiedCompany: jobForm.verifiedCompany
    };

    if (editingJobId) {
      adminUpdateJob(editingJobId, payload);
    } else {
      adminAddJob({
        ...payload,
        responsibilities: ['Deliver on assigned job duties professionally'],
        education: "Bachelor's Degree / Relevant Qualification",
        applyMode: 'onsite'
      });
    }
    setIsJobModalOpen(false);
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    if (!companyForm.name.trim()) {
      showToast('Please enter Company Name', 'warning');
      return;
    }
    if (companyForm.name.trim().length > 100) {
      showToast('Company Name cannot exceed 100 characters', 'warning');
      return;
    }
    adminAddCompany(companyForm);
    setCompanyForm(EMPTY_COMPANY_FORM);
    setIsCompanyModalOpen(false);
  };

  const handleSaveSiteSettings = (e) => {
    e.preventDefault();
    if (settingsForm.whatsappNumber && settingsForm.whatsappNumber.length > 15) {
      showToast('WhatsApp number cannot exceed 15 characters', 'warning');
      return;
    }
    if (settingsForm.heroTagline && settingsForm.heroTagline.length > 120) {
      showToast('Tagline cannot exceed 120 characters', 'warning');
      return;
    }
    if (settingsForm.email && settingsForm.email.length > 80) {
      showToast('Email cannot exceed 80 characters', 'warning');
      return;
    }
    updateSiteSettings(settingsForm);
  };

  const handleSaveAdminCreds = (e) => {
    e.preventDefault();
    if (newAdminEmail.trim().length > 80) {
      showToast('Admin email cannot exceed 80 characters', 'warning');
      return;
    }
    if (newAdminPassword.length > 50) {
      showToast('Admin password cannot exceed 50 characters', 'warning');
      return;
    }
    updateAdminCreds(newAdminEmail, newAdminPassword);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 🛡️ Admin Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-purple-900/40">
        <div className="flex items-start gap-4">
          <div className="bg-white p-1.5 rounded-2xl shadow-xs border border-white/20 shrink-0 hidden sm:flex items-center justify-center">
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
              className="h-12 w-auto object-contain" 
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30 text-xs font-semibold mb-2">
              <Lock className="w-3.5 h-3.5" />
              Internal Master Panel • Role: Thakur Super Admin
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Thakur Job Consultant Admin Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Full control: Approve/Edit/Delete jobs, verify companies, manage student resumes & applications, and update live website contact & notice settings.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openAddJobModal}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Job</span>
          </button>

          <button
            onClick={() => requestLogout('admin')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit & Lock Admin</span>
          </button>
        </div>
      </div>

      {/* 📊 KPI Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Live Vacancies</span>
          <p className="font-heading font-extrabold text-2xl text-slate-900 mt-1">{activeJobs.length}</p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <CheckCircle className="w-3 h-3" />
            Publicly active
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Pending Approval</span>
          <p className="font-heading font-extrabold text-2xl text-amber-600 mt-1">{pendingJobs.length}</p>
          <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-0.5 mt-0.5">
            <Clock className="w-3 h-3" />
            Employer queue
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Jobs</span>
          <p className="font-heading font-extrabold text-2xl text-slate-900 mt-1">{jobs.length}</p>
          <span className="text-[10px] text-sky-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <Briefcase className="w-3 h-3" />
            All statuses
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Companies</span>
          <p className="font-heading font-extrabold text-2xl text-slate-900 mt-1">{companies.length}</p>
          <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <Building2 className="w-3 h-3" />
            Registered
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Resumes Uploaded</span>
          <p className="font-heading font-extrabold text-2xl text-indigo-600 mt-1">{submittedResumes.length}</p>
          <span className="text-[10px] text-indigo-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <ShieldCheck className="w-3 h-3" />
            Student CVs
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Applications</span>
          <p className="font-heading font-extrabold text-2xl text-slate-900 mt-1">{applications.length}</p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-3 h-3" />
            Active pipeline
          </span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'overview'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Moderation Queue ({pendingJobs.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('all-jobs')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'all-jobs'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Manage All Jobs ({jobs.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('companies')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'companies'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Companies ({companies.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('candidates')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'candidates'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Resumes & Applications ({submittedResumes.length + applications.length})</span>
        </button>

        <button
          onClick={() => {
            setSettingsForm(siteSettings);
            setNewAdminEmail(adminCreds.email);
            setNewAdminPassword(adminCreds.password);
            setAdminTab('settings');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            adminTab === 'settings'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Site Settings & Password</span>
        </button>
      </div>

      {/* 🚀 TAB 1: PENDING EMPLOYER JOB APPROVALS QUEUE */}
      {adminTab === 'overview' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Pending Employer Job Requirements
              </h3>
              <p className="text-xs text-slate-500">
                Jobs submitted by employers remain invisible to public candidate search until approved here.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {pendingJobs.length} Awaiting Moderation
            </span>
          </div>

          {pendingJobs.length > 0 ? (
            <div className="space-y-4">
              {pendingJobs.map(job => (
                <div key={job.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200/80 text-amber-900">
                        {job.category}
                      </span>
                      <span className="text-xs text-slate-500">• {job.workMode}</span>
                      <span className="text-xs text-slate-500">• {job.experience}</span>
                    </div>
                    <h4 className="font-heading font-bold text-base text-slate-900">{job.title}</h4>
                    <p className="text-xs text-slate-600 font-medium">Company: {job.company} | Location: {job.location} | CTC: {job.salary}</p>
                    <p className="text-xs text-slate-500 pt-1 max-w-2xl line-clamp-2">{job.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveJob(job.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve & Publish
                    </button>
                    <button
                      onClick={() => openEditJobModal(job)}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => rejectJob(job.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 flex items-center gap-1.5 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">All pending employer jobs have been moderated!</p>
              <p className="text-xs">Use "Manage All Jobs" tab to edit, publish, or delete any existing job listing.</p>
            </div>
          )}
        </div>
      )}

      {/* 💼 TAB 2: MANAGE ALL JOBS (ADD / EDIT / DELETE / STATUS CHANGE) */}
      {adminTab === 'all-jobs' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                All Job Listings Control ({filteredJobs.length})
              </h3>
              <p className="text-xs text-slate-500">
                Edit any job title, salary, location, status (Active/Pending/Rejected), or delete listings.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={100}
                  placeholder="Search job or company..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value.slice(0, 100))}
                  className="pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-purple-500"
                />
              </div>

              <select
                value={jobStatusFilter}
                onChange={(e) => setJobStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active (Live)</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={openAddJobModal}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Job</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredJobs.map(job => (
              <div key={job.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      job.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : job.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {job.status}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">{job.category} • {job.workMode}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{job.title}</h4>
                  <p className="text-xs text-slate-600">
                    {job.company} • {job.location} • {job.salary} • Exp: {job.experience}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {job.status !== 'active' && (
                    <button
                      onClick={() => approveJob(job.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => openEditJobModal(job)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => adminDeleteJob(job.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🏢 TAB 3: COMPANIES MANAGEMENT & VERIFICATION */}
      {adminTab === 'companies' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Company Profiles & Verification Desk
              </h3>
              <p className="text-xs text-slate-500">
                Add new companies, toggle verification badges, or remove entries.
              </p>
            </div>
            <button
              onClick={() => setIsCompanyModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Company</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies.map(comp => (
              <div key={comp.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-heading font-bold text-base text-slate-900">{comp.name}</h4>
                    {comp.verified ? (
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5">
                        <CheckCircle className="w-4 h-4 fill-blue-500 text-white" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        Pending Verification
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{comp.industry} • {comp.location}</p>
                  <p className="text-xs text-slate-600 pt-1">{comp.description}</p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => (comp.verified ? toggleCompanyVerify(comp.id) : verifyCompany(comp.id))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer ${
                      comp.verified ? 'bg-slate-600 hover:bg-slate-700' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {comp.verified ? 'Unverify' : 'Verify'}
                  </button>
                  <button
                    onClick={() => deleteCompany(comp.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 👤 TAB 4: STUDENT / CANDIDATE RESUMES & APPLICATIONS */}
      {adminTab === 'candidates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  Student / Candidate Uploaded Resumes ({submittedResumes.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Every CV submitted through Upload CV or Candidate Profile appears here for Thakur Admin review.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                {submittedResumes.length} Resumes
              </span>
            </div>

            {submittedResumes.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No resumes uploaded yet.</p>
            ) : (
              <div className="space-y-3">
                {submittedResumes.map((cv) => (
                  <div key={cv.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="font-bold text-slate-900 text-sm">{cv.fullName}</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                          {cv.refCode}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">{cv.uploadedAt}</span>
                        <button
                          onClick={() => deleteSubmittedResume(cv.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 cursor-pointer"
                          title="Delete Resume Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-slate-600">
                      <span><strong>Role:</strong> {cv.role}</span>
                      <span><strong>Experience:</strong> {cv.experience}</span>
                      <span><strong>Phone:</strong> {cv.phone}</span>
                      <span><strong>Location:</strong> {cv.location}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 pt-2">
                      <span className="text-slate-700">
                        Email: <strong>{cv.email}</strong> • File:{' '}
                        <code className="bg-white px-2 py-0.5 rounded border border-slate-200">{cv.fileName}</code> ({cv.fileSize})
                      </span>
                      <span className="text-emerald-700 font-semibold">{cv.scanStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  Candidate Job Applications ({applications.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Update application status (Submitted, Viewed, Shortlisted, Interview, Hired, Rejected) directly from here.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {applications.length} Applications
              </span>
            </div>

            {applications.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No applications submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{app.jobTitle}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">{app.status}</span>
                      </div>
                      <p className="text-slate-600">
                        Candidate: <strong>{app.candidateName || candidateProfile.fullName}</strong> • Company: {app.company}
                      </p>
                      <p className="text-slate-500">
                        Ref: {app.refCode} • Resume: {app.resumeFileName || candidateProfile.resume?.fileName || 'Resume.pdf'} • Applied: {app.appliedDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <label className="text-[11px] font-semibold text-slate-600">Status:</label>
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:border-purple-500 focus:outline-none cursor-pointer"
                      >
                        {APPLICATION_STATUS_OPTIONS.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ⚙️ TAB 5: SITE SETTINGS & ADMIN CREDENTIALS */}
      {adminTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form onSubmit={handleSaveSiteSettings} className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Website Contact & Banner Settings
              </h3>
              <p className="text-xs text-slate-500">
                Changes made here update Navbar, Footer, Contact Page, About Section, Services, and Trust Banner immediately.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Number <span className="text-[10px] text-slate-400 font-normal">(Max 15)</span>
                </label>
                <input
                  type="text"
                  maxLength={15}
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value.slice(0, 15) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Top Badge Tagline <span className="text-[10px] text-slate-400 font-normal">(Max 120)</span>
                </label>
                <input
                  type="text"
                  maxLength={120}
                  value={settingsForm.heroTagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, heroTagline: e.target.value.slice(0, 120) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Email <span className="text-[10px] text-slate-400 font-normal">(Max 80)</span>
                </label>
                <input
                  type="email"
                  maxLength={80}
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value.slice(0, 80) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Employer Desk Email <span className="text-[10px] text-slate-400 font-normal">(Max 80)</span>
                </label>
                <input
                  type="email"
                  maxLength={80}
                  value={settingsForm.employerEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, employerEmail: e.target.value.slice(0, 80) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Office Address <span className="text-[10px] text-slate-400 font-normal">(Max 250)</span>
              </label>
              <input
                type="text"
                maxLength={250}
                value={settingsForm.officeAddress}
                onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value.slice(0, 250) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Support Hours <span className="text-[10px] text-slate-400 font-normal">(Max 100)</span>
              </label>
              <input
                type="text"
                maxLength={100}
                value={settingsForm.supportHours}
                onChange={(e) => setSettingsForm({ ...settingsForm, supportHours: e.target.value.slice(0, 100) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Official Security Notice Banner
                </label>
                <span className="text-[10px] text-slate-400 font-normal">
                  {(settingsForm.securityNotice || '').length}/500 chars
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={500}
                value={settingsForm.securityNotice}
                onChange={(e) => setSettingsForm({ ...settingsForm, securityNotice: e.target.value.slice(0, 500) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-sm cursor-pointer"
            >
              Save Website Changes
            </button>
          </form>

          <div className="lg:col-span-5 space-y-6">
            <form onSubmit={handleSaveAdminCreds} className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-heading font-extrabold text-base text-slate-900">
                  Thakur Admin Login Credentials
                </h3>
                <p className="text-xs text-slate-500">
                  Update your Thakur Admin email & password.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admin Email <span className="text-[10px] text-slate-400 font-normal">(Max 80)</span>
                </label>
                <input
                  type="email"
                  required
                  maxLength={80}
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value.slice(0, 80))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admin Password <span className="text-[10px] text-slate-400 font-normal">(Max 50)</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value.slice(0, 50))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
              >
                Update Admin Password
              </button>
            </form>

            <div className="bg-rose-50 rounded-3xl border border-rose-200 p-6 space-y-3">
              <h4 className="font-heading font-bold text-sm text-rose-900">Reset Portal Data</h4>
              <p className="text-xs text-rose-800">
                Restore default mock jobs, companies, resumes, and contact settings (clears local browser changes).
              </p>
              <button
                type="button"
                onClick={resetAllSiteData}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Data to Defaults</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📝 ADD / EDIT JOB MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                {editingJobId ? 'Edit Job Requirement' : 'Add New Job Vacancy'}
              </h3>
              <button onClick={() => setIsJobModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Title * <span className="text-[10px] text-slate-400 font-normal">(Max 100)</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value.slice(0, 100) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company Name * <span className="text-[10px] text-slate-400 font-normal">(Max 100)</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={jobForm.company}
                    onChange={(e) => setJobForm({ ...jobForm, company: e.target.value.slice(0, 100) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category <span className="text-[10px] text-slate-400 font-normal">(Max 60)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    value={jobForm.category}
                    onChange={(e) => setJobForm({ ...jobForm, category: e.target.value.slice(0, 60) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location <span className="text-[10px] text-slate-400 font-normal">(Max 80)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value.slice(0, 80) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Salary / Package <span className="text-[10px] text-slate-400 font-normal">(Max 60)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value.slice(0, 60) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Experience <span className="text-[10px] text-slate-400 font-normal">(Max 50)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={50}
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value.slice(0, 50) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={jobForm.workMode}
                    onChange={(e) => setJobForm({ ...jobForm, workMode: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="On-Site">On-Site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Publish Status</label>
                  <select
                    value={jobForm.status}
                    onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="active">Active (Live on Site)</option>
                    <option value="pending">Pending Review</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Skills (Comma separated) <span className="text-[10px] text-slate-400 font-normal">(Max 200)</span>
                </label>
                <input
                  type="text"
                  maxLength={200}
                  value={jobForm.skillsText}
                  onChange={(e) => setJobForm({ ...jobForm, skillsText: e.target.value.slice(0, 200) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Description</label>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {(jobForm.description || '').length}/3000 chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={3000}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value.slice(0, 3000) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                >
                  {editingJobId ? 'Save Changes' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🏢 ADD COMPANY MODAL */}
      {isCompanyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-heading font-extrabold text-base text-slate-900">Add Partner Company</h3>
              <button onClick={() => setIsCompanyModalOpen(false)} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCompany} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company Name * <span className="text-[10px] text-slate-400 font-normal">(Max 100)</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value.slice(0, 100) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Industry <span className="text-[10px] text-slate-400 font-normal">(Max 60)</span>
                </label>
                <input
                  type="text"
                  maxLength={60}
                  value={companyForm.industry}
                  onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value.slice(0, 60) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location <span className="text-[10px] text-slate-400 font-normal">(Max 80)</span>
                </label>
                <input
                  type="text"
                  maxLength={80}
                  value={companyForm.location}
                  onChange={(e) => setCompanyForm({ ...companyForm, location: e.target.value.slice(0, 80) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Description</label>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {(companyForm.description || '').length}/500 chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  maxLength={500}
                  value={companyForm.description}
                  onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value.slice(0, 500) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={companyForm.verified}
                  onChange={(e) => setCompanyForm({ ...companyForm, verified: e.target.checked })}
                />
                <span>Grant Verified Blue Badge immediately</span>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCompanyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                >
                  Save Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
