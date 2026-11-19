import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle,
  Building2,
  AlertCircle
} from 'lucide-react';

export const ContactPage = () => {
  const { setActiveTab, showToast, setIsResumeModalOpen, siteSettings } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('candidate');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Please fill in required fields (Name, Phone, Message)', 'warning');
      return;
    }
    if (name.trim().length > 60) {
      showToast('Full name cannot exceed 60 characters', 'warning');
      return;
    }
    if (phone.trim().length !== 10) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }
    if (email && email.trim().length > 80) {
      showToast('Email address cannot exceed 80 characters', 'warning');
      return;
    }
    if (message.trim().length > 1000) {
      showToast('Message cannot exceed 1000 characters', 'warning');
      return;
    }

    setSubmitted(true);
    showToast('Inquiry sent successfully! Our team will contact you within 24 hours.', 'success');
  };

  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      
      {/* 🧭 Header Banner */}
      <section className="bg-[#0B1528] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button 
              onClick={() => setActiveTab('home')}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Contact Us</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Contact & Office Locations
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Have questions about live job vacancies, candidate recruitment, or employer staffing partnerships? Reach out to our team directly.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs pt-2 text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: <strong>{siteSettings.whatsappNumber}</strong></span>
            </div>
          </div>

        </div>
      </section>

      {/* 📞 Contact Grid & Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Direct Communication
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                Registered Offices & Desks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Feel free to visit our corporate office or connect via phone and email.
              </p>
            </div>

            {/* Head Office Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Head Office (Noida)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {siteSettings.officeAddress}
              </p>
              <p className="text-[11px] text-slate-400">
                Nearest Metro: Noida Electronic City (Blue Line)
              </p>
            </div>

            {/* Regional Branches */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Regional Partner Hubs
              </h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <strong className="text-slate-800">New Delhi:</strong> Barakhamba Road, Connaught Place, New Delhi - 110001
                </div>
                <div>
                  <strong className="text-slate-800">Gurugram:</strong> DLF Cyber City, Phase 2, Gurugram, Haryana - 122002
                </div>
              </div>
            </div>

            {/* Helpline Timings Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">
                Support Hours
              </h3>
              <p className="text-xs text-slate-600">
                <strong>Monday to Saturday:</strong> 9:30 AM to 6:30 PM IST <br />
                <strong>Sunday:</strong> Closed (Online CV submissions remain active 24/7)
              </p>
            </div>

            {/* Zero Charge Guarantee Card */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Notice to Job Seekers:</strong> Thakur Job Consultant provides 100% free placement services. Never pay any fee or deposit to anyone claiming to represent our company.
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Send an Inquiry
              </span>
              <h3 className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                How Can We Help You?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the form below and an authorized recruitment consultant will contact you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-lg text-emerald-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you for reaching out. Your message has been routed to our recruitment desk. Our executive will connect with you shortly.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Inquiry Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    I am inquiring as:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInquiryType('candidate')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        inquiryType === 'candidate'
                          ? 'bg-sky-50 text-sky-700 border-sky-400 shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Job Seeker / Candidate
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('employer')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        inquiryType === 'employer'
                          ? 'bg-sky-50 text-sky-700 border-sky-400 shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Corporate Employer
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name * <span className="text-[11px] font-normal text-slate-400">(Max 60 characters)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 60))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs sm:text-sm text-slate-800 bg-slate-50/50"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-[11px] font-normal text-slate-400">(Max 80 characters)</span>
                    </label>
                    <input
                      type="email"
                      maxLength={80}
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.slice(0, 80))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs sm:text-sm text-slate-800 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / WhatsApp Number * <span className="text-[11px] font-normal text-slate-400">(10 digits)</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs sm:text-sm text-slate-800 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Your Message / Requirement *
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {message.length}/1000 characters
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={1000}
                    placeholder={
                      inquiryType === 'candidate'
                        ? 'Describe the role you are looking for, current experience, or job query...'
                        : 'Describe your hiring requirements, vacancies to fill, or candidate specifications...'
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs sm:text-sm text-slate-800 bg-slate-50/50 resize-none"
                  ></textarea>
                </div>

                {/* Action button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>

                  {inquiryType === 'candidate' && (
                    <button
                      type="button"
                      onClick={() => setIsResumeModalOpen(true)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-800 underline cursor-pointer"
                    >
                      Or Upload Your CV Directly →
                    </button>
                  )}
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
