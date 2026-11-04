import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../utils/theme';
import { 
  Building2, 
  PlusCircle, 
  Briefcase, 
  Users, 
  CheckCircle2, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

export const EmployerPortal = () => {
  const { jobs, postNewJob, applications, theme, showToast } = useApp();
  const themeClasses = getThemeClasses(theme);

  const [activeTab, setActiveTab] = useState('manage-jobs'); // 'manage-jobs' | 'post-job' | 'applicants'

  // Post Job Form State
  const [formData, setFormData] = useState({
    title: '',
    company: 'Thakur Corporate Solutions',
    verifiedCompany: true,
    category: 'IT Software',
    workMode: 'Hybrid',
    jobType: 'Full-Time',
    experience: '2 - 5 Years',
    salary: '₹6,00,000 - ₹10,00,000 P.A.',
    location: 'Noida, Sector 62',
    openings: 2,
    deadline: '2026-12-31',
    description: '',
    responsibilities: '',
    skills: '',
    education: "Bachelor's Degree in relevant discipline",
    applyMode: 'onsite',
    externalUrl: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showToast("Please fill in Job Title and Description", "warning");
      return;
    }

    const newJob = {
      ...formData,
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : ['Communication', 'Management'],
      responsibilities: formData.responsibilities ? formData.responsibilities.split('\n').filter(Boolean) : [
        'Deliver on core project responsibilities with quality standards',
        'Collaborate with multidisciplinary team members'
      ],
      screeningQuestions: []
    };

    postNewJob(newJob);
    setActiveTab('manage-jobs');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 🏢 Employer Dashboard Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            Employer Verification Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Recruiter & Employer Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Submit vacancies, monitor applicant resumes, and track recruitment progress with full compliance.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('post-job')}
          className={`px-5 py-3 rounded-2xl text-xs font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-105 ${themeClasses.primary}`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a New Vacancy</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('manage-jobs')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'manage-jobs'
              ? `${themeClasses.primary} shadow-xs`
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Posted Vacancies ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('post-job')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'post-job'
              ? `${themeClasses.primary} shadow-xs`
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Vacancy Form</span>
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'applicants'
              ? `${themeClasses.primary} shadow-xs`
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Applicants ({applications.length})</span>
        </button>
      </div>

      {/* 🚀 TAB 1: MANAGE POSTED VACANCIES */}
      {activeTab === 'manage-jobs' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-slate-900">
              Submitted Vacancies & Live Status
            </h3>
            <span className="text-xs text-slate-500">
              Per policy: All new jobs undergo admin verification before going public.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Job Role & Title</th>
                  <th className="p-4">Location & Mode</th>
                  <th className="p-4">Package</th>
                  <th className="p-4">Source Category</th>
                  <th className="p-4">Approval Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-900 text-sm">{job.title}</p>
                      <p className="text-[11px] text-slate-400">{job.company}</p>
                    </td>
                    <td className="p-4">
                      <span>{job.location}</span>
                      <span className="block text-[11px] text-slate-400">{job.workMode}</span>
                    </td>
                    <td className="p-4 font-medium text-slate-800">
                      {job.salary}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {job.source}
                      </span>
                    </td>
                    <td className="p-4">
                      {job.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Live & Active
                        </span>
                      ) : job.status === 'pending' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                          <Clock className="w-3.5 h-3.5" />
                          Pending Admin Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setActiveTab('applicants')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 hover:bg-indigo-50 border border-indigo-200"
                      >
                        View Resumes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📝 TAB 2: POST A JOB FORM (PDF Page 6 & 7 Specification) */}
      {activeTab === 'post-job' && (
        <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-heading font-extrabold text-lg text-slate-900">
              Submit a New Job Vacancy
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Please specify genuine details. Listings are moderated as per Thakur Job Consultant quality standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Job Title / Designation *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Java Spring Boot Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hiring Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Industry Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              >
                <option value="IT Software">IT Software & Services</option>
                <option value="HR & Recruitment">HR & Recruitment</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Operations & Logistics">Operations & Logistics</option>
                <option value="Finance & Accounts">Finance & Accounts</option>
                <option value="Customer Support / BPO">Customer Support / BPO</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Work Mode
              </label>
              <select
                value={formData.workMode}
                onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              >
                <option value="On-site">On-site (Office)</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">100% Remote / Work from Home</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Experience Level
              </label>
              <input
                type="text"
                placeholder="e.g. 2 - 5 Years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Annual Salary Package (CTC)
              </label>
              <input
                type="text"
                placeholder="e.g. ₹6,00,000 - ₹9,00,000 P.A. or 'Not Disclosed'"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Job Location / City
              </label>
              <input
                type="text"
                placeholder="e.g. Noida, Sector 62 / Delhi NCR"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Application Mode
              </label>
              <select
                value={formData.applyMode}
                onChange={(e) => setFormData({ ...formData, applyMode: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              >
                <option value="onsite">Direct On-Site on Thakur Website (Recommended)</option>
                <option value="external">Redirect to Company External Careers URL</option>
              </select>
            </div>
          </div>

          {formData.applyMode === 'external' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Application Destination URL *
              </label>
              <input
                type="url"
                placeholder="https://company.com/careers/job-id-123"
                value={formData.externalUrl}
                onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Required Skills (Comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. React.js, Tailwind CSS, REST APIs, Git"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Job Description *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Detailed description of the position..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('manage-jobs')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-md ${themeClasses.primary}`}
            >
              Submit for Admin Approval
            </button>
          </div>
        </form>
      )}

      {/* 👥 TAB 3: CANDIDATE APPLICANTS TRACKER */}
      {activeTab === 'applicants' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-heading font-bold text-base text-slate-900">
              Candidate Applications Received
            </h3>
            <span className="text-xs text-slate-500">
              {applications.length} verified resumes submitted
            </span>
          </div>

          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    {app.jobTitle.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{app.jobTitle}</h4>
                    <p className="text-xs text-slate-500">Candidate: Rahul Verma • Applied: {app.appliedDate}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Ref: {app.refCode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    Status: {app.status}
                  </span>
                  <button
                    onClick={() => showToast("Candidate resume opened securely with temporary token", "info")}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    View Resume (PDF)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
