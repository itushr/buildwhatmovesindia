'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRightIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  DocumentTextIcon 
} from '../../components/Icons';
import { CheckCircle2, FileText, Info } from 'lucide-react';

export default function FirstAppealPage() {
  const { language, t } = useApp();
  const isHindi = language === 'hi';

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
            {isHindi ? 'प्रथम अपील (धारा 19)' : 'Statutory First Appeal (Section 19)'}
          </span>
        </div>

        {/* Header Hero Area with Generous Whitespace */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1C3F] tracking-tight mb-5 leading-tight">
            {isHindi ? 'प्रथम अपील आवेदन (धारा 19)' : 'Statutory First Appeal Application'}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            {isHindi
              ? 'RTI अधिनियम, 2005 की धारा 19(1) के अंतर्गत यदि 30 दिवसों में सूचना अप्राप्त हो अथवा प्राप्त उत्तर असंतोषजनक हो, तो प्रथम अपीलीय प्राधिकारी (FAA) के समक्ष निःशुल्क अपील प्रस्तुत करें।'
              : 'Submit a statutory first appeal before the First Appellate Authority (FAA) if information is withheld, delayed beyond 30 days, or incomplete under Section 19(1) of the RTI Act, 2005.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/submit-request"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{isHindi ? 'ऑनलाइन अपील प्रक्रिया प्रारंभ करें' : 'Initiate Statutory Appeal'}</span>
              <ArrowRightIcon className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>

        {/* Minimal, Subtle Information Container */}
        <div className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6 max-w-3xl mx-auto">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-extrabold text-[#0B1C3F] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#2563EB]" />
              <span>{isHindi ? 'प्रथम अपील संबंधी मुख्य प्रावधान (धारा 19)' : 'Key Provisions for Filing First Appeal (Section 19)'}</span>
            </h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RTI ACT, 2005</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-slate-700">
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="font-extrabold text-[#0B1C3F] block">1. Time Limit for Filing</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Must be filed within 30 days from the expiry of the prescribed response period or receipt of decision from CPIO.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="font-extrabold text-[#0B1C3F] block">2. Appeal Fee Exemption</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                No statutory application fee is required for filing First Appeals under Central RTI Rules.
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="font-extrabold text-[#0B1C3F] block">3. Statutory Disposal Period</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                The First Appellate Authority (FAA) shall dispose of the appeal within 30 days (extendable to 45 days for recorded reasons).
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
              <span className="font-extrabold text-[#0B1C3F] block">4. Order & Remedy</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Decisions issued by FAA are binding on CPIO. Further Second Appeal lies before Central Information Commission (CIC).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
