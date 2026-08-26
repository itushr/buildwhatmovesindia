'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import DottedWave from "../components/DottedWave";
import AnimatedSearchBar from "../components/AnimatedSearchBar";
import { Users, ClipboardCheck, Landmark, Clock, CheckCircle2, ArrowRight, Search, FileText } from "lucide-react";
import {
  SearchIcon,
  DocumentSearchIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  ArrowRightIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon
} from "../components/Icons";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { t } = useApp();
  const router = useRouter();

  return (
    <div className="flex flex-col w-full bg-[#f8fafc]">
      {/* Hero Section (Section 0) */}
      <section className="w-full min-h-[calc(100vh-96px)] pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-8 sm:pb-10 md:pb-12 px-4 md:px-8 text-center relative overflow-hidden flex flex-col justify-between items-center bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC]">
        {/* Background Dotted Wave Component */}
        <DottedWave />

        {/* Hero Main Content with Generous Vertical Whitespace */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full my-auto py-2 sm:py-4">
          <h1 className="text-[23px] min-[360px]:text-[26px] sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#0B1C3F] tracking-tight leading-[1.28] sm:leading-[1.18] mb-3.5 sm:mb-5 px-1">
            <span className="block">{t.hero.headingLine1}</span>
            <span className="block mt-1 sm:mt-2 text-[#2563EB]">{t.hero.headingLine2}</span>
          </h1>
          <p className="text-xs min-[360px]:text-sm sm:text-lg md:text-xl text-slate-600 font-medium mb-8 sm:mb-12 md:mb-14 max-w-2xl px-2">
            {t.hero.subtitle}
          </p>

          {/* Integrated Animated Search Bar */}
          <AnimatedSearchBar 
            onSearch={(query) => {
              if (query && query.trim()) {
                router.push(`/submit-request?query=${encodeURIComponent(query.trim())}`);
              }
            }}
            className="mb-4 sm:mb-8 md:mb-10" 
          />
        </div>

        {/* Stats Strip Container (Placed Inside Bottom of Hero Section) */}
        <div className="w-full max-w-6xl mx-auto relative z-10 mt-auto pt-6 sm:pt-10 mb-0 sm:mb-2">
          <div className="bg-white rounded-2xl shadow-xl shadow-blue-950/5 border border-gray-100/90 p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 sm:divide-gray-200">
              
              {/* Stat 1 */}
              <div className="flex flex-row items-center justify-start gap-4 py-3.5 sm:py-2 px-2 sm:px-4 md:px-6">
                <Users className="w-8 h-8 sm:w-9 sm:h-9 text-[#0D8A44] shrink-0" strokeWidth={1.8} />
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B1C3F] tracking-tight">12,15,072+</span>
                  <span className="text-xs sm:text-xs md:text-sm text-gray-500 font-semibold mt-0.5">{t.hero.stats.requestsReceived}</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-row items-center justify-start gap-4 py-3.5 sm:py-2 px-2 sm:px-4 md:px-6">
                <ClipboardCheck className="w-8 h-8 sm:w-9 sm:h-9 text-[#0D8A44] shrink-0" strokeWidth={1.8} />
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B1C3F] tracking-tight">99%</span>
                  <span className="text-xs sm:text-xs md:text-sm text-gray-500 font-semibold mt-0.5">{t.hero.stats.replyPercentage}</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-row items-center justify-start gap-4 py-3.5 sm:py-2 px-2 sm:px-4 md:px-6">
                <Landmark className="w-8 h-8 sm:w-9 sm:h-9 text-[#0D8A44] shrink-0" strokeWidth={1.8} />
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B1C3F] tracking-tight">28,289+</span>
                  <span className="text-xs sm:text-xs md:text-sm text-gray-500 font-semibold mt-0.5">{t.hero.stats.publicAuthorities}</span>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-row items-center justify-start gap-4 py-3.5 sm:py-2 px-2 sm:px-4 md:px-6">
                <Clock className="w-8 h-8 sm:w-9 sm:h-9 text-[#0D8A44] shrink-0" strokeWidth={1.8} />
                <div className="flex flex-col text-left">
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B1C3F] tracking-tight">24/7</span>
                  <span className="text-xs sm:text-xs md:text-sm text-gray-500 font-semibold mt-0.5">{t.hero.stats.onlinePortal}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 px-4 md:px-8 bg-white border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1C3F] tracking-tight mb-16">
            {t.howItWorks.heading}
          </h3>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-2 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1 max-w-[260px] group cursor-default">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC] border border-blue-200/80 flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <DottedWave variant="icon" />
                <SearchIcon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0B1C3F] relative z-10" strokeWidth={1.75} />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#0B1C3F] mb-2 flex items-center justify-center gap-1.5">
                <span>{t.howItWorks.step1Title}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-[210px]">
                {t.howItWorks.step1Desc}
              </p>
            </div>

            {/* Desktop Connector 1 -> 2 */}
            <div className="hidden md:flex items-center justify-center flex-1 max-w-[130px] lg:max-w-[170px] mt-11 text-slate-300">
              <svg className="w-full h-6" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="12" x2="124" y2="12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="5 5" strokeLinecap="round" />
                <path d="M120 6L127 12L120 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Mobile Vertical Connector 1 -> 2 */}
            <div className="flex md:hidden items-center justify-center my-1 text-slate-300">
              <svg className="w-6 h-10" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="4" x2="124" y2="30" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 4" strokeLinecap="round" />
                <path d="M6 24L12 31L18 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1 max-w-[260px] group cursor-default">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC] border border-blue-200/80 flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <DottedWave variant="icon" />
                <DocumentTextIcon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0B1C3F] relative z-10" strokeWidth={1.75} />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#0B1C3F] mb-2 flex items-center justify-center gap-1.5">
                <span>{t.howItWorks.step2Title}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-[210px]">
                {t.howItWorks.step2Desc}
              </p>
            </div>

            {/* Desktop Connector 2 -> 3 */}
            <div className="hidden md:flex items-center justify-center flex-1 max-w-[130px] lg:max-w-[170px] mt-11 text-slate-300">
              <svg className="w-full h-6" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="12" x2="124" y2="12" stroke="currentColor" strokeWidth="1.75" strokeDasharray="5 5" strokeLinecap="round" />
                <path d="M120 6L127 12L120 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Mobile Vertical Connector 2 -> 3 */}
            <div className="flex md:hidden items-center justify-center my-1 text-slate-300">
              <svg className="w-6 h-10" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="4" x2="124" y2="30" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 4" strokeLinecap="round" />
                <path d="M6 24L12 31L18 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1 max-w-[260px] group cursor-default">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC] border border-blue-200/80 flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 group-hover:border-blue-300 group-hover:shadow-md transition-all duration-300 relative overflow-hidden">
                <DottedWave variant="icon" />
                <DocumentCheckIcon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0B1C3F] relative z-10" strokeWidth={1.75} />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#0B1C3F] mb-2 flex items-center justify-center gap-1.5">
                <span>{t.howItWorks.step3Title}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-[210px]">
                {t.howItWorks.step3Desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Actions Section (Dual Decision Pathway) */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC] border-t border-slate-200/60 relative overflow-hidden">
        {/* Background Dotted Wave Component */}
        <DottedWave variant="section-feathered" />

        <div className="w-full max-w-6xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-blue-50/90 border border-blue-200/70 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <span>{t.mainActions.sectionBadge || "Citizen Access Pathways"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B1C3F] tracking-tight mb-3">
              {t.mainActions.heading || "Choose How You Want to Access Information"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              {t.mainActions.subtitle || "Search proactively published public records for free, or submit a formal statutory request under the RTI Act, 2005."}
            </p>
          </div>

          {/* Dual Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Card 1: Get Information (Emerald Theme) */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-2xl border border-emerald-200/80 hover:border-emerald-400/90 shadow-lg shadow-emerald-950/5 hover:shadow-xl hover:shadow-emerald-950/10 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full overflow-hidden">
              
              {/* Subtle ambient corner gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-100/50 via-emerald-50/20 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-300 group-hover:from-emerald-200/40" />

              <div className="relative z-10 flex flex-col flex-1">
                
                {/* Top Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 border border-emerald-200/80 text-emerald-800 shadow-2xs">
                    {t.mainActions.getInformation.badge}
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 tracking-wider">
                    SECTION 4 DISCLOSURES
                  </span>
                </div>

                {/* Header with Squircle Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/80 border border-emerald-200/90 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:border-emerald-300 transition-all duration-200">
                    <Search className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-700" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1C3F] tracking-tight group-hover:text-emerald-900 transition-colors">
                      {t.mainActions.getInformation.title}
                    </h3>
                    <span className="text-xs sm:text-sm font-medium text-emerald-700">
                      {t.mainActions.getInformation.subtitle}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6 min-h-[44px]">
                  {t.mainActions.getInformation.desc}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-2.5 mb-8 pt-4 border-t border-slate-100 mt-auto">
                  {(t.mainActions.getInformation.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" strokeWidth={2.5} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom CTA & Footnote */}
              <div className="relative z-10 pt-4 mt-auto border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  href="/get-information"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0D8A44] to-[#0B7339] hover:from-[#0B7339] hover:to-[#095C2E] shadow-md shadow-emerald-900/15 hover:shadow-lg hover:shadow-emerald-900/25 transition-all duration-200 cursor-pointer group/btn whitespace-nowrap shrink-0"
                >
                  <span>{t.mainActions.getInformation.btn}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
                <span className="text-[11px] text-slate-600 font-medium text-center sm:text-right">
                  {t.mainActions.getInformation.note}
                </span>
              </div>

            </div>

            {/* Card 2: File an RTI (Royal Blue Theme) */}
            <div className="group relative bg-white/95 backdrop-blur-sm rounded-2xl border border-blue-200/80 hover:border-blue-400/90 shadow-lg shadow-blue-950/5 hover:shadow-xl hover:shadow-blue-950/10 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full overflow-hidden">
              
              {/* Subtle ambient corner gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-100/50 via-blue-50/20 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-300 group-hover:from-blue-200/40" />

              <div className="relative z-10 flex flex-col flex-1">
                
                {/* Top Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 border border-blue-200/80 text-blue-800 shadow-2xs">
                    {t.mainActions.fileRTI.badge}
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 tracking-wider">
                    SECTION 6(1) FILING
                  </span>
                </div>

                {/* Header with Squircle Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/80 border border-blue-200/90 text-blue-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:border-blue-300 transition-all duration-200">
                    <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-blue-700" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1C3F] tracking-tight group-hover:text-blue-900 transition-colors">
                      {t.mainActions.fileRTI.title}
                    </h3>
                    <span className="text-xs sm:text-sm font-medium text-blue-700">
                      {t.mainActions.fileRTI.subtitle}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6 min-h-[44px]">
                  {t.mainActions.fileRTI.desc}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-2.5 mb-8 pt-4 border-t border-slate-100 mt-auto">
                  {(t.mainActions.fileRTI.features || []).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" strokeWidth={2.5} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom CTA & Footnote */}
              <div className="relative z-10 pt-4 mt-auto border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  href="/submit-request"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1A4BBA] to-[#153E9A] hover:from-[#153E9A] hover:to-[#0F2F75] shadow-md shadow-blue-900/15 hover:shadow-lg hover:shadow-blue-900/25 transition-all duration-200 cursor-pointer group/btn whitespace-nowrap shrink-0"
                >
                  <span>{t.mainActions.fileRTI.btn}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
                <span className="text-[11px] text-slate-600 font-medium text-center sm:text-right">
                  {t.mainActions.fileRTI.note}
                </span>
              </div>

            </div>

          </div>

          {/* Bottom Helpful Pro-Tip Banner */}
          {t.mainActions.tip && (
            <div className="mt-8 bg-blue-50/70 border border-blue-200/60 rounded-xl p-3.5 sm:p-4 text-center flex items-center justify-center gap-2.5 text-xs sm:text-sm text-slate-700">
              <span className="text-base">💡</span>
              <span className="font-medium">{t.mainActions.tip}</span>
            </div>
          )}

        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="w-full py-16 md:py-20 px-4 md:px-8 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          
          {/* Heading & Subtitle */}
          <div className="text-center mb-12 md:mb-14">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C3F] tracking-tight mb-2.5">
              {t.trust.heading}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              {t.trust.subtitle}
            </p>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Card 1: Data Security */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC] border border-blue-100/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
              <DottedWave variant="card" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-xs border border-blue-100/90 text-[#0B1C3F] flex items-center justify-center mb-5 shrink-0 shadow-xs group-hover:scale-105 group-hover:bg-white transition-all duration-200">
                  <ShieldCheckIcon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <h4 className="text-base font-bold text-[#0B1C3F] mb-2">
                  {t.trust.cards.security.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {t.trust.cards.security.desc}
                </p>
              </div>
            </div>

            {/* Card 2: Statutory Authority */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC] border border-blue-100/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
              <DottedWave variant="card" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-xs border border-blue-100/90 text-[#0B1C3F] flex items-center justify-center mb-5 shrink-0 shadow-xs group-hover:scale-105 group-hover:bg-white transition-all duration-200">
                  <ClipboardDocumentCheckIcon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <h4 className="text-base font-bold text-[#0B1C3F] mb-2">
                  {t.trust.cards.statutory.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {t.trust.cards.statutory.desc}
                </p>
              </div>
            </div>

            {/* Card 3: Time-Bound Resolution */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC] border border-blue-100/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
              <DottedWave variant="card" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-xs border border-blue-100/90 text-[#0B1C3F] flex items-center justify-center mb-5 shrink-0 shadow-xs group-hover:scale-105 group-hover:bg-white transition-all duration-200">
                  <ClockIcon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <h4 className="text-base font-bold text-[#0B1C3F] mb-2">
                  {t.trust.cards.timeBound.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {t.trust.cards.timeBound.desc}
                </p>
              </div>
            </div>

            {/* Card 4: Universal Accessibility */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC] border border-blue-100/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group">
              <DottedWave variant="card" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-xs border border-blue-100/90 text-[#0B1C3F] flex items-center justify-center mb-5 shrink-0 shadow-xs group-hover:scale-105 group-hover:bg-white transition-all duration-200">
                  <UserIcon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <h4 className="text-base font-bold text-[#0B1C3F] mb-2">
                  {t.trust.cards.accessibility.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {t.trust.cards.accessibility.desc}
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Hallmark Line */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium max-w-6xl mx-auto">
            <span>{t.trust.hallmarkLeft}</span>
            <span>{t.trust.hallmarkRight}</span>
          </div>

        </div>
      </section>
    </div>
  );
}
