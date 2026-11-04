import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../utils/theme';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  FileText, 
  Building2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Layers, 
  TrendingUp, 
  Search, 
  CheckCircle2, 
  Eye, 
  Lock 
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    jobs, 
    companies, 
    applications, 
    candidateProfile, 
    approveJob, 
    rejectJob, 
    verifyCompany, 
    theme, 
    showToast 
  } = useApp();

  const themeClasses = getThemeClasses(theme);
  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'approvals' | 'companies' | 'candidates'

  // Pending jobs awaiting admin approval (Per PDF Page 6 & 7)
  const pendingJobs = jobs.filter(j => j.status === 'pending');
  const activeJobs = jobs.filter(j => j.status === 'active');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 🛡️ Admin Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-purple-900/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5" />
            Internal Management Desk • Role: Super Admin
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Thakur Job Consultant Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Moderation portal for verifying employer profiles, vetting incoming job feeds, duplicate check, and auditing candidate privacy logs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-purple-900/40 px-4 py-2 rounded-2xl border border-purple-800 text-purple-200">
          <Clock className="w-4 h-4 text-purple-300" />
          <span>System Time: 03 Nov 2026, 10:30 AM IST</span>
        </div>
      </div>

      {/* 📊 KPI Counters Grid (PDF Page 7.1) */}
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
            Requires review
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
          <p className="font-heading font-extrabold text-2xl text-indigo-600 mt-1">1,842</p>
          <span className="text-[10px] text-indigo-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <ShieldCheck className="w-3 h-3" />
            Zero threats
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Applications</span>
          <p className="font-heading font-extrabold text-2xl text-slate-900 mt-1">{applications.length + 42}</p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-3 h-3" />
            Active pipeline
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Complaints / Reports</span>
          <p className="font-heading font-extrabold text-2xl text-slate-400 mt-1">0</p>
          <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-0.5 mt-0.5">
            Clean status
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setAdminTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            adminTab === 'overview'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Moderation Queue ({pendingJobs.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('companies')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            adminTab === 'companies'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Company Verifications ({companies.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('candidates')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            adminTab === 'candidates'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Profiles & Audit</span>
        </button>
      </div>

      {/* 🚀 TAB 1: PENDING JOB APPROVALS QUEUE */}
      {adminTab === 'overview' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Pending Job Vacancy Approvals
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

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveJob(job.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve & Publish
                    </button>
                    <button
                      onClick={() => rejectJob(job.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 flex items-center gap-1.5"
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
              <p className="font-bold text-slate-800 text-sm">All pending jobs have been moderated!</p>
              <p className="text-xs">No pending vacancy reviews at this time.</p>
            </div>
          )}
        </div>
      )}

      {/* 🏢 TAB 2: COMPANY VERIFICATIONS */}
      {adminTab === 'companies' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Company Profiles & Verification Desk
              </h3>
              <p className="text-xs text-slate-500">
                Verified companies receive the blue shield verification badge across search listings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companies.map(comp => (
              <div key={comp.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
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

                {!comp.verified && (
                  <button
                    onClick={() => verifyCompany(comp.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                  >
                    Grant Verification Badge
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 👤 TAB 3: CANDIDATE AUDIT & LOGS */}
      {adminTab === 'candidates' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Candidate Privacy & Access Audit Logs
              </h3>
              <p className="text-xs text-slate-500">
                Strict compliance with Page 8 & 13 of Blueprint: Candidate resumes are accessible strictly via authorized audit tokens.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-bold text-slate-900">Rahul Verma (ID: cand-001)</span>
              </div>
              <span className="text-slate-400">Security: Encrypted AES-256</span>
            </div>
            <p className="text-slate-600">
              Resume: <code className="bg-white px-2 py-0.5 rounded border border-slate-200">Rahul_Verma_Resume_2026.pdf</code> (Scan: Zero threats detected)
            </p>
            <div className="text-[11px] text-slate-500 flex items-center gap-4 border-t border-slate-200/60 pt-2">
              <span>Last Accessed: 03 Nov 2026, 09:15 AM by TCS Recruiter Desk</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Consent Status: Granted for Application #TK-2026-APP-8841</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
