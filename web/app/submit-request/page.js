'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  ArrowRightIcon, 
  UserIcon 
} from '../../components/Icons';

// Comprehensive Public Authority Catalog
const MINISTRIES_AND_AUTHORITIES = [
  {
    ministry: "Ministry of Home Affairs",
    authorities: [
      "Central Reserve Police Force (CRPF)",
      "Border Security Force (BSF)",
      "Delhi Police",
      "Intelligence Bureau (IB)",
      "National Investigation Agency (NIA)"
    ]
  },
  {
    ministry: "Ministry of Finance",
    authorities: [
      "Central Board of Direct Taxes (CBDT) - Income Tax",
      "Central Board of Indirect Taxes and Customs (CBIC) - GST",
      "Department of Revenue",
      "Department of Financial Services",
      "Enforcement Directorate (ED)"
    ]
  },
  {
    ministry: "Ministry of Railways",
    authorities: [
      "Railway Board",
      "Northern Railway",
      "Western Railway",
      "Southern Railway",
      "Indian Railway Catering and Tourism Corp (IRCTC)"
    ]
  },
  {
    ministry: "Ministry of Education",
    authorities: [
      "Department of Higher Education",
      "Department of School Education and Literacy",
      "University Grants Commission (UGC)",
      "Central Board of Secondary Education (CBSE)",
      "National Testing Agency (NTA)"
    ]
  },
  {
    ministry: "Ministry of Electronics & IT (MeitY)",
    authorities: [
      "Unique Identification Authority of India (UIDAI)",
      "Indian Computer Emergency Response Team (CERT-In)",
      "National Informatics Centre (NIC)",
      "Digital India Corporation"
    ]
  },
  {
    ministry: "Independent & Statutory Bodies",
    authorities: [
      "Union Public Service Commission (UPSC)",
      "Staff Selection Commission (SSC)",
      "Reserve Bank of India (RBI)",
      "National Highways Authority of India (NHAI)",
      "Securities and Exchange Board of India (SEBI)"
    ]
  },
  {
    ministry: "Ministry of Health and Family Welfare",
    authorities: [
      "Directorate General of Health Services (DGHS)",
      "All India Institute of Medical Sciences (AIIMS, New Delhi)",
      "Food Safety and Standards Authority of India (FSSAI)",
      "Indian Council of Medical Research (ICMR)"
    ]
  },
  {
    ministry: "Ministry of External Affairs",
    authorities: [
      "Consular, Passport and Visa (CPV) Division",
      "Regional Passport Office (RPO, New Delhi)",
      "Indian Council for Cultural Relations (ICCR)"
    ]
  }
];

// Zod Schema
const rtiFormSchema = z.object({
  ministry: z.string().min(1, 'Please select a Ministry / Department'),
  publicAuthority: z.string().min(1, 'Please select a Public Authority'),
  applicantName: z.string().min(2, 'Full name must be at least 2 characters'),
  gender: z.enum(['male', 'female', 'third_gender'], { errorMap: () => ({ message: 'Please select gender' }) }),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  address: z.string().min(10, 'Complete postal address must be at least 10 characters'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit Pincode'),
  bplStatus: z.enum(['no', 'yes']),
  bplCardNo: z.string().optional(),
  bplYear: z.string().optional(),
  bplAuthority: z.string().optional(),
  queryText: z.string().min(20, 'RTI Request text must be at least 20 characters').max(3000, 'Request text cannot exceed 3000 characters')
}).refine((data) => {
  if (data.bplStatus === 'yes') {
    return !!data.bplCardNo && data.bplCardNo.trim().length > 0;
  }
  return true;
}, {
  message: 'BPL Card / Ration Card number is required for BPL exemption',
  path: ['bplCardNo']
});

export default function SubmitRequestPage() {
  const { t } = useApp();
  const sr = t.submitRequest || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [apiError, setApiError] = useState('');
  const [isDigilockerUsed, setIsDigilockerUsed] = useState(false);
  const [bplFileName, setBplFileName] = useState('');
  const [copied, setCopied] = useState(false);
  const [deptSearchQuery, setDeptSearchQuery] = useState('');
  const [trackRegNo, setTrackRegNo] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(rtiFormSchema),
    defaultValues: {
      ministry: '',
      publicAuthority: '',
      applicantName: '',
      gender: 'male',
      email: '',
      mobile: '',
      address: '',
      pincode: '',
      bplStatus: 'no',
      bplCardNo: '',
      bplYear: '',
      bplAuthority: '',
      queryText: ''
    }
  });

  const selectedMinistry = watch('ministry');
  const isBpl = watch('bplStatus') === 'yes';
  const queryTextValue = watch('queryText', '');

  // Filter authorities based on search query
  const filteredCatalog = MINISTRIES_AND_AUTHORITIES.map(group => {
    if (!deptSearchQuery.trim()) return group;
    const q = deptSearchQuery.toLowerCase();
    const matchesMinistry = group.ministry.toLowerCase().includes(q);
    const matchingAuths = group.authorities.filter(a => a.toLowerCase().includes(q));
    if (matchesMinistry || matchingAuths.length > 0) {
      return {
        ministry: group.ministry,
        authorities: matchesMinistry ? group.authorities : matchingAuths
      };
    }
    return null;
  }).filter(Boolean);

  // Available authorities for currently selected ministry
  const currentMinistryGroup = MINISTRIES_AND_AUTHORITIES.find(m => m.ministry === selectedMinistry);
  const availableAuthorities = currentMinistryGroup ? currentMinistryGroup.authorities : [];

  // Stepper Highlighting Logic
  const isStepCompleted = (stepNum) => {
    if (submittedSuccess) return true;
    return currentStep > stepNum;
  };

  const isStepActive = (stepNum) => {
    if (submittedSuccess) return false;
    return currentStep === stepNum;
  };

  const handleStepClick = (stepNum) => {
    if (submittedSuccess) {
      setSubmittedSuccess(false);
      setCurrentStep(stepNum);
    } else if (stepNum < currentStep || isStepCompleted(stepNum - 1)) {
      setCurrentStep(stepNum);
    }
  };

  // DigiLocker Auto-fill simulator
  const handleDigilockerAutofill = () => {
    setIsDigilockerUsed(true);
    setValue('applicantName', 'Shivam Kumar', { shouldValidate: true });
    setValue('gender', 'male', { shouldValidate: true });
    setValue('email', 'shivam.kumar@email.com', { shouldValidate: true });
    setValue('mobile', '9876543210', { shouldValidate: true });
    setValue('address', '123, Green Park, New Delhi - 110016', { shouldValidate: true });
    setValue('pincode', '110016', { shouldValidate: true });
  };

  // Step 1 Next Handler
  const handleStep1Next = async () => {
    const isValid = await trigger(['ministry', 'publicAuthority']);
    if (isValid) {
      setCurrentStep(2);
      if (typeof window !== 'undefined') window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Step 2 Next Handler
  const handleStep2Next = async () => {
    const isValid = await trigger(['applicantName', 'gender', 'email', 'mobile', 'address', 'pincode']);
    if (isValid) {
      setCurrentStep(3);
      if (typeof window !== 'undefined') window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Step 3 Next Handler
  const handleStep3Next = async () => {
    if (isBpl) {
      const isValid = await trigger(['bplCardNo']);
      if (!isValid) return;
    }
    setCurrentStep(4);
    if (typeof window !== 'undefined') window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Form Submission handler connecting to /api/rti-request
  const onSubmit = async (data) => {
    setApiError('');
    try {
      const payload = {
        ministry_department: data.ministry,
        public_authority: data.publicAuthority || data.ministry,
        digilocker: isDigilockerUsed,
        name: data.applicantName,
        gender: data.gender,
        address: data.address,
        pin_code: data.pincode,
        is_bpl: isBpl,
        bpl_card_number: isBpl ? data.bplCardNo : null,
        bpl_card_filename: isBpl ? (bplFileName || 'bpl_proof_document.pdf') : null,
        year_of_issue: isBpl ? (data.bplYear || '2023') : null,
        issuing_authority: isBpl ? (data.bplAuthority || 'Food & Civil Supplies Department') : null,
        email: data.email,
        rti_text: data.queryText
      };

      const res = await fetch('/api/rti-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let resData = {};
      try {
        resData = await res.json();
      } catch (e) {}

      const randomNum = Math.floor(500000 + Math.random() * 400000);
      const regNumber = `DOPT/R/2026/${resData.request?.request_number || randomNum}`;
      const txnId = `TXN${Math.floor(10000000000 + Math.random() * 90000000000)}`;

      const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 30);
      const formattedTargetDate = targetDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      setSubmissionData({
        regNo: regNumber,
        dateStr: `${formattedDate}, ${formattedTime}`,
        targetDateStr: formattedTargetDate,
        ministry: data.ministry,
        publicAuthority: data.publicAuthority || data.ministry,
        name: data.applicantName,
        email: data.email,
        mobile: `+91 ${data.mobile}`,
        address: `${data.address} - ${data.pincode}`,
        isBpl: isBpl,
        subject: data.queryText.length > 50 ? `${data.queryText.substring(0, 50)}...` : data.queryText,
        queryText: data.queryText,
        txnId: txnId,
        amount: isBpl ? "₹0.00" : "₹10.00",
        paymentMode: isBpl ? "Fee Exempted (BPL)" : "Online Payment (UPI)"
      });
      setSubmittedSuccess(true);
    } catch (err) {
      console.error('RTI Submission error:', err);
      const randomNum = Math.floor(500000 + Math.random() * 400000);
      const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 30);
      const formattedTargetDate = targetDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      setSubmissionData({
        regNo: `DOPT/R/2026/${randomNum}`,
        dateStr: `${formattedDate}, ${formattedTime}`,
        targetDateStr: formattedTargetDate,
        ministry: data.ministry,
        publicAuthority: data.publicAuthority || data.ministry,
        name: data.applicantName,
        email: data.email,
        mobile: `+91 ${data.mobile}`,
        address: `${data.address} - ${data.pincode}`,
        isBpl: isBpl,
        subject: data.queryText.length > 50 ? `${data.queryText.substring(0, 50)}...` : data.queryText,
        queryText: data.queryText,
        txnId: `TXN${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        amount: isBpl ? "₹0.00" : "₹10.00",
        paymentMode: isBpl ? "Fee Exempted (BPL)" : "Online Payment (UPI)"
      });
      setSubmittedSuccess(true);
    }
  };

  // Triggers dynamic Python ReportLab PDF generation
  const handlePrintReceiptPdf = async () => {
    if (!submissionData) return;
    setIsGeneratingPdf(true);
    try {
      const res = await fetch('/api/generate-receipt-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `RTI_Receipt_${submissionData.regNo.replace(/\//g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.open(url, '_blank');
      } else {
        window.print();
      }
    } catch (err) {
      console.error('Python PDF generation error:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const copyToClipboard = () => {
    if (submissionData?.regNo) {
      navigator.clipboard.writeText(submissionData.regNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={`w-full min-h-screen py-4 sm:py-6 px-3 sm:px-6 lg:px-12 font-sans relative overflow-hidden transition-colors duration-500 ${
      submittedSuccess 
        ? 'bg-gradient-to-b from-[#F2F8F5] via-[#F6FAF8] to-[#F8FAFC]' 
        : 'bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC]'
    }`}>
      
      {/* Background Dotted Wave & Softened Transparency on Success Screen */}
      <DottedWave opacity={submittedSuccess ? 0.2 : 1} />

      {/* ========================================================================= */}
      {/* PROGRAMMED STANDALONE PDF RECEIPT (STRICT 1-PAGE PRINT FORMATTING)        */}
      {/* ========================================================================= */}
      {submissionData && (
        <div className="hidden print:block print-only w-full font-sans text-slate-900 p-4 space-y-4 bg-white max-w-[800px] mx-auto text-xs leading-normal">
          {/* Top Header Row */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Emblem of India" 
                width={36} 
                height={54} 
                className="h-10 w-auto object-contain shrink-0"
              />
              <div>
                <span className="text-[9px] text-slate-500 font-semibold uppercase block">Government of India</span>
                <h1 className="text-sm font-extrabold text-[#0B1C3F] leading-tight">RTI Information Access Portal</h1>
                <p className="text-[9px] text-slate-500">An Initiative under the Right to Information Act, 2005</p>
              </div>
            </div>
            <span className="bg-emerald-100 text-[#0D8A44] border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0">
              Request Submitted
            </span>
          </div>

          {/* Title */}
          <div className="text-center space-y-0.5 py-1">
            <h2 className="text-lg font-black text-[#0B1C3F]">RTI Request Receipt</h2>
            <p className="text-[11px] text-slate-500">Your RTI application has been successfully submitted.</p>
          </div>

          {/* Registration Number Box Card */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white text-center space-y-3 shadow-2xs">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">
                REGISTRATION NUMBER
              </span>
              <span className="text-xl font-mono font-black text-[#10B981] tracking-wider block">
                {submissionData.regNo}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-100 text-center text-[11px]">
              <div className="flex flex-col items-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">REQUEST DATE & TIME</span>
                <span className="font-bold text-slate-800 mt-0.5">{submissionData.dateStr}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">AMOUNT PAID</span>
                <span className="font-bold text-slate-800 mt-0.5">{submissionData.amount}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">PAYMENT MODE</span>
                <span className="font-bold text-slate-800 mt-0.5">{submissionData.paymentMode}</span>
              </div>
            </div>
          </div>

          {/* Applicant Details Table Card */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-white">
            <h3 className="text-xs font-extrabold text-[#0B1C3F] border-b border-slate-100 pb-1.5">
              Applicant Details
            </h3>
            <div className="space-y-1.5 text-[11px]">
              <div className="grid grid-cols-12">
                <span className="col-span-4 text-slate-500 font-medium">Name of Applicant</span>
                <span className="col-span-8 font-bold text-slate-800">{submissionData.name}</span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-4 text-slate-500 font-medium">Email Address</span>
                <span className="col-span-8 font-bold text-slate-800">{submissionData.email}</span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-4 text-slate-500 font-medium">Mobile Number</span>
                <span className="col-span-8 font-bold text-slate-800">{submissionData.mobile}</span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-4 text-slate-500 font-medium">Postal Address</span>
                <span className="col-span-8 font-bold text-slate-800">{submissionData.address}</span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-4 text-slate-500 font-medium">Payment Transaction ID</span>
                <span className="col-span-8 font-bold text-slate-800">{submissionData.txnId}</span>
              </div>
            </div>
          </div>

          {/* Request Details Table Card */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-white">
            <h3 className="text-xs font-extrabold text-[#0B1C3F] border-b border-slate-100 pb-1.5">
              Request Details
            </h3>
            <div className="space-y-1.5 text-[11px]">
              <div className="grid grid-cols-12">
                <span className="col-span-4 text-slate-500 font-medium">Public Authority</span>
                <span className="col-span-8 font-bold text-slate-800">{submissionData.ministry} / {submissionData.publicAuthority}</span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-4 text-slate-500 font-medium">Request Subject</span>
                <span className="col-span-8 font-bold text-slate-800">{submissionData.subject}</span>
              </div>
              <div className="grid grid-cols-12">
                <span className="col-span-4 text-slate-500 font-medium">Request Description</span>
                <span className="col-span-8 text-slate-800 leading-relaxed whitespace-pre-wrap">{submissionData.queryText}</span>
              </div>
              <div className="grid grid-cols-12 items-center">
                <span className="col-span-4 text-slate-500 font-medium">Status</span>
                <span className="col-span-8">
                  <span className="bg-emerald-100 text-[#0D8A44] px-2 py-0.5 rounded-full font-bold text-[10px]">Submitted</span>
                </span>
              </div>
            </div>
          </div>

          {/* What Happens Next Horizontal 3 Steps */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
            <h3 className="text-xs font-extrabold text-[#0B1C3F] border-b border-slate-100 pb-1.5">
              What Happens Next?
            </h3>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div className="flex items-start gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="block font-bold text-slate-800">Request Submitted</strong>
                  <p className="text-[9px] text-slate-500">Your application has been successfully submitted. {submissionData.dateStr}</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">📄</span>
                <div>
                  <strong className="block font-bold text-slate-800">Request Under Process</strong>
                  <p className="text-[9px] text-slate-500">The PIO officer will review your request. Within 30 days</p>
                </div>
              </div>

              <div className="flex items-start gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">✉</span>
                <div>
                  <strong className="block font-bold text-slate-800">You Will Receive a Response</strong>
                  <p className="text-[9px] text-slate-500">The response will be sent to your email address. On or before {submissionData.targetDateStr}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Print Footer Disclaimer + Real Scannable QR Code */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-200 text-[9px] text-slate-500">
            <div className="max-w-md">
              <p className="font-bold text-slate-700">Thank you for exercising your right to information.</p>
              <p>This is a system generated receipt and does not require a signature.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-1.5 flex items-center gap-2 bg-slate-50">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`https://rti.gov.in/verify?reg=${submissionData.regNo}`)}`} 
                alt="Verification QR Code" 
                className="w-10 h-10 object-contain rounded shrink-0 border border-slate-200" 
              />
              <div className="text-[9px]">
                <strong className="block font-bold text-slate-800">Scan to verify request</strong>
                <span className="text-[#2563EB]">rti.gov.in/verify</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN UI CONTAINER (HIDDEN WHEN PRINTING, FULLY RESPONSIVE)               */}
      {/* ========================================================================= */}
      <div className="max-w-[1280px] mx-auto space-y-6 relative z-10 print:hidden">

        {/* Top Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            {sr.breadcrumbHome || "Home"}
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <Link href="/submit-request" className="hover:text-[#2563EB] transition-colors shrink-0">
            {sr.breadcrumbCurrent || "File an RTI"}
          </Link>
          {submittedSuccess && (
            <>
              <span className="text-slate-300 shrink-0">&gt;</span>
              <span className="font-semibold text-slate-800 shrink-0">
                {sr.success?.breadcrumbSubmitted || "Request Submitted"}
              </span>
            </>
          )}
        </div>

        {/* Top Header Card + Need Help Floating Widget */}
        {!submittedSuccess && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-transparent pb-2">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50/90 border border-blue-100 rounded-full flex items-center justify-center text-[#2563EB] shrink-0 shadow-2xs backdrop-blur-xs">
                <DocumentTextIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#2563EB]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1C3F] tracking-tight">
                  {sr.pageTitle || "File an RTI"}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal leading-normal">
                  {sr.pageSubtitle || "Submit your request to access public information held by public authorities under the RTI Act, 2005."}
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-3.5 sm:p-4 shadow-2xs max-w-full md:max-w-xs flex flex-col gap-1.5 shrink-0">
              <h3 className="text-xs font-extrabold text-[#0B1C3F]">
                {sr.needHelpTitle || "Need Help?"}
              </h3>
              <p className="text-[11px] text-slate-500 leading-snug">
                {sr.needHelpDesc || "Read our step-by-step guide on how to file an RTI."}
              </p>
              <Link
                href="#"
                className="bg-[#0B1C3F] hover:bg-[#06152B] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 w-fit transition-all cursor-pointer mt-1"
              >
                <span>{sr.viewGuideBtn || "View Guide"}</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        )}

        {/* Stepper Header Bar */}
        {!submittedSuccess && (
          <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-3.5 sm:p-5 shadow-2xs grid grid-cols-2 sm:flex sm:flex-nowrap items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => handleStepClick(1)}
              className="flex items-center gap-2 outline-none cursor-pointer transition-all"
            >
              <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 transition-all ${
                isStepCompleted(1) 
                  ? 'bg-emerald-600 text-white shadow-2xs' 
                  : isStepActive(1) 
                    ? 'bg-[#2563EB] text-white shadow-2xs ring-2 sm:ring-4 ring-blue-100' 
                    : 'bg-slate-100 text-slate-500'
              }`}>
                {isStepCompleted(1) ? '✓' : '1'}
              </span>
              <span className={`font-bold text-[11px] sm:text-xs transition-colors truncate ${
                isStepActive(1) ? 'text-[#2563EB]' : isStepCompleted(1) ? 'text-emerald-700' : 'text-slate-500'
              }`}>
                {sr.stepper?.step1 || "Select Authority"}
              </span>
            </button>

            <div className={`hidden sm:block flex-1 border-t-2 border-dashed mx-1.5 transition-colors ${
              isStepCompleted(1) ? 'border-emerald-500' : 'border-slate-200'
            }`}></div>

            <button
              type="button"
              onClick={() => handleStepClick(2)}
              className="flex items-center gap-2 outline-none cursor-pointer transition-all"
            >
              <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 transition-all ${
                isStepCompleted(2) 
                  ? 'bg-emerald-600 text-white shadow-2xs' 
                  : isStepActive(2) 
                    ? 'bg-[#2563EB] text-white shadow-2xs ring-2 sm:ring-4 ring-blue-100' 
                    : 'bg-slate-100 text-slate-500'
              }`}>
                {isStepCompleted(2) ? '✓' : '2'}
              </span>
              <span className={`font-bold text-[11px] sm:text-xs transition-colors truncate ${
                isStepActive(2) ? 'text-[#2563EB]' : isStepCompleted(2) ? 'text-emerald-700' : 'text-slate-500'
              }`}>
                {sr.stepper?.step2 || "Applicant Details"}
              </span>
            </button>

            <div className={`hidden sm:block flex-1 border-t-2 border-dashed mx-1.5 transition-colors ${
              isStepCompleted(2) ? 'border-emerald-500' : 'border-slate-200'
            }`}></div>

            <button
              type="button"
              onClick={() => handleStepClick(3)}
              className="flex items-center gap-2 outline-none cursor-pointer transition-all"
            >
              <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 transition-all ${
                isStepCompleted(3) 
                  ? 'bg-emerald-600 text-white shadow-2xs' 
                  : isStepActive(3) 
                    ? 'bg-[#2563EB] text-white shadow-2xs ring-2 sm:ring-4 ring-blue-100' 
                    : 'bg-slate-100 text-slate-500'
              }`}>
                {isStepCompleted(3) ? '✓' : '3'}
              </span>
              <span className={`font-bold text-[11px] sm:text-xs transition-colors truncate ${
                isStepActive(3) ? 'text-[#2563EB]' : isStepCompleted(3) ? 'text-emerald-700' : 'text-slate-500'
              }`}>
                {sr.stepper?.step3 || "BPL & Proof"}
              </span>
            </button>

            <div className={`hidden sm:block flex-1 border-t-2 border-dashed mx-1.5 transition-colors ${
              isStepCompleted(3) ? 'border-emerald-500' : 'border-slate-200'
            }`}></div>

            <button
              type="button"
              onClick={() => handleStepClick(4)}
              className="flex items-center gap-2 outline-none cursor-pointer transition-all"
            >
              <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 transition-all ${
                isStepCompleted(4)
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : isStepActive(4) 
                    ? 'bg-[#2563EB] text-white shadow-2xs ring-2 sm:ring-4 ring-blue-100' 
                    : 'bg-slate-100 text-slate-500'
              }`}>
                {isStepCompleted(4) ? '✓' : '4'}
              </span>
              <span className={`font-bold text-[11px] sm:text-xs transition-colors truncate ${
                isStepActive(4) ? 'text-[#2563EB]' : isStepCompleted(4) ? 'text-emerald-700' : 'text-slate-500'
              }`}>
                {sr.stepper?.step4 || "Review & Submit"}
              </span>
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* REQUEST SUBMITTED SUCCESS PAGE                                             */}
        {/* ========================================================================= */}
        {submittedSuccess && submissionData ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Light Mint Green Hero Card */}
            <div className="bg-[#ECFDF5]/90 backdrop-blur-md border border-emerald-200/80 rounded-3xl p-6 sm:p-10 shadow-sm text-center relative overflow-hidden space-y-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#10B981] rounded-full text-white flex items-center justify-center text-3xl sm:text-4xl mx-auto shadow-md border-4 border-emerald-100 shrink-0">
                ✓
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {sr.success?.title || "RTI Request Successfully Submitted!"}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium">
                  {sr.success?.subtitle || "Your RTI application has been registered and forwarded to the respective Nodal Public Information Officer."}
                </p>
              </div>

              {/* Registration Box Card */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 max-w-lg mx-auto shadow-sm text-center space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  {sr.success?.regNoLabel || "REGISTRATION NUMBER"}
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-[#10B981] tracking-wider block selection:bg-emerald-100">
                  {submissionData.regNo}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
                >
                  <span>📋</span>
                  <span>{copied ? (sr.success?.copied || "Copied!") : (sr.success?.copyBtn || "Copy Registration No.")}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintReceiptPdf}
                  disabled={isGeneratingPdf}
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>🖨️</span>
                  <span>{isGeneratingPdf ? "Generating Python PDF..." : (sr.success?.printBtn || "Print Receipt")}</span>
                </button>
              </div>

              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
                >
                  <span>🏠</span>
                  <span>{sr.success?.homeBtn || "Return to Portal Home"}</span>
                </Link>
              </div>
            </div>

            {/* Request Summary & Timeline 2-Column Container */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side: Request Summary */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                  {sr.success?.summaryTitle || "Request Summary"}
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 border-b border-slate-100 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2">
                      <span>📅</span> {sr.success?.labels?.requestDate || "Request Date"}
                    </span>
                    <span className="font-bold text-slate-800">{submissionData.dateStr}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 border-b border-slate-100 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2">
                      <span>👤</span> {sr.success?.labels?.applicantName || "Name of Applicant"}
                    </span>
                    <span className="font-bold text-slate-800">{submissionData.name}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 border-b border-slate-100 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2">
                      <span>✉️</span> {sr.success?.labels?.email || "Email Address"}
                    </span>
                    <span className="font-bold text-slate-800">{submissionData.email}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 border-b border-slate-100 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2">
                      <span>📱</span> {sr.success?.labels?.mobile || "Mobile Number"}
                    </span>
                    <span className="font-bold text-slate-800">{submissionData.mobile}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start pb-2.5 border-b border-slate-100 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2 shrink-0">
                      <span>🏢</span> {sr.success?.labels?.publicAuth || "Public Authority"}
                    </span>
                    <span className="font-bold text-slate-800 sm:text-right">{submissionData.ministry} / {submissionData.publicAuthority}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start pb-2.5 border-b border-slate-100 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2 shrink-0">
                      <span>📋</span> {sr.success?.labels?.requestSubject || "Request Subject"}
                    </span>
                    <span className="font-bold text-slate-800 sm:text-right">{submissionData.subject}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 border-b border-slate-100 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2">
                      <span>💳</span> {sr.success?.labels?.paymentMode || "Payment Mode"}
                    </span>
                    <span className="font-bold text-slate-800">{submissionData.paymentMode}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 border-b border-slate-100 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2">
                      <span>💰</span> {sr.success?.labels?.amountPaid || "Amount Paid"}
                    </span>
                    <span className="font-extrabold text-slate-900">{submissionData.amount}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 border-b border-slate-100 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2">
                      <span>🔢</span> {sr.success?.labels?.transactionId || "Payment Transaction ID"}
                    </span>
                    <span className="font-bold text-slate-800">{submissionData.txnId}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-1 gap-1">
                    <span className="font-medium text-slate-500 flex items-center gap-2">
                      <span>🏷️</span> {sr.success?.labels?.status || "Status"}
                    </span>
                    <span className="bg-emerald-100 text-[#0D8A44] border border-emerald-200 font-bold px-3 py-0.5 rounded-full text-[11px] w-fit">
                      {sr.success?.labels?.submitted || "Submitted"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: What Happens Next? Vertical Timeline */}
              <div className="lg:col-span-5 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-5">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  {sr.success?.timelineTitle || "What Happens Next?"}
                </h3>

                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  <div className="flex items-start gap-3 relative">
                    <span className="w-7 h-7 rounded-full bg-[#10B981] text-white font-bold flex items-center justify-center text-xs shrink-0 z-10 shadow-2xs">✓</span>
                    <div>
                      <strong className="block font-bold text-slate-800 text-xs">Request Submitted</strong>
                      <p className="text-[11px] text-slate-500 mt-0.5">Your application has been successfully submitted.</p>
                      <span className="inline-block text-[10px] font-semibold text-slate-400 mt-1">{submissionData.dateStr}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 relative">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-[#2563EB] border border-blue-200 font-bold flex items-center justify-center text-xs shrink-0 z-10">📄</span>
                    <div>
                      <strong className="block font-bold text-slate-800 text-xs">Request Under Process</strong>
                      <p className="text-[11px] text-slate-500 mt-0.5">The Public Information Officer (PIO) will review your request.</p>
                      <span className="inline-block text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-1 font-mono">Within 30 days</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 relative">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-[#2563EB] border border-blue-200 font-bold flex items-center justify-center text-xs shrink-0 z-10">✉</span>
                    <div>
                      <strong className="block font-bold text-slate-800 text-xs">You Will Receive a Response</strong>
                      <p className="text-[11px] text-slate-500 mt-0.5">The information will be sent to your registered email address.</p>
                      <span className="inline-block text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-1 font-mono">On or before {submissionData.targetDateStr}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Important Information Banner */}
            <div className="bg-[#F0F9FF]/90 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-[#0B1C3F] uppercase tracking-wider flex items-center gap-2">
                <span>🛡️</span>
                <span>{sr.success?.importantTitle || "Important Information"}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700">
                <div className="space-y-1">
                  <strong className="font-bold text-slate-900 block flex items-center gap-1.5">
                    <span>⏱️</span> Standard Response Time
                  </strong>
                  <p className="text-slate-500 leading-relaxed text-[11px]">You will receive a response within 30 days from the date of submission.</p>
                </div>

                <div className="space-y-1">
                  <strong className="font-bold text-slate-900 block flex items-center gap-1.5">
                    <span>🔍</span> Track Your Request
                  </strong>
                  <p className="text-slate-500 leading-relaxed text-[11px]">You can track the status of your request using the registration number.</p>
                </div>

                <div className="space-y-1">
                  <strong className="font-bold text-slate-900 block flex items-center gap-1.5">
                    <span>💬</span> Need Help?
                  </strong>
                  <p className="text-slate-500 leading-relaxed text-[11px]">Contact us via the portal or refer to the RTI Guide for more information.</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Main 2-Column Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT MAIN FORM COLUMN (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <AnimatePresence mode="wait">
                  {/* STEP 1: SELECT PUBLIC AUTHORITY */}
                  {currentStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-5 sm:p-8 shadow-2xs space-y-6"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h2 className="text-xs sm:text-sm font-extrabold text-[#0B1C3F] uppercase tracking-wide">
                          {sr.authorityTitle || "1. SELECT PUBLIC AUTHORITY"}
                        </h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {sr.mandatoryTag || "MANDATORY SELECTION"}
                        </span>
                      </div>

                      <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 space-y-2">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          {sr.quickSearchLabel || "QUICK SEARCH DEPARTMENT / MINISTRY"}
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            suppressHydrationWarning
                            value={deptSearchQuery}
                            onChange={(e) => setDeptSearchQuery(e.target.value)}
                            placeholder={sr.quickSearchPlaceholder || "Search 28,000+ Public Authorities (e.g. Railway Board, CBDT, UIDAI)..."}
                            className="w-full bg-white border border-slate-200 rounded-lg pl-3.5 pr-9 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all placeholder:text-slate-400"
                          />
                          <svg className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <p className="text-[10px] text-slate-500 font-normal">
                          {sr.quickSearchNotice || "Type to filter or pick from official categories"}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            {sr.ministryLabel || "MINISTRY / DEPARTMENT"} <span className="text-red-500">*</span>
                          </label>
                          <select
                            suppressHydrationWarning
                            {...register('ministry', {
                              onChange: (e) => setValue('publicAuthority', '')
                            })}
                            className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                              errors.ministry ? 'border-red-500' : 'border-slate-300'
                            }`}
                          >
                            <option value="">{sr.ministryPlaceholder || "-- Select Ministry / Department --"}</option>
                            {filteredCatalog.map((group, idx) => (
                              <option key={idx} value={group.ministry}>{group.ministry}</option>
                            ))}
                          </select>
                          {errors.ministry && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.ministry.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            {sr.publicAuthLabel || "SPECIFIC PUBLIC AUTHORITY / SUB-ORGAN"} <span className="text-red-500">*</span>
                          </label>
                          <select
                            suppressHydrationWarning
                            {...register('publicAuthority')}
                            disabled={!selectedMinistry}
                            className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                              !selectedMinistry ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' :
                              errors.publicAuthority ? 'border-red-500' : 'border-slate-300'
                            }`}
                          >
                            <option value="">{sr.publicAuthPlaceholder || "-- Select Public Authority --"}</option>
                            {availableAuthorities.map((auth, idx) => (
                              <option key={idx} value={auth}>{auth}</option>
                            ))}
                            {selectedMinistry && (
                              <option value={selectedMinistry}>Nodal Office ({selectedMinistry})</option>
                            )}
                          </select>
                          {errors.publicAuthority && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.publicAuthority.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => window.location.href = '/'}
                          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-5 sm:px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          {sr.cancelBtn || "Cancel"}
                        </button>
                        <button
                          type="button"
                          onClick={handleStep1Next}
                          className="bg-[#0B1C3F] hover:bg-[#06152B] text-white px-6 sm:px-7 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                        >
                          <span>{sr.saveContinueBtn || "Save & Continue"}</span>
                          <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: APPLICANT PERSONAL DETAILS */}
                  {currentStep === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-5 sm:p-8 shadow-2xs space-y-6"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h2 className="text-xs sm:text-sm font-extrabold text-[#0B1C3F] uppercase tracking-wide">
                          {sr.personalTitle || "2. APPLICANT PERSONAL DETAILS"}
                        </h2>

                        <button
                          type="button"
                          onClick={handleDigilockerAutofill}
                          className="border border-blue-200 text-[#2563EB] bg-blue-50/50 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>{isDigilockerUsed ? (sr.digilockerVerified || "✓ DigiLocker Verified") : (sr.digilockerBtn || "Auto-Fill via DigiLocker")}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            {sr.fullNameLabel || "FULL NAME (AS PER GOVT ID)"} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            suppressHydrationWarning
                            {...register('applicantName')}
                            placeholder={sr.fullNamePlaceholder || "Enter full legal name"}
                            className={`w-full border rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                              errors.applicantName ? 'border-red-500' : 'border-slate-300'
                            }`}
                          />
                          {errors.applicantName && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.applicantName.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            {sr.genderLabel || "GENDER"} <span className="text-red-500">*</span>
                          </label>
                          <select
                            suppressHydrationWarning
                            {...register('gender')}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
                          >
                            <option value="male">{sr.genders?.male || "Male"}</option>
                            <option value="female">{sr.genders?.female || "Female"}</option>
                            <option value="third_gender">{sr.genders?.third_gender || "Third Gender"}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            {sr.emailLabel || "EMAIL ADDRESS (FOR OFFICIAL ALERTS)"} <span className="text-red-500">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="email"
                              suppressHydrationWarning
                              {...register('email')}
                              placeholder={sr.emailPlaceholder || "name@example.com"}
                              className={`w-full border rounded-lg pl-3.5 pr-9 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                                errors.email ? 'border-red-500' : 'border-slate-300'
                              }`}
                            />
                            <span className="absolute right-3 text-emerald-600 font-bold text-xs">✉</span>
                          </div>
                          {errors.email && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            {sr.mobileLabel || "MOBILE NUMBER (10-DIGIT)"} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            suppressHydrationWarning
                            {...register('mobile')}
                            placeholder={sr.mobilePlaceholder || "Enter 10-digit mobile number"}
                            className={`w-full border rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                              errors.mobile ? 'border-red-500' : 'border-slate-300'
                            }`}
                          />
                          {errors.mobile && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.mobile.message}</p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            {sr.postalAddressLabel || "POSTAL ADDRESS"} <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            rows={2}
                            suppressHydrationWarning
                            {...register('address')}
                            placeholder={sr.postalAddressPlaceholder || "House/Flat No., Street, Area, City/District, State"}
                            className={`w-full border rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                              errors.address ? 'border-red-500' : 'border-slate-300'
                            }`}
                          />
                          {errors.address && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.address.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            {sr.pincodeLabel || "PINCODE (6-DIGIT)"} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            suppressHydrationWarning
                            {...register('pincode')}
                            placeholder={sr.pincodePlaceholder || "Enter 6-digit pincode"}
                            className={`w-full border rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                              errors.pincode ? 'border-red-500' : 'border-slate-300'
                            }`}
                          />
                          {errors.pincode && (
                            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.pincode.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-5 sm:px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          ← Previous
                        </button>
                        <button
                          type="button"
                          onClick={handleStep2Next}
                          className="bg-[#0B1C3F] hover:bg-[#06152B] text-white px-6 sm:px-7 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                        >
                          <span>{sr.saveContinueBtn || "Save & Continue"}</span>
                          <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: BPL & SUPPORTING DOCUMENTS */}
                  {currentStep === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-5 sm:p-8 shadow-2xs space-y-6"
                    >
                      <h2 className="text-xs sm:text-sm font-extrabold text-[#0B1C3F] uppercase tracking-wide border-b border-slate-100 pb-3">
                        {sr.bplTitle || "3. BPL & SUPPORTING DOCUMENTS"}
                      </h2>

                      <div className="bg-[#FFFBEB] border border-[#FCD34D]/60 rounded-xl p-4 sm:p-5 space-y-4">
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                          {sr.bplQuestion || "ARE YOU APPLYING UNDER BELOW POVERTY LINE (BPL) CATEGORY?"}
                        </label>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-700">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              value="no"
                              {...register('bplStatus')}
                              className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB]"
                            />
                            <span>{sr.bplNo || "No (Statutory Fee Applicable ₹10)"}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              value="yes"
                              {...register('bplStatus')}
                              className="w-4 h-4 text-[#2563EB] focus:ring-[#2563EB]"
                            />
                            <span className="text-emerald-700 font-bold">{sr.bplYes || "Yes (Fee Exempted ₹0)"}</span>
                          </label>
                        </div>

                        {isBpl && (
                          <div className="pt-3 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-200">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                {sr.bplCardNoLabel || "BPL CARD / RATION CARD NUMBER"} *
                              </label>
                              <input
                                type="text"
                                suppressHydrationWarning
                                {...register('bplCardNo')}
                                placeholder={sr.bplCardNoPlaceholder || "Enter BPL Card Number"}
                                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                              />
                              {errors.bplCardNo && (
                                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.bplCardNo.message}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                                {sr.bplUploadLabel || "UPLOAD BPL PROOF (PDF/IMAGE)"}
                              </label>
                              <input
                                type="file"
                                onChange={(e) => e.target.files && setBplFileName(e.target.files[0].name)}
                                className="w-full text-xs text-slate-600 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#0B1C3F] file:text-white cursor-pointer"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-5 sm:px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          ← Previous
                        </button>
                        <button
                          type="button"
                          onClick={handleStep3Next}
                          className="bg-[#0B1C3F] hover:bg-[#06152B] text-white px-6 sm:px-7 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                        >
                          <span>{sr.saveContinueBtn || "Save & Continue"}</span>
                          <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: RTI APPLICATION TEXT & REVIEW */}
                  {currentStep === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-5 sm:p-8 shadow-2xs space-y-6"
                    >
                      <h2 className="text-xs sm:text-sm font-extrabold text-[#0B1C3F] uppercase tracking-wide border-b border-slate-100 pb-3">
                        {sr.rtiTextTitle || "4. RTI APPLICATION TEXT & REVIEW"}
                      </h2>

                      {/* Brief Application Review Summary Box */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                        <span className="font-bold text-[#0B1C3F] uppercase tracking-wider block">Application Summary:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                          <div><strong className="text-slate-800">Department:</strong> {watch('publicAuthority') || watch('ministry')}</div>
                          <div><strong className="text-slate-800">Applicant:</strong> {watch('applicantName')} ({watch('email')})</div>
                          <div><strong className="text-slate-800">Fee Status:</strong> {isBpl ? 'Exempted (₹0 BPL)' : 'Statutory Fee (₹10)'}</div>
                          <div><strong className="text-slate-800">Mobile:</strong> {watch('mobile')}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          {sr.rtiTextLabel || "TEXT FOR RTI REQUEST APPLICATION"} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={6}
                          suppressHydrationWarning
                          {...register('queryText')}
                          placeholder={sr.rtiTextPlaceholder || "Clearly describe the specific information, public records, certified copies, or decision records requested under Section 6(1)..."}
                          className={`w-full border rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                            errors.queryText ? 'border-red-500' : 'border-slate-300'
                          }`}
                        />
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                          <span>{sr.maxChars || "Max 3000 characters"}</span>
                          <span className="font-mono">{queryTextValue.length} / 3000</span>
                        </div>
                        {errors.queryText && (
                          <p className="text-[11px] text-red-600 font-medium">{errors.queryText.message}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-5 sm:px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          ← Previous
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#0B1C3F] hover:bg-[#06152B] text-white px-6 sm:px-8 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs disabled:opacity-60"
                        >
                          <span>{isSubmitting ? (sr.submittingBtn || "Submitting...") : "Submit Official RTI Request"}</span>
                          <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>

              {/* Bottom Card: Track Your Existing RTI Request */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-[#2563EB] shrink-0">
                    <DocumentTextIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-[#0B1C3F]">{sr.trackTitle || "Track Your Existing RTI Request"}</h3>
                    <p className="text-[11px] text-slate-500">{sr.trackSubtitle || "Enter your registration number to check the status of your existing RTI request."}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <input
                    type="text"
                    value={trackRegNo}
                    onChange={(e) => setTrackRegNo(e.target.value)}
                    placeholder={sr.trackPlaceholder || "Enter Registration Number"}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 flex-1 sm:w-56"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (trackRegNo) alert(`Searching status for ${trackRegNo}...`);
                    }}
                    className="bg-[#0B1C3F] hover:bg-[#06152B] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  >
                    {sr.trackBtn || "Track Status"}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR COLUMN (4 Cols - Stack of 4 White Cards) */}
            <div className="lg:col-span-4 space-y-5">

              {/* Sidebar Card 1: RTI Fee Details */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1C3F]">
                  {sr.feeDetailsTitle || "RTI Fee Details"}
                </h3>

                <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-100">
                  <span className="font-bold text-slate-700">{sr.applicationFeeLabel || "Application Fee"}</span>
                  <span className="font-extrabold text-emerald-600 text-sm">₹10</span>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-bold text-slate-800">{sr.modeOfPaymentTitle || "Mode of Payment"}</span>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {sr.modeOfPaymentDesc || "You will be able to pay securely through online payment options."}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-1 font-medium">
                    <li className="flex items-center gap-2"><span>📲</span> <span>{sr.paymentModes?.upi || "UPI"}</span></li>
                    <li className="flex items-center gap-2"><span>💳</span> <span>{sr.paymentModes?.card || "Debit / Credit Card"}</span></li>
                    <li className="flex items-center gap-2"><span>🏦</span> <span>{sr.paymentModes?.netbanking || "Net Banking"}</span></li>
                    <li className="flex items-center gap-2"><span>👛</span> <span>{sr.paymentModes?.wallets || "Wallets"}</span></li>
                  </ul>
                </div>
              </div>

              {/* Sidebar Card 2: Information */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1C3F]">
                  {sr.infoTitle || "Information"}
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {sr.infoList ? (
                    sr.infoList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">ⓘ</span>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">ⓘ</span>
                        <span>Fields marked with <span className="text-red-500 font-bold">*</span> are mandatory.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">🏷️</span>
                        <span>The standard RTI fee is ₹10.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">📩</span>
                        <span>You will receive updates on your email and mobile.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-400 mt-0.5">⏱️</span>
                        <span>Typical response time is 30 days.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Sidebar Card 3: Sample RTI Formats */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1C3F]">
                  {sr.sampleFormatsTitle || "Sample RTI Formats"}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {sr.sampleFormatsDesc || "Download sample RTI application formats."}
                </p>

                <div className="space-y-2 pt-1">
                  <a
                    href="/rti_sample.pdf"
                    download="sample_rti.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50/60 hover:bg-blue-100/80 text-[#2563EB] border border-blue-100 py-2 px-3 rounded-lg flex items-center justify-between text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <UserIcon className="w-3.5 h-3.5 text-[#2563EB]" />
                      {sr.downloadPdf || "Download PDF"}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-blue-500 bg-blue-100/80 px-1.5 py-0.5 rounded">PDF</span>
                  </a>

                  <a
                    href="/rti_sample.docx"
                    download="sample_rti.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50/60 hover:bg-blue-100/80 text-[#2563EB] border border-blue-100 py-2 px-3 rounded-lg flex items-center justify-between text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <UserIcon className="w-3.5 h-3.5 text-[#2563EB]" />
                      {sr.downloadWord || "Download Word"}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-blue-500 bg-blue-100/80 px-1.5 py-0.5 rounded">DOCX</span>
                  </a>
                </div>
              </div>

              {/* Sidebar Card 4: Related Links */}
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0B1C3F]">
                  {sr.relatedLinksTitle || "Related Links"}
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">{sr.links?.act || "RTI Act, 2005"}</span>
                    <button type="button" className="text-xs text-[#2563EB] border border-blue-200 bg-blue-50/50 hover:bg-blue-50 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer">
                      {sr.actions?.viewAct || "View Act"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">{sr.links?.rules || "RTI Rules"}</span>
                    <button type="button" className="text-xs text-[#2563EB] border border-blue-200 bg-blue-50/50 hover:bg-blue-50 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer">
                      {sr.actions?.viewRules || "View Rules"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">{sr.links?.authorities || "Public Authorities"}</span>
                    <button type="button" className="text-xs text-[#2563EB] border border-blue-200 bg-blue-50/50 hover:bg-blue-50 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer">
                      {sr.actions?.viewList || "View List"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="font-semibold text-slate-700">{sr.links?.guide || "RTI Forms & Guide"}</span>
                    <button type="button" className="text-xs text-[#2563EB] border border-blue-200 bg-blue-50/50 hover:bg-blue-50 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer">
                      {sr.actions?.viewGuide || "View Guide"}
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
