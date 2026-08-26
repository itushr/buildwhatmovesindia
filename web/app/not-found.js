'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import DottedWave from '../components/DottedWave';
import { ArrowRightIcon, DocumentSearchIcon } from '../components/Icons';
import { useApp } from '../context/AppContext';

export default function NotFound() {
  const { t } = useApp() || {};

  const content = t?.notFound || {
    code: '404',
    title: 'Page Not Found',
    description: "The page you are looking for doesn't exist or has been moved.",
    buttonText: 'Go to Home',
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-96px)] py-12 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC] select-none">
      {/* Background Dotted Wave Component matching Hero Section */}
      <DottedWave />

      {/* Main Content Card Container with subtle entrance */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto my-auto"
      >
        {/* Large Subtle 404 Heading */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-[#0B1C3F] tracking-tight leading-none mb-3">
          {content.code}
        </h1>

        {/* Page Not Found Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1C3F] tracking-tight mb-3">
          {content.title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-600 font-normal max-w-md mx-auto leading-relaxed mb-7">
          {content.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#0B1C3F] hover:bg-[#152e60] active:bg-[#071329] text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-xs hover:shadow-md active:scale-98 transition-all duration-200 cursor-pointer"
          >
            {content.buttonText}
          </Link>
          <Link
            href="/submit-request"
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-[#2563EB] border border-gray-200 text-sm font-semibold px-5 py-2.5 rounded-lg shadow-2xs hover:shadow-sm active:scale-98 transition-all duration-200 cursor-pointer"
          >
            <DocumentSearchIcon className="w-4 h-4 text-[#2563EB]" />
            <span>File an RTI</span>
          </Link>
        </div>

        {/* Subtle Floating Illustration */}
        <motion.div 
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-40 sm:w-48 h-40 sm:h-48 flex items-center justify-center select-none pointer-events-none opacity-90"
        >
          <svg 
            viewBox="0 0 240 240" 
            className="w-full h-full drop-shadow-xs"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Soft Cloud Blobs */}
            <path
              d="M60 170 C40 170 30 150 40 135 C35 120 48 105 65 110 C75 90 105 90 120 105 C135 95 155 105 155 125 C170 130 175 155 160 170 Z"
              fill="#EBF3FE"
              opacity="0.85"
            />
            <path
              d="M140 180 C125 180 115 165 125 150 C120 135 138 120 155 128 C168 110 195 115 200 132 C215 138 215 165 198 180 Z"
              fill="#E3EEFD"
              opacity="0.75"
            />

            {/* Base Horizontal Ground Line */}
            <rect 
              x="30" 
              y="204" 
              width="180" 
              height="3.5" 
              rx="1.75" 
              fill="#E2EDFC" 
            />

            {/* Document Body with Folded Top-Right Corner */}
            <g filter="drop-shadow(0px 3px 8px rgba(186, 214, 250, 0.3))">
              <path
                d="M58 48 C58 43.58 61.58 40 66 40 H138 L170 72 V196 C170 200.42 166.42 204 162 204 H66 C61.58 204 58 200.42 58 196 V48 Z"
                fill="#F0F6FF"
                stroke="#E2EEFC"
                strokeWidth="1.5"
              />
              <path
                d="M138 40 V66 C138 69.31 140.69 72 144 72 H170 Z"
                fill="#CFE2FC"
              />
              <path
                d="M138 40 L170 72"
                stroke="#BED7FA"
                strokeWidth="1"
              />
              <rect x="80" y="78" width="46" height="7" rx="3.5" fill="#BFDBFE" />
              <rect x="80" y="98" width="76" height="6" rx="3" fill="#DBEAFE" />
              <rect x="80" y="114" width="60" height="6" rx="3" fill="#DBEAFE" />
              <rect x="80" y="130" width="68" height="6" rx="3" fill="#DBEAFE" />
              <rect x="80" y="146" width="42" height="6" rx="3" fill="#DBEAFE" />
            </g>

            {/* Magnifying Glass Overlaid on Document */}
            <g filter="drop-shadow(0px 4px 10px rgba(37, 99, 235, 0.2))">
              <path
                d="M168 168 L192 192"
                stroke="#2563EB"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M174 174 L190 190"
                stroke="#3B82F6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle
                cx="134"
                cy="134"
                r="36"
                fill="#EFF6FF"
                fillOpacity="0.9"
              />
              <circle
                cx="134"
                cy="134"
                r="36"
                stroke="#3B82F6"
                strokeWidth="8"
              />
              <text
                x="134"
                y="146"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="32"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                ?
              </text>
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
