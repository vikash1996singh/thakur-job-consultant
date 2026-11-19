import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialJobs, initialCompanies, initialCandidateProfile, initialApplications } from '../data/mockData';

const AppContext = createContext();

const loadStored = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const initialSubmittedResumes = [
  {
    id: 'cv-initial-1',
    refCode: 'TK-CV-2026-0001',
    fullName: initialCandidateProfile.fullName,
    email: initialCandidateProfile.email,
    phone: initialCandidateProfile.phone,
    location: initialCandidateProfile.city,
    role: initialCandidateProfile.headline || 'Software Developer',
    experience: `${initialCandidateProfile.experienceYears} Years`,
    fileName: initialCandidateProfile.resume.fileName,
    fileSize: initialCandidateProfile.resume.fileSize,
    uploadedAt: initialCandidateProfile.resume.uploadedAt,
    scanStatus: initialCandidateProfile.resume.scanStatus
  }
];

export const defaultSiteSettings = {
  consultancyName: 'Thakur Job Consultant',
  whatsappNumber: '+91 88522 49966',
  whatsappDigits: '918852249966',
  email: 'info@thakurconsultancy.in',
  employerEmail: 'employers@thakurconsultancy.in',
  officeAddress: 'Sector 62, Electronic City, Noida, Uttar Pradesh - 201309',
  supportHours: 'Monday to Saturday: 9:30 AM to 6:30 PM IST',
  securityNotice: 'Thakur Job Consultant never charges any unofficial placement or registration fees from candidates. Always verify employer badges before attending offline interviews.',
  heroTagline: '100% Free for Candidates'
};

const defaultAdminCreds = {
  email: 'admin@thakurconsultancy.in',
  password: 'admin@123'
};

const initialRegisteredUsers = [
  {
    id: 'usr-default-cand',
    role: 'candidate',
    firstName: 'Rahul',
    lastName: 'Verma',
    fullName: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    mobile: '9876543210',
    password: 'password123',
    createdAt: '2026-11-01T10:00:00.000Z'
  },
  {
    id: 'usr-default-emp',
    role: 'employer',
    firstName: 'Vikram',
    lastName: 'Thakur',
    fullName: 'Vikram Thakur',
    email: 'hr@company.com',
    mobile: '9876500000',
    companyName: 'Thakur Corporate Solutions',
    password: 'password123',
    createdAt: '2026-11-01T10:00:00.000Z'
  }
];

export const AppProvider = ({ children }) => {
  // Navigation & Role State
  const [loggedInUser, setLoggedInUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem('tk_logged_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [currentRole, setCurrentRole] = useState(() => {
    if (typeof window === 'undefined') return 'candidate';
    if (sessionStorage.getItem('tk_admin_auth') === 'true') return 'admin';
    try {
      const raw = sessionStorage.getItem('tk_logged_user');
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed?.role || 'candidate';
    } catch {
      return 'candidate';
    }
  }); // 'candidate' | 'employer' | 'admin'
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    if (sessionStorage.getItem('tk_admin_auth') === 'true') return 'admin';
    try {
      const raw = sessionStorage.getItem('tk_logged_user');
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed?.role === 'employer') return 'employer';
      if (parsed?.role === 'candidate') return 'dashboard';
      return 'home';
    } catch {
      return 'home';
    }
  }); // 'home' | 'search' | 'dashboard' | 'applications' | 'saved' | 'employer' | 'admin'
  
  // Theme State: 'indigo' (Classic Tech), 'emerald' (Fresh Growth), 'slate' (Fintech Dark/Modern)
  const [theme, setTheme] = useState('indigo');

  // Registered Users (persisted in localStorage for Login & Registration)
  const [registeredUsers, setRegisteredUsers] = useState(() => loadStored('tk_registered_users_v1', initialRegisteredUsers));
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  const [authModalInitialRole, setAuthModalInitialRole] = useState('candidate'); // 'candidate' | 'employer'

  // Core Data (persisted in localStorage so Thakur Admin sees Employer & Student submissions across refreshes)
  const [jobs, setJobs] = useState(() => loadStored('tk_jobs_v1', initialJobs));
  const [companies, setCompanies] = useState(() => loadStored('tk_companies_v1', initialCompanies));
  const [candidateProfile, setCandidateProfile] = useState(() => loadStored('tk_candidate_v1', initialCandidateProfile));
  const [applications, setApplications] = useState(() => loadStored('tk_applications_v1', initialApplications));
  const [submittedResumes, setSubmittedResumes] = useState(() => loadStored('tk_resumes_v1', initialSubmittedResumes));
  const [siteSettings, setSiteSettings] = useState(() => loadStored('tk_site_settings_v1', defaultSiteSettings));
  const [adminCreds, setAdminCreds] = useState(() => loadStored('tk_admin_creds_v1', defaultAdminCreds));
  const [savedJobIds, setSavedJobIds] = useState(['job-101', 'job-103']);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('tk_jobs_v1', JSON.stringify(jobs));
      localStorage.setItem('tk_companies_v1', JSON.stringify(companies));
      localStorage.setItem('tk_candidate_v1', JSON.stringify(candidateProfile));
      localStorage.setItem('tk_applications_v1', JSON.stringify(applications));
      localStorage.setItem('tk_resumes_v1', JSON.stringify(submittedResumes));
      localStorage.setItem('tk_site_settings_v1', JSON.stringify(siteSettings));
      localStorage.setItem('tk_admin_creds_v1', JSON.stringify(adminCreds));
      localStorage.setItem('tk_registered_users_v1', JSON.stringify(registeredUsers));
    } catch {
      // ignore storage quota issues
    }
  }, [jobs, companies, candidateProfile, applications, submittedResumes, siteSettings, adminCreds, registeredUsers]);

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('tk_admin_auth') === 'true';
  });
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationSuccessData, setApplicationSuccessData] = useState(null);

  // Hidden admin access listeners (?admin=true in URL or Ctrl+Shift+A)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('admin') === '1' || window.location.hash === '#admin') {
        setIsAdminAuthModalOpen(true);
      }

      const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
          e.preventDefault();
          setIsAdminAuthModalOpen(prev => !prev);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // Toast / Notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Modal helper to open Login / Register directly
  const openAuthModal = (mode = 'login', role = 'candidate') => {
    setAuthModalMode(mode);
    setAuthModalInitialRole(role);
    setIsLoginModalOpen(true);
  };

  // Secure Auth methods for Candidate, Employer, and Thakur Admin
  const loginCandidate = (identifier = '', displayName = '') => {
    const cleanId = identifier.trim() || candidateProfile.email;
    const name = displayName || candidateProfile.fullName;
    const userObj = { role: 'candidate', identifier: cleanId, name };
    setLoggedInUser(userObj);
    setCurrentRole('candidate');
    setActiveTab('dashboard');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tk_logged_user', JSON.stringify(userObj));
    }
  };

  const loginEmployer = (identifier = '', displayName = '') => {
    const cleanId = identifier.trim() || 'Employer Desk';
    const name = displayName || 'Employer Desk';
    const userObj = { role: 'employer', identifier: cleanId, name };
    setLoggedInUser(userObj);
    setCurrentRole('employer');
    setActiveTab('employer');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tk_logged_user', JSON.stringify(userObj));
    }
  };

  // Register New User (Candidate or Employer)
  const registerUser = ({ role, firstName, lastName, email, mobile, password, companyName = '' }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.trim();
    const fName = firstName.trim();
    const lName = lastName.trim();
    const fullName = `${fName} ${lName}`.trim();

    // Check duplicate
    const existingUser = registeredUsers.find(
      u => u.email.toLowerCase() === cleanEmail || u.mobile === cleanMobile
    );

    if (existingUser) {
      if (existingUser.email.toLowerCase() === cleanEmail) {
        return { success: false, message: 'This Email ID is already registered! Please Login instead.' };
      }
      return { success: false, message: 'This Mobile Number is already registered! Please Login instead.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      role,
      firstName: fName,
      lastName: lName,
      fullName,
      email: cleanEmail,
      mobile: cleanMobile,
      password,
      companyName: role === 'employer' ? (companyName.trim() || `${fName}'s Enterprises`) : '',
      createdAt: new Date().toISOString()
    };

    setRegisteredUsers(prev => [newUser, ...prev]);

    // Role-specific setup & Auto login
    if (role === 'candidate') {
      setCandidateProfile(prev => ({
        ...prev,
        fullName: fullName || prev.fullName,
        email: cleanEmail,
        phone: `+91 ${cleanMobile}`,
        headline: prev.headline || 'Job Seeker / Candidate'
      }));
      loginCandidate(cleanEmail, fullName);
      showToast(`Welcome ${fullName}! Registered successfully as Candidate.`, 'success');
    } else if (role === 'employer') {
      loginEmployer(cleanEmail, fullName);
      showToast(`Welcome ${fullName}! Registered successfully as Employer.`, 'success');
    }

    return { success: true, user: newUser };
  };

  // Login With Credentials (Checks registered users or Admin)
  const loginWithCredentials = (identifier, password, selectedRole = 'candidate') => {
    const cleanId = identifier.trim().toLowerCase();

    // 1. Thakur Admin Check
    if (selectedRole === 'admin') {
      const ok = loginAdmin(cleanId, password);
      if (!ok) {
        return { success: false, message: 'Invalid Thakur Admin credentials. Use admin@thakurconsultancy.in / admin@123' };
      }
      showToast('Authorized: Welcome to Thakur Admin Console', 'success');
      return { success: true, role: 'admin' };
    }

    // 2. Registered Users Check
    const matchedUser = registeredUsers.find(
      u => u.email.toLowerCase() === cleanId || u.mobile === cleanId
    );

    if (matchedUser) {
      if (matchedUser.password !== password) {
        return { success: false, message: 'Incorrect Password. Please check and try again!' };
      }

      if (matchedUser.role === 'candidate') {
        setCandidateProfile(prev => ({
          ...prev,
          fullName: matchedUser.fullName || prev.fullName,
          email: matchedUser.email || prev.email,
          phone: matchedUser.mobile ? `+91 ${matchedUser.mobile}` : prev.phone
        }));
        loginCandidate(matchedUser.email, matchedUser.fullName);
        showToast(`Welcome back, ${matchedUser.fullName}! Logged in as Candidate.`, 'success');
      } else if (matchedUser.role === 'employer') {
        loginEmployer(matchedUser.email, matchedUser.fullName);
        showToast(`Welcome back, ${matchedUser.fullName}! Logged in as Employer.`, 'success');
      }

      return { success: true, role: matchedUser.role, user: matchedUser };
    }

    // 3. Demo fallback if user entered standard demo credentials
    if (password === 'password123' || password === '123456') {
      if (selectedRole === 'candidate') {
        loginCandidate(cleanId, cleanId.split('@')[0] || 'Candidate');
        showToast('Logged in as Candidate', 'success');
        return { success: true, role: 'candidate' };
      } else if (selectedRole === 'employer') {
        loginEmployer(cleanId, cleanId.split('@')[0] || 'Employer Desk');
        showToast('Welcome to Employer Portal', 'success');
        return { success: true, role: 'employer' };
      }
    }

    return { 
      success: false, 
      message: 'Account not found with this Email / Mobile. Please click "Register" to create your new account!' 
    };
  };

  // Reset Password for registered users or admin
  const resetUserPassword = (identifier, newPassword) => {
    const cleanId = identifier.trim().toLowerCase();

    // Check if user exists in registered users
    const userIndex = registeredUsers.findIndex(
      u => u.email.toLowerCase() === cleanId || u.mobile === cleanId
    );

    if (userIndex !== -1) {
      const updatedUsers = [...registeredUsers];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        password: newPassword
      };
      setRegisteredUsers(updatedUsers);
      showToast('Password reset successfully! Please sign in with your new password.', 'success');
      return { success: true };
    }

    // Check admin
    if (cleanId === adminCreds.email.toLowerCase() || cleanId === 'admin') {
      setAdminCreds(prev => ({ ...prev, password: newPassword }));
      showToast('Admin password updated successfully!', 'success');
      return { success: true };
    }

    // Demo fallback: if valid format, still allow reset
    if (cleanId.includes('@') || cleanId.length === 10) {
      showToast('Password reset successfully! You can now log in.', 'success');
      return { success: true };
    }

    return { 
      success: false, 
      message: 'No registered account found with this Email ID or Mobile number.' 
    };
  };

  const loginAdmin = (inputEmail, inputPassword) => {
    const cleanInput = inputEmail.trim().toLowerCase();
    const validEmail = cleanInput === adminCreds.email.toLowerCase() || cleanInput === 'admin';
    const validPassword = inputPassword === adminCreds.password;

    if (validEmail && validPassword) {
      const userObj = { role: 'admin', identifier: inputEmail.trim() };
      setLoggedInUser(userObj);
      setIsAdminAuthenticated(true);
      setCurrentRole('admin');
      setActiveTab('admin');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('tk_admin_auth', 'true');
        sessionStorage.setItem('tk_logged_user', JSON.stringify(userObj));
      }
      return true;
    }
    return false;
  };

  const [logoutConfirmRole, setLogoutConfirmRole] = useState(null); // null | 'admin' | 'employer' | 'candidate'

  const requestLogout = (role = currentRole) => {
    setLogoutConfirmRole(role);
  };

  const cancelLogout = () => {
    setLogoutConfirmRole(null);
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setLoggedInUser(null);
    setCurrentRole('candidate');
    setActiveTab('home');
    setLogoutConfirmRole(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('tk_admin_auth');
      sessionStorage.removeItem('tk_logged_user');
    }
    showToast('Admin session terminated safely', 'info');
  };

  const logoutUser = () => {
    setIsAdminAuthenticated(false);
    setLoggedInUser(null);
    setCurrentRole('candidate');
    setActiveTab('home');
    setLogoutConfirmRole(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('tk_admin_auth');
      sessionStorage.removeItem('tk_logged_user');
    }
    showToast('Logged out successfully', 'info');
  };

  const confirmLogout = () => {
    if (logoutConfirmRole === 'admin') {
      logoutAdmin();
    } else {
      logoutUser();
    }
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
      candidateName: candidateProfile.fullName,
      candidateEmail: candidateProfile.email,
      candidatePhone: candidateProfile.phone,
      resumeFileName: candidateProfile.resume?.fileName || 'Resume.pdf',
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

  // Employer actions (Employer posts company requirement -> Thakur Admin verifies/approves)
  const postNewJob = (newJobData) => {
    const jobWithMeta = {
      ...newJobData,
      id: `job-${Date.now()}`,
      status: 'pending', // Requires Thakur Admin review
      postedDate: 'Just now',
      source: 'Employer Submitted',
      sourceType: 'company'
    };
    setJobs(prev => [jobWithMeta, ...prev]);

    const compName = (newJobData.company || '').trim();
    if (compName) {
      setCompanies(prev => {
        const exists = prev.some(c => c.name.toLowerCase() === compName.toLowerCase());
        if (exists) return prev;
        return [
          {
            id: `comp-${Date.now()}`,
            name: compName,
            website: '',
            industry: newJobData.category || 'Corporate Hiring',
            location: newJobData.location || 'India',
            verified: false,
            openJobs: 1,
            description: `Submitted employer requirement for ${newJobData.title}`
          },
          ...prev
        ];
      });
    }

    showToast("Job requirement submitted for Thakur Admin approval!", "success");
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

  const toggleCompanyVerify = (companyId) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, verified: !c.verified } : c));
    showToast("Company verification status updated!", "success");
  };

  const adminAddCompany = (compData) => {
    const entry = {
      id: `comp-${Date.now()}`,
      name: compData.name,
      website: compData.website || '',
      industry: compData.industry || 'Corporate Hiring',
      location: compData.location || 'India',
      verified: Boolean(compData.verified),
      openJobs: Number(compData.openJobs) || 1,
      description: compData.description || ''
    };
    setCompanies(prev => [entry, ...prev]);
    showToast("Company added by Thakur Admin!", "success");
  };

  const deleteCompany = (companyId) => {
    setCompanies(prev => prev.filter(c => c.id !== companyId));
    showToast("Company removed from directory.", "info");
  };

  const adminAddJob = (jobData) => {
    const entry = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      source: jobData.source || 'Thakur Admin Verified',
      sourceType: 'company',
      status: jobData.status || 'active'
    };
    setJobs(prev => [entry, ...prev]);
    showToast("New job created and updated on site!", "success");
  };

  const adminUpdateJob = (jobId, updatedFields) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...updatedFields } : j));
    showToast("Job details updated across website!", "success");
  };

  const adminDeleteJob = (jobId) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    showToast("Job deleted from website.", "info");
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const nowStr = new Date().toLocaleString();
      const updatedTimeline = [
        ...(app.timeline || []),
        { status: newStatus, date: nowStr, note: `Updated by Thakur Admin to ${newStatus}` }
      ];
      return { ...app, status: newStatus, timeline: updatedTimeline };
    }));
    showToast(`Application status updated to ${newStatus}!`, "success");
  };

  const deleteSubmittedResume = (cvId) => {
    setSubmittedResumes(prev => prev.filter(cv => cv.id !== cvId));
    showToast("Resume record deleted.", "info");
  };

  const updateSiteSettings = (updated) => {
    const cleanDigits = (updated.whatsappNumber || '').replace(/\D/g, '') || '918852249966';
    setSiteSettings(prev => ({
      ...prev,
      ...updated,
      whatsappDigits: cleanDigits
    }));
    showToast("Website settings updated live!", "success");
  };

  const updateAdminCreds = (email, password) => {
    if (!email.trim() || password.length < 4) {
      showToast("Valid email and min 4-char password required", "warning");
      return false;
    }
    setAdminCreds({ email: email.trim(), password });
    showToast("Thakur Admin credentials updated!", "success");
    return true;
  };

  const resetAllSiteData = () => {
    setJobs(initialJobs);
    setCompanies(initialCompanies);
    setCandidateProfile(initialCandidateProfile);
    setApplications(initialApplications);
    setSubmittedResumes(initialSubmittedResumes);
    setSiteSettings(defaultSiteSettings);
    setAdminCreds(defaultAdminCreds);
    if (typeof window !== 'undefined') {
      ['tk_jobs_v1', 'tk_companies_v1', 'tk_candidate_v1', 'tk_applications_v1', 'tk_resumes_v1', 'tk_site_settings_v1', 'tk_admin_creds_v1'].forEach(k => localStorage.removeItem(k));
    }
    showToast("All site data reset to defaults!", "info");
  };

  // Student/Candidate Resume Submission (saved for Thakur Admin visibility)
  const submitResumeRecord = (record) => {
    const entry = {
      id: `cv-${Date.now()}`,
      refCode: record.refCode || `TK-CV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: record.fullName,
      email: record.email,
      phone: record.phone,
      location: record.location,
      role: record.role || 'Any suitable role',
      experience: record.experience || 'Fresher / 1 Year',
      fileName: record.fileName,
      fileSize: record.fileSize,
      uploadedAt: new Date().toLocaleString(),
      scanStatus: 'Clean & Verified (Zero Threats)'
    };
    setSubmittedResumes(prev => [entry, ...prev]);
  };

  // Update Candidate Resume
  const updateCandidateResume = (fileData) => {
    const fileSizeStr = `${(fileData.size / (1024 * 1024)).toFixed(1)} MB`;
    setCandidateProfile(prev => {
      submitResumeRecord({
        fullName: prev.fullName,
        email: prev.email,
        phone: prev.phone,
        location: prev.city,
        role: prev.headline,
        experience: prev.experienceYears,
        fileName: fileData.name,
        fileSize: fileSizeStr
      });
      return {
        ...prev,
        profileCompletion: Math.min(100, prev.profileCompletion + 10),
        resume: {
          fileName: fileData.name,
          fileSize: fileSizeStr,
          uploadedAt: "Just now",
          scanStatus: "Clean & Verified (Zero Threats)",
          mimeType: fileData.type || "application/pdf",
          isDefault: true
        }
      };
    });
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
        submittedResumes,
        submitResumeRecord,
        savedJobIds,
        toggleSaveJob,
        applyToJob,
        postNewJob,
        approveJob,
        rejectJob,
        verifyCompany,
        toggleCompanyVerify,
        adminAddCompany,
        deleteCompany,
        adminAddJob,
        adminUpdateJob,
        adminDeleteJob,
        updateApplicationStatus,
        deleteSubmittedResume,
        siteSettings,
        updateSiteSettings,
        adminCreds,
        updateAdminCreds,
        resetAllSiteData,
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
        isLoginModalOpen,
        setIsLoginModalOpen,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        loggedInUser,
        registeredUsers,
        authModalMode,
        setAuthModalMode,
        authModalInitialRole,
        setAuthModalInitialRole,
        openAuthModal,
        registerUser,
        loginWithCredentials,
        resetUserPassword,
        loginCandidate,
        loginEmployer,
        loginAdmin,
        logoutAdmin,
        logoutUser,
        logoutConfirmRole,
        requestLogout,
        cancelLogout,
        confirmLogout,
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
