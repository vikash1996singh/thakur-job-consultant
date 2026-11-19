import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CandidateHome } from './pages/CandidateHome';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ContactPage } from './pages/ContactPage';
import { JobSearchPage } from './pages/JobSearchPage';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { EmployerPortal } from './pages/EmployerPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { JobDetailsModal } from './components/JobDetailsModal';
import { ResumeUploadModal } from './components/ResumeUploadModal';
import { LoginModal } from './components/LoginModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { CheckCircle2, AlertCircle, Info, Lock, LogOut } from 'lucide-react';

const MainLayout = () => {
  const { 
    currentRole,
    activeTab, 
    setActiveTab,
    setCurrentRole,
    logoutConfirmRole,
    cancelLogout,
    confirmLogout,
    selectedJobForModal, 
    setSelectedJobForModal, 
    isResumeModalOpen, 
    setIsResumeModalOpen,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isAdminAuthModalOpen,
    setIsAdminAuthModalOpen,
    isAdminAuthenticated,
    toast 
  } = useApp();

  // Scroll to top instantly when page changes (Multi-page feel without bottom-to-top scroll jumpiness)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab, currentRole]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      
      {/* 🧭 Unified Main Header & Navigation for Candidate, Employer & Admin */}
      <Navbar />

      {/* 📄 Dynamic Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && <CandidateHome />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'services' && <ServicesPage />}
        {activeTab === 'industries' && <IndustriesPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'search' && <JobSearchPage />}
        {activeTab === 'dashboard' && <CandidateDashboard />}
        {activeTab === 'employer' && <EmployerPortal />}
        {activeTab === 'admin' && (
          isAdminAuthenticated ? (
            <AdminDashboard />
          ) : (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-heading">
                Restricted Administrator Gateway
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                This administrative console is restricted to authorized personnel. Please sign in via Thakur Admin login.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsAdminAuthModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md transition-all cursor-pointer"
                >
                  Admin Key Login
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('candidate');
                    setActiveTab('home');
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* 📜 Official Footer */}
      <Footer />

      {/* 🔍 Job Details Modal */}
      {selectedJobForModal && (
        <JobDetailsModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
        />
      )}

      {/* 📁 Resume Upload & Malware Scan Modal */}
      {isResumeModalOpen && (
        <ResumeUploadModal
          onClose={() => setIsResumeModalOpen(false)}
        />
      )}

      {/* 👤 Login / Switch Desk Modal (Candidate & Employer only) */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}

      {/* 🔒 Secret Admin Authentication Modal */}
      {isAdminAuthModalOpen && (
        <AdminAuthModal
          onClose={() => setIsAdminAuthModalOpen(false)}
        />
      )}

      {/* ⚠️ Logout Confirmation Alert Box (Yes / No) */}
      {logoutConfirmRole && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-5 text-center">
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <LogOut className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-slate-900">
                  Confirm Logout
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {logoutConfirmRole === 'admin'
                    ? 'Thakur Admin Session'
                    : logoutConfirmRole === 'employer'
                    ? 'Employer Portal Session'
                    : 'Candidate Account Session'}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Are you sure you want to log out of your{' '}
              <strong>
                {logoutConfirmRole === 'admin'
                  ? 'Thakur Admin'
                  : logoutConfirmRole === 'employer'
                  ? 'Employer'
                  : 'Candidate'}
              </strong>{' '}
              account?
            </p>

            <div className="flex items-center justify-between gap-8 pt-2">
              <button
                type="button"
                onClick={cancelLogout}
                className="min-w-[110px] px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-800 text-white shadow-sm cursor-pointer transition-colors"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="min-w-[110px] px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm cursor-pointer transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔔 Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl bg-slate-900 text-white text-xs font-semibold animate-slideUp border border-slate-700">
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
