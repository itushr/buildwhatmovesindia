'use client';

import Link from 'next/link';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { ArrowRightIcon } from 'lucide-react';

export default function UserManualPage() {
  const { language, t } = useApp();
  const isHindi = language === 'hi';

  return (
    <div className="w-full min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC]">
      {/* Full-Page Dotted Background */}
      <DottedWave />

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            Home
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <span className="font-semibold text-slate-800 shrink-0">
            User Manual
          </span>
        </div>

        {/* Header Hero Area */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto pt-6 pb-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C3F] tracking-tight mb-4">
            {isHindi ? 'नागरिक एवं अधिकारी उपयोगकर्ता नियमावली' : 'Citizen & Officer User Manual'}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
            {isHindi 
              ? 'पोर्टल के विभिन्न मॉड्यूल्स, सर्च इंजन और भुगतान प्रणालियों की विस्तृत कार्यप्रणाली।'
              : 'Detailed walkthrough of the portal search systems, statutory filing forms, and receipt reconciliation.'}
          </p>

          <Link
            href="/guide"
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{isHindi ? 'RTI मार्गदर्शिका देखें' : 'View RTI Guide'}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
