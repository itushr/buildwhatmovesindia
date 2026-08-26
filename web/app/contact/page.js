'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheckIcon, 
  ArrowRightIcon 
} from '../../components/Icons';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Headphones, 
  Building2,
  UserCheck,
  ExternalLink,
  HelpCircle,
  FileSearch,
  RotateCcw
} from 'lucide-react';

export default function ContactPage() {
  const { language, t } = useApp();
  const isHindi = language === 'hi';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC]">
      {/* Full-Page Dotted Background */}
      <DottedWave />

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        {/* Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            {t?.submitRequest?.breadcrumbHome || 'Home'}
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <span className="font-semibold text-slate-800 shrink-0">
            {isHindi ? 'संपर्क करें' : 'Contact Us'}
          </span>
        </div>

        {/* Header Hero Area */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto pt-2 pb-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/90 text-[#1a4bba] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Headphones className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{isHindi ? 'नागरिक सहायता डेस्क - RTI निदेशालय' : 'Citizen Helpdesk - Directorate of RTI'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1C3F] tracking-tight mb-4">
            {isHindi ? 'हमसे संपर्क करें (Contact Us)' : 'Contact Us'}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-medium max-w-3xl mx-auto mb-2 leading-relaxed">
            {isHindi
              ? 'RTI ऑनलाइन पोर्टल संबंधी किसी भी समस्या या पूछताछ के लिए आधिकारिक सहायता डेस्क एवं नामित नोडल अधिकारियों का विवरण।'
              : 'Official contact and escalation details for RTI Online Portal queries, technical support, and citizen assistance.'}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Contact Info Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Primary Helpline (Tier 1) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB]">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1C3F]">
                      {isHindi ? 'प्राथमिक सहायता डेस्क (Tier 1)' : 'Primary RTI Helpline'}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {isHindi ? 'पोर्टल तकनीकी एवं सामान्य सहायता' : 'Online portal technical & filing queries'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {isHindi ? 'सक्रिय' : 'Active'}
                </span>
              </div>

              <ul className="flex flex-col gap-5 text-xs sm:text-sm text-slate-600 font-medium">
                {/* Email Helpline */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#0B1C3F] uppercase tracking-wider mb-0.5">
                      {isHindi ? 'हेल्पलाइन ईमेल' : 'Helpline Email'}
                    </span>
                    <a 
                      href="mailto:helprtionline-dopt@nic.in" 
                      className="text-xs sm:text-sm font-bold text-[#2563EB] hover:underline break-all"
                    >
                      helprtionline-dopt@nic.in
                    </a>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal font-normal">
                      {isHindi 
                        ? 'विशेष रूप से पोर्टल के माध्यम से ऑनलाइन RTI दाखिल करते समय आने वाली समस्याओं के लिए।' 
                        : 'Exclusively meant for queries or problems faced while filing online RTI through this portal.'}
                    </p>
                  </div>
                </li>

                {/* Phone Numbers */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#0B1C3F] uppercase tracking-wider mb-0.5">
                      {isHindi ? 'हेल्पलाइन फोन नंबर' : 'Helpline Phone Numbers'}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <a href="tel:01124010690" className="text-sm font-bold text-[#2563EB] hover:underline">
                        011-24010690
                      </a>
                      <span className="text-slate-300">/</span>
                      <a href="tel:01124010691" className="text-sm font-bold text-[#2563EB] hover:underline">
                        011-24010691
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {isHindi ? 'टोल-फ्री वैकल्पिक: 1800-11-4000' : 'Toll-Free Alternate: 1800-11-4000'}
                    </p>
                  </div>
                </li>

                {/* Working Hours */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#0B1C3F] uppercase tracking-wider mb-0.5">
                      {isHindi ? 'कार्य समय' : 'Operational Hours'}
                    </span>
                    <p className="text-xs text-slate-700 font-semibold">
                      {isHindi ? 'सोमवार - शनिवार: सुबह 9:30 - शाम 5:30 (IST)' : 'Monday – Saturday: 9:30 AM – 5:30 PM (IST)'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {isHindi ? 'राजपत्रित अवकाशों पर बंद' : 'Closed on Gazetted Public Holidays'}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Designated Escalation Official (Tier 2) */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 border-2 border-blue-200/90 rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-blue-100">
                <div className="w-8 h-8 rounded-lg bg-[#0B1C3F] text-white flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B1C3F]">
                    {isHindi ? 'नामित नोडल अधिकारी (Escalation Official)' : 'Designated Nodal Escalation Official'}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {isHindi ? 'कार्मिक एवं प्रशिक्षण विभाग (DoPT)' : 'Department of Personnel & Training (DOP&T)'}
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {isHindi ? 'पदनाम' : 'Designation'}
                  </div>
                  <div className="text-base font-extrabold text-[#0B1C3F]">
                    Under Secretary (IR-1)
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {isHindi ? 'अवर सचिव (IR-1)' : 'Right to Information Division, DOP&T'}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                      {isHindi ? 'कक्ष / विंग' : 'Room / Wing'}
                    </div>
                    <div className="text-xs font-bold text-[#0B1C3F]">
                      W/H 31049
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-2xs">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                      {isHindi ? 'भवन' : 'Building'}
                    </div>
                    <div className="text-xs font-bold text-[#0B1C3F]">
                      Kartvya Bhavan 3
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {isHindi ? 'कार्यालय पता' : 'Office Location'}
                  </div>
                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <span>Kartvya Bhavan 3, New Delhi - 110001</span>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {isHindi ? 'आधिकारिक ईमेल' : 'Official Escalation Email'}
                  </div>
                  <a 
                    href="mailto:usir-dopt@nic.in"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563EB] hover:underline break-all"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>Email: usir-dopt[at]nic[dot]in</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Self-Service Links */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold text-[#0B1C3F] uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-[#2563EB]" />
                <span>{isHindi ? 'त्वरित नागरिक सेवाएं' : 'Quick Citizen Tools'}</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/view-status"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-slate-700 hover:text-[#2563EB] transition-all font-semibold"
                >
                  <span>{isHindi ? 'स्थिति देखें' : 'View Status'}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/payment-reconciliation"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-slate-700 hover:text-[#2563EB] transition-all font-semibold"
                >
                  <span>{isHindi ? 'भुगतान समाधान' : 'Reconciliation'}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/first-appeal"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-slate-700 hover:text-[#2563EB] transition-all font-semibold"
                >
                  <span>{isHindi ? 'प्रथम अपील' : 'First Appeal'}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/faqs"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-slate-700 hover:text-[#2563EB] transition-all font-semibold"
                >
                  <span>{isHindi ? '26 FAQs' : '26 FAQs'}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1C3F] mb-1">
                {isHindi ? 'नागरिक सहायता संदेश भेजें' : 'Send an Inquiry / Grievance'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {isHindi 
                  ? 'पोर्टल या आवेदन संबंधी किसी भी समस्या के लिए अपना विवरण दर्ज करें। हमारी सहायता टीम त्वरित प्रतिक्रिया देगी।' 
                  : 'Fill out the form below and our nodal support desk will review and respond to your inquiry.'}
              </p>
            </div>

            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center my-4">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  {isHindi ? 'आपका संदेश सफलतापूर्वक प्राप्त हुआ!' : 'Inquiry Successfully Submitted!'}
                </h3>
                <p className="text-xs sm:text-sm text-green-800 font-normal max-w-md mx-auto leading-relaxed mb-6">
                  {isHindi
                    ? 'संदर्भ टिकट संख्या #RTI-INQ-2026-8941 दर्ज कर ली गई है। विवरण आपके पंजीकृत ईमेल पर भेज दिया गया है।'
                    : 'Reference Ticket #RTI-INQ-2026-8941 has been generated. Confirmation has been sent to your email.'}
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="bg-[#0B1C3F] hover:bg-[#152e60] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  {isHindi ? 'नया संदेश भेजें' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {isHindi ? 'पूरा नाम *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isHindi ? 'अपना नाम दर्ज करें' : 'Enter your name'}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {isHindi ? 'ईमेल आईडी *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {isHindi ? 'मोबाइल नंबर' : 'Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {isHindi ? 'पूछताछ का प्रकार' : 'Inquiry Category'}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-gray-800 cursor-pointer"
                    >
                      <option value="General Inquiry">{isHindi ? 'सामान्य पूछताछ (General Inquiry)' : 'General Inquiry'}</option>
                      <option value="Technical Support">{isHindi ? 'पोर्टल तकनीकी समस्या (Technical Issue)' : 'Portal Technical Issue'}</option>
                      <option value="Payment Issue">{isHindi ? 'भुगतान / समाधान समस्या (Payment Reconciliation)' : 'Payment / Reconciliation Issue'}</option>
                      <option value="First Appeal Assistance">{isHindi ? 'प्रथम अपील सहायता (First Appeal)' : 'First Appeal Assistance'}</option>
                      <option value="Public Authority Transfer">{isHindi ? 'लोक प्राधिकरण अंतरण (Authority Transfer Sec 6(3))' : 'Public Authority Transfer (Sec 6(3))'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    {isHindi ? 'संदेश / प्रश्न विवरण *' : 'Message / Issue Details *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isHindi ? 'कृपया अपने प्रश्न, पंजीकरण संख्या या समस्या का स्पष्ट विवरण दें...' : 'Please clearly describe your issue, transaction details, or registration number if applicable...'}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-gray-800 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-500">
                    {isHindi ? '* सभी अनिवार्य फ़ील्ड हैं' : '* Mandatory fields required'}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#0B1C3F] hover:bg-[#152e60] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isHindi ? 'संदेश जमा करें' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* DoPT / NIC Ownership Footer Note */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-1 leading-relaxed">
              <div className="font-semibold text-slate-700">
                {isHindi ? 'सामग्री स्वामित्व एवं प्रबंधन:' : 'Content Owned & Managed by:'} Department of Personnel & Training (DOP&T), Government of India
              </div>
              <div>
                {isHindi ? 'वेबसाइट डिजाइन, विकास एवं होस्टिंग:' : 'Website Designed, Developed & Hosted by:'} National Informatics Centre (NIC), New Delhi
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
