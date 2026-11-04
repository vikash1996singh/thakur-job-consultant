import React from 'react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../utils/theme';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  CheckCircle, 
  Bookmark, 
  ExternalLink, 
  ShieldCheck, 
  Share2,
  ChevronRight
} from 'lucide-react';

export const JobCard = ({ job, onSelect }) => {
  const { savedJobIds, toggleSaveJob, theme, applyToJob, applications } = useApp();
  const themeClasses = getThemeClasses(theme);

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = applications.some(app => app.jobId === job.id);

  // Badge colors for Source type
  const getSourceBadge = () => {
    switch (job.source) {
      case 'Company Verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Direct Employer
          </span>
        );
      case 'Consultancy Listed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <ShieldCheck className="w-3 h-3 text-indigo-600" />
            Thakur Verified Desk
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <ExternalLink className="w-3 h-3 text-amber-600" />
            Authorized Partner Feed
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all duration-200 hover:border-slate-300 relative group flex flex-col justify-between">
      
      <div>
        {/* Top bar with Source and Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {getSourceBadge()}
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
              {job.workMode}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
              {job.jobType}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveJob(job.id);
              }}
              title={isSaved ? "Saved" : "Save this job"}
              className={`p-2 rounded-xl transition-colors ${
                isSaved 
                  ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Company */}
        <div className="cursor-pointer" onClick={() => onSelect(job)}>
          <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {job.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-600">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">{job.company}</span>
            {job.verifiedCompany && (
              <span title="Verified Recruiter" className="text-blue-500">
                <CheckCircle className="w-4 h-4 fill-blue-50 text-blue-600" />
              </span>
            )}
          </div>
        </div>

        {/* Key Job Attributes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 my-4 py-3 border-y border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-700">{job.experience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-800">{job.salary}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{job.location}</span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-[11px] font-medium bg-slate-50 text-slate-600 rounded-lg border border-slate-200/60"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-1 text-[11px] font-medium text-slate-400">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1 text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Posted {job.postedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(job)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Quick View
          </button>
          
          {isApplied ? (
            <span className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Applied
            </span>
          ) : (
            <button
              onClick={() => onSelect(job)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg shadow-2xs flex items-center gap-1 transition-all ${themeClasses.primary}`}
            >
              {job.applyMode === 'external' ? (
                <>
                  <span>Apply on Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Apply Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
