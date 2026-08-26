'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export const dictionary = {
  en: {
    header: {
      govTextHi: "भारत सरकार",
      govTextEn: "Government of India",
      screenReader: "Screen Reader Access",
      title: "RTI Information Access Portal",
      subtitle: "An Initiative under the Right to Information Act, 2005",
      nav: {
        home: "Home",
        getInformation: "Get Information",
        fileRTI: "File an RTI",
        guide: "RTI Guide",
        faqs: "FAQs",
        contact: "Contact Us",
        login: "Login"
      },
      langLabel: "English"
    },
    hero: {
      headingLine1: "Information is your Right.",
      headingLine2: "We make it Accessible.",
      subtitle: "Search public information or file an RTI with ease.",
      stats: {
        requestsReceived: "Requests Received",
        replyPercentage: "Reply Percentage",
        publicAuthorities: "Public Authorities",
        onlinePortal: "Online Portal"
      }
    },
    searchBar: {
      placeholder: "Search public information or file an RTI",
      button: "Search",
      prompts: [
        "What information are you looking for?",
        "Try 'Road repair budget in Ward 12'...",
        "Try 'PM Awas Yojana beneficiary list'...",
        "Try 'Municipal tenders & fund allocation'...",
        "Try 'RTI response timeline & first appeal'...",
        "Search 28,000+ public authorities across India..."
      ]
    },
    howItWorks: {
      heading: "How It Works",
      step1Title: "1. Search / Ask",
      step1Desc: "Find information from public sources.",
      step2Title: "2. Get Results",
      step2Desc: "View answers with source documents.",
      step3Title: "3. File RTI (if needed)",
      step3Desc: "Request information with assistant guidance."
    },
    workflowSplash: {
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
    },
    mainActions: {
      sectionBadge: "Citizen Access Pathways",
      heading: "Choose How You Want to Access Information",
      subtitle: "Search proactively published public records for free, or submit a formal statutory request under the RTI Act, 2005.",
      or: "or",
      tip: "Pro Tip: Most municipal budgets, beneficiary lists, and audit reports are already in public disclosures. Search first to save time.",
      getInformation: {
        badge: "Instant Access • ₹0 Fee",
        title: "Get Information",
        subtitle: "Public Domain & Open Disclosures",
        desc: "Discover government records, audit reports, civic budgets, scheme beneficiaries, and gazettes already available in the public domain.",
        features: [
          "Instant access with zero waiting period",
          "100% Free — no RTI application fee or stamp required",
          "Search 28,000+ public authorities nationwide"
        ],
        btn: "Search Public Records",
        note: "Recommended first step"
      },
      fileRTI: {
        badge: "Statutory 30-Day Resolution",
        title: "File an RTI Application",
        subtitle: "Formal Request under Section 6(1)",
        desc: "If the required records are not published publicly, draft and submit an official RTI request directly to the concerned Public Information Officer (CPIO/PIO).",
        features: [
          "Legally mandated response within 30 statutory days",
          "Assisted authority selection & Section 6(1) drafting",
          "Real-time SMS/Email status tracking & First Appeal support"
        ],
        btn: "File an RTI Application",
        note: "Statutory ₹10 fee"
      }
    },
    trust: {
      heading: "Built for Citizen Security & Statutory Compliance",
      subtitle: "Ensuring user privacy, statutory RTI timelines, and open access for every citizen across India.",
      cards: {
        security: {
          title: "Data Security & Privacy",
          desc: "Personal details and application records are encrypted and protected under national data governance standards."
        },
        statutory: {
          title: "Statutory Mandate",
          desc: "All information requests are processed directly under the statutory provisions of the Right to Information Act, 2005."
        },
        timeBound: {
          title: "Time-Bound Resolution",
          desc: "Statutory response tracking designed to fulfill public information requests within the legal 30-day timeline."
        },
        accessibility: {
          title: "Universal Accessibility",
          desc: "Engineered for all citizens with screen reader accessibility, multi-language support, and low-bandwidth optimization."
        }
      },
      hallmarkLeft: "Right to Information Access Portal • Government of India Initiative",
      hallmarkRight: "Official Public Information Service"
    },
    footer: {
      portalTitle: "RTI Information Access Portal",
      govIndia: "Government of India",
      tagline: "Empowering citizens through transparency and accountability in public governance under the Right to Information Act, 2005.",
      quickLinks: "Quick Links",
      resources: "Resources",
      contactSupport: "Contact Support",
      address: "Kartvya Bhavan 3, New Delhi - 110001",
      phone: "011-24010690 / 691 (Helpline)",
      email: "helprtionline-dopt@nic.in",
      hours: "Mon - Sat: 9:30 AM - 5:30 PM",
      copyright: "© 2026 Government of India. All rights reserved.",
      links: {
        home: "Home",
        fileRTI: "File an RTI",
        myRequests: "My Requests",
        help: "Help & FAQs",
        contactUs: "Contact Us",
        act: "RTI Act, 2005",
        rules: "RTI Rules & Guidelines",
        cic: "Central Information Commission",
        cpgrams: "CPGRAMS Portal",
        directory: "Public Authorities Directory",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        accessibility: "Accessibility Statement"
      }
    },
    submitRequest: {
      breadcrumbHome: "Home",
      breadcrumbCurrent: "File an RTI",
      pageTitle: "File an RTI",
      pageSubtitle: "Submit your request to access public information held by public authorities under the RTI Act, 2005.",
      needHelpTitle: "Need Help?",
      needHelpDesc: "Read our step-by-step guide on how to file an RTI.",
      viewGuideBtn: "View Guide",
      stepper: {
        step1: "Select Authority",
        step2: "Request Details",
        step3: "Applicant Details",
        step4: "Review & Submit"
      },
      authorityTitle: "1. SELECT PUBLIC AUTHORITY",
      mandatoryTag: "MANDATORY SELECTION",
      quickSearchLabel: "QUICK SEARCH DEPARTMENT / MINISTRY",
      quickSearchPlaceholder: "Search 28,000+ Public Authorities (e.g. Railway Board, CBDT, UIDAI)...",
      quickSearchNotice: "Type to filter or pick from official categories",
      ministryLabel: "MINISTRY / DEPARTMENT",
      ministryPlaceholder: "-- Select Ministry / Department --",
      publicAuthLabel: "SPECIFIC PUBLIC AUTHORITY / SUB-ORGAN",
      publicAuthPlaceholder: "-- Select Public Authority --",
      personalTitle: "2. APPLICANT PERSONAL DETAILS",
      digilockerBtn: "Auto-Fill via DigiLocker",
      digilockerVerified: "✓ DigiLocker Verified",
      fullNameLabel: "FULL NAME (AS PER GOVT ID)",
      fullNamePlaceholder: "Enter full legal name",
      genderLabel: "GENDER",
      genders: {
        male: "Male",
        female: "Female",
        third_gender: "Third Gender"
      },
      emailLabel: "EMAIL ADDRESS (FOR OFFICIAL ALERTS)",
      emailPlaceholder: "name@example.com",
      mobileLabel: "MOBILE NUMBER (10-DIGIT)",
      mobilePlaceholder: "Enter 10-digit mobile number",
      postalAddressLabel: "POSTAL ADDRESS",
      postalAddressPlaceholder: "House/Flat No., Street, Area, City/District, State",
      pincodeLabel: "PINCODE (6-DIGIT)",
      pincodePlaceholder: "Enter 6-digit pincode",
      bplTitle: "3. BPL & SUPPORTING DOCUMENTS",
      bplQuestion: "ARE YOU APPLYING UNDER BELOW POVERTY LINE (BPL) CATEGORY?",
      bplNo: "No (Statutory Fee Applicable ₹10)",
      bplYes: "Yes (Fee Exempted ₹0)",
      bplCardNoLabel: "BPL CARD / RATION CARD NUMBER",
      bplCardNoPlaceholder: "Enter BPL Card Number",
      bplUploadLabel: "UPLOAD BPL PROOF (PDF/IMAGE)",
      rtiTextTitle: "4. RTI APPLICATION TEXT",
      rtiTextLabel: "TEXT FOR RTI REQUEST APPLICATION",
      rtiTextPlaceholder: "Clearly describe the specific information, public records, certified copies, or decision records requested under Section 6(1)...",
      maxChars: "Max 3000 characters",
      cancelBtn: "Cancel",
      saveContinueBtn: "Save & Continue",
      submittingBtn: "Submitting...",
      trackTitle: "Track Your Existing RTI Request",
      trackSubtitle: "Enter your registration number to check the status of your existing RTI request.",
      trackPlaceholder: "Enter Registration Number (e.g. RTI202400000)",
      trackBtn: "Track Status",
      feeDetailsTitle: "RTI Fee Details",
      applicationFeeLabel: "Application Fee",
      modeOfPaymentTitle: "Mode of Payment",
      modeOfPaymentDesc: "You will be able to pay securely through online payment options.",
      paymentModes: {
        upi: "UPI",
        card: "Debit / Credit Card",
        netbanking: "Net Banking",
        wallets: "Wallets"
      },
      infoTitle: "Information",
      infoList: [
        "Fields marked with * are mandatory.",
        "The standard RTI fee is ₹10.",
        "You will receive updates on your email and mobile.",
        "Typical response time is 30 days."
      ],
      sampleFormatsTitle: "Sample RTI Formats",
      sampleFormatsDesc: "Download sample RTI application formats.",
      downloadPdf: "Download PDF",
      downloadWord: "Download Word",
      relatedLinksTitle: "Related Links",
      links: {
        act: "RTI Act, 2005",
        rules: "RTI Rules",
        authorities: "Public Authorities",
        guide: "RTI Forms & Guide"
      },
      actions: {
        viewAct: "View Act",
        viewRules: "View Rules",
        viewList: "View List",
        viewGuide: "View Guide"
      },
      success: {
        breadcrumbSubmitted: "Request Submitted",
        pageHeaderTitle: "Request Submitted",
        pageHeaderSubtitle: "Your RTI application has been formally recorded and assigned to the nodal public authority.",
        statutoryBadge: "Statutory Acknowledgement",
        title: "RTI Request Successfully Submitted!",
        subtitle: "Your RTI application has been registered and forwarded to the respective Nodal Public Information Officer.",
        regNoLabel: "REGISTRATION NUMBER",
        copyBtn: "Copy Registration No.",
        copied: "Copied!",
        printBtn: "Print Receipt",
        homeBtn: "Return to Portal Home",
        summaryTitle: "Request Summary",
        labels: {
          requestDate: "Request Date",
          applicantName: "Name of Applicant",
          email: "Email Address",
          mobile: "Mobile Number",
          publicAuth: "Public Authority",
          requestSubject: "Request Subject",
          requestDesc: "Request Description",
          paymentMode: "Payment Mode",
          amountPaid: "Amount Paid",
          transactionId: "Payment Transaction ID",
          status: "Status",
          submitted: "Submitted"
        },
        timelineTitle: "What Happens Next?",
        timeline: [
          {
            title: "Request Submitted",
            desc: "Your application has been successfully submitted."
          },
          {
            title: "Request Under Process",
            desc: "The Public Information Officer (PIO) will review your request.",
            badge: "Within 30 days"
          },
          {
            title: "You Will Receive a Response",
            desc: "The information will be sent to your registered email address.",
            badge: "On or before 30 days"
          }
        ],
        importantTitle: "Important Information",
        importantCards: [
          {
            title: "Standard Response Time",
            desc: "You will receive a response within 30 days from the date of submission."
          },
          {
            title: "Track Your Request",
            desc: "You can track the status of your request using the registration number."
          },
          {
            title: "Citizen Support & Helpline",
            desc: "For inquiries, contact helprtionline-dopt@nic.in or call Toll-Free 1800-11-4000."
          }
        ]
      }
    },
    notFound: {
      code: "404",
      title: "Page Not Found",
      description: "The page you are looking for doesn't exist or has been moved.",
      buttonText: "Go to Home"
    },
    login: {
      breadcrumbHome: "Home",
      breadcrumbLogin: "Login",
      portalBadge: "Secure Citizen & Nodal Officer Portal",
      pageTitle: "Citizen Login",
      pageSubtitle: "Access your submitted RTI applications, monitor statutory timelines, or sign in as a Public Information Officer.",
      mandatoryNote: "Note:Fields marked with * are Mandatory.",
      tabCitizen: "Citizen Login",
      tabCitizenOtp: "Mobile OTP Login",
      tabOfficer: "Officer / PIO",
      enterUsername: "Enter Username",
      enterPassword: "Enter Password",
      enterSecurityCode: "Enter Security code",
      caseInsensitiveNote: "(All Characters are Case Insensitive)",
      cantReadCaptcha: "Can't read the image? click",
      hereText: "here",
      toRefresh: "to refresh",
      audioCaptchaAlt: "Play audio security code",
      submitBtn: "Submit",
      resetBtn: "Reset",
      forgotPassword: "Forgot Password?",
      newUserRegistration: "Sign Up (New User)",
      mobileNumberLabel: "Mobile Number (10 digits)",
      sendOtpBtn: "Send OTP",
      enterOtpLabel: "Enter 6-Digit OTP",
      verifyOtpBtn: "Verify OTP & Sign In",
      officerEmailLabel: "Gov Email / NIC Username",
      officerPasswordLabel: "Portal Password",
      officerLoginBtn: "Sign in as PIO Officer",
      authSuccessTitle: "Authentication Successful!",
      authSuccessDesc: "Redirecting to your dashboard...",
      returnHomeBtn: "Return to Home",
      guestModePrompt: "Want to file an RTI without signing in?",
      guestModeLink: "Continue to File an RTI as Guest →",
      errorEmptyUsername: "Please enter your username.",
      errorEmptyPassword: "Please enter your password.",
      errorEmptyCaptcha: "Please enter the security code.",
      errorInvalidCaptcha: "Security code does not match. Please try again."
    }
  },
  hi: {
    header: {
      govTextHi: "भारत सरकार",
      govTextEn: "Government of India",
      screenReader: "स्क्रीन रीडर सुविधा",
      title: "सूचना का अधिकार पोर्टल",
      subtitle: "सूचना का अधिकार अधिनियम, 2005 के अंतर्गत एक पहल",
      nav: {
        home: "मुख्य पृष्ठ",
        getInformation: "सूचना प्राप्त करें",
        fileRTI: "RTI आवेदन करें",
        guide: "RTI मार्गदर्शिका",
        faqs: "सामान्य प्रश्न",
        contact: "संपर्क करें",
        login: "लॉग इन"
      },
      langLabel: "हिन्दी"
    },
    hero: {
      headingLine1: "आपका अधिकार, आपकी सूचना।",
      headingLine2: "पारदर्शी, सहज और सुलभ।",
      subtitle: "सार्वजनिक जानकारी खोजें या सरलता से RTI आवेदन दर्ज करें।",
      stats: {
        requestsReceived: "प्राप्त कुल आवेदन",
        replyPercentage: "निवारण एवं जवाब दर",
        publicAuthorities: "संबद्ध लोक प्राधिकरण",
        onlinePortal: "24/7 ऑनलाइन सेवा"
      }
    },
    searchBar: {
      placeholder: "सार्वजनिक जानकारी खोजें या RTI आवेदन करें",
      button: "खोजें",
      prompts: [
        "आप किस जानकारी की तलाश कर रहे हैं?",
        "जैसे: 'वार्ड 12 में सड़क मरम्मत का बजट'...",
        "जैसे: 'पीएम आवास योजना लाभार्थी सूची'...",
        "जैसे: 'नगर निगम टेंडर एवं फंड आवंटन'...",
        "जैसे: 'RTI जवाब की समय-सीमा एवं प्रथम अपील'...",
        "देश भर के 28,000+ लोक प्राधिकरणों में खोजें..."
      ]
    },
    howItWorks: {
      heading: "आवेदन की सरल प्रक्रिया",
      step1Title: "1. खोजें या प्रश्न पूछें",
      step1Desc: "सार्वजनिक स्रोतों और अभिलेखों से तुरंत जानकारी प्राप्त करें।",
      step2Title: "2. परिणाम एवं दस्तावेज देखें",
      step2Desc: "प्रमाणिक सरकारी दस्तावेजों के साथ सटीक उत्तर देखें।",
      step3Title: "3. RTI दर्ज करें (आवश्यकता होने पर)",
      step3Desc: "स्मार्ट सहायक के मार्गदर्शन में सीधे ऑनलाइन RTI आवेदन जमा करें।"
    },
    workflowSplash: {
      badge: "नागरिक मार्गदर्शिका",
      title: "पोर्टल की कार्यप्रणाली",
      subtitle: "पहले सार्वजनिक रिकॉर्ड में निःशुल्क खोजें। सार्वजनिक क्षेत्र में जानकारी उपलब्ध न होने पर ही औपचारिक RTI आवेदन दर्ज करें।",
      step1Title: "1. खोजें या प्रश्न पूछें",
      step1Desc: "सार्वजनिक डेटाबेस और लोक प्राधिकरणों में खोजें।",
      step2Title: "2. सार्वजनिक रिकॉर्ड (₹0)",
      step2Desc: "बिना किसी शुल्क के प्रकाशित सरकारी दस्तावेज तुरंत प्राप्त करें।",
      step3Title: "3. RTI दर्ज करें",
      step3Desc: "RTI अधिनियम, 2005 के तहत औपचारिक आवेदन जमा करें।",
      getInformationBox: {
        title: "सार्वजनिक क्षेत्र में उपलब्ध",
        tag: "₹0 • आवेदन की आवश्यकता नहीं",
        desc: "स्वतः प्रकटीकरण के तहत पहले से उपलब्ध रिकॉर्ड और आंकड़े बिना किसी शुल्क के तुरंत देखे और डाउनलोड किए जा सकते हैं।",
        btn: "सूचना खोजें"
      },
      fileRTIBox: {
        title: "सार्वजनिक रूप से अनुपलब्ध",
        tag: "30-दिवसीय वैधानिक समय-सीमा",
        desc: "यदि आवश्यक दस्तावेज सार्वजनिक रूप से उपलब्ध नहीं हैं, तो सीधे संबंधित नोडल अधिकारी को नया RTI आवेदन जमा करें।",
        btn: "RTI आवेदन करें"
      },
      dontShowAgain: "शुरुआत में दोबारा न दिखाएं",
      floatingBtn: "पोर्टल की कार्यप्रणाली",
      closeBtn: "मार्गदर्शिका बंद करें"
    },
    mainActions: {
      sectionBadge: "नागरिक सूचना मार्ग",
      heading: "सूचना प्राप्त करने का उचित माध्यम चुनें",
      subtitle: "सार्वजनिक क्षेत्र में पहले से उपलब्ध अभिलेख तुरंत निःशुल्क खोजें, अथवा RTI अधिनियम, 2005 के तहत औपचारिक आवेदन दर्ज करें।",
      or: "अथवा",
      tip: "सलाह: अधिकांश नगर निगम बजट, लाभार्थी सूचियां और ऑडिट रिपोर्ट पहले से सार्वजनिक हैं। समय बचाने के लिए पहले खोजें।",
      getInformation: {
        badge: "तुरंत उपलब्धता • ₹0 शुल्क",
        title: "सूचना प्राप्त करें",
        subtitle: "सार्वजनिक प्रकटीकरण एवं खुले अभिलेख",
        desc: "सार्वजनिक क्षेत्र में पहले से उपलब्ध सरकारी अभिलेख, ऑडिट रिपोर्ट, वार्ड बजट, लाभार्थी सूचियां एवं राजपत्र तुरंत खोजें।",
        features: [
          "बिना किसी प्रतीक्षा के तुरंत 0 सेकंड में उपलब्धता",
          "100% निःशुल्क — किसी आवेदन शुल्क या स्टाम्प की आवश्यकता नहीं",
          "देश भर के 28,000+ लोक प्राधिकरणों के डेटा में खोज"
        ],
        btn: "सार्वजनिक अभिलेख खोजें",
        note: "अनुशंसित पहला कदम"
      },
      fileRTI: {
        badge: "30 दिनों में वैधानिक निवारण",
        title: "RTI आवेदन दर्ज करें",
        subtitle: "धारा 6(1) के तहत औपचारिक आवेदन",
        desc: "यदि आवश्यक जानकारी सार्वजनिक रूप से उपलब्ध नहीं है, तो संबंधित लोक सूचना अधिकारी (CPIO/PIO) को आधिकारिक RTI आवेदन जमा करें।",
        features: [
          "कानूनी रूप से 30 दिनों की समय-सीमा में अनिवार्य उत्तर",
          "सहायता-युक्त ड्राफ्टिंग एवं संबंधित प्राधिकरण का चयन",
          "एसएमएस/ईमेल द्वारा लाइव ट्रैकिंग एवं प्रथम अपील की सुविधा"
        ],
        btn: "RTI आवेदन शुरू करें",
        note: "नाममात्र वैधानिक शुल्क (₹10)"
      }
    },
    trust: {
      heading: "नागरिक सुरक्षा एवं वैधानिक अनुपालन हेतु प्रतिबद्ध",
      subtitle: "उपयोगकर्ता की गोपनीयता, तय समय-सीमा में जवाब और भारत के प्रत्येक नागरिक के लिए पारदर्शी पहुँच सुनिश्चित करना।",
      cards: {
        security: {
          title: "डेटा सुरक्षा एवं गोपनीयता",
          desc: "आपकी व्यक्तिगत जानकारी और आवेदन रिकॉर्ड राष्ट्रीय डेटा सुरक्षा मानकों के तहत पूर्णतः सुरक्षित एवं एन्क्रिप्टेड हैं।"
        },
        statutory: {
          title: "संवैधानिक एवं वैधानिक अधिकार",
          desc: "सभी सूचना आवेदनों पर केवल सूचना का अधिकार अधिनियम, 2005 के कानूनी प्रावधानों के तहत कार्रवाई की जाती है।"
        },
        timeBound: {
          title: "समय-बद्ध निवारण",
          desc: "कानूनी रूप से निर्धारित 30 दिनों की समय-सीमा के भीतर सूचना प्रदान करने के लिए स्वचालित ट्रैकिंग व्यवस्था।"
        },
        accessibility: {
          title: "सर्वव्यापी सुलभता",
          desc: "स्क्रीन रीडर सहायता, बहुभाषी विकल्प और कम इंटरनेट स्पीड में भी सुचारू संचालन के साथ सभी नागरिकों के लिए निर्मित।"
        }
      },
      hallmarkLeft: "सूचना का अधिकार पोर्टल • भारत सरकार की एक पहल",
      hallmarkRight: "आधिकारिक जन सूचना सेवा"
    },
    footer: {
      portalTitle: "सूचना का अधिकार पोर्टल",
      govIndia: "भारत सरकार",
      tagline: "सूचना का अधिकार अधिनियम, 2005 के माध्यम से सार्वजनिक शासन में पारदर्शिता और जवाबदेही लाकर नागरिकों को सशक्त बनाना।",
      quickLinks: "त्वरित लिंक",
      resources: "महत्वपूर्ण संसाधन",
      contactSupport: "सहायता एवं संपर्क",
      address: "कर्तव्य भवन 3, नई दिल्ली - 110001",
      phone: "011-24010690 / 691 (हेल्पलाइन)",
      email: "helprtionline-dopt@nic.in",
      hours: "सोमवार - शनिवार: सुबह 9:30 - शाम 5:30",
      copyright: "© 2026 भारत सरकार। सर्वाधिकार सुरक्षित।",
      links: {
        home: "मुख्य पृष्ठ",
        fileRTI: "RTI आवेदन करें",
        myRequests: "मेरे आवेदन",
        help: "सहायता एवं प्रश्न",
        contactUs: "संपर्क करें",
        act: "RTI अधिनियम, 2005",
        rules: "RTI नियम एवं दिशा-निर्देश",
        cic: "केंद्रीय सूचना आयोग (CIC)",
        cpgrams: "CPGRAMS शिकायत पोर्टल",
        directory: "लोक प्राधिकरण निर्देशिका",
        privacy: "गोपनीयता नीति",
        terms: "उपयोग की शर्तें",
        accessibility: "सुलभता घोषणा पत्र"
      }
    },
    submitRequest: {
      breadcrumbHome: "मुख्य पृष्ठ",
      breadcrumbCurrent: "RTI आवेदन करें",
      pageTitle: "RTI आवेदन दर्ज करें",
      pageSubtitle: "सूचना का अधिकार अधिनियम, 2005 के तहत लोक प्राधिकरणों के पास उपलब्ध सार्वजनिक जानकारी प्राप्त करने के लिए अपना आवेदन जमा करें।",
      needHelpTitle: "सहायता चाहिए?",
      needHelpDesc: "RTI आवेदन करने के लिए चरण-दर-चरण मार्गदर्शिका पढ़ें।",
      viewGuideBtn: "मार्गदर्शिका देखें",
      stepper: {
        step1: "प्राधिकरण चुनें",
        step2: "आवेदन विवरण",
        step3: "आवेदक का विवरण",
        step4: "समीक्षा एवं जमा करें"
      },
      authorityTitle: "1. लोक प्राधिकरण चुनें",
      mandatoryTag: "अनिवार्य चयन",
      quickSearchLabel: "विभाग या मंत्रालय में त्वरित खोज",
      quickSearchPlaceholder: "28,000+ लोक प्राधिकरणों में खोजें (जैसे रेलवे बोर्ड, CBDT, UIDAI)...",
      quickSearchNotice: "श्रेणियों में खोजने के लिए टाइप करें या आधिकारिक श्रेणियों में से चुनें",
      ministryLabel: "मंत्रालय / विभाग",
      ministryPlaceholder: "-- मंत्रालय या विभाग चुनें --",
      publicAuthLabel: "विशिष्ट लोक प्राधिकरण / अधीनस्थ निकाय",
      publicAuthPlaceholder: "-- लोक प्राधिकरण चुनें --",
      personalTitle: "2. आवेदक का व्यक्तिगत विवरण",
      digilockerBtn: "डिजीलॉकर द्वारा स्वतः भरें",
      digilockerVerified: "✓ डिजीलॉकर द्वारा सत्यापित",
      fullNameLabel: "पूरा नाम (सरकारी पहचान पत्रानुसार)",
      fullNamePlaceholder: "पूरा कानूनी नाम दर्ज करें",
      genderLabel: "लिंग",
      genders: {
        male: "पुरुष",
        female: "महिला",
        third_gender: "तृतीय लिंग"
      },
      emailLabel: "ईमेल आईडी (आधिकारिक अलर्ट हेतु)",
      emailPlaceholder: "name@example.com",
      mobileLabel: "मोबाइल नंबर (10-अंक)",
      mobilePlaceholder: "10-अंकीय मोबाइल नंबर दर्ज करें",
      postalAddressLabel: "डाक पता",
      postalAddressPlaceholder: "मकान/फ्लैट नं., गली, क्षेत्र, शहर/जिला, राज्य",
      pincodeLabel: "पिनकोड (6-अंक)",
      pincodePlaceholder: "6-अंकीय पिनकोड दर्ज करें",
      bplTitle: "3. BPL एवं संलग्न दस्तावेज",
      bplQuestion: "क्या आप गरीबी रेखा से नीचे (BPL) श्रेणी के तहत आवेदन कर रहे हैं?",
      bplNo: "नहीं (वैधानिक शुल्क लागू ₹10)",
      bplYes: "हाँ (शुल्क मुक्त ₹0)",
      bplCardNoLabel: "BPL कार्ड / राशन कार्ड संख्या",
      bplCardNoPlaceholder: "BPL कार्ड नंबर दर्ज करें",
      bplUploadLabel: "BPL प्रमाण पत्र अपलोड करें (PDF/फोटो)",
      rtiTextTitle: "4. RTI आवेदन का मुख्य पाठ",
      rtiTextLabel: "RTI आवेदन का विवरण / मुख्य विषय-वस्तु",
      rtiTextPlaceholder: "धारा 6(1) के तहत मांगी गई सटीक जानकारी, सार्वजनिक रिकॉर्ड, प्रमाणित प्रतियों या पत्राचार का स्पष्ट विवरण दें...",
      maxChars: "अधिकतम 3000 अक्षर",
      cancelBtn: "रद्द करें",
      saveContinueBtn: "सहेजें और आगे बढ़ें",
      submittingBtn: "प्रक्रियाधीन...",
      trackTitle: "अपने मौजूदा RTI आवेदन की स्थिति ट्रैक करें",
      trackSubtitle: "अपने RTI आवेदन की स्थिति देखने के लिए पंजीकरण संख्या दर्ज करें।",
      trackPlaceholder: "पंजीकरण संख्या दर्ज करें (जैसे RTI202400000)",
      trackBtn: "स्थिति ट्रैक करें",
      feeDetailsTitle: "RTI शुल्क विवरण",
      applicationFeeLabel: "आवेदन शुल्क",
      modeOfPaymentTitle: "भुगतान का प्रकार",
      modeOfPaymentDesc: "आप ऑनलाइन भुगतान विकल्पों के माध्यम से सुरक्षित रूप से भुगतान कर सकेंगे।",
      paymentModes: {
        upi: "UPI",
        card: "डेबिट / क्रेडिट कार्ड",
        netbanking: "नेट बैंकिंग",
        wallets: "वॉलेट"
      },
      infoTitle: "महत्वपूर्ण जानकारी",
      infoList: [
        "* से चिह्नित फ़ील्ड अनिवार्य हैं।",
        "मानक RTI शुल्क ₹10 है।",
        "आपको ईमेल और मोबाइल पर अपडेट प्राप्त होंगे।",
        "सामान्य उत्तर समय 30 दिन है।"
      ],
      sampleFormatsTitle: "नमूना RTI प्रारूप",
      sampleFormatsDesc: "नमूना RTI आवेदन प्रारूप डाउनलोड करें।",
      downloadPdf: "PDF डाउनलोड करें",
      downloadWord: "Word डाउनलोड करें",
      relatedLinksTitle: "संबंधित लिंक",
      links: {
        act: "RTI अधिनियम, 2005",
        rules: "RTI नियम",
        authorities: "लोक प्राधिकरण निर्देशिका",
        guide: "RTI फ़ॉर्म एवं मार्गदर्शिका"
      },
      actions: {
        viewAct: "अधिनियम देखें",
        viewRules: "नियम देखें",
        viewList: "सूची देखें",
        viewGuide: "मार्गदर्शिका देखें"
      },
      success: {
        breadcrumbSubmitted: "आवेदन जमा हुआ",
        pageHeaderTitle: "आवेदन जमा हुआ",
        pageHeaderSubtitle: "आपका RTI आवेदन विधिवत रूप से पंजीकृत कर संबंधित लोक प्राधिकरण को प्रेषित कर दिया गया है।",
        statutoryBadge: "वैधानिक पावती",
        title: "RTI आवेदन सफलतापूर्वक दर्ज किया गया!",
        subtitle: "आपका RTI आवेदन पंजीकृत कर दिया गया है और संबंधित नोडल जन सूचना अधिकारी को प्रेषित कर दिया गया है।",
        regNoLabel: "पंजीकरण संख्या",
        copyBtn: "पंजीकरण संख्या कॉपी करें",
        copied: "कॉपी हो गया!",
        printBtn: "रसीद प्रिंट करें",
        homeBtn: "पोर्टल मुख्य पृष्ठ पर लौटें",
        summaryTitle: "आवेदन सारांश",
        labels: {
          requestDate: "आवेदन तिथि",
          applicantName: "आवेदक का नाम",
          email: "ईमेल आईडी",
          mobile: "मोबाइल नंबर",
          publicAuth: "लोक प्राधिकरण",
          requestSubject: "आवेदन का विषय",
          requestDesc: "आवेदन का विवरण",
          paymentMode: "भुगतान का प्रकार",
          amountPaid: "भुगतान की गई राशि",
          transactionId: "लेन-देन संदर्भ संख्या",
          status: "स्थिति",
          submitted: "प्रस्तुत"
        },
        timelineTitle: "आगे क्या होगा?",
        timeline: [
          {
            title: "आवेदन जमा हुआ",
            desc: "आपका आवेदन सफलतापूर्वक जमा कर दिया गया है।"
          },
          {
            title: "आवेदन प्रक्रियाधीन है",
            desc: "जन सूचना अधिकारी (PIO) आपके आवेदन की समीक्षा करेंगे।",
            badge: "30 दिनों के भीतर"
          },
          {
            title: "आपको उत्तर प्राप्त होगा",
            desc: "जानकारी आपके पंजीकृत ईमेल पते पर भेजी जाएगी।",
            badge: "30 दिनों के भीतर"
          }
        ],
        importantTitle: "महत्वपूर्ण जानकारी",
        importantCards: [
          {
            title: "मानक उत्तर समय",
            desc: "आवेदन जमा करने की तिथि से 30 दिनों के भीतर आपको उत्तर प्राप्त होगा।"
          },
          {
            title: "अपना आवेदन ट्रैक करें",
            desc: "आप पंजीकरण संख्या का उपयोग करके अपने आवेदन की स्थिति ट्रैक कर सकते हैं।"
          },
          {
            title: "नागरिक सहायता एवं हेल्पलाइन",
            desc: "पूछताछ के लिए helprtionline-dopt@nic.in पर संपर्क करें या टोल-फ्री 1800-11-4000 पर कॉल करें।"
          }
        ]
      }
    },
    notFound: {
      code: "404",
      title: "पृष्ठ नहीं मिला",
      description: "आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है या हटा दिया गया है।",
      buttonText: "मुख्य पृष्ठ पर जाएं"
    },
    login: {
      breadcrumbHome: "मुख्य पृष्ठ",
      breadcrumbLogin: "लॉग इन",
      portalBadge: "सुरक्षित नागरिक एवं अधिकारी पोर्टल",
      pageTitle: "नागरिक लॉगिन (Citizen Login)",
      pageSubtitle: "अपने पूर्व RTI आवेदनों की स्थिति ट्रैक करने या नोडल जन सूचना अधिकारी के रूप में लॉगिन करें।",
      mandatoryNote: "Note:Fields marked with * are Mandatory.",
      tabCitizen: "नागरिक लॉगिन",
      tabCitizenOtp: "मोबाइल OTP लॉगिन",
      tabOfficer: "अधिकारी लॉगिन (PIO)",
      enterUsername: "Enter Username",
      enterPassword: "Enter Password",
      enterSecurityCode: "Enter Security code",
      caseInsensitiveNote: "(All Characters are Case Insensitive)",
      cantReadCaptcha: "Can't read the image? click",
      hereText: "here",
      toRefresh: "to refresh",
      audioCaptchaAlt: "सुरक्षा कोड ऑडियो सुनें",
      submitBtn: "Submit",
      resetBtn: "Reset",
      forgotPassword: "Forgot Password?",
      newUserRegistration: "Sign Up (New User)",
      mobileNumberLabel: "मोबाइल नंबर (10 अंक)",
      sendOtpBtn: "OTP प्राप्त करें",
      enterOtpLabel: "6-अंकीय OTP दर्ज करें",
      verifyOtpBtn: "सत्यापित करें एवं प्रवेश करें",
      officerEmailLabel: "अधिकारी ईमेल आईडी / NIC आईडी",
      officerPasswordLabel: "पासवर्ड",
      officerLoginBtn: "अधिकारी पोर्टल में प्रवेश करें",
      authSuccessTitle: "लॉगिन सफल!",
      authSuccessDesc: "डैशबोर्ड पर पुनर्निर्देशित किया जा रहा है...",
      returnHomeBtn: "मुख्य पृष्ठ पर जाएं",
      guestModePrompt: "बिना लॉगिन के तुरंत आवेदन करना चाहते हैं?",
      guestModeLink: "अतिथि मोड में RTI आवेदन करें →",
      errorEmptyUsername: "कृपया यूज़रनेम दर्ज करें।",
      errorEmptyPassword: "कृपया पासवर्ड दर्ज करें।",
      errorEmptyCaptcha: "कृपया सुरक्षा कोड दर्ज करें।",
      errorInvalidCaptcha: "सुरक्षा कोड मेल नहीं खाता। कृपया पुनः प्रयास करें।"
    }
  }
};

const AppContext = createContext();

export function AppProvider({ children }) {
  const { 
    language, 
    fontSize, 
    isWorkflowModalOpen,
    setLanguage, 
    toggleLanguage, 
    setFontSize,
    openWorkflowModal,
    closeWorkflowModal,
    toggleWorkflowModal
  } = useAppStore();

  // Load stored preferences on mount (deferred to macrotask queue to prevent cascading renders)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedLang = localStorage.getItem('rti_portal_lang');
        if (savedLang === 'hi' || savedLang === 'en') {
          setLanguage(savedLang);
        }
        const savedFontSize = localStorage.getItem('rti_portal_fontsize');
        if (savedFontSize !== null) {
          const parsed = parseInt(savedFontSize, 10);
          if (parsed === -1 || parsed === 0 || parsed === 1) {
            setFontSize(parsed);
          }
        }
      } catch (e) {
        // Ignore storage errors
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [setLanguage, setFontSize]);

  // Update root font size when fontSize state changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (fontSize === -1) {
        root.style.fontSize = '87.5%'; // 14px base
      } else if (fontSize === 1) {
        root.style.fontSize = '112.5%'; // 18px base
      } else {
        root.style.fontSize = '100%'; // 16px default
      }
    }
  }, [fontSize]);

  const t = dictionary[language] || dictionary.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        fontSize,
        setFontSize,
        isWorkflowModalOpen,
        openWorkflowModal,
        closeWorkflowModal,
        toggleWorkflowModal,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

