'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { 
  DocumentTextIcon, 
  ArrowRightIcon, 
  ShieldCheckIcon,
  DocumentSearchIcon,
  DownloadIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  InformationCircleIcon
} from '../../components/Icons';
import { 
  BookOpen, 
  FileCheck, 
  HelpCircle, 
  Scale, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  Clock,
  Coins
} from 'lucide-react';

export default function GuidePage() {
  const { language, t } = useApp();
  const isHindi = language === 'hi';

  const steps = [
    {
      step: '01',
      titleEn: 'Identify the Public Authority & PIO',
      titleHi: 'लोक प्राधिकरण एवं जन सूचना अधिकारी (PIO) की पहचान',
      descEn: 'Determine which central or state department, ministry, or autonomous public body holds the records you are seeking.',
      descHi: 'पहचान करें कि आप जिस रिकॉर्ड की तलाश कर रहे हैं वह किस केंद्रीय या राज्य विभाग, मंत्रालय या स्वायत्त निकाय के पास है।',
      icon: UserIcon,
      badgeEn: 'Section 5(1)',
      badgeHi: 'धारा 5(1)'
    },
    {
      step: '02',
      titleEn: 'Draft Specific & Objective Questions',
      titleHi: 'सटीक एवं स्पष्ट प्रश्न तैयार करें',
      descEn: 'Ask for specific records, certified copies, orders, or files. Avoid asking for opinions, hypothetical scenarios, or explanations.',
      descHi: 'विशिष्ट रिकॉर्ड, प्रमाणित प्रतियां, आदेश या फाइलें मांगें। व्यक्तिगत राय, काल्पनिक प्रश्न या स्पष्टीकरण पूछने से बचें।',
      icon: DocumentTextIcon,
      badgeEn: 'Section 6(1)',
      badgeHi: 'धारा 6(1)'
    },
    {
      step: '03',
      titleEn: 'Pay Statutory Fee (₹10) or Claim BPL Exemption',
      titleHi: 'वैधानिक शुल्क (₹10) का भुगतान या BPL छूट',
      descEn: 'The statutory application fee is ₹10 per application. Citizens belonging to the Below Poverty Line (BPL) category are 100% exempt from all fees.',
      descHi: 'प्रत्येक आवेदन के लिए वैधानिक आवेदन शुल्क ₹10 है। गरीबी रेखा से नीचे (BPL) श्रेणी के नागरिक सभी शुल्कों से पूर्णतः मुक्त हैं।',
      icon: Coins,
      badgeEn: 'Section 7(5)',
      badgeHi: 'धारा 7(5)'
    },
    {
      step: '04',
      titleEn: 'Track 30-Day Statutory Resolution Timeline',
      titleHi: '30-दिवसीय वैधानिक समय-सीमा ट्रैक करें',
      descEn: 'Public Information Officers are legally mandated to furnish information within 30 days (or 48 hours if concerning life and liberty).',
      descHi: 'जन सूचना अधिकारियों के लिए 30 दिनों के भीतर (अथवा जीवन और स्वतंत्रता से संबंधित होने पर 48 घंटे में) जानकारी देना कानूनी रूप से अनिवार्य है।',
      icon: ClockIcon,
      badgeEn: 'Section 7(1)',
      badgeHi: 'धारा 7(1)'
    },
    {
      step: '05',
      titleEn: 'File First Appeal if Unsatisfied',
      titleHi: 'असंतोष होने पर प्रथम अपील (First Appeal) दर्ज करें',
      descEn: 'If no reply is received within 30 days or you receive an incomplete reply, file a First Appeal before the First Appellate Authority (FAA) within 30 days.',
      descHi: 'यदि 30 दिनों में उत्तर नहीं मिलता या अधूरा उत्तर मिलता है, तो 30 दिनों के भीतर प्रथम अपीलीय प्राधिकारी (FAA) के समक्ष प्रथम अपील दायर करें।',
      icon: Scale,
      badgeEn: 'Section 19(1)',
      badgeHi: 'धारा 19(1)'
    }
  ];

  const dosAndDonts = {
    dos: [
      isHindi ? 'विशिष्ट सरकारी अभिलेख, निविदाएं, आदेश या पत्राचार की प्रमाणित प्रति मांगें।' : 'Request specific public records, certified copies, work orders, or memos.',
      isHindi ? 'स्पष्ट, संक्षिप्त और विषय-केंद्रित भाषा का प्रयोग करें।' : 'Keep your questions concise, clear, and focused on verifiable facts.',
      isHindi ? 'ऑनलाइन स्थिति ट्रैकिंग हेतु अपना पंजीकरण नंबर सुरक्षित रखें।' : 'Keep your registration acknowledgement safe for status tracking.',
      isHindi ? 'BPL छूट का दावा करने पर मान्य राशन/BPL कार्ड नंबर अवश्य दें।' : 'Provide valid BPL card proof if claiming statutory fee exemption.'
    ],
    donts: [
      isHindi ? 'अधिकारी से निजी राय, "क्यों" या भविष्य के निर्णयों का कारण न पूछें।' : 'Do not ask for personal opinions, interpretations, or "why" questions.',
      isHindi ? 'एक ही आवेदन में कई असंबंधित मंत्रालयों की जानकारी न मांगें।' : 'Do not combine unrelated ministries or public bodies in a single application.',
      isHindi ? 'धारा 8 के तहत छूट प्राप्त राष्ट्रीय सुरक्षा से जुड़े गोपनीय दस्तावेज न मांगें।' : 'Do not request exempted information under Section 8 (National Security, etc.).'
    ]
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC]">
      {/* Full-Page Dotted Background */}
      <DottedWave />

      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            {t.submitRequest?.breadcrumbHome || 'Home'}
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <span className="font-semibold text-slate-800 shrink-0">
            {isHindi ? 'RTI मार्गदर्शिका' : 'RTI Guide'}
          </span>
        </div>

        {/* Header Hero Area */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto pt-2 pb-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/90 text-[#1a4bba] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{isHindi ? 'नागरिक मार्गदर्शिका - सूचना का अधिकार अधिनियम, 2005' : 'Citizen Handbook - RTI Act, 2005'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1C3F] tracking-tight mb-4">
            {isHindi ? 'RTI आवेदन कैसे करें: सम्पूर्ण मार्गदर्शिका' : 'How to File an RTI: Step-by-Step Guide'}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            {isHindi
              ? 'सूचना का अधिकार अधिनियम, 2005 के तहत सार्वजनिक जानकारी प्राप्त करने के लिए नियम, समय-सीमा, आवेदन शुल्क और अपीलीय प्रक्रिया को समझें।'
              : 'Learn how to exercise your legal right to information, draft effective RTI queries, understand statutory timelines, and file appeals.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/submit-request"
              className="bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <DocumentSearchIcon className="w-4 h-4 text-white" />
              <span>{isHindi ? 'ऑनलाइन RTI आवेदन दर्ज करें' : 'File an RTI Online'}</span>
            </Link>
            <a
              href="/rti_sample.pdf"
              download
              className="bg-white hover:bg-slate-50 text-[#0B1C3F] border border-gray-300 text-sm font-semibold px-5 py-2.5 rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4 text-[#2563EB]" />
              <span>{isHindi ? 'नमूना प्रारूप डाउनलोड करें (PDF)' : 'Download Sample Format (PDF)'}</span>
            </a>
          </div>
        </div>

        {/* 5-Step Process Header */}
        <div className="text-center pt-4 mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C3F] tracking-tight mb-2">
            {isHindi ? '5 सरल चरणों में RTI प्रक्रिया' : 'The 5-Step RTI Lifecycle'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {isHindi ? 'आवेदन से लेकर सूचना प्राप्ति तक की वैधानिक प्रक्रिया' : 'From submission to disclosure: how the statutory process works'}
          </p>
        </div>

        {/* 5 Steps */}
        <div className="flex flex-col gap-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-blue-200 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5"
              >
                <div className="flex items-center gap-4 sm:flex-col sm:items-center shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] font-extrabold text-base">
                    {item.step}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {isHindi ? item.badgeHi : item.badgeEn}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B1C3F]">
                      {isHindi ? item.titleHi : item.titleEn}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {isHindi ? item.descHi : item.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dos and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* DOs */}
          <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-6 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-base mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{isHindi ? 'क्या करें (Recommended Dos)' : 'Recommended Practices (Dos)'}</span>
            </div>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-emerald-950 font-normal">
              {dosAndDonts.dos.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DONTs */}
          <div className="bg-rose-50/50 border border-rose-200/80 rounded-xl p-6 shadow-2xs">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-base mb-4">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>{isHindi ? 'क्या न करें (Common Mistakes to Avoid)' : 'Common Mistakes (Don’ts)'}</span>
            </div>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-rose-950 font-normal">
              {dosAndDonts.donts.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5">✕</span>
                  <span className="leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sample Download Section */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                {isHindi ? 'आधिकारिक प्रारूप' : 'Official Templates'}
              </span>
              <h3 className="text-xl font-bold text-[#0B1C3F] mt-1 mb-2">
                {isHindi ? 'नमूना RTI आवेदन एवं अपील प्रारूप' : 'Download Sample RTI & Appeal Formats'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {isHindi
                  ? 'ऑफ़लाइन या ऑनलाइन आवेदन के लिए तैयार मानक फॉर्म प्रारूप डाउनलोड करें।'
                  : 'Download standard pre-formatted templates for drafting your RTI requests or appeals.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/rti_sample.pdf"
                download
                className="inline-flex items-center gap-2 bg-[#0B1C3F] hover:bg-[#152e60] text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>PDF Format</span>
              </a>
              <a
                href="/rti_sample.docx"
                download
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0B1C3F] border border-gray-300 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Word (.docx)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
