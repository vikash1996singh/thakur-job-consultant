import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CandidateHome } from './pages/CandidateHome';
import { JobSearchPage } from './pages/JobSearchPage';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { EmployerPortal } from './pages/EmployerPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { JobDetailsModal } from './components/JobDetailsModal';
import { ResumeUploadModal } from './components/ResumeUploadModal';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainLayout = () => {
  const { 
    activeTab, 
    selectedJobForModal, 
    setSelectedJobForModal, 
    isResumeModalOpen, 
    setIsResumeModalOpen,
    toast 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      
      {/* 🧭 Main Header & Navigation */}
      <Navbar />

      {/* 📄 Dynamic Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && <CandidateHome />}
        {activeTab === 'search' && <JobSearchPage />}
        {activeTab === 'dashboard' && <CandidateDashboard />}
        {activeTab === 'employer' && <EmployerPortal />}
        {activeTab === 'admin' && <AdminDashboard />}
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
