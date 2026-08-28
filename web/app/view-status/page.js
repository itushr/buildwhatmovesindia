'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { 
  SearchIcon, 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  ArrowRightIcon 
} from '../../components/Icons';
import { CheckCircle2, AlertCircle, FileText, Search } from 'lucide-react';

export default function ViewStatusPage() {
  const { language, t } = useApp();
  const isHindi = language === 'hi';

  const [regNo, setRegNo] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!regNo.trim()) return;
    setSearched(true);
    setResult({
      regNumber: regNo.toUpperCase().trim(),
      date: '12 Feb 2026',
      authority: 'Ministry of Housing and Urban Affairs',
      status: 'Under Active Processing by Nodal CPIO',
      timeline: [
        { title: 'Application Received & Registered under Section 6(1)', date: '12 Feb 2026', done: true },
        { title: 'Transferred / Assigned to Central Public Information Officer (CPIO)', date: '14 Feb 2026', done: true },
        { title: 'Verification of Public Records & Decision Processing', date: 'In Progress (Target: 14 Mar 2026)', done: false },
        { title: 'Final Statutory Communication & Information Disclosure (Section 7(1))', date: 'Pending (Within 30 Days)', done: false }
      ]
    });
  };

  return (
    <div className="w-full min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden bg-[#FAFAFC]">
      {/* Background Dotted Wave */}
      <DottedWave />

      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 relative z-10">
        {/* Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            {t.submitRequest?.breadcrumbHome || 'Home'}
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <span className="font-semibold text-slate-800 shrink-0">
            {isHindi ? 'आवेदन स्थिति ट्रैकिंग' : 'Track Application Status'}
          </span>
        </div>

        {/* Header Hero Area with Generous Whitespace */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1C3F] tracking-tight mb-4 leading-tight">
            {isHindi ? 'आवेदन एवं अपील स्थिति ट्रैकिंग' : 'Track Statutory Application Status'}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            {isHindi
              ? 'आवेदन या प्रथम अपील जमा करते समय प्राप्त आधिकारिक पंजीकरण संख्या दर्ज करें और 30-दिवसीय वैधानिक समय-सीमा की लाइव स्थिति देखें।'
              : 'Enter your official RTI registration or appeal acknowledgement number to monitor real-time statutory resolution progress under Section 7(1).'}
          </p>

          <form onSubmit={handleTrack} className="w-full max-w-2xl mx-auto bg-white border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-[#2563EB]/20 focus-within:border-[#2563EB] transition-all flex items-center p-2 shadow-xs">
            <Search className="w-5 h-5 text-slate-400 shrink-0 ml-3 mr-2" />
            <input
              type="text"
              required
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder={isHindi ? "पंजीकरण संख्या दर्ज करें (जैसे RTI2026MOHUA00892)" : "Enter Registration Number (e.g. RTI2026MOHUA00892)"}
              className="w-full text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent outline-none font-semibold uppercase tracking-wide"
            />
            <button
              type="submit"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-xs"
            >
              {isHindi ? 'स्थिति देखें' : 'Track Status'}
            </button>
          </form>
        </div>

        {/* Result Section - Minimal Subtle Container */}
        {searched && result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-9 shadow-xs max-w-3xl mx-auto space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                  REGISTRATION NUMBER
                </span>
                <h3 className="text-xl font-black text-[#0B1C3F] font-mono tracking-wider">
                  {result.regNumber}
                </h3>
              </div>
              <span className="px-3.5 py-1 rounded-md bg-blue-50 text-[#2563EB] border border-blue-200/90 text-xs font-extrabold uppercase tracking-wide">
                ● {result.status}
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-5">
              <h4 className="text-xs font-extrabold text-[#0B1C3F] uppercase tracking-wider">
                Statutory Progress Lifecycle (RTI Act Sec 7(1))
              </h4>

              <div className="flex flex-col gap-4">
                {result.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      step.done 
                        ? 'bg-emerald-100 text-emerald-700 font-bold' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {step.done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs sm:text-sm font-bold ${step.done ? 'text-[#0B1C3F]' : 'text-slate-500'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                        {step.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
