import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../utils/theme';
import { 
  X, 
  Building2, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Calendar, 
  Users, 
  CheckCircle, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Flag, 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export const JobDetailsModal = ({ job, onClose }) => {
  const { 
    savedJobIds, 
    toggleSaveJob, 
    theme, 
    applyToJob, 
    candidateProfile, 
    applications, 
    showToast,
    setIsResumeModalOpen
  } = useApp();

  const themeClasses = getThemeClasses(theme);
  const isSaved = savedJobIds.includes(job.id);
  const isApplied = applications.some(app => app.jobId === job.id);

  const [coverNote, setCoverNote] = useState('');
  const [screeningAnswers, setScreeningAnswers] = useState({});
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    if (!candidateProfile.resume) {
      showToast("Please upload your resume before applying!", "warning");
      setIsResumeModalOpen(true);
      return;
    }

    const success = applyToJob(job, coverNote, screeningAnswers);
    if (success) {
      setShowApplyForm(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Job link copied to clipboard!", "success");
  };

  const handleReport = () => {
    setReportSuccess(true);
    showToast("Job flagged for Admin Moderation review. Thank you!", "info");
    setTimeout(() => setReportSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {job.source}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-200/70 text-slate-700">
                {job.workMode}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-200/70 text-slate-700">
                {job.jobType}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              {job.title}
            </h2>
            <div className="flex items-center gap-2 mt-1.5 text-slate-600">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{job.company}</span>
              {job.verifiedCompany && (
                <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                  <CheckCircle className="w-3.5 h-3.5 fill-blue-500 text-white" />
                  Verified Recruiter
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Salary Package</span>
              <span className="font-bold text-slate-800 text-sm">{job.salary}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Experience Req.</span>
              <span className="font-bold text-slate-800 text-sm">{job.experience}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Job Location</span>
              <span className="font-bold text-slate-800 text-sm truncate block">{job.location}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Application Due</span>
              <span className="font-bold text-slate-800 text-sm">{job.deadline}</span>
            </div>
          </div>

          {/* Application Channel Banner */}
          {job.applyMode === 'external' ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Official External Application</p>
                <p className="text-xs text-amber-800 mt-0.5">
                  This employer requires applications through their official careers portal: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-[11px] font-mono">{job.externalUrl || "https://careers.company.com"}</code>
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Direct On-Site Application Supported</p>
                <p className="text-xs text-emerald-800 mt-0.5">
                  You can apply directly through Thakur Job Consultant using your encrypted, verified resume.
                </p>
              </div>
            </div>
          )}

          {/* Job Description */}
          <div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-2">Job Overview</h4>
            <p className="leading-relaxed text-slate-600">{job.description}</p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && (
            <div>
              <h4 className="font-heading font-bold text-base text-slate-900 mb-2">Key Responsibilities</h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="leading-relaxed">{resp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div>
            <h4 className="font-heading font-bold text-base text-slate-900 mb-2.5">Skills Required</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Qualifications */}
          {job.education && (
            <div>
              <h4 className="font-heading font-bold text-base text-slate-900 mb-1.5">Education / Qualification</h4>
              <p className="text-slate-600">{job.education}</p>
            </div>
          )}

          {/* Apply Form on-site */}
          {showApplyForm && (
            <div className="p-5 bg-slate-50 rounded-2xl border-2 border-indigo-200 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                  <Send className="w-4 h-4 text-indigo-600" />
                  Confirm Application Details
                </h4>
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              {/* Resume to be attached */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs text-slate-800">
                      {candidateProfile.resume ? candidateProfile.resume.fileName : "No resume found"}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-medium">
                      {candidateProfile.resume ? candidateProfile.resume.scanStatus : "Please upload a resume"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Screening Questions if any */}
              {job.screeningQuestions && job.screeningQuestions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Screening Questions:</p>
                  {job.screeningQuestions.map((q, idx) => (
                    <div key={idx}>
                      <label className="block text-xs font-medium text-slate-700 mb-1">{q}</label>
                      <input
                        type="text"
                        placeholder="Your answer..."
                        required
                        value={screeningAnswers[idx] || ''}
                        onChange={(e) => setScreeningAnswers({ ...screeningAnswers, [idx]: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Optional Cover Note */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Cover Note / Message to Recruiter (Optional)
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Introduce yourself briefly or mention key achievements..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleApply}
                className={`w-full py-3 rounded-xl text-xs font-bold shadow-md transition-all ${themeClasses.primary}`}
              >
                Submit Application Now
              </button>
            </div>
          )}

          {/* Safety Disclaimer Footer */}
          <div className="p-3.5 bg-slate-100/70 rounded-2xl text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
            <p>
              Thakur Job Consultant verified this listing on {job.postedDate}. Beware of anyone asking for payments under the consultant name.
            </p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold ${
                isSaved ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
              <span>{isSaved ? "Saved" : "Save Job"}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 text-xs font-semibold"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            <button
              onClick={handleReport}
              disabled={reportSuccess}
              className="p-2.5 rounded-xl text-slate-400 hover:text-amber-700 hover:bg-amber-50 transition-colors flex items-center justify-center gap-1 text-xs"
              title="Report this job"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{reportSuccess ? "Reported" : "Report"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isApplied ? (
              <div className="px-6 py-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2 w-full sm:w-auto justify-center">
                <CheckCircle className="w-4 h-4" />
                <span>You have already applied</span>
              </div>
            ) : job.applyMode === 'external' ? (
              <a
                href={job.externalUrl || "https://careers.google.com"}
                target="_blank"
                rel="noreferrer"
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 ${themeClasses.primary}`}
              >
                <span>Continue to Official Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                onClick={() => setShowApplyForm(true)}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-bold shadow-md transition-all ${themeClasses.primary}`}
              >
                Apply Direct on Thakur Portal
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
