'use client';

import Link from 'next/link';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { 
  DocumentSearchIcon,
  DownloadIcon
} from '../../components/Icons';

export default function GuidePage() {
  const { language, t } = useApp();
  const isHindi = language === 'hi';

  const steps = [
    {
      step: '01',
      titleEn: 'Identify the Public Authority & PIO',
      titleHi: 'लोक प्राधिकरण एवं PIO की पहचान',
      descEn: 'Determine which central or state department, ministry, or autonomous public body holds the records you are seeking.',
      descHi: 'पहचान करें कि आपके द्वारा मांगी गई जानकारी किस केंद्रीय या राज्य विभाग, मंत्रालय या स्वायत्त निकाय के पास है।',
      badgeEn: 'Section 5(1)',
      badgeHi: 'धारा 5(1)'
    },
    {
      step: '02',
      titleEn: 'Draft Specific & Objective Questions',
      titleHi: 'स्पष्ट एवं तथ्यपरक प्रश्न लिखें',
      descEn: 'Ask for specific records, certified copies, orders, or files. Avoid asking for opinions, hypothetical scenarios, or explanations.',
      descHi: 'विशिष्ट सरकारी रिकॉर्ड, प्रमाणित प्रतियां, आदेश या फाइलें मांगें। व्यक्तिगत राय, काल्पनिक परिदृश्यों या स्पष्टीकरण मांगने से बचें।',
      badgeEn: 'Section 6(1)',
      badgeHi: 'धारा 6(1)'
    },
    {
      step: '03',
      titleEn: 'Pay Statutory Fee (₹10) or Claim BPL Exemption',
      titleHi: 'वैधानिक शुल्क (₹10) या BPL छूट',
      descEn: 'The statutory application fee is ₹10 per application. Citizens belonging to the Below Poverty Line (BPL) category are 100% exempt from all fees.',
      descHi: 'आवेदन शुल्क मात्र ₹10 प्रति आवेदन है। गरीबी रेखा से नीचे (BPL) श्रेणी के नागरिकों को सभी शुल्कों से 100% छूट है।',
      badgeEn: 'Section 7(5)',
      badgeHi: 'धारा 7(5)'
    },
    {
      step: '04',
      titleEn: 'Track 30-Day Statutory Resolution Timeline',
      titleHi: '30-दिवसीय वैधानिक समय-सीमा',
      descEn: 'Public Information Officers are legally mandated to furnish information within 30 days (or 48 hours if concerning life and liberty).',
      descHi: 'जन सूचना अधिकारियों को 30 दिनों के भीतर (अथवा जीवन व स्वतंत्रता के मामले में 48 घंटे में) सूचना प्रदान करना कानूनी रूप से अनिवार्य है।',
      badgeEn: 'Section 7(1)',
      badgeHi: 'धारा 7(1)'
    },
    {
      step: '05',
      titleEn: 'File First Appeal if Unsatisfied',
      titleHi: 'असंतोष पर प्रथम अपील करें',
      descEn: 'If no reply is received within 30 days or you receive an incomplete reply, file a First Appeal before the First Appellate Authority (FAA) within 30 days.',
      descHi: 'यदि 30 दिनों में उत्तर न मिले या अपूर्ण उत्तर प्राप्त हो, तो 30 दिनों के भीतर प्रथम अपीलीय प्राधिकारी (FAA) के समक्ष प्रथम अपील दायर करें।',
      badgeEn: 'Section 19(1)',
      badgeHi: 'धारा 19(1)'
    }
  ];

  return (
    <div className="w-full min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden bg-[#FAFAFC]">
      {/* Background Texture */}
      <DottedWave />

      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 relative z-10">
        {/* Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-0.5 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            {t.submitRequest?.breadcrumbHome || 'Home'}
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <span className="font-semibold text-slate-800 shrink-0">
            {isHindi ? 'RTI मार्गदर्शिका' : 'RTI Guide'}
          </span>
        </div>

        {/* Header Hero Area with Generous Whitespace */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1C3F] tracking-tight mb-4 leading-tight">
            {isHindi ? 'वैधानिक RTI दाखिला प्रोटोकॉल' : 'Statutory RTI Filing Protocol'}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            {isHindi
              ? 'जानें कि कैसे अपने कानूनी सूचना के अधिकार का प्रयोग करें, प्रभावी RTI प्रश्न तैयार करें, वैधानिक समय-सीमा को समझें और अपील दायर करें।'
              : 'Learn how to exercise your legal right to information, draft effective RTI queries, understand statutory timelines, and file appeals.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/submit-request"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <DocumentSearchIcon className="w-4 h-4 text-white" />
              <span>{isHindi ? 'ऑनलाइन RTI आवेदन दर्ज करें' : 'File an RTI Online'}</span>
            </Link>
            <a
              href="/rti_sample.pdf"
              download
              className="bg-white hover:bg-slate-50 text-[#0B1C3F] border border-slate-200 text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4 text-[#2563EB]" />
              <span>{isHindi ? 'नमूना प्रारूप डाउनलोड करें (PDF)' : 'Download Sample Format (PDF)'}</span>
            </a>
          </div>
        </div>

        {/* 5-Step Process Header */}
        <div className="pt-2">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1C3F] mb-2">
              {isHindi ? '5 सरल चरणों में RTI प्रक्रिया' : 'The 5-Step RTI Lifecycle'}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {isHindi ? 'आवेदन से लेकर सूचना प्राप्ति तक की वैधानिक प्रक्रिया' : 'From submission to disclosure: how the statutory process works'}
            </p>
          </div>

          {/* 5 Steps */}
          <div className="flex flex-col gap-4">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100/80 rounded-xl p-4 sm:p-5 shadow-xs hover:border-blue-200 transition-all flex items-center gap-4 sm:gap-6"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#EFF6FF] border border-blue-50 flex items-center justify-center text-[#2563EB] font-extrabold text-base sm:text-lg">
                    {item.step}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] border border-blue-50/50">
                      {isHindi ? item.badgeHi : item.badgeEn}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B1C3F] truncate">
                      {isHindi ? item.titleHi : item.titleEn}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                    {isHindi ? item.descHi : item.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

