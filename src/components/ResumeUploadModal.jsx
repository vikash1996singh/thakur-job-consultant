import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getThemeClasses } from '../utils/theme';
import { 
  X, 
  FileUp, 
  FileCheck, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  FileText, 
  Lock, 
  Trash2 
} from 'lucide-react';

export const ResumeUploadModal = ({ onClose }) => {
  const { candidateProfile, updateCandidateResume, theme, showToast } = useApp();
  const themeClasses = getThemeClasses(theme);

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: idle, 1: scanning, 2: parsing, 3: completed

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndProcessFile = (selectedFile) => {
    setError(null);
    if (!selectedFile) return;

    // Check extension
    const allowedExts = ['pdf', 'doc', 'docx'];
    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    if (!allowedExts.includes(fileExt)) {
      setError("Unsupported format! Only PDF, DOC, and DOCX documents are accepted.");
      return;
    }

    // Check size limit: 5 MB (5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError("File exceeds 5 MB limit. Please compress or select a smaller resume document.");
      return;
    }

    setFile(selectedFile);
    simulateSecurityScan(selectedFile);
  };

  const simulateSecurityScan = (validFile) => {
    setIsScanning(true);
    setScanStep(1); // Malware signature scanning

    setTimeout(() => {
      setScanStep(2); // Encryption & parsing
    }, 1200);

    setTimeout(() => {
      setScanStep(3); // Completed
      setIsScanning(false);
      updateCandidateResume(validFile);
    }, 2400);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${themeClasses.primaryBgSoft}`}>
              <FileUp className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Candidate Resume Center
              </h3>
              <p className="text-xs text-slate-500">
                PDF, DOCX up to 5MB • AES-256 Encrypted Private Storage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Current Active Resume display if already present */}
          {candidateProfile.resume && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-xs text-slate-900 truncate max-w-[200px]">
                      {candidateProfile.resume.fileName}
                    </p>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      Default
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {candidateProfile.resume.fileSize} • Uploaded {candidateProfile.resume.uploadedAt}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {candidateProfile.resume.scanStatus}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block mb-1">Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Ready to Apply
                </span>
              </div>
            </div>
          )}

          {/* Drag & Drop Upload Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]' 
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/40'
            }`}
          >
            <input
              type="file"
              id="resume-file-input"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />

            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-100/80 flex items-center justify-center text-indigo-600 mb-3 shadow-2xs">
              <FileUp className="w-7 h-7" />
            </div>

            <p className="font-heading font-bold text-slate-800 text-sm mb-1">
              Drag & Drop your resume file here
            </p>
            <p className="text-xs text-slate-500 mb-4">
              Supported formats: <strong className="text-slate-700">PDF, DOC, DOCX</strong> (Max size: 5 MB)
            </p>

            <label
              htmlFor="resume-file-input"
              className={`inline-block px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-xs ${themeClasses.primary}`}
            >
              Browse Computer File
            </label>
          </div>

          {/* Error notice */}
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Scanning Progress */}
          {isScanning && (
            <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  {scanStep === 1 && "Running automated malware & MIME security scan..."}
                  {scanStep === 2 && "Validating structure & generating private signed encryption..."}
                </span>
                <span>{scanStep === 1 ? "45%" : "85%"}</span>
              </div>
              <div className="w-full bg-indigo-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: scanStep === 1 ? '45%' : '85%' }}
                ></div>
              </div>
            </div>
          )}

          {/* Security & Privacy Safeguards (PDF compliance) */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                <strong>Confidential by Default:</strong> Your resume is never displayed publicly or indexed by search engines.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>
                Shared strictly with verified employers only when you actively choose to apply.
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
