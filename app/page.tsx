"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from './types';
import { renderStyle1, renderStyle2, renderStyle4 } from './lib/renderer';
import { STYLES_CONFIG, StyleConfig } from './lib/styles-config';

export default function ResumeEditor() {
  // Store data for each style separately
  const [stylesData, setStylesData] = useState<Record<string, ResumeData>>({
    "1": STYLES_CONFIG["1"].defaultData,
    "2": STYLES_CONFIG["2"].defaultData,
    "4": STYLES_CONFIG["4"].defaultData,
  });

  const [currentStyleId, setCurrentStyleId] = useState<string>("4");
  const [lang, setLang] = useState<string>("EN");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentData = stylesData[currentStyleId];
  const currentConfig = STYLES_CONFIG[currentStyleId];

  useEffect(() => {
    updatePreview();
  }, [stylesData, currentStyleId, lang]);

  const updatePreview = () => {
    if (!iframeRef.current) return;

    let html = "";
    if (currentStyleId === "1") html = renderStyle1(currentData, lang);
    else if (currentStyleId === "2") html = renderStyle2(currentData, lang);
    else if (currentStyleId === "4") html = renderStyle4(currentData, lang);

    const doc = iframeRef.current.contentDocument;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }
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
    const element = iframeRef.current?.contentDocument?.body;
    if (element) {
      const opt = {
        margin: 0,
        filename: `${currentData.personalInfo.name}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 glass-sidebar flex flex-col z-10">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">ProResume</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Builder v2.0</p>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={printResume} className="action-btn w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 px-4 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print Resume
            </button>
            <button onClick={downloadPDF} className="action-btn w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download PDF
            </button>
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-slate-100">
          <div className="bg-indigo-50 rounded-2xl p-4">
            <p className="text-xs text-indigo-600 font-medium mb-1">Style Info</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Currently editing: <span className="font-bold text-slate-700">{currentConfig.name}</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Form Area */}
      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Configuration */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Configuration</h2>
            <div className="grid grid-cols-2 gap-6">
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
                <label className="floating-label">Template Style</label>
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
                <label className="floating-label">Language</label>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <details className="bg-white rounded-2xl shadow-sm border border-slate-100 group" open>
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Personal Details
              </h2>
              <svg className="arrow w-5 h-5 text-slate-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-6 pb-6 pt-2 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.name} onChange={(e) => handlePersonalInfoChange('name', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">Full Name</label>
                </div>
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.title} onChange={(e) => handlePersonalInfoChange('title', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">Professional Title</label>
                </div>
              </div>
              <div className="floating-input-group">
                <input type="email" value={currentData.personalInfo.email} onChange={(e) => handlePersonalInfoChange('email', e.target.value)} className="floating-input" placeholder=" " />
                <label className="floating-label">Email Address</label>
              </div>

              {currentConfig.features.hasWebsite && (
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.website || ''} onChange={(e) => handlePersonalInfoChange('website', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">Website</label>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.phone} onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">Phone Number</label>
                </div>
                <div className="floating-input-group">
                  <input type="text" value={currentData.personalInfo.location} onChange={(e) => handlePersonalInfoChange('location', e.target.value)} className="floating-input" placeholder=" " />
                  <label className="floating-label">Location</label>
                </div>
              </div>
            </div>
          </details>

          {/* About */}
          <details className="bg-white rounded-2xl shadow-sm border border-slate-100 group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Professional Summary
              </h2>
              <svg className="arrow w-5 h-5 text-slate-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="floating-input-group mb-0">
                <textarea
                  value={currentData.about}
                  onChange={(e) => handleAboutChange(e.target.value)}
                  className="floating-input min-h-[120px] py-4 resize-none"
                  placeholder=" "
                ></textarea>
                <label className="floating-label">About Me</label>
              </div>
            </div>
          </details>

          {/* Experience */}
          <details className="bg-white rounded-2xl shadow-sm border border-slate-100 group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Work Experience
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-normal">{currentData.experience.length} Items</span>
                <svg className="arrow w-5 h-5 text-slate-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="space-y-6">
                {currentData.experience.map((item, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-slate-200 hover:border-indigo-400 transition-colors">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">Job Title</label>
                      </div>
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">Company</label>
                      </div>
                    </div>
                    <div className="floating-input-group mb-0">
                      <input type="text" value={item.date} onChange={(e) => handleArrayChange('experience', index, 'date', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">Date Range</label>
                    </div>
                    <div className="floating-input-group mb-0">
                      <textarea value={item.description[0]} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} className="floating-input resize-none" rows={2} placeholder=" "></textarea>
                      <label className="floating-label">Description</label>
                    </div>
                    <button onClick={() => removeItem('experience', index)} className="absolute top-0 -right-2 p-1 text-slate-300 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addItem('experience', { title: "", company: "", date: "", description: [""] })} className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all">+ Add Experience</button>
            </div>
          </details>

          {/* Education */}
          <details className="bg-white rounded-2xl shadow-sm border border-slate-100 group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span> Education
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-normal">{currentData.education.length} Items</span>
                <svg className="arrow w-5 h-5 text-slate-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="space-y-6">
                {currentData.education.map((item, index) => (
                  <div key={index} className="relative pl-4 border-l-2 border-slate-200 hover:border-indigo-400 transition-colors">
                    <div className="floating-input-group mb-0">
                      <input type="text" value={item.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">Degree</label>
                    </div>
                    <div className="floating-input-group mb-0">
                      <input type="text" value={item.school} onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">School/University</label>
                    </div>
                    <div className="floating-input-group mb-0">
                      <input type="text" value={item.date} onChange={(e) => handleArrayChange('education', index, 'date', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">Date Range</label>
                    </div>
                    <button onClick={() => removeItem('education', index)} className="absolute top-0 -right-2 p-1 text-slate-300 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addItem('education', { degree: "", school: "", date: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all">+ Add Education</button>
            </div>
          </details>

          {/* Skills */}
          <details className="bg-white rounded-2xl shadow-sm border border-slate-100 group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Skills & Expertise
              </h2>
              <svg className="arrow w-5 h-5 text-slate-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="space-y-4">
                {currentData.skills.map((item, index) => (
                  <div key={index} className="flex gap-4 items-end group">
                    <div className="floating-input-group mb-0 flex-grow">
                      <input type="text" value={item.name} onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">Skill Name</label>
                    </div>
                    <div className="floating-input-group mb-0 w-32">
                      <input type="text" value={item.level} onChange={(e) => handleArrayChange('skills', index, 'level', e.target.value)} className="floating-input text-center" placeholder=" " />
                      <label className="floating-label">Level</label>
                    </div>
                    <button onClick={() => removeItem('skills', index)} className="mb-2 text-slate-300 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addItem('skills', { name: "", level: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all">+ Add Skill</button>
            </div>
          </details>

          {/* Languages */}
          <details className="bg-white rounded-2xl shadow-sm border border-slate-100 group">
            <summary className="p-6 flex justify-between items-center select-none">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> Languages
              </h2>
              <svg className="arrow w-5 h-5 text-slate-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="px-6 pb-6 pt-2">
              <div className="space-y-4">
                {currentData.languages.map((item, index) => (
                  <div key={index} className="flex gap-4 items-end group">
                    <div className="floating-input-group mb-0 flex-grow">
                      <input type="text" value={item.name} onChange={(e) => handleArrayChange('languages', index, 'name', e.target.value)} className="floating-input" placeholder=" " />
                      <label className="floating-label">Language</label>
                    </div>
                    <div className="floating-input-group mb-0 w-32">
                      <input type="text" value={item.proficiency} onChange={(e) => handleArrayChange('languages', index, 'proficiency', e.target.value)} className="floating-input text-center" placeholder=" " />
                      <label className="floating-label">Level</label>
                    </div>
                    <button onClick={() => removeItem('languages', index)} className="mb-2 text-slate-300 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addItem('languages', { name: "", proficiency: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all">+ Add Language</button>
            </div>
          </details>

          {/* Achievements (Style 2 Only) */}
          {currentConfig.features.hasAchievements && (
            <details className="bg-white rounded-2xl shadow-sm border border-slate-100 group" open>
              <summary className="p-6 flex justify-between items-center select-none">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Achievements
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-normal">{currentData.achievements?.length || 0} Items</span>
                  <svg className="arrow w-5 h-5 text-slate-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <div className="space-y-6">
                  {currentData.achievements?.map((item, index) => (
                    <div key={index} className="relative pl-4 border-l-2 border-slate-200 hover:border-indigo-400 transition-colors">
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.title} onChange={(e) => handleArrayChange('achievements', index, 'title', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">Award Title</label>
                      </div>
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.subtitle} onChange={(e) => handleArrayChange('achievements', index, 'subtitle', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">Organization</label>
                      </div>
                      <div className="floating-input-group mb-0">
                        <input type="text" value={item.date} onChange={(e) => handleArrayChange('achievements', index, 'date', e.target.value)} className="floating-input" placeholder=" " />
                        <label className="floating-label">Date</label>
                      </div>
                      <div className="floating-input-group mb-0">
                        <textarea value={item.description} onChange={(e) => handleArrayChange('achievements', index, 'description', e.target.value)} className="floating-input resize-none" rows={2} placeholder=" "></textarea>
                        <label className="floating-label">Description</label>
                      </div>
                      <button onClick={() => removeItem('achievements', index)} className="absolute top-0 -right-2 p-1 text-slate-300 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addItem('achievements', { title: "", subtitle: "", date: "", description: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all">+ Add Achievement</button>
              </div>
            </details>
          )}

          {/* References (Style 2 Only) */}
          {currentConfig.features.hasReferences && (
            <details className="bg-white rounded-2xl shadow-sm border border-slate-100 group" open>
              <summary className="p-6 flex justify-between items-center select-none">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span> References
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-normal">{currentData.references?.length || 0} Items</span>
                  <svg className="arrow w-5 h-5 text-slate-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <div className="space-y-6">
                  {currentData.references?.map((item, index) => (
                    <div key={index} className="relative pl-4 border-l-2 border-slate-200 hover:border-indigo-400 transition-colors">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="floating-input-group mb-0">
                          <input type="text" value={item.name} onChange={(e) => handleArrayChange('references', index, 'name', e.target.value)} className="floating-input" placeholder=" " />
                          <label className="floating-label">Name</label>
                        </div>
                        <div className="floating-input-group mb-0">
                          <input type="text" value={item.title} onChange={(e) => handleArrayChange('references', index, 'title', e.target.value)} className="floating-input" placeholder=" " />
                          <label className="floating-label">Job Title</label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="floating-input-group mb-0">
                          <input type="text" value={item.phone} onChange={(e) => handleArrayChange('references', index, 'phone', e.target.value)} className="floating-input" placeholder=" " />
                          <label className="floating-label">Phone</label>
                        </div>
                        <div className="floating-input-group mb-0">
                          <input type="text" value={item.email} onChange={(e) => handleArrayChange('references', index, 'email', e.target.value)} className="floating-input" placeholder=" " />
                          <label className="floating-label">Email</label>
                        </div>
                      </div>
                      <button onClick={() => removeItem('references', index)} className="absolute top-0 -right-2 p-1 text-slate-300 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addItem('references', { name: "", title: "", phone: "", email: "" })} className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all">+ Add Reference</button>
              </div>
            </details>
          )}
        </div>
      </main>

      {/* Preview Area */}
      <section className="flex-1 bg-slate-200 p-8 flex justify-center overflow-hidden">
        <div className="w-full h-full max-w-[210mm] bg-white shadow-2xl rounded-sm overflow-hidden relative">
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            title="Resume Preview"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
