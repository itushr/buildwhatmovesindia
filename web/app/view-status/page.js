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
      status: 'Under Active Review by CPIO',
      timeline: [
        { title: 'Application Received & Acknowledged', date: '12 Feb 2026', done: true },
        { title: 'Assigned to Nodal Public Information Officer (CPIO)', date: '14 Feb 2026', done: true },
        { title: 'Records Verification in Progress', date: 'In Progress (Target: 14 Mar 2026)', done: false },
        { title: 'Final Statutory Decision & Information Disclosure', date: 'Pending (Within 30 Days)', done: false }
      ]
    });
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC]">
      {/* Full-Page Dotted Background */}
      <DottedWave />

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            {t.submitRequest?.breadcrumbHome || 'Home'}
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <span className="font-semibold text-slate-800 shrink-0">
            {isHindi ? 'स्थिति ट्रैक करें' : 'Track Status'}
          </span>
        </div>

        {/* Header Hero Area */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto pt-2 pb-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1C3F] tracking-tight mb-4">
            {isHindi ? 'अपने RTI आवेदन की स्थिति ट्रैक करें' : 'Track Your RTI Request Status'}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
            {isHindi
              ? 'आवेदन जमा करते समय प्राप्त पंजीकरण संख्या दर्ज करें और 30-दिवसीय समय-सीमा की लाइव प्रगति देखें।'
              : 'Enter your RTI registration acknowledgement number to monitor real-time statutory resolution progress.'}
          </p>

          <form onSubmit={handleTrack} className="w-full max-w-xl mx-auto shadow-md rounded-xl bg-white border border-gray-200/90 focus-within:ring-2 focus-within:ring-[#2563EB]/30 focus-within:border-[#2563EB] transition-all flex items-center p-1.5">
            <Search className="w-5 h-5 text-slate-400 shrink-0 ml-3 mr-2" />
            <input
              type="text"
              required
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="e.g. RTI2026MOHUA00892"
              className="w-full text-xs sm:text-sm text-gray-800 placeholder-slate-400 bg-transparent outline-none font-semibold uppercase"
            />
            <button
              type="submit"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              {isHindi ? 'ट्रैक करें' : 'Track Status'}
            </button>
          </form>
        </div>

        {/* Result Section */}
        {searched && result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs max-w-3xl mx-auto"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Registration Number
                </span>
                <h3 className="text-lg font-extrabold text-[#0B1C3F]">
                  {result.regNumber}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                ● {result.status}
              </span>
            </div>

            {/* Timeline */}
            <div className="mt-6 flex flex-col gap-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Statutory Progress Lifecycle
              </h4>

              <div className="flex flex-col gap-4">
                {result.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      step.done 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}>
                      {step.done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs sm:text-sm font-bold ${step.done ? 'text-[#0B1C3F]' : 'text-slate-500'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
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
