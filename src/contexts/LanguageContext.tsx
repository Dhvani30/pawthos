import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.howItWorks': { en: 'How It Works', hi: 'यह कैसे काम करता है' },
  'nav.stories': { en: 'Success Stories', hi: 'सफलता की कहानियां' },
  'nav.petOwners': { en: 'For Pet Owners', hi: 'पालतू जानवरों के मालिकों के लिए' },
  'nav.shelters': { en: 'For Shelters & Vets', hi: 'आश्रयों और पशु चिकित्सकों के लिए' },
  'nav.about': { en: 'About Us', hi: 'हमारे बारे में' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क करें' },
  'nav.admin': { en: 'Admin', hi: 'व्यवस्थापक' },
  
  // Hero Section
  'hero.title': { en: 'Every Pet Deserves a Second Chance', hi: 'हर पालतू जानवर दूसरा मौका पाने का हकदार है' },
  'hero.subtitle': { en: 'Affordable 3D-printed prosthetics helping disabled pets walk, run, and live their best lives', hi: 'किफायती 3D-मुद्रित कृत्रिम अंग विकलांग पालतू जानवरों को चलने, दौड़ने और अपना सर्वश्रेष्ठ जीवन जीने में मदद करते हैं' },
  'hero.cta1': { en: 'Book Free Consultation', hi: 'मुफ्त परामर्श बुक करें' },
  'hero.cta2': { en: 'Watch Stories', hi: 'कहानियां देखें' },
  
  // Stats
  'stats.petsHelped': { en: 'Pets Helped', hi: 'पालतू जानवरों की मदद की' },
  'stats.successRate': { en: 'Success Rate', hi: 'सफलता दर' },
  'stats.avgCost': { en: 'Average Cost', hi: 'औसत लागत' },
  'stats.daysToFit': { en: 'Days to Fit', hi: 'फिट करने के दिन' },
  
  // How It Works
  'howItWorks.title': { en: 'How It Works', hi: 'यह कैसे काम करता है' },
  'howItWorks.subtitle': { en: 'Four simple steps to give your pet a new lease on life', hi: 'अपने पालतू जानवर को जीवन का एक नया अवसर देने के लिए चार सरल कदम' },
  'howItWorks.step1': { en: 'Free Consultation', hi: 'मुफ्त परामर्श' },
  'howItWorks.step1Desc': { en: 'Submit photos and details of your pet. Our team reviews and provides a custom assessment.', hi: 'अपने पालतू जानवर की तस्वीरें और विवरण जमा करें। हमारी टीम समीक्षा करती है और एक कस्टम मूल्यांकन प्रदान करती है।' },
  'howItWorks.step2': { en: '3D Scanning & Design', hi: '3D स्कैनिंग और डिज़ाइन' },
  'howItWorks.step2Desc': { en: 'We create precise measurements and design a custom prosthetic tailored to your pet.', hi: 'हम सटीक माप बनाते हैं और आपके पालतू जानवर के अनुरूप एक कस्टम कृत्रिम अंग डिजाइन करते हैं।' },
  'howItWorks.step3': { en: '3D Printing', hi: '3D प्रिंटिंग' },
  'howItWorks.step3Desc': { en: 'Using biocompatible materials, we print the prosthetic with precision and care.', hi: 'बायोकम्पैटिबल सामग्री का उपयोग करके, हम सटीकता और देखभाल के साथ कृत्रिम अंग प्रिंट करते हैं।' },
  'howItWorks.step4': { en: 'Fitting & Rehabilitation', hi: 'फिटिंग और पुनर्वास' },
  'howItWorks.step4Desc': { en: 'We fit the prosthetic and provide guidance for rehabilitation and care.', hi: 'हम कृत्रिम अंग फिट करते हैं और पुनर्वास और देखभाल के लिए मार्गदर्शन प्रदान करते हैं।' },
  
  // Success Stories
  'stories.title': { en: 'Success Stories', hi: 'सफलता की कहानियां' },
  'stories.subtitle': { en: 'Meet the brave pets whose lives were transformed', hi: 'उन बहादुर पालतू जानवरों से मिलें जिनका जीवन बदल गया' },
  'stories.filter.all': { en: 'All', hi: 'सभी' },
  'stories.filter.dog': { en: 'Dogs', hi: 'कुत्ते' },
  'stories.filter.cat': { en: 'Cats', hi: 'बिल्लियां' },
  'stories.filter.bird': { en: 'Birds', hi: 'पक्षी' },
  
  // Consultation Form
  'form.title': { en: 'Book a Free Consultation', hi: 'मुफ्त परामर्श बुक करें' },
  'form.subtitle': { en: 'Fill out the form below and our team will reach out within 24 hours', hi: 'नीचे दिया गया फॉर्म भरें और हमारी टीम 24 घंटे के भीतर संपर्क करेगी' },
  'form.ownerName': { en: 'Your Name', hi: 'आपका नाम' },
  'form.petName': { en: 'Pet Name', hi: 'पालतू जानवर का नाम' },
  'form.species': { en: 'Species', hi: 'प्रजाति' },
  'form.species.dog': { en: 'Dog', hi: 'कुत्ता' },
  'form.species.cat': { en: 'Cat', hi: 'बिल्ली' },
  'form.species.bird': { en: 'Bird', hi: 'पक्षी' },
  'form.species.other': { en: 'Other', hi: 'अन्य' },
  'form.injury': { en: 'Injury Type', hi: 'चोट का प्रकार' },
  'form.city': { en: 'City', hi: 'शहर' },
  'form.phone': { en: 'Phone Number', hi: 'फ़ोन नंबर' },
  'form.email': { en: 'Email', hi: 'ईमेल' },
  'form.upload': { en: 'Upload Photos/Videos', hi: 'फोटो/वीडियो अपलोड करें' },
  'form.uploadDesc': { en: 'Max 3 images or 1 video (up to 50MB)', hi: 'अधिकतम 3 छवियां या 1 वीडियो (50MB तक)' },
  'form.submit': { en: 'Submit Consultation Request', hi: 'परामर्श अनुरोध जमा करें' },
  'form.success': { en: 'Thank you! We will contact you soon.', hi: 'धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।' },
  
  // Footer
  'footer.tagline': { en: 'Giving disabled pets a second chance at life', hi: 'विकलांग पालतू जानवरों को जीवन में दूसरा मौका देना' },
  'footer.quickLinks': { en: 'Quick Links', hi: 'त्वरित लिंक' },
  'footer.contact': { en: 'Contact Us', hi: 'हमसे संपर्क करें' },
  'footer.followUs': { en: 'Follow Us', hi: 'हमें फॉलो करें' },
  'footer.rights': { en: 'All rights reserved', hi: 'सर्वाधिकार सुरक्षित' },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'hi')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};