'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import DottedWave from "../components/DottedWave";
import AnimatedSearchBar from "../components/AnimatedSearchBar";
import { Users, ClipboardCheck, Landmark, Clock } from "lucide-react";
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
      <section className="w-full min-h-[calc(100vh-120px)] pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-20 px-4 md:px-8 text-center relative overflow-hidden flex flex-col justify-between items-center bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC]">
        {/* Background Dotted Wave Component */}
        <DottedWave />

        {/* Hero Main Content with Generous Vertical Whitespace */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full my-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-extrabold text-[#0B1C3F] tracking-tight leading-[1.18] mb-5">
            {t.hero.headingLine1}<br />
            {t.hero.headingLine2}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium mb-12 md:mb-14 max-w-2xl">
            {t.hero.subtitle}
          </p>

          {/* Integrated Animated Search Bar */}
          <AnimatedSearchBar 
            onSearch={(query) => {
              if (query && query.trim()) {
                router.push(`/submit-request?query=${encodeURIComponent(query.trim())}`);
              }
            }}
            className="mb-6 sm:mb-10 md:mb-12" 
          />
        </div>

        {/* Stats Strip Container (Placed Inside Bottom of Hero Section) */}
        <div className="w-full max-w-6xl mx-auto relative z-10 mt-16 sm:mt-20 md:mt-24 mb-2 sm:mb-4">
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
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#edf4ff] border border-blue-100 flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 group-hover:bg-[#e4efff] group-hover:shadow-md transition-all duration-300">
                <SearchIcon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0B1C3F]" strokeWidth={1.75} />
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
                <line x1="12" y1="4" x2="12" y2="30" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 4" strokeLinecap="round" />
                <path d="M6 24L12 31L18 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1 max-w-[260px] group cursor-default">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#edf4ff] border border-blue-100 flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 group-hover:bg-[#e4efff] group-hover:shadow-md transition-all duration-300">
                <DocumentTextIcon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0B1C3F]" strokeWidth={1.75} />
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
                <line x1="12" y1="4" x2="12" y2="30" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 4" strokeLinecap="round" />
                <path d="M6 24L12 31L18 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1 max-w-[260px] group cursor-default">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#edf4ff] border border-blue-100 flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 group-hover:bg-[#e4efff] group-hover:shadow-md transition-all duration-300">
                <DocumentCheckIcon className="w-10 h-10 sm:w-11 sm:h-11 text-[#0B1C3F]" strokeWidth={1.75} />
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

      {/* Main Actions Section */}
      <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-[#f8fafc] border-t border-slate-200/60 flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 justify-between relative z-10">
            
            {/* Get Information */}
            <div className="flex-1 flex flex-col sm:flex-row gap-6 items-center pr-0 md:pr-12">
              <div className="p-5 bg-green-50 border border-green-100 rounded-full text-green-700 shrink-0">
                <InformationCircleIcon className="w-10 h-10" />
              </div>
              <div className="flex flex-col items-start text-left">
                <h4 className="text-2xl font-bold text-green-700 mb-3">{t.mainActions.getInformation.title}</h4>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {t.mainActions.getInformation.desc}
                </p>
                <Link href="#" className="bg-[#0f6b3e] hover:bg-[#0c5933] text-white px-6 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors">
                  {t.mainActions.getInformation.btn} <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Or Divider */}
            <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 top-0 bottom-0 -ml-[20px]">
              <div className="w-px bg-gray-200 flex-1"></div>
              <div className="bg-blue-50 text-blue-600 text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center border border-blue-100 my-2 z-10">{t.mainActions.or}</div>
              <div className="w-px bg-gray-200 flex-1"></div>
            </div>

            {/* Mobile Divider */}
            <div className="flex md:hidden items-center justify-center w-full my-4">
              <div className="h-px bg-gray-200 flex-1"></div>
              <div className="bg-blue-50 text-blue-600 text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center border border-blue-100 mx-4 z-10">{t.mainActions.or}</div>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* File an RTI */}
            <div className="flex-1 flex flex-col sm:flex-row gap-6 items-center pl-0 md:pl-12">
              <div className="p-5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 shrink-0">
                <DocumentSearchIcon className="w-10 h-10" />
              </div>
              <div className="flex flex-col items-start text-left">
                <h4 className="text-2xl font-bold text-blue-700 mb-3">{t.mainActions.fileRTI.title}</h4>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {t.mainActions.fileRTI.desc}
                </p>
                <Link href="/submit-request" className="bg-[#1a4bba] hover:bg-[#153e9a] text-white px-6 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors">
                  {t.mainActions.fileRTI.btn} <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
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
            <div className="bg-slate-50/50 border border-slate-200/90 rounded-xl p-6 hover:border-slate-300 hover:bg-white transition-colors duration-200 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-white border border-slate-200/90 text-[#0B1C3F] flex items-center justify-center mb-5 shrink-0 shadow-2xs">
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
            <div className="bg-slate-50/50 border border-slate-200/90 rounded-xl p-6 hover:border-slate-300 hover:bg-white transition-colors duration-200 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-white border border-slate-200/90 text-[#0B1C3F] flex items-center justify-center mb-5 shrink-0 shadow-2xs">
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
            <div className="bg-slate-50/50 border border-slate-200/90 rounded-xl p-6 hover:border-slate-300 hover:bg-white transition-colors duration-200 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-white border border-slate-200/90 text-[#0B1C3F] flex items-center justify-center mb-5 shrink-0 shadow-2xs">
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
            <div className="bg-slate-50/50 border border-slate-200/90 rounded-xl p-6 hover:border-slate-300 hover:bg-white transition-colors duration-200 flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-white border border-slate-200/90 text-[#0B1C3F] flex items-center justify-center mb-5 shrink-0 shadow-2xs">
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
