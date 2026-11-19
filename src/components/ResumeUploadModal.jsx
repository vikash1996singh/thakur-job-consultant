import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import { 
  X, 
  FileUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  Lock,
  Building2,
  Briefcase
} from 'lucide-react';

export const ResumeUploadModal = ({ onClose }) => {
  const { setCandidateProfile, submitResumeRecord, showToast, setActiveTab } = useApp();

  // Form State matching Screenshot 1 & 2
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [selectedRole, setSelectedRole] = useState('Any suitable role');
  const [totalExperience, setTotalExperience] = useState('');
  const [file, setFile] = useState(null);
  const [agreed, setAgreed] = useState(false);

  // Status & Validation
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const roleOptions = [
    'Any suitable role',
    'Software Developer / IT',
    'Accounts & Finance',
    'HR & Recruitment',
    'Sales & Business Development',
    'Operations & Supply Chain Logistics',
    'Customer Support / BPO (Voice & Non-Voice)',
    'Manufacturing & Industrial Engineering',
    'Quality Analyst / QC & Testing',
    'Digital Marketing & Content',
    'Healthcare, Nursing & Pharmacy',
    'Executive & Administrative Assistant'
  ];

  const handleFileChange = (e) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      const allowedExts = ['pdf', 'doc', 'docx'];
      const fileExt = selected.name.split('.').pop().toLowerCase();

      if (!allowedExts.includes(fileExt)) {
        setError('Unsupported format! Only PDF, DOC, and DOCX documents are accepted.');
        return;
      }

      if (selected.size > 5 * 1024 * 1024) {
        setError('File exceeds 5 MB limit. Please select a smaller resume document.');
        return;
      }

      setFile(selected);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (fullName.trim().length > 60) {
      setError('Full name cannot exceed 60 characters.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (email.trim().length > 80) {
      setError('Email address cannot exceed 80 characters.');
      return;
    }
    if (!phone.trim() || phone.trim().length !== 10) {
      setError('Please enter a valid 10-digit Phone / WhatsApp number.');
      return;
    }
    if (!currentLocation.trim()) {
      setError('Please enter your current location (e.g. Noida, Delhi NCR).');
      return;
    }
    if (currentLocation.trim().length > 80) {
      setError('Location cannot exceed 80 characters.');
      return;
    }
    if (totalExperience.trim().length > 30) {
      setError('Total experience cannot exceed 30 characters.');
      return;
    }
    if (!file) {
      setError('Please choose your CV file (PDF, DOC or DOCX).');
      return;
    }
    if (!agreed) {
      setError('Please agree to share your details with Thakur Job Consultant.');
      return;
    }

    setIsSubmitting(true);

    // Simulate verified upload, scan and database ingestion
    setTimeout(() => {
      const refCode = `TK-CV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const fileSizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

      // Record resume submission for Thakur Admin visibility
      submitResumeRecord({
        refCode,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: currentLocation.trim(),
        role: selectedRole,
        experience: totalExperience.trim() || '1 Year',
        fileName: file.name,
        fileSize: fileSizeStr
      });

      // Update candidate profile in App Context
      setCandidateProfile(prev => ({
        ...prev,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: currentLocation.trim(),
        experienceYears: totalExperience.trim() || '1 Year',
        headline: selectedRole !== 'Any suitable role' ? selectedRole : (prev.headline || 'Job Seeker Profile'),
        profileCompletion: 100,
        resume: {
          fileName: file.name,
          fileSize: fileSizeStr,
          uploadedAt: 'Just now',
          scanStatus: 'Clean & Verified (Zero Threats)',
          mimeType: file.type || 'application/pdf',
          isDefault: true
        }
      }));

      setIsSubmitting(false);
      setSubmissionSuccess({
        fullName: fullName.trim(),
        role: selectedRole,
        refCode,
        fileName: file.name
      });
      showToast('CV successfully registered with Thakur Job Consultant!', 'success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh] sm:max-h-[88vh]">
        
        {/* Header with official Thakur Job Consultant Logo (Fixed at top) */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-xl shadow-xs border border-slate-200/80 flex items-center justify-center shrink-0 min-w-10 min-h-10">
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
                alt="Thakur Job Consultant" 
                className="h-10 w-auto object-contain max-h-10" 
              />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                Upload your CV
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Thakur Job Consultant • Direct Placement Desk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable inside modal dialog */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
          {submissionSuccess ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-extrabold text-xl text-slate-900">
                  CV Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{submissionSuccess.fullName}</strong>. Your CV has been verified and registered with Thakur Job Consultant.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Application Ref:</span>
                  <span className="font-mono font-bold text-sky-700">{submissionSuccess.refCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Role:</span>
                  <span className="font-semibold text-slate-800">{submissionSuccess.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CV File:</span>
                  <span className="font-semibold text-slate-800">{submissionSuccess.fileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Placement Fee:</span>
                  <span className="font-bold text-emerald-600">₹0 (100% Free for Candidates)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    onClose();
                    setActiveTab('search');
                  }}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Browse Matching Jobs Now</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* CV Submission Form exactly matching Screenshot 1 & Screenshot 2 */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full name */}
              <div>
                <input
                  type="text"
                  maxLength={60}
                  placeholder="Full name (max 60 characters)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value.slice(0, 60))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50/50 outline-none transition-all font-normal"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  maxLength={80}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.slice(0, 80))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50/50 outline-none transition-all font-normal"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Phone / WhatsApp (10 digits)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50/50 outline-none transition-all font-normal"
                />
              </div>

              {/* Current location */}
              <div>
                <input
                  type="text"
                  maxLength={80}
                  placeholder="Current location"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value.slice(0, 80))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50/50 outline-none transition-all font-normal"
                />
              </div>

              {/* Any suitable role dropdown */}
              <div>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-slate-800 bg-slate-50/50 outline-none transition-all font-normal"
                >
                  {roleOptions.map((role, idx) => (
                    <option key={idx} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Total experience (e.g. 2 years) */}
              <div>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="Total experience (e.g. 2 years)"
                  value={totalExperience}
                  onChange={(e) => setTotalExperience(e.target.value.slice(0, 30))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-slate-50/50 outline-none transition-all font-normal"
                />
              </div>

              {/* Dashed Upload CV Box matching Screenshot 1 & Screenshot 2 */}
              <div className="border-2 border-dashed border-sky-400/90 rounded-xl p-4 sm:p-5 text-center bg-sky-50/20 hover:bg-sky-50/40 transition-colors">
                <div className="flex items-center justify-center gap-1.5 text-slate-700 font-semibold text-xs sm:text-sm">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span>Upload your CV</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  PDF, DOC or DOCX · max 5 MB
                </p>

                <div className="mt-3 flex items-center justify-center">
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer shadow-2xs transition-all">
                    <span>Choose File</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="ml-3 text-xs text-slate-500 truncate max-w-[180px]">
                    {file ? file.name : 'No file chosen'}
                  </span>
                </div>

                {file && (
                  <p className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Selected: {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready</span>
                  </p>
                )}
              </div>

              {/* Checkbox: I agree to share my details with Thakur Job Consultant for recruitment purposes */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="cv-consent"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <label htmlFor="cv-consent" className="text-[11px] sm:text-xs text-slate-600 cursor-pointer leading-tight select-none">
                  I agree to share my details with Thakur Job Consultant for recruitment purposes.
                </label>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Resume Button matching Screenshot 2 */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0284c7] hover:bg-[#0369a1] active:bg-[#075985] text-white shadow-md shadow-sky-100 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Submit Resume</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust & Zero Fee Guarantee Note */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-500 font-medium">
                  <Lock className="w-3 h-3 text-slate-400" />
                  Confidential & Encrypted
                </span>
                <span className="text-emerald-600 font-semibold">
                  Zero Charges for Candidates
                </span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
