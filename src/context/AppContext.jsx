import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialJobs, initialCompanies, initialCandidateProfile, initialApplications } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState('candidate'); // 'candidate' | 'employer' | 'admin'
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'search' | 'dashboard' | 'applications' | 'saved' | 'employer' | 'admin'
  
  // Theme State: 'indigo' (Classic Tech), 'emerald' (Fresh Growth), 'slate' (Fintech Dark/Modern)
  const [theme, setTheme] = useState('indigo');

  // Core Data
  const [jobs, setJobs] = useState(initialJobs);
  const [companies, setCompanies] = useState(initialCompanies);
  const [candidateProfile, setCandidateProfile] = useState(initialCandidateProfile);
  const [applications, setApplications] = useState(initialApplications);
  const [savedJobIds, setSavedJobIds] = useState(['job-101', 'job-103']);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Modals
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationSuccessData, setApplicationSuccessData] = useState(null);

  // Toast / Notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Actions
  const toggleSaveJob = (jobId) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(prev => prev.filter(id => id !== jobId));
      showToast("Job removed from saved list", "info");
    } else {
      setSavedJobIds(prev => [...prev, jobId]);
      showToast("Job saved to your bookmarks!", "success");
    }
  };

  const applyToJob = (job, coverNote = '', screeningAnswers = {}) => {
    // Check if already applied
    const alreadyApplied = applications.some(app => app.jobId === job.id);
    if (alreadyApplied) {
      showToast("You have already applied for this job!", "warning");
      return false;
    }

    const newApp = {
      id: `app-${Date.now().toString().slice(-4)}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: "Just now",
      status: "Submitted",
      coverNote,
      screeningAnswers,
      timeline: [
        { status: "Submitted", date: "Just now", note: "Application submitted with default verified resume" }
      ],
      refCode: `TK-2026-APP-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setApplications(prev => [newApp, ...prev]);
    setApplicationSuccessData(newApp);
    showToast(`Successfully applied to ${job.company}!`, "success");
    return true;
  };

  // Employer actions
  const postNewJob = (newJobData) => {
    const jobWithMeta = {
      ...newJobData,
      id: `job-${Date.now()}`,
      status: 'pending', // Requires admin review as per PDF!
      postedDate: 'Just now',
      source: 'Company Verified',
      sourceType: 'company'
    };
    setJobs(prev => [jobWithMeta, ...prev]);
    showToast("Job submitted for Admin Verification!", "success");
  };

  // Admin actions
  const approveJob = (jobId) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'active' } : j));
    showToast("Job approved and published to public search!", "success");
  };

  const rejectJob = (jobId, reason = "Information mismatch") => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'rejected', rejectionReason: reason } : j));
    showToast("Job marked as rejected.", "info");
  };

  const verifyCompany = (companyId) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, verified: true } : c));
    showToast("Company verified successfully with blue badge!", "success");
  };

  // Update Candidate Resume
  const updateCandidateResume = (fileData) => {
    setCandidateProfile(prev => ({
      ...prev,
      profileCompletion: Math.min(100, prev.profileCompletion + 10),
      resume: {
        fileName: fileData.name,
        fileSize: `${(fileData.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: "Just now",
        scanStatus: "Clean & Verified (Zero Threats)",
        mimeType: fileData.type || "application/pdf",
        isDefault: true
      }
    }));
    showToast("Resume uploaded, scanned and saved securely!", "success");
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        theme,
        setTheme,
        jobs,
        companies,
        candidateProfile,
        setCandidateProfile,
        applications,
        savedJobIds,
        toggleSaveJob,
        applyToJob,
        postNewJob,
        approveJob,
        rejectJob,
        verifyCompany,
        updateCandidateResume,
        searchQuery,
        setSearchQuery,
        locationFilter,
        setLocationFilter,
        selectedCategory,
        setSelectedCategory,
        selectedWorkMode,
        setSelectedWorkMode,
        selectedExperience,
        setSelectedExperience,
        selectedSource,
        setSelectedSource,
        sortBy,
        setSortBy,
        selectedJobForModal,
        setSelectedJobForModal,
        isResumeModalOpen,
        setIsResumeModalOpen,
        isApplyModalOpen,
        setIsApplyModalOpen,
        applicationSuccessData,
        setApplicationSuccessData,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
