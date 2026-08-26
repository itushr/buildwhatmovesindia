'use client';

import { notFound } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { 
  SearchIcon, 
  DocumentTextIcon, 
  ArrowRightIcon, 
  ShieldCheckIcon,
  InformationCircleIcon,
  DocumentSearchIcon,
  DownloadIcon,
  ChevronDownIcon
} from '../../components/Icons';
import { 
  Building2, 
  GraduationCap, 
  HeartPulse, 
  Truck, 
  FileCheck2, 
  ExternalLink,
  Filter,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', labelEn: 'All Public Records', labelHi: 'सभी सार्वजनिक अभिलेख', icon: FileCheck2 },
  { id: 'civic', labelEn: 'Civic & Municipal Works', labelHi: 'नागरिक एवं नगर निगम कार्य', icon: Building2 },
  { id: 'welfare', labelEn: 'Welfare Schemes (PMAY/PDS)', labelHi: 'कल्याणकारी योजनाएं (PMAY/PDS)', icon: HeartPulse },
  { id: 'education', labelEn: 'Education & Grants', labelHi: 'शिक्षा एवं अनुदान', icon: GraduationCap },
  { id: 'tenders', labelEn: 'Tenders & Procurement', labelHi: 'निविदाएं एवं खरीद', icon: FileSpreadsheet },
  { id: 'transport', labelEn: 'Highways & Transport', labelHi: 'राजमार्ग एवं परिवहन', icon: Truck },
];

const SAMPLE_RECORDS = [
  {
    id: 'rec-1',
    category: 'civic',
    titleEn: 'Municipal Ward Road Maintenance & Drainage Budget 2025-26',
    titleHi: 'नगर निगम वार्ड सड़क मरम्मत एवं नाली बजट 2025-26',
    authority: 'Ministry of Housing and Urban Affairs / MCD',
    authorityHi: 'आवासन और शहरी कार्य मंत्रालय / MCD',
    docType: 'PDF Document (420 KB)',
    updated: 'Updated: 15 Feb 2026',
    tags: ['Ward 12', 'Budget', 'Civic Works', '₹0 Free Access'],
    summaryEn: 'Proactively disclosed audit statement, contractor allocation, and expenditure breakdown for urban ward infrastructure.',
    summaryHi: 'शहरी वार्ड बुनियादी ढांचे के लिए ऑडिट विवरण, ठेकेदार आवंटन और व्यय का विवरण स्वतः प्रकटीकरण।'
  },
  {
    id: 'rec-2',
    category: 'welfare',
    titleEn: 'Pradhan Mantri Awas Yojana (Urban) Beneficiary Allocation Matrix',
    titleHi: 'प्रधानमंत्री आवास योजना (शहरी) लाभार्थी आवंटन सूची',
    authority: 'Ministry of Rural Development',
    authorityHi: 'ग्रामीण विकास मंत्रालय',
    docType: 'XLSX / PDF (1.2 MB)',
    updated: 'Updated: 20 Jan 2026',
    tags: ['PMAY', 'Direct Benefit', 'Sanction List'],
    summaryEn: 'State-wise sanction list and installment disbursement timeline for eligible housing scheme beneficiaries.',
    summaryHi: 'पात्र आवास योजना लाभार्थियों के लिए राज्यवार स्वीकृति सूची और किस्त वितरण की समय-सीमा।'
  },
  {
    id: 'rec-3',
    category: 'education',
    titleEn: 'UGC University Research Grant & Infrastructure Fund Allotments',
    titleHi: 'UGC विश्वविद्यालय अनुसंधान अनुदान एवं अवसंरचना कोष आवंटन',
    authority: 'University Grants Commission (UGC) / Ministry of Education',
    authorityHi: 'विश्वविद्यालय अनुदान आयोग (UGC) / शिक्षा मंत्रालय',
    docType: 'PDF Document (880 KB)',
    updated: 'Updated: 02 Feb 2026',
    tags: ['Higher Education', 'Grants', 'Research'],
    summaryEn: 'Annual institutional grant allocation breakdown under Section 4(1)(b) of RTI Act 2005.',
    summaryHi: 'RTI अधिनियम 2005 की धारा 4(1)(b) के तहत वार्षिक संस्थागत अनुदान आवंटन का ब्योरा।'
  },
  {
    id: 'rec-4',
    category: 'tenders',
    titleEn: 'National Highways Authority of India (NHAI) Public EPC Tender Awards',
    titleHi: 'भारतीय राष्ट्रीय राजमार्ग प्राधिकरण (NHAI) सार्वजनिक EPC निविदा आवंटन',
    authority: 'Ministry of Road Transport and Highways',
    authorityHi: 'सड़क परिवहन एवं राजमार्ग मंत्रालय',
    docType: 'PDF Document (650 KB)',
    updated: 'Updated: 10 Feb 2026',
    tags: ['Tenders', 'Contracts', 'EPC'],
    summaryEn: 'Disclosed procurement orders, technical evaluation scores, and successful bidder awards.',
    summaryHi: 'प्रकट किए गए खरीद आदेश, तकनीकी मूल्यांकन स्कोर और सफल बोलीदाताओं का विवरण।'
  },
  {
    id: 'rec-5',
    category: 'civic',
    titleEn: 'Clean India Mission (Swachh Bharat) Urban Sanitation Expenditure Report',
    titleHi: 'स्वच्छ भारत मिशन (शहरी) स्वच्छता व्यय रिपोर्ट',
    authority: 'Ministry of Jal Shakti',
    authorityHi: 'जल शक्ति मंत्रालय',
    docType: 'PDF Document (510 KB)',
    updated: 'Updated: 28 Jan 2026',
    tags: ['Sanitation', 'Swachh Bharat', 'Civic'],
    summaryEn: 'Quarterly utilization certificates and audit reports published for public inspection.',
    summaryHi: 'जनता के निरीक्षण के लिए प्रकाशित त्रैमासिक उपयोग प्रमाण पत्र और लेखा परीक्षा रिपोर्ट।'
  },
  {
    id: 'rec-6',
    category: 'transport',
    titleEn: 'Indian Railways Citizen Charter & Special Passenger Concession Guidelines',
    titleHi: 'भारतीय रेलवे नागरिक अधिकार पत्र एवं विशेष रियायत दिशा-निर्देश',
    authority: 'Ministry of Railways / Railway Board',
    authorityHi: 'रेल मंत्रालय / रेलवे बोर्ड',
    docType: 'PDF Document (340 KB)',
    updated: 'Updated: 05 Jan 2026',
    tags: ['Railways', 'Citizen Charter', 'Concession'],
    summaryEn: 'Proactive disclosure of train service standards, refund timelines, and passenger welfare norms.',
    summaryHi: 'ट्रेन सेवा मानकों, रिफंड समय-सीमा और यात्री कल्याण नियमों का स्वतः प्रकटीकरण।'
  }
];

export default function GetInformationPage() {
  // NOTE: Page temporarily disabled before pushing to remote repository.
  // To re-enable this page, remove or comment out the `notFound()` call below.
  notFound();

  const { language, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloadNotice, setDownloadNotice] = useState(null);

  const isHindi = language === 'hi';

  const filteredRecords = SAMPLE_RECORDS.filter(record => {
    const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch = 
      record.titleEn.toLowerCase().includes(query) ||
      record.titleHi.toLowerCase().includes(query) ||
      record.authority.toLowerCase().includes(query) ||
      record.authorityHi.toLowerCase().includes(query) ||
      record.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const handleDownload = (recordId) => {
    setDownloadNotice(recordId);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC]">
      {/* Full-Page Dotted Background */}
      <DottedWave />

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            {t.submitRequest?.breadcrumbHome || 'Home'}
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <span className="font-semibold text-slate-800 shrink-0">
            {isHindi ? 'सूचना प्राप्त करें' : 'Get Information'}
          </span>
        </div>

        {/* Header Hero Area */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto pt-2 pb-2">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 border border-green-200/90 text-green-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
            <span>{isHindi ? 'सार्वजनिक क्षेत्र में स्वतः उपलब्ध • ₹0 शुल्क' : 'Proactive Disclosures • ₹0 Zero Fee'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1C3F] tracking-tight mb-4">
            {isHindi ? 'सार्वजनिक रिकॉर्ड एवं सूचना खोजें' : 'Search Public Information & Records'}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
            {isHindi
              ? 'RTI अधिनियम, 2005 की धारा 4(1)(b) के तहत प्रकाशित सरकारी अभिलेख, निविदाएं, और योजना विवरण बिना किसी आवेदन या शुल्क के तुरंत देखें।'
              : 'Access proactively published government records, tenders, budgets, and beneficiary matrices under Section 4(1)(b) of the RTI Act, 2005 without filing an RTI.'}
          </p>

          {/* Search Box */}
          <div className="w-full max-w-2xl mx-auto relative shadow-md rounded-xl bg-white border border-gray-200/90 focus-within:ring-2 focus-within:ring-[#2563EB]/30 focus-within:border-[#2563EB] transition-all">
            <div className="flex items-center px-4 py-3 sm:py-3.5">
              <SearchIcon className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? 'दस्तावेज, विभाग, योजना या वार्ड नंबर खोजें...' : 'Search by topic, scheme, ministry, ward, or record name...'}
                className="w-full text-sm sm:text-base text-gray-800 placeholder-slate-400 bg-transparent outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer select-none ${
                  isSelected
                    ? 'bg-[#0B1C3F] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{isHindi ? cat.labelHi : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-semibold">
          <span>
            {isHindi 
              ? `${filteredRecords.length} सार्वजनिक अभिलेख उपलब्ध` 
              : `Showing ${filteredRecords.length} public records`}
          </span>
          <span className="text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-md text-xs font-bold">
            ✓ RTI Application Not Required (₹0)
          </span>
        </div>

        {/* Records Grid */}
        {filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredRecords.map((record) => (
              <div 
                key={record.id}
                className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Tags & Authority */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {isHindi ? record.authorityHi : record.authority}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {record.updated}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#0B1C3F] mb-2 leading-snug">
                    {isHindi ? record.titleHi : record.titleEn}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                    {isHindi ? record.summaryHi : record.summaryEn}
                  </p>

                  {/* Keyword Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {record.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {record.docType}
                  </span>
                  
                  <button
                    onClick={() => handleDownload(record.id)}
                    className="inline-flex items-center gap-1.5 bg-[#0f6b3e] hover:bg-[#0c5933] active:bg-[#094628] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <DownloadIcon className="w-3.5 h-3.5" />
                    <span>{downloadNotice === record.id ? (isHindi ? 'डाउनलोड हो रहा है...' : 'Downloading...') : (isHindi ? 'दस्तावेज देखें' : 'View Record')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center my-6 max-w-lg mx-auto">
            <InformationCircleIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0B1C3F] mb-2">
              {isHindi ? 'कोई सार्वजनिक अभिलेख नहीं मिला' : 'No Public Record Found'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              {isHindi
                ? 'यह जानकारी सार्वजनिक डोमेन में उपलब्ध नहीं है। आप सीधे संबंधित लोक प्राधिकरण को RTI आवेदन दर्ज कर सकते हैं।'
                : 'This specific information has not been proactively disclosed. You can file an official RTI request directly to the concerned Public Authority.'}
            </p>
            <Link
              href={`/submit-request?query=${encodeURIComponent(searchQuery)}`}
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-xs"
            >
              <DocumentSearchIcon className="w-4 h-4" />
              <span>{isHindi ? 'RTI आवेदन दर्ज करें' : 'Proceed to File RTI'}</span>
            </Link>
          </div>
        )}

        {/* Cannot find what you're looking for? Callout Banner */}
        <div className="bg-gradient-to-r from-[#0B1C3F] to-[#163366] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex flex-col text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center justify-center md:justify-start gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheckIcon className="w-4 h-4 text-blue-300" />
              <span>{isHindi ? 'वैधानिक RTI सेवा' : 'Statutory RTI Filing'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              {isHindi ? 'क्या आपको आवश्यक जानकारी नहीं मिली?' : "Didn't find the information you need?"}
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'यदि आवश्यक रिकॉर्ड सार्वजनिक रूप से उपलब्ध नहीं हैं, तो RTI अधिनियम 2005 की धारा 6(1) के तहत 30-दिवसीय समय-सीमा में वैधानिक जवाब प्राप्त करने हेतु नया आवेदन दर्ज करें।'
                : 'If the records are not in the public domain, submit a formal request under Section 6(1) of the RTI Act, 2005 to receive statutory answers within 30 days.'}
            </p>
          </div>

          <Link
            href="/submit-request"
            className="shrink-0 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <span>{isHindi ? 'नया RTI आवेदन करें' : 'File an RTI Application'}</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
