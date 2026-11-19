import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.png';
import { 
  X, 
  User, 
  Building2, 
  ArrowRight, 
  ArrowLeft,
  Lock, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  Sparkles,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export const LoginModal = ({ onClose }) => {
  const { 
    authModalMode = 'login',
    authModalInitialRole = 'candidate',
    registerUser,
    loginWithCredentials,
    resetUserPassword,
    siteSettings 
  } = useApp();

  // Mode: 'login' | 'register' | 'forgot-password'
  const [mode, setMode] = useState(authModalMode || 'login');

  // Role: 'candidate' | 'employer' | 'admin' (admin is only in login)
  const [selectedRole, setSelectedRole] = useState(authModalInitialRole || 'candidate');

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Form State
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regCompanyName, setRegCompanyName] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Forgot Password Flow State (Step 1: Email, Step 2: OTP + New Pass, Step 3: Success)
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('4829');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [otpSentNotice, setOtpSentNotice] = useState(false);

  // Error & Status State
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode and role if props/context change
  useEffect(() => {
    if (authModalMode) setMode(authModalMode);
    if (authModalInitialRole) setSelectedRole(authModalInitialRole);
  }, [authModalMode, authModalInitialRole]);

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setError(null);
    if (newMode === 'register' && selectedRole === 'admin') {
      setSelectedRole('candidate'); // Admin cannot register publicly
    }
    if (newMode === 'forgot-password') {
      setForgotStep(1);
      setForgotIdentifier(loginIdentifier || '');
      setForgotOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
      setOtpSentNotice(false);
    }
  };

  const handleRoleSwitch = (role) => {
    setSelectedRole(role);
    setError(null);
  };

  // Handle User Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!regFirstName.trim() || !regLastName.trim()) {
      setError('Please enter your First Name and Last Name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail.trim())) {
      setError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }

    const cleanMobile = regMobile.trim().replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Password and Confirm Password do not match. Please verify.');
      return;
    }

    setIsSubmitting(true);

    const result = registerUser({
      role: selectedRole,
      firstName: regFirstName.trim(),
      lastName: regLastName.trim(),
      email: regEmail.trim(),
      mobile: cleanMobile,
      password: regPassword,
      companyName: regCompanyName.trim()
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    onClose();
  };

  // Handle User Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setError('Please enter your Email and Password.');
      return;
    }

    setIsSubmitting(true);

    const result = loginWithCredentials(
      loginIdentifier.trim(), 
      loginPassword.trim(), 
      selectedRole
    );

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    onClose();
  };

  // Handle Forgot Password Step 1: Send OTP
  const handleSendResetCode = (e) => {
    e.preventDefault();
    setError(null);

    if (!forgotIdentifier.trim()) {
      setError('Please enter your registered Email Address or Mobile Number.');
      return;
    }

    // Generate random 4-digit demo code
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomCode);
    setOtpSentNotice(true);
    setForgotStep(2);
  };

  // Handle Forgot Password Step 2: Verify OTP and Set New Password
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!forgotOtp.trim()) {
      setError('Please enter the 4-digit verification code.');
      return;
    }

    if (forgotOtp.trim() !== generatedOtp && forgotOtp.trim() !== '1234') {
      setError(`Invalid verification code! Please use ${generatedOtp} or 1234.`);
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New Password and Confirm Password do not match.');
      return;
    }

    setIsSubmitting(true);

    const result = resetUserPassword(forgotIdentifier.trim(), newPassword);

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setForgotStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Header with Logo & Title */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-xl shadow-xs border border-slate-200 flex items-center justify-center shrink-0 min-w-8 min-h-8">
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
                className="h-8 w-auto object-contain max-h-8" 
              />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900 leading-tight">
                {mode === 'register' 
                  ? 'Register New Account' 
                  : mode === 'forgot-password'
                  ? 'Reset Your Password'
                  : 'Sign In to Portal'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Thakur Job Consultancy • Access Gateway
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Mode Tabs */}
        {mode !== 'forgot-password' ? (
          <div className="flex border-b border-slate-200 bg-slate-100/70 shrink-0">
            <button
              type="button"
              onClick={() => handleModeSwitch('login')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold text-center transition-all cursor-pointer border-b-2 ${
                mode === 'login'
                  ? 'border-sky-600 text-sky-800 bg-white shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Sign In / Login
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('register')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold text-center transition-all cursor-pointer border-b-2 ${
                mode === 'register'
                  ? 'border-sky-600 text-sky-800 bg-white shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Register New User
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 py-2.5 bg-slate-100/80 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => handleModeSwitch('login')}
              className="flex items-center gap-1.5 text-sky-700 hover:text-sky-900 font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
            <span className="text-[11px] text-slate-500">
              {forgotStep === 1 ? 'Step 1 of 2: Verification' : forgotStep === 2 ? 'Step 2 of 2: New Password' : 'Completed'}
            </span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 overscroll-contain">
          
          {/* Role Selector Tabs (Only in login and register) */}
          {mode !== 'forgot-password' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Select Your Role:
              </label>
              <div className={`grid gap-1.5 p-1 bg-slate-100 rounded-xl ${mode === 'login' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('candidate')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedRole === 'candidate'
                      ? 'bg-white text-sky-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Candidate (Job Seeker)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSwitch('employer')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedRole === 'employer'
                      ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Employer (Company)</span>
                </button>

                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleRoleSwitch('admin')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedRole === 'admin'
                        ? 'bg-purple-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Role Hint Badge (Only in login and register) */}
          {mode !== 'forgot-password' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50/70 border border-sky-100 text-[11px] text-sky-800">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>
                {selectedRole === 'candidate' 
                  ? 'Candidate: Explore verified job openings, upload your resume, and get interview alerts.'
                  : selectedRole === 'employer'
                  ? 'Employer: Post job requirements, view verified candidate resumes, and manage recruitment.'
                  : 'Thakur Admin: Access the administrative control console and manage site listings.'}
              </span>
            </div>
          )}

          {/* Error Message Box */}
          {error && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ======================= 1. LOGIN FORM ======================= */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              
              {/* Email Input */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={80}
                    placeholder="Enter your Email"
                    value={loginIdentifier}
                    onChange={(e) => {
                      setLoginIdentifier(e.target.value.slice(0, 80));
                      setError(null);
                    }}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Password Input with "Forgot Password?" Link */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-700">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('forgot-password')}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-800 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    maxLength={50}
                    placeholder="Enter your Password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value.slice(0, 50));
                      setError(null);
                    }}
                    className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    title={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    selectedRole === 'admin'
                      ? 'bg-purple-700 hover:bg-purple-800'
                      : selectedRole === 'employer'
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-[#0284c7] hover:bg-[#0369a1]'
                  }`}
                >
                  <span>
                    Continue to{' '}
                    {selectedRole === 'candidate'
                      ? 'Candidate Desk'
                      : selectedRole === 'employer'
                      ? 'Employer Portal'
                      : 'Thakur Admin Console'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Switch to Register */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-600">
                  New to Thakur Job Consultancy?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('register')}
                    className="font-bold text-sky-700 hover:underline cursor-pointer"
                  >
                    Register as Candidate or Employer
                  </button>
                </p>
              </div>

            </form>
          )}

          {/* ======================= 2. REGISTRATION FORM ======================= */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    First Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul"
                      value={regFirstName}
                      onChange={(e) => {
                        setRegFirstName(e.target.value);
                        setError(null);
                      }}
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                    />
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Verma"
                    value={regLastName}
                    onChange={(e) => {
                      setRegLastName(e.target.value);
                      setError(null);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Employer Optional: Company Name */}
              {selectedRole === 'employer' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Company / Organization Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tech Innovations India"
                      value={regCompanyName}
                      onChange={(e) => {
                        setRegCompanyName(e.target.value);
                        setError(null);
                      }}
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                    />
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                </div>
              )}

              {/* Email ID */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email ID *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your Email"
                    value={regEmail}
                    onChange={(e) => {
                      setRegEmail(e.target.value);
                      setError(null);
                    }}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number (e.g. 9876543210)"
                    value={regMobile}
                    onChange={(e) => {
                      setRegMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                      setError(null);
                    }}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="Enter your Password"
                      value={regPassword}
                      onChange={(e) => {
                        setRegPassword(e.target.value);
                        setError(null);
                      }}
                      className="w-full pl-8 pr-8 py-2 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showRegConfirmPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="Confirm your Password"
                      value={regConfirmPassword}
                      onChange={(e) => {
                        setRegConfirmPassword(e.target.value);
                        setError(null);
                      }}
                      className="w-full pl-8 pr-8 py-2 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                    />
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showRegConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    selectedRole === 'candidate'
                      ? 'bg-[#0284c7] hover:bg-[#0369a1]'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  <span>
                    Register & Continue as {selectedRole === 'candidate' ? 'Candidate' : 'Employer'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Switch to Login */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('login')}
                    className="font-bold text-sky-700 hover:underline cursor-pointer"
                  >
                    Sign In here
                  </button>
                </p>
              </div>

            </form>
          )}

          {/* ======================= 3. FORGOT PASSWORD FLOW ======================= */}
          {mode === 'forgot-password' && (
            <div className="space-y-4">
              
              {/* STEP 1: Enter Email / Mobile */}
              {forgotStep === 1 && (
                <form onSubmit={handleSendResetCode} className="space-y-3.5">
                  <div className="text-center space-y-1.5 py-1">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-xs">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading font-extrabold text-base text-slate-900">
                      Reset Password
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Enter your registered Email Address or Mobile Number. We'll send you a verification code to set a new password.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Registered Email or Mobile Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Enter your Email"
                        value={forgotIdentifier}
                        onChange={(e) => {
                          setForgotIdentifier(e.target.value);
                          setError(null);
                        }}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => handleModeSwitch('login')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Remember your password? Sign In
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Enter OTP & New Password */}
              {forgotStep === 2 && (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5">
                  <div className="text-center space-y-1 py-1">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading font-extrabold text-base text-slate-900">
                      Create New Password
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Verification code sent to <strong>{forgotIdentifier}</strong>.
                    </p>
                  </div>

                  {otpSentNotice && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Code sent! Use verification code: <strong>{generatedOtp}</strong></span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newCode = Math.floor(1000 + Math.random() * 9000).toString();
                          setGeneratedOtp(newCode);
                        }}
                        className="text-[11px] font-bold text-emerald-700 underline cursor-pointer"
                      >
                        Resend
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      4-Digit Verification Code (OTP) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder={`Enter OTP code (e.g. ${generatedOtp})`}
                      value={forgotOtp}
                      onChange={(e) => {
                        setForgotOtp(e.target.value.replace(/\D/g, ''));
                        setError(null);
                      }}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50 tracking-widest text-center font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          placeholder="Enter your Password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setError(null);
                          }}
                          className="w-full pl-8 pr-8 py-2 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                        />
                        <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Confirm New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmNewPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          placeholder="Confirm your Password"
                          value={confirmNewPassword}
                          onChange={(e) => {
                            setConfirmNewPassword(e.target.value);
                            setError(null);
                          }}
                          className="w-full pl-8 pr-8 py-2 rounded-lg border border-slate-200 focus:border-sky-500 text-xs sm:text-sm outline-none bg-slate-50/50"
                        />
                        <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Update & Set New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-800"
                    >
                      Change Email / Mobile Number
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Success Confirmation */}
              {forgotStep === 3 && (
                <div className="text-center space-y-4 py-4 animate-fadeIn">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading font-extrabold text-lg text-slate-900">
                      Password Reset Successfully!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto">
                      Your password for <strong>{forgotIdentifier}</strong> has been updated securely. You can now log in with your new password.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginIdentifier(forgotIdentifier);
                      setLoginPassword('');
                      handleModeSwitch('login');
                    }}
                    className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
