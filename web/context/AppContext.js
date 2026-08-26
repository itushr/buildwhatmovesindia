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
    mainActions: {
      or: "or",
      getInformation: {
        title: "Get Information",
        desc: "Discover information, records and data already available in the public domain.",
        btn: "Get Information"
      },
      fileRTI: {
        title: "File an RTI",
        desc: "Submit an RTI application to request information from a public authority.",
        btn: "File an RTI"
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
      address: "RTI Directorate, 2nd Floor, Vigyan Bhawan, New Delhi - 110011",
      phone: "1800-11-4000 (Toll Free)",
      email: "support-rti@gov.in",
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
    mainActions: {
      or: "अथवा",
      getInformation: {
        title: "सूचना प्राप्त करें",
        desc: "सार्वजनिक क्षेत्र में पहले से उपलब्ध जानकारी, रिकॉर्ड और आंकड़े आसानी से तलाशें।",
        btn: "सूचना खोजें"
      },
      fileRTI: {
        title: "RTI आवेदन दर्ज करें",
        desc: "किसी भी लोक प्राधिकरण से अधिकारिक जानकारी प्राप्त करने हेतु नया RTI आवेदन जमा करें।",
        btn: "RTI दर्ज करें"
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
      address: "RTI निदेशालय, द्वितीय तल, विज्ञान भवन, नई दिल्ली - 110011",
      phone: "1800-11-4000 (टोल फ्री)",
      email: "support-rti@gov.in",
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
    }
  }
};

const AppContext = createContext();

export function AppProvider({ children }) {
  const { language, fontSize, setLanguage, toggleLanguage, setFontSize } = useAppStore();

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

