'use client';

import Link from 'next/link';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { ArrowRightIcon, ShieldCheck } from 'lucide-react';

export default function PaymentReconciliationPage() {
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
            {isHindi ? 'शुल्क भुगतान समाधान' : 'Statutory Fee Reconciliation'}
          </span>
        </div>

        {/* Header Hero Area with Generous Whitespace */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1C3F] tracking-tight mb-4 leading-tight">
            {isHindi ? 'वैधानिक आवेदन शुल्क समाधान एवं सत्यापन' : 'Statutory Fee Payment Reconciliation'}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            {isHindi 
              ? 'यदि आपका ₹10.00 का वैधानिक आवेदन शुल्क कट गया है परंतु रसीद उत्पन्न नहीं हुई है, तो बैंक गेटवे एवं नोडल कोषागार द्वारा 15 मिनट के भीतर स्वचालित रूप से समाधान कर दिया जाता है।'
              : 'Official electronic gateway reconciliation system for verifying statutory application fee payments and receipt generation under RTI Treasury Rules.'}
          </p>

          <Link
            href="/submit-request"
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{isHindi ? 'नया आवेदन प्रस्तुत करें' : 'Submit New Application'}</span>
            <ArrowRightIcon className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
