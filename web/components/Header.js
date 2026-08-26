'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, LogoIndia, UserIcon, GlobeIcon, AnimatedMenuIcon } from './Icons';
import { useApp } from '../context/AppContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, fontSize, setFontSize, t } = useApp();

  return (
    <header className="w-full bg-white border-b border-gray-200/80 sticky top-0 z-50 shadow-2xs">
      {/* Top Government Strip */}
      <div className="bg-[#06152B] w-full">
        <div className="max-w-[1536px] mx-auto text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 md:px-12 flex justify-between items-center">
          {/* Left Side: Flag & Government text */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <LogoIndia className="w-4 h-3 sm:w-5 sm:h-3.5 rounded-[1px] shrink-0" />
            <span className="font-semibold text-white tracking-wide">{t.header.govTextHi}</span>
            <span className="text-gray-400 font-light hidden min-[360px]:inline">|</span>
            <span className="text-gray-200 font-normal hidden min-[360px]:inline">{t.header.govTextEn}</span>
          </div>

          {/* Right Side: Accessibility options (A-, A, A+ functional font resize) */}
          <div className="flex items-center gap-2 sm:gap-4 text-gray-200 text-xs shrink-0">
            <div className="flex items-center gap-1 sm:gap-1.5 font-semibold select-none">
              <button 
                onClick={() => setFontSize(-1)} 
                className={`px-1.5 py-0.5 rounded text-xs transition-all cursor-pointer ${
                  fontSize === -1 
                    ? 'bg-white/25 text-white font-bold ring-1 ring-white/50 shadow-2xs' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`} 
                aria-label="Decrease text size"
                title="Decrease font size"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize(0)} 
                className={`px-1.5 py-0.5 rounded text-xs transition-all cursor-pointer ${
                  fontSize === 0 
                    ? 'bg-white/25 text-white font-bold ring-1 ring-white/50 shadow-2xs' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`} 
                aria-label="Normal text size"
                title="Reset font size"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize(1)} 
                className={`px-1.5 py-0.5 rounded text-xs transition-all cursor-pointer ${
                  fontSize === 1 
                    ? 'bg-white/25 text-white font-bold ring-1 ring-white/50 shadow-2xs' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`} 
                aria-label="Increase text size"
                title="Increase font size"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar - Content Shifted Slightly Downward */}
      <div className="px-3 sm:px-6 md:px-12 max-w-[1536px] mx-auto flex items-stretch justify-between gap-3 sm:gap-6 min-h-[64px] sm:min-h-[72px] relative">
        {/* Logo and Title - Vertically Centered */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink min-w-0 py-3 sm:py-3.5">
          <Image 
            src="/logo.png" 
            alt="State Emblem of India" 
            width={48} 
            height={70} 
            className="h-8 sm:h-10 md:h-11 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 my-auto" 
            priority 
          />
          <div className="flex flex-col min-w-0 justify-center my-auto">
            <h1 className="text-xs min-[360px]:text-sm sm:text-base md:text-lg font-extrabold text-[#0B1C3F] tracking-tight leading-tight truncate sm:whitespace-normal">
              {t.header.title}
            </h1>
            <p className="text-[9px] sm:text-xs text-gray-500 font-medium tracking-tight truncate hidden min-[480px]:block">
              {t.header.subtitle}
            </p>
          </div>
        </Link>

        {/* Right Side Controls (Language Toggle + Desktop Links + Hamburger Menu) */}
        <div className="flex items-stretch gap-2 sm:gap-3 lg:gap-6 shrink-0">
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-stretch gap-5 xl:gap-7 text-sm font-medium text-gray-700">
            <Link href="/" className="text-[#2563EB] font-semibold relative flex items-center h-full py-4 after:absolute after:bottom-0 after:-left-1 after:-right-1 after:h-[4.5px] after:bg-[#2563EB] after:rounded-t-md after:rounded-b-none">
              {t.header.nav.home}
            </Link>
            <Link href="#" className="hover:text-[#2563EB] flex items-center h-full py-4 transition-colors whitespace-nowrap">
              {t.header.nav.getInformation}
            </Link>
            <Link href="/submit-request" className="hover:text-[#2563EB] flex items-center h-full py-4 transition-colors whitespace-nowrap">
              {t.header.nav.fileRTI}
            </Link>
            <Link href="#" className="hover:text-[#2563EB] flex items-center h-full py-4 transition-colors whitespace-nowrap">
              {t.header.nav.guide}
            </Link>
            <Link href="#" className="hover:text-[#2563EB] flex items-center h-full py-4 transition-colors whitespace-nowrap">
              {t.header.nav.faqs}
            </Link>
            <Link href="#" className="hover:text-[#2563EB] flex items-center h-full py-4 transition-colors whitespace-nowrap">
              {t.header.nav.contact}
            </Link>
          </nav>

          {/* Radix UI Headless Accessible Language Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button 
                className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 border border-gray-300/80 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shadow-2xs cursor-pointer shrink-0 my-auto outline-none focus:ring-2 focus:ring-blue-500/40"
                aria-label="Select Language"
              >
                <GlobeIcon className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="text-xs font-bold">{t.header.langLabel}</span>
                <ChevronDownIcon className="w-3 h-3 text-gray-500 transition-transform duration-200" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content 
                className="mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 outline-none animate-in fade-in-80 zoom-in-95"
                sideOffset={4}
                align="end"
              >
                <DropdownMenu.Item
                  onClick={() => setLanguage('en')}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between cursor-pointer outline-none transition-colors ${
                    language === 'en' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <span className="text-xs font-bold">✓</span>}
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => setLanguage('hi')}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between cursor-pointer outline-none transition-colors ${
                    language === 'hi' ? 'bg-blue-50 text-[#2563EB] font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>हिन्दी</span>
                  {language === 'hi' && <span className="text-xs font-bold">✓</span>}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {/* Login CTA Button on Desktop */}
          <div className="hidden lg:block pl-3 border-l border-gray-200 my-auto">
            <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer whitespace-nowrap">
              <UserIcon className="w-4 h-4 text-white" />
              <span>{t.header.nav.login}</span>
            </button>
          </div>

          {/* Mobile Three-Line Menu Bar */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-700 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer my-auto flex items-center justify-center"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatedMenuIcon isOpen={isMobileMenuOpen} className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-gray-200/80 bg-white"
          >
            <div className="min-h-0 bg-white px-4 py-4 shadow-lg">
              <nav className="flex flex-col gap-1 text-sm font-medium text-gray-700">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md bg-blue-50 text-[#2563EB] font-semibold"
                >
                  {t.header.nav.home}
                </Link>
                <Link 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-[#2563EB]"
                >
                  {t.header.nav.getInformation}
                </Link>
                <Link 
                  href="/submit-request" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-[#2563EB]"
                >
                  {t.header.nav.fileRTI}
                </Link>
                <Link 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-[#2563EB]"
                >
                  {t.header.nav.guide}
                </Link>
                <Link 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-[#2563EB]"
                >
                  {t.header.nav.faqs}
                </Link>
                <Link 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-md hover:bg-gray-50 hover:text-[#2563EB]"
                >
                  {t.header.nav.contact}
                </Link>
              </nav>

              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer">
                  <UserIcon className="w-4 h-4 text-white" />
                  <span>{t.header.nav.login}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
