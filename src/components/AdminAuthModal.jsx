import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const AdminAuthModal = ({ onClose }) => {
  const { loginAdmin, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter administrator ID / email.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter administrator security key.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = loginAdmin(email.trim(), password.trim());
      setIsLoading(false);

      if (success) {
        showToast('Authorized: Welcome to Thakur Admin Console', 'success');
        onClose();
      } else {
        setError('Access Denied: Invalid administrator credentials or security key.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-700/80 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                <span>Internal Staff Gateway</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700">
                  RESTRICTED
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Thakur Job Consultant • Core Administrator Access
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Alert Banner */}
        <div className="px-6 py-3 bg-purple-950/40 border-b border-purple-900/30 flex items-center gap-2.5 text-xs text-purple-200">
          <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
          <span>This portal is hidden from public view and reserved for system admins.</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Authorized Admin ID / Email
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={80}
                placeholder="admin@thakurconsultancy.in"
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 80))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:border-purple-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Security Master Key / Passcode</span>
              <span className="text-[10px] text-slate-400 font-normal">Default: admin@123</span>
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={50}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value.slice(0, 50))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:border-purple-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Unlock Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Discreet Help Note */}
          <div className="pt-3 border-t border-slate-800 text-center text-[11px] text-slate-500 space-y-1">
            <p>Admin Shortcut: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Ctrl + Shift + A</kbd> anywhere</p>
            <p>Or open with <code className="text-purple-400">?admin=true</code> in URL</p>
          </div>

        </form>

      </div>
    </div>
  );
};
