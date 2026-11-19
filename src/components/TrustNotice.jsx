import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrustNotice = () => {
  const { siteSettings } = useApp();
  return (
    <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-900 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center p-1 bg-amber-200/60 rounded-full text-amber-800">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
          <p className="font-medium">
            <span className="font-bold">Official Security Notice:</span> {siteSettings.securityNotice}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-amber-800/80 hover:text-amber-950 font-semibold cursor-pointer underline">
            Report Suspicious Job
          </span>
        </div>
      </div>
    </div>
  );
};
