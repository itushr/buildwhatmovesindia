'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  SearchIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  InformationCircleIcon,
  DocumentSearchIcon,
  ArrowRightIcon,
  XIcon
} from './Icons';

export default function WorkflowSplashModal() {
  const { 
    isWorkflowModalOpen, 
    openWorkflowModal, 
    closeWorkflowModal, 
    t 
  } = useApp();
  const router = useRouter();

  // Automatically open modal once on initial visit in this session
  useEffect(() => {
    try {
      const hasSeenSession = sessionStorage.getItem('rti_has_seen_workflow_session');
      const hasPermanentlyDismissed = localStorage.getItem('rti_has_dismissed_workflow_splash');
      
      if (!hasSeenSession && !hasPermanentlyDismissed) {
        const timer = setTimeout(() => {
          openWorkflowModal();
          sessionStorage.setItem('rti_has_seen_workflow_session', 'true');
        }, 300);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      openWorkflowModal();
    }
  }, [openWorkflowModal]);

  const handleClose = useCallback(() => {
    closeWorkflowModal();
  }, [closeWorkflowModal]);

  const handleDontShowChange = (e) => {
    if (e.target.checked) {
      try {
        localStorage.setItem('rti_has_dismissed_workflow_splash', 'true');
      } catch (e) {}
    } else {
      try {
        localStorage.removeItem('rti_has_dismissed_workflow_splash');
      } catch (e) {}
    }
  };

  const handleSearchClick = () => {
    handleClose();
    if (typeof window !== 'undefined') {
      const searchInput = document.querySelector('input[aria-label="Search public information or file an RTI"]');
      if (searchInput) {
        searchInput.focus();
      }
    }
  };

  const handleFileRTIClick = () => {
    handleClose();
    router.push('/submit-request');
  };

  // Keyboard shortcut: close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isWorkflowModalOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWorkflowModalOpen, handleClose]);

  const strings = t.workflowSplash || {
    badge: "Citizen Guide",
    title: "How the Portal Works",
    subtitle: "Check public records for free first. Proceed to file an official RTI only if the information is not available in the public domain.",
    step1Title: "1. Search / Ask",
    step1Desc: "Search open databases and public authorities.",
    step2Title: "2. Public Records (₹0)",
    step2Desc: "Instant access to published records at zero fees.",
    step3Title: "3. File an RTI",
    step3Desc: "Submit an official request under the RTI Act, 2005.",
    getInformationBox: {
      title: "Available in Public Domain",
      tag: "₹0 • No RTI Application Needed",
      desc: "Information and records already disclosed in the public domain can be accessed immediately free of cost.",
      btn: "Search Records"
    },
    fileRTIBox: {
      title: "Not Available Online",
      tag: "Statutory 30-Day Resolution",
      desc: "If the required records are not available publicly, submit an official RTI application under Section 6(1).",
      btn: "File an RTI Application"
    },
    dontShowAgain: "Don't show this guide on startup",
    floatingBtn: "How the Portal Works",
    closeBtn: "Close Guide"
  };

  return (
    <>
      {/* Professional Floating Guide Button in Bottom-Right Corner */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={openWorkflowModal}
        className="fixed bottom-6 right-6 z-40 bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0B1C3F] border border-slate-300 shadow-md hover:shadow-lg shadow-slate-900/10 rounded-full px-4 py-2.5 flex items-center gap-2.5 text-xs font-bold tracking-wide transition-all cursor-pointer select-none group backdrop-blur-md"
        aria-label="Open Portal Workflow Guide"
      >
        <span className="w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-200 group-hover:bg-blue-100 transition-colors">
          <HelpCircle className="w-3.5 h-3.5" strokeWidth={2.2} />
        </span>
        <span>{strings.floatingBtn}</span>
      </motion.button>

      {/* Centered Modal Pop-Up Dialog */}
      <AnimatePresence>
        {isWorkflowModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1C3F]/50 backdrop-blur-xs overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="workflow-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0"
              aria-hidden="true"
            />

            {/* Modal Dialog Card (Strictly Matching Portal Geometry & Styling) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-blue-950/20 overflow-hidden my-auto p-6 sm:p-8 flex flex-col"
            >
              {/* Modal Top Bar: Subheading Label & Close Button */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {strings.badge}
                </span>

                <button
                  onClick={handleClose}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Heading & Subtitle */}
              <div className="text-left mb-6">
                <h2 id="workflow-modal-title" className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0B1C3F] tracking-tight mb-2">
                  {strings.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-2xl">
                  {strings.subtitle}
                </p>
              </div>

              {/* 3-Step Sequence Stepper (Exact Match with Homepage 'How It Works' Section) */}
              <div className="bg-slate-50 border border-gray-200/90 rounded-xl p-5 sm:p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-2">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center flex-1 max-w-[240px]">
                    <div className="w-14 h-14 rounded-full bg-[#edf4ff] border border-blue-100 flex items-center justify-center mb-3 text-[#0B1C3F] shadow-2xs">
                      <SearchIcon className="w-6 h-6 text-[#0B1C3F]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-sm font-bold text-[#0B1C3F] mb-1">
                      {strings.step1Title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {strings.step1Desc}
                    </p>
                  </div>

                  {/* Connector 1 -> 2 */}
                  <div className="hidden md:flex items-center justify-center flex-1 max-w-[100px] mt-6 text-slate-300">
                    <svg className="w-full h-5" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="4" y1="10" x2="86" y2="10" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 4" strokeLinecap="round" />
                      <path d="M82 5L89 10L82 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center flex-1 max-w-[240px]">
                    <div className="w-14 h-14 rounded-full bg-[#edf4ff] border border-blue-100 flex items-center justify-center mb-3 text-[#0B1C3F] shadow-2xs">
                      <DocumentTextIcon className="w-6 h-6 text-[#0B1C3F]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-sm font-bold text-[#0B1C3F] mb-1">
                      {strings.step2Title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {strings.step2Desc}
                    </p>
                  </div>

                  {/* Connector 2 -> 3 */}
                  <div className="hidden md:flex items-center justify-center flex-1 max-w-[100px] mt-6 text-slate-300">
                    <svg className="w-full h-5" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="4" y1="10" x2="86" y2="10" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 4" strokeLinecap="round" />
                      <path d="M82 5L89 10L82 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center flex-1 max-w-[240px]">
                    <div className="w-14 h-14 rounded-full bg-[#edf4ff] border border-blue-100 flex items-center justify-center mb-3 text-[#0B1C3F] shadow-2xs">
                      <DocumentCheckIcon className="w-6 h-6 text-[#0B1C3F]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-sm font-bold text-[#0B1C3F] mb-1">
                      {strings.step3Title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {strings.step3Desc}
                    </p>
                  </div>

                </div>
              </div>

              {/* Decision Section (Exact Match with Homepage 'Main Actions' Section) */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 mb-6 shadow-2xs relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
                  
                  {/* Left Pathway: Available in Public Domain (Green) */}
                  <div className="flex flex-col justify-between items-start text-left md:pr-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-green-50 border border-green-100 rounded-full text-green-700 shrink-0">
                          <InformationCircleIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-green-700">
                            {strings.getInformationBox.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-green-800 bg-green-100/80 px-2 py-0.5 rounded">
                            {strings.getInformationBox.tag}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed my-3">
                        {strings.getInformationBox.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSearchClick}
                      className="bg-[#0f6b3e] hover:bg-[#0c5933] text-white px-4 py-2 rounded-md font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer mt-2"
                    >
                      <span>{strings.getInformationBox.btn}</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Center Divider: 'or' */}
                  <div className="hidden md:flex items-center justify-center absolute left-1/2 top-0 bottom-0 -ml-[14px]">
                    <div className="w-px bg-gray-200 h-full"></div>
                    <div className="absolute bg-blue-50 text-blue-600 text-[11px] font-bold w-7 h-7 rounded-full flex items-center justify-center border border-blue-100">
                      {t.mainActions?.or || "or"}
                    </div>
                  </div>

                  {/* Right Pathway: Not Available Online (Blue) */}
                  <div className="flex flex-col justify-between items-start text-left md:pl-6 pt-6 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 shrink-0">
                          <DocumentSearchIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-blue-700">
                            {strings.fileRTIBox.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded">
                            {strings.fileRTIBox.tag}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed my-3">
                        {strings.fileRTIBox.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleFileRTIClick}
                      className="bg-[#1a4bba] hover:bg-[#153e9a] text-white px-4 py-2 rounded-md font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer mt-2"
                    >
                      <span>{strings.fileRTIBox.btn}</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-100">
                <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    onChange={handleDontShowChange}
                    className="rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] w-3.5 h-3.5 cursor-pointer"
                  />
                  <span>{strings.dontShowAgain}</span>
                </label>

                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded-md font-semibold text-xs transition-colors cursor-pointer"
                >
                  {strings.closeBtn}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
