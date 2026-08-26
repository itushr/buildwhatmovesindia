'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApp } from '../../context/AppContext';
import { ShieldCheckIcon, DocumentTextIcon, ArrowRightIcon } from '../../components/Icons';

// Form validation schema using Zod
const rtiFormSchema = z.object({
  ministry: z.string().min(1, 'Please select a Public Authority / Ministry'),
  applicantName: z.string().min(2, 'Name must be at least 2 characters'),
  gender: z.enum(['male', 'female', 'third_gender'], { errorMap: () => ({ message: 'Please select gender' }) }),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  address: z.string().min(10, 'Complete address must be at least 10 characters'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit Pincode'),
  bplStatus: z.enum(['no', 'yes']),
  bplCardNo: z.string().optional(),
  queryText: z.string().min(20, 'Request text must be at least 20 characters').max(3000, 'Request text cannot exceed 3000 characters')
});

const PUBLIC_AUTHORITIES = [
  "Ministry of Home Affairs",
  "Ministry of Finance - Department of Revenue",
  "Ministry of Railways (Railway Board)",
  "Ministry of Education - Department of Higher Education",
  "Unique Identification Authority of India (UIDAI)",
  "Central Board of Direct Taxes (CBDT)",
  "Staff Selection Commission (SSC)",
  "Union Public Service Commission (UPSC)",
  "Reserve Bank of India (RBI)",
  "National Highways Authority of India (NHAI)"
];

export default function SubmitRequestPage() {
  const { t } = useApp();
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [registrationNo, setRegistrationNo] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(rtiFormSchema),
    defaultValues: {
      ministry: '',
      applicantName: '',
      gender: 'male',
      email: '',
      mobile: '',
      address: '',
      pincode: '',
      bplStatus: 'no',
      bplCardNo: '',
      queryText: ''
    }
  });

  const queryTextValue = watch('queryText', '');
  const isBpl = watch('bplStatus') === 'yes';

  const onSubmit = async (data) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setRegistrationNo(`DOPT/R/2026/${randomNum}`);
    setSubmittedSuccess(true);
  };

  return (
    <div className="w-full bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header Banner */}
        <div className="bg-[#0B1C3F] text-white rounded-t-xl p-6 sm:p-8 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <DocumentTextIcon className="w-8 h-8 text-[#60A5FA]" />
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Online RTI Request Form
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-normal">
            Submit an official Right to Information request under Section 6(1) of the RTI Act, 2005.
          </p>
        </div>

        {submittedSuccess ? (
          /* Confirmation State */
          <div className="bg-white border border-gray-200 rounded-b-xl p-8 sm:p-12 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0D8A44]">
              <ShieldCheckIcon className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0B1C3F] mb-2">
              RTI Request Successfully Submitted!
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Your RTI application has been filed and routed to the respective Nodal Officer.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 max-w-md mx-auto mb-8">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Registration Number
              </span>
              <span className="text-xl font-mono font-bold text-[#2563EB]">
                {registrationNo}
              </span>
            </div>
            <Link
              href="/"
              className="inline-block bg-[#0B1C3F] hover:bg-[#06152B] text-white px-8 py-3 rounded-lg font-semibold text-sm transition-colors cursor-pointer text-center"
            >
              Return to Portal Home
            </Link>
          </div>
        ) : (
          /* Main RTI Request Form */
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-b-xl p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Section 1: Public Authority */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-base font-bold text-[#0B1C3F] uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#2563EB] rounded-full inline-block"></span>
                Step 1: Select Public Authority
              </h2>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Public Authority / Ministry / Department <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('ministry')}
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                    errors.ministry ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Select Public Authority --</option>
                  {PUBLIC_AUTHORITIES.map((auth, idx) => (
                    <option key={idx} value={auth}>{auth}</option>
                  ))}
                </select>
                {errors.ministry && (
                  <p className="text-xs text-red-600 mt-1 font-medium">{errors.ministry.message}</p>
                )}
              </div>
            </div>

            {/* Section 2: Personal Details */}
            <div className="border-b border-gray-100 pb-6">
              <h2 className="text-base font-bold text-[#0B1C3F] uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#2563EB] rounded-full inline-block"></span>
                Step 2: Applicant Personal Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('applicantName')}
                    placeholder="Enter full legal name"
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                      errors.applicantName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.applicantName && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.applicantName.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('gender')}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="third_gender">Third Gender</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="name@example.com"
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.email.message}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('mobile')}
                    placeholder="10-digit mobile number"
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                      errors.mobile ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.mobile && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.mobile.message}</p>
                  )}
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Postal Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    {...register('address')}
                    placeholder="House/Flat No., Street, Area, City/District, State"
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.address.message}</p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('pincode')}
                    placeholder="6-digit Pincode"
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                      errors.pincode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pincode && (
                    <p className="text-xs text-red-600 mt-1 font-medium">{errors.pincode.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: RTI Request Details */}
            <div>
              <h2 className="text-base font-bold text-[#0B1C3F] uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#2563EB] rounded-full inline-block"></span>
                Step 3: Text for RTI Request Application
              </h2>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Request Text (Up to 3000 characters) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  {...register('queryText')}
                  placeholder="Clearly state the specific information, documents, records, or certified copies requested from the Public Authority..."
                  className={`w-full border rounded-lg p-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all ${
                    errors.queryText ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.queryText ? (
                    <p className="text-xs text-red-600 font-medium">{errors.queryText.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-gray-400 font-mono">
                    {queryTextValue.length} / 3000
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-8 py-3 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>{isSubmitting ? 'Submitting Application...' : 'File RTI Request'}</span>
                <ArrowRightIcon className="w-4 h-4 text-white" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
