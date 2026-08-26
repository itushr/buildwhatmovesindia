'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DottedWave from '../../components/DottedWave';
import { useApp } from '../../context/AppContext';
import { 
  Volume2,
  RefreshCw,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function LoginPage() {
  const { language, t } = useApp();
  const isHindi = language === 'hi';
  const loginT = t.login || {};

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRotating, setIsRotating] = useState(false);

  // Auth Success state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  const canvasRef = useRef(null);

  // Generate random 6-character captcha
  const generateRandomCaptcha = useCallback(() => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }, []);

  // Draw captcha on canvas with realistic noise, curves, and character rotations
  const drawCaptcha = useCallback((code) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fbfdf8');
    grad.addColorStop(0.5, '#fefce8');
    grad.addColorStop(1, '#f1f8ed');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Background random speckles / noise dots
    for (let i = 0; i < 55; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 120)}, ${Math.floor(
        Math.random() * 120
      )}, ${Math.floor(Math.random() * 120)}, ${0.15 + Math.random() * 0.25})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Disturbance curved lines
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(
        Math.random() * 100
      )}, ${Math.floor(Math.random() * 100)}, 0.45)`;
      ctx.lineWidth = 1.2 + Math.random();
      ctx.beginPath();
      ctx.moveTo(Math.random() * 20, Math.random() * height);
      ctx.bezierCurveTo(
        width * 0.3,
        Math.random() * height,
        width * 0.7,
        Math.random() * height,
        width - Math.random() * 20,
        Math.random() * height
      );
      ctx.stroke();
    }

    // Draw characters with distinct rotations and colors
    const chars = code.split('');
    const charWidth = width / (chars.length + 1.2);
    ctx.font = 'bold 26px "Courier New", "Lucida Console", monospace';
    ctx.textBaseline = 'middle';

    const colors = ['#0f172a', '#1e3a8a', '#14532d', '#701a75', '#1e293b', '#0369a1'];

    chars.forEach((char, index) => {
      ctx.save();
      const x = (index + 0.8) * charWidth;
      const y = height / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 28 - 14) * (Math.PI / 180);
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillText(char, -8, 0);
      ctx.restore();
    });
  }, []);

  // Initialize or refresh Captcha
  const refreshCaptcha = useCallback(() => {
    setIsRotating(true);
    const newCode = generateRandomCaptcha();
    setCaptchaCode(newCode);
    setTimeout(() => {
      drawCaptcha(newCode);
      setIsRotating(false);
    }, 50);
  }, [generateRandomCaptcha, drawCaptcha]);

  useEffect(() => {
    let timer = setTimeout(() => {
      refreshCaptcha();
    }, 0);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [refreshCaptcha]);

  // Audio Captcha Text-To-Speech
  const handleAudioCaptcha = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    setIsSpeaking(true);

    // Phonetic / individual character readout
    const spelled = captchaCode
      .split('')
      .map((c) => (c === c.toUpperCase() && isNaN(c) ? `Capital ${c}` : c))
      .join(', ');

    const utterance = new SpeechSynthesisUtterance(`Security code is: ${spelled}`);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Reset form action
  const handleReset = () => {
    setUsername('');
    setPassword('');
    setSecurityCode('');
    setErrorMessage('');
    refreshCaptcha();
  };

  // Submit Citizen Login form
  const handleCitizenSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage(loginT.errorEmptyUsername || 'Please enter your username.');
      return;
    }

    if (!password) {
      setErrorMessage(loginT.errorEmptyPassword || 'Please enter your password.');
      return;
    }

    if (!securityCode.trim()) {
      setErrorMessage(loginT.errorEmptyCaptcha || 'Please enter the security code.');
      return;
    }

    // Case-insensitive verification
    if (securityCode.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMessage(
        loginT.errorInvalidCaptcha || 'Security code does not match. Please try again.'
      );
      setSecurityCode('');
      refreshCaptcha();
      return;
    }

    // Login successful
    setLoggedInUser(username.trim());
    setIsLoggedIn(true);
  };

  return (
    <div className="w-full min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-12 font-sans relative overflow-hidden bg-gradient-to-b from-[#EDF5FD] via-[#F3F7FD] to-[#F8FAFC]">
      {/* Full-Page Dotted Background */}
      <DottedWave />

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Breadcrumb Trail */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2563EB] transition-colors shrink-0">
            {loginT.breadcrumbHome || (isHindi ? 'मुख्य पृष्ठ' : 'Home')}
          </Link>
          <span className="text-slate-300 shrink-0">&gt;</span>
          <span className="font-semibold text-slate-800 shrink-0">
            {loginT.breadcrumbLogin || (isHindi ? 'लॉग इन' : 'Login')}
          </span>
        </div>

        {/* Header Hero Area */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto pt-2 pb-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1C3F] tracking-tight mb-2">
            {isHindi ? 'नागरिक लॉगिन' : 'Citizen Login'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto leading-relaxed">
            {isHindi
              ? 'अपने पूर्व RTI आवेदनों की स्थिति ट्रैक करने या नया विवरण देखने के लिए लॉगिन करें।'
              : 'Access your submitted RTI applications, monitor statutory timelines, and manage your requests.'}
          </p>
        </div>

        {/* Main Citizen Login Card Container */}
        <div className="w-full mx-auto pb-12 pt-1">
          <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-sm">
            {isLoggedIn ? (
              /* Success State */
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {loginT.authSuccessTitle || (isHindi ? 'लॉगिन सफल!' : 'Authentication Successful!')}
                </h3>
                <p className="text-xs font-medium text-slate-600 mb-1">
                  {isHindi ? `स्वागत है, ${loggedInUser}` : `Welcome back, ${loggedInUser}`}
                </p>
                <p className="text-xs text-slate-400 mb-6">
                  {loginT.authSuccessDesc || (isHindi ? 'आपको संबंधित डैशबोर्ड पर भेजा जा रहा है...' : 'Redirecting to your dashboard...')}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Link
                    href="/"
                    className="bg-[#0B1C3F] hover:bg-[#152e60] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all"
                  >
                    {loginT.returnHomeBtn || (isHindi ? 'मुख्य पृष्ठ पर जाएं' : 'Return to Home')}
                  </Link>
                  <Link
                    href="/view-status"
                    className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all"
                  >
                    {isHindi ? 'आवेदन स्थिति देखें' : 'View Submitted Requests'}
                  </Link>
                </div>
              </div>
            ) : (
              /* CITIZEN LOGIN (Exact reference image fields) */
              <div>
                {/* Heading & Mandatory Note */}
                <div className="mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1a56db] tracking-tight mb-1">
                    {loginT.pageTitle || 'Citizen Login'}
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    Note:Fields marked with <span className="text-red-600 font-bold">*</span> are Mandatory.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs font-semibold text-red-700"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Form matching Government Reference Layout */}
                <form onSubmit={handleCitizenSubmit} className="space-y-4" suppressHydrationWarning>
                  <div className="border border-slate-300 rounded-xl p-5 sm:p-6 bg-slate-50/40 space-y-4" suppressHydrationWarning>
                    
                    {/* Enter Username Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <label className="sm:w-44 text-xs sm:text-sm font-medium text-gray-800 shrink-0">
                        <span className="text-red-600 font-bold mr-1">*</span>
                        {loginT.enterUsername || 'Enter Username'}
                      </label>
                      <div className="flex-1">
                        <input
                          type="text"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="e.g. citizen_user or email"
                          autoComplete="username"
                          suppressHydrationWarning
                          className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-gray-400/90 rounded-md outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-gray-800 shadow-2xs font-medium"
                        />
                      </div>
                    </div>

                    {/* Enter Password Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <label className="sm:w-44 text-xs sm:text-sm font-medium text-gray-800 shrink-0">
                        <span className="text-red-600 font-bold mr-1">*</span>
                        {loginT.enterPassword || 'Enter Password'}
                      </label>
                      <div className="flex-1 relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          suppressHydrationWarning
                          className="w-full text-xs sm:text-sm px-3 py-2 pr-9 bg-white border border-gray-400/90 rounded-md outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-gray-800 shadow-2xs font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                          tabIndex={-1}
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Captcha Image Display Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="sm:w-44 shrink-0 hidden sm:block"></div>
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-2 p-1.5 bg-yellow-50/70 border border-yellow-300/80 rounded-md shadow-2xs">
                          <canvas
                            ref={canvasRef}
                            width={180}
                            height={44}
                            className="rounded border border-yellow-400/80 bg-white"
                            title="Captcha Security Code"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Enter Security Code Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                      <label className="sm:w-44 text-xs sm:text-sm font-medium text-gray-800 shrink-0 pt-1.5">
                        <span className="text-red-600 font-bold mr-1">*</span>
                        {loginT.enterSecurityCode || 'Enter Security code'}
                      </label>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="text"
                            required
                            maxLength={8}
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                            placeholder="Enter Code"
                            autoComplete="off"
                            suppressHydrationWarning
                            className="w-36 text-xs sm:text-sm px-3 py-2 bg-white border border-gray-400/90 rounded-md outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-gray-800 shadow-2xs font-bold tracking-wider"
                          />
                          <span className="text-[11px] sm:text-xs font-semibold text-red-600">
                            {loginT.caseInsensitiveNote || '(All Characters are Case Insensitive)'}
                          </span>
                        </div>

                        {/* Captcha Refresh & Audio Buttons */}
                        <div className="text-[11px] sm:text-xs text-slate-600 flex items-center flex-wrap gap-2 pt-0.5">
                          <span>
                            {loginT.cantReadCaptcha || "Can't read the image?"}{' '}
                            <button
                              type="button"
                              onClick={refreshCaptcha}
                              className="text-[#1a56db] font-bold underline hover:text-blue-800 cursor-pointer inline-flex items-center gap-1"
                            >
                              <span>{loginT.hereText || 'click here'}</span>
                              <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
                            </button>{' '}
                            {loginT.toRefresh || 'to refresh'}
                          </span>
                        </div>

                        {/* Speaker Button */}
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={handleAudioCaptcha}
                            className={`p-1.5 rounded-md border text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs text-xs font-medium ${
                              isSpeaking ? 'ring-2 ring-blue-500 border-blue-500 text-[#2563EB] bg-blue-50' : 'border-gray-300'
                            }`}
                            title={loginT.audioCaptchaAlt || 'Listen to security code audio'}
                          >
                            <Volume2 className={`w-4 h-4 text-slate-700 ${isSpeaking ? 'animate-pulse text-[#2563EB]' : ''}`} />
                            <span className="text-[11px] text-slate-600 font-medium">Audio Captcha</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Submit & Reset Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2 border-t border-slate-200">
                      <div className="sm:w-44 shrink-0 hidden sm:block"></div>
                      <div className="flex items-center gap-3">
                        <button
                          type="submit"
                          className="bg-[#3b82f6] hover:bg-[#2563eb] active:bg-[#1d4ed8] text-white px-6 py-2 rounded-md text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
                        >
                          {loginT.submitBtn || 'Submit'}
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="bg-[#60a5fa] hover:bg-[#3b82f6] active:bg-[#2563eb] text-white px-6 py-2 rounded-md text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
                        >
                          {loginT.resetBtn || 'Reset'}
                        </button>
                      </div>
                    </div>

                  </div>
                </form>

                {/* Additional Useful Portal Links */}
                <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <Link
                    href="/submit-request"
                    className="text-[#2563EB] hover:underline font-semibold"
                  >
                    {loginT.newUserRegistration || 'Sign Up (New User)'}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      alert(isHindi ? 'पासवर्ड रीसेट करने के लिए कृपया अपने नोडल विभाग या हेल्पडेस्क (helprtionline-dopt@nic.in) से संपर्क करें।' : 'To reset your password, please contact the RTI Helpdesk at helprtionline-dopt@nic.in.');
                    }}
                    className="text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
                  >
                    {loginT.forgotPassword || 'Forgot Password?'}
                  </button>
                </div>
              </div>
            )}

            {/* Guest Filing Prompt */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                {loginT.guestModePrompt || (isHindi ? 'बिना लॉगिन के तुरंत आवेदन करना चाहते हैं?' : 'Want to file an RTI without signing in?')}
              </p>
              <Link
                href="/submit-request"
                className="text-xs font-bold text-[#2563EB] hover:underline mt-1 inline-block"
              >
                {loginT.guestModeLink || (isHindi ? 'अतिथि मोड में RTI आवेदन करें →' : 'Continue to File an RTI as Guest →')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
