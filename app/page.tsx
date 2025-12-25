"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from './types';
import { renderStyle1, renderStyle2, renderStyle4 } from './lib/renderer';
import { STYLES_CONFIG, StyleConfig } from './lib/styles-config';

const UI_TRANSLATIONS: Record<string, any> = {
  EN: {
    title: "ProResume",
    subtitle: "Builder v2.0",
    print: "Print Resume",
    downloadPdf: "Download PDF",
    downloadDocx: "Download DOCX",
    config: "Configuration",
    template: "Template Style",
    language: "Language",
    personalDetails: "Personal Details",
    fullName: "Full Name",
    professionalTitle: "Professional Title",
    email: "Email Address",
    website: "Website",
    phone: "Phone Number",
    location: "Location",
    summary: "Professional Summary",
    aboutMe: "About Me",
    experience: "Work Experience",
    items: "Items",
    jobTitle: "Job Title",
    company: "Company",
    dateRange: "Date Range",
    description: "Description",
    addExperience: "+ Add Experience",
    education: "Education",
    degree: "Degree",
    school: "School/University",
    addEducation: "+ Add Education",
    skills: "Skills & Expertise",
    skillName: "Skill Name",
    level: "Level",
    addSkill: "+ Add Skill",
    languages: "Languages",
    addLanguage: "+ Add Language",
    achievements: "Achievements",
    awardTitle: "Award Title",
    organization: "Organization",
    date: "Date",
    addAchievement: "+ Add Achievement",
    references: "References",
    name: "Name",
    addReference: "+ Add Reference",
    preview: "Preview",
  },
  FR: {
    title: "ProResume",
    subtitle: "Constructeur v2.0",
    print: "Imprimer le CV",
    downloadPdf: "Télécharger PDF",
    downloadDocx: "Télécharger DOCX",
    config: "Configuration",
    template: "Style de Modèle",
    language: "Langue",
    personalDetails: "Détails Personnels",
    fullName: "Nom Complet",
    professionalTitle: "Titre Professionnel",
    email: "Adresse Email",
    website: "Site Web",
    phone: "Numéro de Téléphone",
    location: "Emplacement",
    summary: "Résumé Professionnel",
    aboutMe: "À Propos de Moi",
    experience: "Expérience Professionnelle",
    items: "Éléments",
    jobTitle: "Titre du Poste",
    company: "Entreprise",
    dateRange: "Période",
    description: "Description",
    addExperience: "+ Ajouter une Expérience",
    education: "Formation",
    degree: "Diplôme",
    school: "École/Université",
    addEducation: "+ Ajouter une Formation",
    skills: "Compétences & Expertise",
    skillName: "Nom de la Compétence",
    level: "Niveau",
    addSkill: "+ Ajouter une Compétence",
    languages: "Langues",
    addLanguage: "+ Ajouter une Langue",
    achievements: "Réalisations",
    awardTitle: "Titre du Prix",
    organization: "Organisation",
    date: "Date",
    addAchievement: "+ Ajouter une Réalisation",
    references: "Références",
    name: "Nom",
    addReference: "+ Ajouter une Référence",
    preview: "Aperçu",
  },
  AR: {
    title: "برو ريزومي",
    subtitle: "منشئ السيرة الذاتية v2.0",
    print: "طباعة السيرة الذاتية",
    downloadPdf: "تحميل PDF",
    downloadDocx: "تحميل DOCX",
    config: "الإعدادات",
    template: "نمط القالب",
    language: "اللغة",
    personalDetails: "البيانات الشخصية",
    fullName: "الاسم الكامل",
    professionalTitle: "المسمى الوظيفي",
    email: "البريد الإلكتروني",
    website: "الموقع الإلكتروني",
    phone: "رقم الهاتف",
    location: "الموقع",
    summary: "الملخص المهني",
    aboutMe: "نبذة عني",
    experience: "الخبرة العملية",
    items: "عناصر",
    jobTitle: "المسمى الوظيفي",
    company: "الشركة",
    dateRange: "الفترة الزمنية",
    description: "الوصف",
    addExperience: "+ إضافة خبرة",
    education: "التعليم",
    degree: "الدرجة العلمية",
    school: "المدرسة/الجامعة",
    addEducation: "+ إضافة تعليم",
    skills: "المهارات والخبرات",
    skillName: "اسم المهارة",
    level: "المستوى",
    addSkill: "+ إضافة مهارة",
    languages: "اللغات",
    addLanguage: "+ إضافة لغة",
    achievements: "الإنجازات",
    awardTitle: "عنوان الجائزة",
    organization: "المؤسسة",
    date: "التاريخ",
    addAchievement: "+ إضافة إنجاز",
    references: "المراجع",
    name: "الاسم",
    addReference: "+ إضافة مرجع",
    preview: "معاينة",
  }
};

export default function ResumeEditor() {
  // Store data for each style separately
  const [stylesData, setStylesData] = useState<Record<string, ResumeData>>({
    "1": STYLES_CONFIG["1"].defaultData,
    "2": STYLES_CONFIG["2"].defaultData,
    "4": STYLES_CONFIG["4"].defaultData,
  });

  const [currentStyleId, setCurrentStyleId] = useState<string>("4");
  const [lang, setLang] = useState<string>("EN");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentData = stylesData[currentStyleId];
  const currentConfig = STYLES_CONFIG[currentStyleId];

  useEffect(() => {
    // Initialize dark mode from system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    updatePreview();
  }, [stylesData, currentStyleId, lang]);

  const updatePreview = () => {
    const iframes = [iframeRef.current, document.getElementById('mobile-iframe') as HTMLIFrameElement];

    let html = "";
    if (currentStyleId === "1") html = renderStyle1(currentData, lang);
    else if (currentStyleId === "2") html = renderStyle2(currentData, lang);
    else if (currentStyleId === "4") html = renderStyle4(currentData, lang);

    iframes.forEach(iframe => {
      if (!iframe) return;
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    });
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setStylesData({
      ...stylesData,
      [currentStyleId]: {
        ...currentData,
        personalInfo: { ...currentData.personalInfo, [field]: value }
      }
    });
  };

  const handleAboutChange = (value: string) => {
    setStylesData({
      ...stylesData,
      [currentStyleId]: { ...currentData, about: value }
    });
  };

  const handleArrayChange = (section: keyof ResumeData, index: number, field: string, value: any) => {
    const newData = { ...currentData };
    const array = newData[section] as any[];

    if (field === "description" && typeof value === "string") {
      array[index][field] = [value];
    } else {
      array[index][field] = value;
    }

    setStylesData({
      ...stylesData,
      [currentStyleId]: newData
    });
  };

  const addItem = (section: keyof ResumeData, template: any) => {
    const newData = { ...currentData };
    (newData[section] as any[]).push(template);
    setStylesData({
      ...stylesData,
      [currentStyleId]: newData
    });
  };

  const removeItem = (section: keyof ResumeData, index: number) => {
    const newData = { ...currentData };
    (newData[section] as any[]).splice(index, 1);
    setStylesData({
      ...stylesData,
      [currentStyleId]: newData
    });
  };

  const printResume = () => {
    iframeRef.current?.contentWindow?.print();
  };

  const downloadPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const element = iframe.contentDocument?.documentElement;
    if (element) {
      const opt = {
        margin: 0,
        filename: `${currentData.personalInfo.name}_Resume.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };

      // Ensure images are loaded before capturing
      const images = element.getElementsByTagName('img');
      const promises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
      });

      await Promise.all(promises);
      html2pdf().set(opt).from(element).save();
    }
  };

  const downloadDocx = async () => {
    try {
      const { asBlob } = await import('html-docx-js-typescript');
      const iframe = iframeRef.current;
      if (!iframe) return;

      const htmlContent = iframe.contentDocument?.documentElement.outerHTML;
      if (!htmlContent) return;

      // html-docx-js-typescript expects a full HTML string
      const blob = await asBlob(htmlContent, {
        orientation: 'portrait',
        margins: { top: 720, right: 720, bottom: 720, left: 720 },
      });

      const url = URL.createObjectURL(blob as Blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentData.personalInfo.name}_Resume.docx`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating DOCX:', error);
      alert('Failed to generate DOCX. Please try PDF instead.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background overflow-hidden transition-colors duration-300" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-card border-b border-border z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-foreground">{UI_TRANSLATIONS[lang].title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-secondary text-foreground hover:bg-accent transition-colors">
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg bg-secondary text-foreground hover:bg-accent transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 w-80 glass-sidebar flex flex-col z-30 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8">
          <div className="hidden lg:flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg dark:shadow-none">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">{UI_TRANSLATIONS[lang].title}</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{UI_TRANSLATIONS[lang].subtitle}</p>
              </div>
            </div>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-secondary text-foreground hover:bg-accent transition-colors">
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>

          <div className="space-y-3">
            <button onClick={printResume} className="action-btn w-full flex items-center justify-center gap-2 bg-card border border-border text-foreground py-3 px-4 rounded-xl text-sm font-semibold hover:bg-accent transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              {UI_TRANSLATIONS[lang].print}
            </button>
            <button onClick={downloadPDF} className="action-btn w-full flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-xl text-sm font-semibold hover:opacity-90 shadow-lg dark:shadow-none transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              {UI_TRANSLATIONS[lang].downloadPdf}
            </button>
            <button onClick={downloadDocx} className="action-btn w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-lg dark:shadow-none transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              {UI_TRANSLATIONS[lang].downloadDocx}
            </button>
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-border">
          <div className="bg-primary/10 rounded-2xl p-4">
            <p className="text-xs text-primary font-medium mb-1">Style Info</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Currently editing: <span className="font-bold text-foreground">{currentConfig.name}</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Form Area */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6 pb-20 lg:pb-0">
          {/* Configuration */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{UI_TRANSLATIONS[lang].config}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="floating-input-group mb-0">
                <select
                  value={currentStyleId}
                  onChange={(e) => setCurrentStyleId(e.target.value)}
                  className="floating-input pt-5"
                >
                  {Object.values(STYLES_CONFIG).map(style => (
                    <option key={style.id} value={style.id}>{style.name}</option>
                  ))}
                </select>
                <label className="floating-label">{UI_TRANSLATIONS[lang].template}</label>
              </div>
              <div className="floating-input-group mb-0">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="floating-input pt-5"
                >
                  <option value="EN">English</option>
                  <option value="FR">Français</option>
                  <option value="AR">العربية</option>
                </select>
                <label className="floating-label">{UI_TRANSLATIONS[lang].language}</label>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <details className="bg-card rounded-2xl shadow-sm border border-border group" open>
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span> {UI_TRANSLATIONS[lang].personalDetails}
              </h2>
              <svg className="arrow w-5 h-5 text-muted-foreground transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-6 pb-6 pt-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.name} onChange={(e) => handlePersonalInfoChange('name', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">{UI_TRANSLATIONS[lang].fullName}</label>
                </div>
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.title} onChange={(e) => handlePersonalInfoChange('title', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">{UI_TRANSLATIONS[lang].professionalTitle}</label>
                </div>
              </div>
              <div className="floating-input-group">
                <input type="email" value={currentData.personalInfo.email} onChange={(e) => handlePersonalInfoChange('email', e.target.value)} className="floating-input" placeholder=" " />
                <label className="floating-label">{UI_TRANSLATIONS[lang].email}</label>
              </div>

              {currentConfig.features.hasWebsite && (
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.website || ''} onChange={(e) => handlePersonalInfoChange('website', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">{UI_TRANSLATIONS[lang].website}</label>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.phone} onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">{UI_TRANSLATIONS[lang].phone}</label>
                </div>
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.location} onChange={(e) => handlePersonalInfoChange('location', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">{UI_TRANSLATIONS[lang].location}</label>
                </div>
              </div>
            </div>
          </details>

          {/* About */}
          <details className="bg-card rounded-2xl shadow-sm border border-border group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {UI_TRANSLATIONS[lang].summary}
              </h2>
              <svg className="arrow w-5 h-5 text-muted-foreground transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="floating-input-group mb-0">
                <textarea
                  value={currentData.about}
                  onChange={(e) => handleAboutChange(e.target.value)}
                  className="floating-input min-h-[120px] py-4 resize-none"
                  placeholder=" "
                ></textarea>
                <label className="floating-label">{UI_TRANSLATIONS[lang].aboutMe}</label>
              </div>
            </div>
          </details>

          {/* Experience */}
          <details className="bg-card rounded-2xl shadow-sm border border-border group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> {UI_TRANSLATIONS[lang].experience}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-normal">{currentData.experience.length} {UI_TRANSLATIONS[lang].items}</span>
                <svg className="arrow w-5 h-5 text-muted-foreground transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="space-y-6">
                {currentData.experience.map((item, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-border hover:border-primary transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">Job Title</label>
                      </div>
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">{UI_TRANSLATIONS[lang].company}</label>
                      </div>
                    </div>
                    <div className="floating-input-group mb-0">
                      <input type="text" value={item.date} onChange={(e) => handleArrayChange('experience', index, 'date', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">{UI_TRANSLATIONS[lang].dateRange}</label>
                    </div>
                    <div className="floating-input-group mb-0">
                      <textarea value={item.description[0]} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} className="floating-input resize-none" rows={2} placeholder=" "></textarea>
                      <label className="floating-label">{UI_TRANSLATIONS[lang].description}</label>
                    </div>
                    <button onClick={() => removeItem('experience', index)} className="absolute top-0 -right-2 p-1 text-muted-foreground hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addItem('experience', { title: "", company: "", date: "", description: [""] })} className="mt-4 w-full py-2 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all">{UI_TRANSLATIONS[lang].addExperience}</button>
            </div>
          </details>

          {/* Education */}
          <details className="bg-card rounded-2xl shadow-sm border border-border group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span> {UI_TRANSLATIONS[lang].education}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-normal">{currentData.education.length} {UI_TRANSLATIONS[lang].items}</span>
                <svg className="arrow w-5 h-5 text-muted-foreground transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="space-y-6">
                {currentData.education.map((item, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-border hover:border-primary transition-colors">
                    <div className="floating-input-group mb-0">
                      <input type="text" value={item.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">{UI_TRANSLATIONS[lang].degree}</label>
                    </div>
                    <div className="floating-input-group mb-0">
                      <input type="text" value={item.school} onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">{UI_TRANSLATIONS[lang].school}</label>
                    </div>
                    <div className="floating-input-group mb-0">
                      <input type="text" value={item.date} onChange={(e) => handleArrayChange('education', index, 'date', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">{UI_TRANSLATIONS[lang].dateRange}</label>
                    </div>
                    <button onClick={() => removeItem('education', index)} className="absolute top-0 -right-2 p-1 text-muted-foreground hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addItem('education', { degree: "", school: "", date: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all">{UI_TRANSLATIONS[lang].addEducation}</button>
            </div>
          </details>

          {/* Skills */}
          <details className="bg-card rounded-2xl shadow-sm border border-border group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> {UI_TRANSLATIONS[lang].skills}
              </h2>
              <svg className="arrow w-5 h-5 text-muted-foreground transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="space-y-4">
                {currentData.skills.map((item, index) => (
                  <div key={index} className="flex gap-4 items-end group">
                    <div className="floating-input-group mb-0 flex-grow">
                      <input type="text" value={item.name} onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">{UI_TRANSLATIONS[lang].skillName}</label>
                    </div>
                    <div className="floating-input-group mb-0 w-24 md:w-32">
                      <input type="text" value={item.level} onChange={(e) => handleArrayChange('skills', index, 'level', e.target.value)} className="floating-input text-center" placeholder=" " />
                      <label className="floating-label">{UI_TRANSLATIONS[lang].level}</label>
                    </div>
                    <button onClick={() => removeItem('skills', index)} className="mb-2 text-muted-foreground hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addItem('skills', { name: "", level: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all">{UI_TRANSLATIONS[lang].addSkill}</button>
            </div>
          </details>

          {/* Languages */}
          <details className="bg-card rounded-2xl shadow-sm border border-border group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> {UI_TRANSLATIONS[lang].languages}
              </h2>
              <svg className="arrow w-5 h-5 text-muted-foreground transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="space-y-4">
                {currentData.languages.map((item, index) => (
                  <div key={index} className="flex gap-4 items-end group">
                    <div className="floating-input-group mb-0 flex-grow">
                      <input type="text" value={item.name} onChange={(e) => handleArrayChange('languages', index, 'name', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">{UI_TRANSLATIONS[lang].language}</label>
                    </div>
                    <div className="floating-input-group mb-0 w-24 md:w-32">
                      <input type="text" value={item.proficiency} onChange={(e) => handleArrayChange('languages', index, 'proficiency', e.target.value)} className="floating-input text-center" placeholder=" " />
                      <label className="floating-label">{UI_TRANSLATIONS[lang].level}</label>
                    </div>
                    <button onClick={() => removeItem('languages', index)} className="mb-2 text-muted-foreground hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addItem('languages', { name: "", proficiency: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all">{UI_TRANSLATIONS[lang].addLanguage}</button>
            </div>
          </details>

          {/* Achievements (Style 2 Only) */}
          {currentConfig.features.hasAchievements && (
            <details className="bg-card rounded-2xl shadow-sm border border-border group" open>
              <summary className="p-6 flex justify-between items-center select-none">
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span> {UI_TRANSLATIONS[lang].achievements}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-normal">{currentData.achievements?.length || 0} {UI_TRANSLATIONS[lang].items}</span>
                  <svg className="arrow w-5 h-5 text-muted-foreground transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <div className="space-y-6">
                  {currentData.achievements?.map((item, index) => (
                    <div key={index} className="relative pl-4 border-l-2 border-border hover:border-primary transition-colors">
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.title} onChange={(e) => handleArrayChange('achievements', index, 'title', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">{UI_TRANSLATIONS[lang].awardTitle}</label>
                      </div>
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.subtitle} onChange={(e) => handleArrayChange('achievements', index, 'subtitle', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">{UI_TRANSLATIONS[lang].organization}</label>
                      </div>
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.date} onChange={(e) => handleArrayChange('achievements', index, 'date', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">{UI_TRANSLATIONS[lang].date}</label>
                      </div>
                      <div className="floating-input-group mb-0">
                        <textarea value={item.description} onChange={(e) => handleArrayChange('achievements', index, 'description', e.target.value)} className="floating-input resize-none" rows={2} placeholder=" "></textarea>
                        <label className="floating-label">{UI_TRANSLATIONS[lang].description}</label>
                      </div>
                      <button onClick={() => removeItem('achievements', index)} className="absolute top-0 -right-2 p-1 text-muted-foreground hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addItem('achievements', { title: "", subtitle: "", date: "", description: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all">{UI_TRANSLATIONS[lang].addAchievement}</button>
              </div>
            </details>
          )}

          {/* References (Style 2 Only) */}
          {currentConfig.features.hasReferences && (
            <details className="bg-card rounded-2xl shadow-sm border border-border group" open>
              <summary className="p-6 flex justify-between items-center select-none">
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span> {UI_TRANSLATIONS[lang].references}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-normal">{currentData.references?.length || 0} {UI_TRANSLATIONS[lang].items}</span>
                  <svg className="arrow w-5 h-5 text-muted-foreground transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <div className="space-y-6">
                  {currentData.references?.map((item, index) => (
                    <div key={index} className="relative pl-4 border-l-2 border-border hover:border-primary transition-colors">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="floating-input-group mb-0">
                          <input type="text" value={item.name} onChange={(e) => handleArrayChange('references', index, 'name', e.target.value)} className="floating-input" placeholder=" " />
                          <label className="floating-label">{UI_TRANSLATIONS[lang].name}</label>
                        </div>
                        <div className="floating-input-group mb-0">
                          <input type="text" value={item.title} onChange={(e) => handleArrayChange('references', index, 'title', e.target.value)} className="floating-input" placeholder=" " />
                          <label className="floating-label">{UI_TRANSLATIONS[lang].jobTitle}</label>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="floating-input-group mb-0">
                          <input type="text" value={item.phone} onChange={(e) => handleArrayChange('references', index, 'phone', e.target.value)} className="floating-input" placeholder=" " />
                          <label className="floating-label">{UI_TRANSLATIONS[lang].phone}</label>
                        </div>
                        <div className="floating-input-group mb-0">
                          <input type="text" value={item.email} onChange={(e) => handleArrayChange('references', index, 'email', e.target.value)} className="floating-input" placeholder=" " />
                          <label className="floating-label">{UI_TRANSLATIONS[lang].email}</label>
                        </div>
                      </div>
                      <button onClick={() => removeItem('references', index)} className="absolute top-0 -right-2 p-1 text-muted-foreground hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addItem('references', { name: "", title: "", phone: "", email: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all">{UI_TRANSLATIONS[lang].addReference}</button>
              </div>
            </details>
          )}
        </div>
      </main>

      {/* Preview Area */}
      <section className="hidden lg:flex flex-1 bg-secondary p-8 justify-center overflow-hidden">
        <div className="w-full h-full max-w-[210mm] bg-white shadow-2xl rounded-sm overflow-hidden relative">
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            title="Resume Preview"
          ></iframe>
        </div>
      </section>

      {/* Mobile Preview Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            const previewEl = document.getElementById('mobile-preview');
            if (previewEl) previewEl.classList.toggle('hidden');
          }}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        </button>
      </div>

      {/* Mobile Preview Modal */}
      <div id="mobile-preview" className="hidden fixed inset-0 bg-background z-50 lg:hidden flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">{UI_TRANSLATIONS[lang].preview}</h2>
          <button
            onClick={() => document.getElementById('mobile-preview')?.classList.add('hidden')}
            className="p-2 text-foreground"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        <div className="flex-1 p-4 bg-secondary overflow-auto flex justify-center">
          <div className="w-full max-w-[210mm] aspect-[1/1.414] bg-white shadow-xl">
            <iframe
              id="mobile-iframe"
              className="w-full h-full border-none"
              title="Mobile Resume Preview"
            ></iframe>
          </div>
        </div>
        <div className="p-4 border-t border-border flex flex-wrap gap-3">
          <button onClick={printResume} className="flex-1 min-w-[120px] py-3 bg-secondary text-foreground rounded-xl font-semibold">{UI_TRANSLATIONS[lang].print}</button>
          <button onClick={downloadPDF} className="flex-1 min-w-[120px] py-3 bg-primary text-white rounded-xl font-semibold">PDF</button>
          <button onClick={downloadDocx} className="flex-1 min-w-[120px] py-3 bg-emerald-600 text-white rounded-xl font-semibold">DOCX</button>
        </div>
      </div>
    </div>
  );
}
