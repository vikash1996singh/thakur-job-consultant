import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../utils/theme';
import { JobCard } from '../components/JobCard';
import { 
  User, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  Send, 
  Award, 
  FileUp, 
  ChevronRight, 
  AlertCircle, 
  Bell, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Briefcase
} from 'lucide-react';

export const CandidateDashboard = () => {
  const { 
    candidateProfile, 
    applications, 
    jobs, 
    savedJobIds, 
    theme, 
    setIsResumeModalOpen,
    setSelectedJobForModal,
    setActiveTab
  } = useApp();

  const themeClasses = getThemeClasses(theme);
  const [activeSubTab, setActiveSubTab] = useState('applications'); // 'applications' | 'saved' | 'profile'

  // Saved jobs objects
  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));

  // Status Badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Interview':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Hired':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Viewed':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 👤 Candidate Header Card with Profile Meter */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-heading font-extrabold text-2xl shadow-md">
            {candidateProfile.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                {candidateProfile.fullName}
              </h2>
              {candidateProfile.verifiedPhone && (
                <span title="Verified Candidate Identity" className="text-blue-500">
                  <CheckCircle2 className="w-5 h-5 fill-blue-50 text-blue-600" />
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {candidateProfile.headline}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {candidateProfile.city} • {candidateProfile.phone} • {candidateProfile.email}
            </p>
          </div>
        </div>

        {/* Profile Completion & Resume Action */}
        <div className="w-full lg:w-72 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">Profile Score</span>
            <span className="text-indigo-600">{candidateProfile.profileCompletion}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${candidateProfile.profileCompletion}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between pt-1 text-[11px]">
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Resume Active
            </span>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="text-indigo-600 font-bold hover:underline"
            >
              Update Resume
            </button>
          </div>
        </div>

      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'applications'
              ? `${themeClasses.primary} shadow-xs`
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>My Applications ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'saved'
              ? `${themeClasses.primary} shadow-xs`
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Jobs ({savedJobs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'profile'
              ? `${themeClasses.primary} shadow-xs`
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Resume & Skills</span>
        </button>
      </div>

      {/* 🚀 TAB 1: APPLICATIONS TRACKER (PDF Page 5 Specification) */}
      {activeSubTab === 'applications' && (
        <div className="space-y-4">
          {applications.length > 0 ? (
            applications.map(app => (
              <div 
                key={app.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-slate-400">
                      Ref: {app.refCode}
                    </span>
                    <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 mt-0.5">
                      {app.jobTitle}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600">{app.company}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                      Status: {app.status}
                    </span>
                    <span className="text-xs text-slate-400">Applied {app.appliedDate}</span>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Application History & Updates:
                  </p>
                  <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {app.timeline.map((step, idx) => (
                      <div key={idx} className="relative text-xs">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></div>
                        <div className="font-bold text-slate-800">{step.status} <span className="font-normal text-slate-400">({step.date})</span></div>
                        <p className="text-slate-500 mt-0.5">{step.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Send className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-heading font-bold text-base text-slate-800">No applications yet</h3>
              <p className="text-xs text-slate-500">Discover and apply to verified vacancies directly from our portal.</p>
              <button
                onClick={() => setActiveTab('search')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold ${themeClasses.primary}`}
              >
                Find Jobs
              </button>
            </div>
          )}
        </div>
      )}

      {/* 📌 TAB 2: SAVED JOBS */}
      {activeSubTab === 'saved' && (
        <div className="space-y-4">
          {savedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelect={(selected) => setSelectedJobForModal(selected)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-heading font-bold text-base text-slate-800">No saved jobs</h3>
              <p className="text-xs text-slate-500">Bookmark interesting vacancies to apply later at your convenience.</p>
            </div>
          )}
        </div>
      )}

      {/* 📑 TAB 3: RESUME & PROFILE DETAILS */}
      {activeSubTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Active Resume Card */}
          <div className="col-span-1 bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Active Resume
            </h3>

            {candidateProfile.resume ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="font-bold text-xs text-slate-900 truncate">
                  {candidateProfile.resume.fileName}
                </p>
                <p className="text-[11px] text-slate-500">
                  Size: {candidateProfile.resume.fileSize} • Uploaded {candidateProfile.resume.uploadedAt}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{candidateProfile.resume.scanStatus}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No active resume uploaded.</p>
            )}

            <button
              onClick={() => setIsResumeModalOpen(true)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold ${themeClasses.primary}`}
            >
              Upload New Resume
            </button>
          </div>

          {/* Candidate Skills & Experience */}
          <div className="col-span-2 bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 mb-3">Verified Skills Master</h3>
              <div className="flex flex-wrap gap-2">
                {candidateProfile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 mb-3">Work Experience</h3>
              <div className="space-y-3">
                {candidateProfile.experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <p className="font-bold text-slate-900 text-sm">{exp.role} • {exp.company}</p>
                    <p className="text-slate-500">{exp.duration}</p>
                    <p className="text-slate-600 pt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 mb-3">Education History</h3>
              <div className="space-y-2">
                {candidateProfile.education.map((edu, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                    <p className="font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-slate-500">{edu.institution} ({edu.year})</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
