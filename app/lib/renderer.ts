import { ResumeData } from "../types";

const i18n: Record<string, Record<string, string>> = {
    EN: {
        about: "About Profile",
        experience: "Experience",
        education: "Education",
        skills: "Expertise",
        languages: "Languages",
        contact: "Contact",
        present: "Present",
        achievement: "Achievement",
        reference: "Reference"
    },
    FR: {
        about: "Profil",
        experience: "Expérience Professionnelle",
        education: "Formation",
        skills: "Expertise",
        languages: "Langues",
        contact: "Contact",
        present: "Présent",
        achievement: "Réalisations",
        reference: "Références"
    },
    AR: {
        about: "نبذة عني",
        experience: "الخبرات العملية",
        education: "المؤهلات العلمية",
        skills: "الخبرات",
        languages: "اللغات",
        contact: "معلومات الاتصال",
        present: "الحاضر",
        achievement: "الإنجازات",
        reference: "المراجع"
    }
};

function getTranslations(lang: string) {
    return i18n[lang] || i18n.EN;
}

function getDir(lang: string) {
    return lang === 'AR' ? 'rtl' : 'ltr';
}

function getFont(lang: string) {
    return lang === 'AR' ? 'Cairo' : (lang === 'FR' ? 'Roboto' : 'Inter');
}

function getAlign(lang: string) {
    return lang === 'AR' ? 'text-right' : 'text-left';
}

// Style 1 Template (David)
export function renderStyle1(data: ResumeData, lang = 'EN') {
    const t = getTranslations(lang);
    const dir = getDir(lang);
    const font = getFont(lang);
    const align = getAlign(lang);

    return `
<!DOCTYPE html>
<html lang="${lang.toLowerCase()}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name} - Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=${font}:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: '${font}', sans-serif; }
        @page { size: A4; margin: 0; }
        .a4-page { width: 210mm; min-height: 297mm; margin: 0 auto; background: white; padding: 40px; }
        @media print { .a4-page { width: 100%; height: 100%; box-shadow: none; } }
    </style>
</head>
<body class="bg-gray-100 flex justify-center items-start min-h-screen py-10 print:py-0 ${align}">
    <div class="a4-page shadow-lg print:shadow-none text-gray-900">
        <!-- HEADER -->
        <header class="mb-8 border-b-2 border-gray-800 pb-8">
            <h1 class="text-4xl font-bold uppercase tracking-wide mb-2">${data.personalInfo.name}</h1>
            <p class="text-lg text-gray-600 font-medium mb-4">${data.personalInfo.title}</p>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600 ${lang === 'AR' ? 'flex-row-reverse' : ''}">
                <span>${data.personalInfo.email}</span> | 
                <span>${data.personalInfo.phone}</span> | 
                <span>${data.personalInfo.location}</span>
            </div>
        </header>

        <!-- ABOUT -->
        <section class="mb-8 border-b border-gray-300 pb-8">
            <h2 class="text-xl font-bold uppercase mb-4 tracking-wider">${t.about}</h2>
            <p class="text-gray-700 leading-relaxed max-w-prose">${data.about}</p>
        </section>

        <!-- EXPERIENCE -->
        <section class="mb-8 border-b border-gray-300 pb-8">
            <h2 class="text-xl font-bold uppercase mb-6 tracking-wider">${t.experience}</h2>
            ${data.experience.map(job => `
            <div class="mb-6">
                <div class="flex justify-between items-baseline mb-1">
                    <h3 class="text-lg font-bold text-gray-900">${job.title}</h3>
                    <span class="text-sm italic text-gray-500">${job.date}</span>
                </div>
                <div class="text-md font-medium text-gray-700 mb-2">${job.company}</div>
                <ul class="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    ${job.description.map(d => `<li>${d}</li>`).join('')}
                </ul>
            </div>
            `).join('')}
        </section>

        <!-- EDUCATION -->
        <section class="mb-8 border-b border-gray-300 pb-8">
             <h2 class="text-xl font-bold uppercase mb-6 tracking-wider">${t.education}</h2>
             ${data.education.map(edu => `
             <div class="mb-4">
                <div class="flex justify-between items-baseline">
                    <h3 class="text-lg font-bold text-gray-900">${edu.degree}</h3>
                    <span class="text-sm italic text-gray-500">${edu.date}</span>
                </div>
                <div class="text-gray-700">${edu.school}</div>
             </div>
             `).join('')}
        </section>

        <!-- SKILLS & LANGUAGES -->
        <div class="grid grid-cols-2 gap-10">
            <section>
                <h2 class="text-xl font-bold uppercase mb-4 tracking-wider">${t.skills}</h2>
                <div class="space-y-2">
                    ${data.skills.map(skill => `
                    <div>
                        <div class="flex justify-between mb-1">
                            <span class="font-medium text-gray-700">${skill.name}</span>
                            <span class="text-gray-500 text-sm">${skill.level}</span>
                        </div>
                        <div class="w-full bg-gray-200 h-2 rounded-full">
                            <div class="bg-gray-800 h-2 rounded-full" style="width: 80%"></div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </section>
            <section>
                <h2 class="text-xl font-bold uppercase mb-4 tracking-wider">${t.languages}</h2>
                <ul class="space-y-2 text-gray-700">
                    ${data.languages.map(l => `
                    <li class="flex justify-between">
                        <span>${l.name}</span>
                        <span class="text-gray-500">${l.proficiency}</span>
                    </li>
                    `).join('')}
                </ul>
            </section>
        </div>
    </div>
</body>
</html>
    `;
}

// Style 2 Template (Classic Elegant - Based on Uploaded Image)
export function renderStyle2(data: ResumeData, lang = 'EN') {
    const t = getTranslations(lang);
    const dir = getDir(lang);
    const align = getAlign(lang);
    // Using Lato for that clean, professional look in the image
    const font = lang === 'AR' ? 'Cairo' : 'Lato';

    return `
<!DOCTYPE html>
<html lang="${lang.toLowerCase()}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name} - Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: '${font}', sans-serif; }
        @page { size: A4; margin: 0; }
        .a4-page { width: 210mm; min-height: 297mm; margin: 0 auto; background: white; padding: 50px; box-sizing: border-box; }
        @media print { .a4-page { width: 100%; height: 100%; box-shadow: none; padding: 40px; } }
        
        .section-title {
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #1a1a1a;
            margin-bottom: 1.5rem;
        }
        
        .divider {
            border-bottom: 1px solid #e5e7eb;
            margin-top: 2rem;
            margin-bottom: 2rem;
        }
    </style>
</head>
<body class="bg-gray-100 flex justify-center items-start min-h-screen py-10 print:py-0 ${align}">
    <div class="a4-page shadow-2xl print:shadow-none text-gray-800">
        
        <!-- HEADER -->
        <header class="flex justify-between items-start mb-8">
            <div class="w-2/3">
                <h1 class="text-5xl font-black uppercase text-gray-900 leading-tight mb-2">${data.personalInfo.name}</h1>
                <p class="text-sm font-bold uppercase tracking-widest text-gray-500">${data.personalInfo.title}</p>
            </div>
            <div class="w-1/3 text-xs text-gray-600 space-y-1 ${lang === 'AR' ? 'text-left' : 'text-right'}">
                <div class="flex items-center justify-end gap-2">
                    <span>${data.personalInfo.phone}</span>
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div class="flex items-center justify-end gap-2">
                    <span>${data.personalInfo.email}</span>
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z"/></svg>
                </div>
                <div class="flex items-center justify-end gap-2">
                    <span>${data.personalInfo.website || 'www.yourdomain.com'}</span>
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </div>
                <div class="flex items-center justify-end gap-2">
                    <span>${data.personalInfo.location}</span>
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
            </div>
        </header>

        <div class="divider border-gray-800"></div>

        <!-- ABOUT ME -->
        <section class="mb-8">
            <h2 class="section-title">${t.about.toUpperCase()}</h2>
            <p class="text-sm text-gray-600 leading-relaxed text-justify">
                ${data.about}
            </p>
        </section>

        <div class="divider"></div>

        <!-- EXPERIENCE -->
        <section class="mb-8">
            <h2 class="section-title">${t.experience.toUpperCase()}</h2>
            <div class="space-y-6">
                ${data.experience.map(job => `
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-3 pt-1">
                        <span class="text-sm font-bold text-gray-800 block">${job.date}</span>
                    </div>
                    <div class="col-span-9">
                        <h3 class="text-sm font-black uppercase text-gray-800 mb-1">${job.title}</h3>
                        <div class="text-xs font-medium text-gray-500 uppercase mb-2">${job.company} - USA</div>
                        <p class="text-xs text-gray-600 leading-relaxed">
                            ${job.description[0]}
                        </p>
                    </div>
                </div>
                `).join('')}
            </div>
        </section>

        <div class="divider"></div>

        <!-- EDUCATION & EXPERTISE GRID -->
        <div class="grid grid-cols-2 gap-12">
            
            <!-- EDUCATION -->
            <div>
                <h2 class="section-title">${t.education.toUpperCase()}</h2>
                <div class="space-y-6">
                    ${data.education.map(edu => `
                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-4 pt-1">
                            <span class="text-xs font-bold text-gray-800 block">${edu.date}</span>
                        </div>
                        <div class="col-span-8">
                            <h3 class="text-xs font-black uppercase text-gray-800 mb-1">${edu.degree}</h3>
                            <div class="text-xs text-gray-500">${edu.school} - USA</div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>

            <!-- EXPERTISE (SKILLS) -->
            <div>
                <h2 class="section-title">${t.skills.toUpperCase()}</h2>
                <div class="space-y-3">
                    ${data.skills.map(skill => `
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-gray-700 w-1/3">${skill.name}</span>
                        <div class="w-2/3 bg-gray-200 h-1.5">
                            <div class="bg-gray-800 h-1.5" style="width: 85%"></div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <!-- ACHIEVEMENT & REFERENCE GRID -->
        <div class="grid grid-cols-2 gap-12">
            
            <!-- ACHIEVEMENT -->
            <div>
                <h2 class="section-title">${t.achievement ? t.achievement.toUpperCase() : 'ACHIEVEMENT'}</h2>
                <div class="space-y-4">
                    ${data.achievements ? data.achievements.map(ach => `
                    <div class="grid grid-cols-12 gap-2">
                        <div class="col-span-4 pt-1">
                            <span class="text-xs font-bold text-gray-800 block">${ach.date}</span>
                        </div>
                        <div class="col-span-8">
                            <h3 class="text-xs font-black uppercase text-gray-800 mb-1">${ach.title}</h3>
                            <div class="text-xs text-gray-500 mb-1">${ach.subtitle}</div>
                            <p class="text-[10px] text-gray-600 leading-relaxed">
                                ${ach.description}
                            </p>
                        </div>
                    </div>
                    `).join('') : ''}
                </div>
            </div>

            <!-- REFERENCE -->
            <div>
                <h2 class="section-title">${t.reference ? t.reference.toUpperCase() : 'REFERENCE'}</h2>
                <div class="grid grid-cols-2 gap-4">
                    ${data.references ? data.references.map(ref => `
                    <div>
                        <h3 class="text-xs font-black uppercase text-gray-800 mb-0.5">${ref.name}</h3>
                        <div class="text-[10px] text-gray-500 mb-2">${ref.title}</div>
                        <div class="text-[10px] text-gray-600">P: ${ref.phone}</div>
                        <div class="text-[10px] text-gray-600">E: ${ref.email}</div>
                    </div>
                    `).join('') : ''}
                </div>
            </div>
        </div>

    </div>
</body>
</html>
    `;
}

// Style 4 Template (Michael - Based on Image)
export function renderStyle4(data: ResumeData, lang = 'EN') {
    const t = getTranslations(lang);
    const dir = getDir(lang);
    const font = getFont(lang);
    const align = getAlign(lang);

    return `
<!DOCTYPE html>
<html lang="${lang.toLowerCase()}" dir="${dir}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name} - Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Roboto', sans-serif; }
        h1, h2, h3 { font-family: 'Oswald', sans-serif; }
        @page { size: A4; margin: 0; }
        .a4-page { width: 210mm; min-height: 297mm; margin: 0 auto; background: white; padding: 50px; box-sizing: border-box; position: relative; }
        @media print { .a4-page { width: 100%; height: 100%; box-shadow: none; padding: 40px; } }
        .timeline-item::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 6px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: white;
            border: 2px solid #374151;
        }
    </style>
</head>
<body class="bg-gray-200 flex justify-center items-start min-h-screen py-10 print:py-0 ${align}">
    <div class="a4-page shadow-2xl print:shadow-none text-gray-800 flex flex-col h-[297mm]">
        
        <!-- HEADER -->
        <header class="text-center mb-12">
            <div class="w-20 h-20 bg-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center text-white">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <h1 class="text-5xl font-semibold uppercase tracking-[0.2em] mb-3 text-gray-900">${data.personalInfo.name}</h1>
            <p class="text-sm uppercase tracking-[0.3em] text-gray-500 font-medium">${data.personalInfo.title}</p>
        </header>

        <!-- CONTENT GRID -->
        <div class="grid grid-cols-12 gap-12 flex-grow">
            
            <!-- LEFT COLUMN (SKILLS) -->
            <div class="col-span-4 space-y-10">
                <section>
                    <h2 class="text-lg font-bold uppercase tracking-widest mb-6 border-b-2 border-gray-900 pb-1 inline-block">${t.skills}</h2>
                    
                    <div class="mb-6">
                        <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Professional</h3>
                        <ul class="space-y-2 text-sm text-gray-600">
                            ${data.skills.slice(0, 3).map(s => `<li>• ${s.name}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="mb-6">
                        <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Technical</h3>
                        <ul class="space-y-2 text-sm text-gray-600">
                            ${data.skills.slice(3).map(s => `<li>• ${s.name}</li>`).join('')}
                             <!-- Fallback if few skills -->
                            ${data.skills.length < 4 ? `<li>• Graphic Design</li><li>• Web Development</li>` : ''}
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 class="text-lg font-bold uppercase tracking-widest mb-6 border-b-2 border-gray-900 pb-1 inline-block">${t.languages}</h2>
                     <ul class="space-y-2 text-sm text-gray-600">
                        ${data.languages.map(l => `
                        <li class="flex justify-between">
                            <span>${l.name}</span>
                            <span class="text-gray-400 text-xs uppercase">${l.proficiency}</span>
                        </li>
                        `).join('')}
                    </ul>
                </section>
            </div>

            <!-- RIGHT COLUMN (MAIN) -->
            <div class="col-span-8 space-y-10">
                
                <!-- ABOUT -->
                <section>
                    <h2 class="text-lg font-bold uppercase tracking-widest mb-4 text-gray-900">${t.about}</h2>
                    <p class="text-sm leading-relaxed text-gray-600 text-justify">
                        ${data.about}
                    </p>
                </section>

                <!-- EDUCATION -->
                <section>
                    <h2 class="text-lg font-bold uppercase tracking-widest mb-6 text-gray-900">${t.education}</h2>
                    ${data.education.map(edu => `
                    <div class="mb-4">
                        <h3 class="text-sm font-bold uppercase tracking-wide text-gray-800">${edu.school}</h3>
                        <div class="text-xs text-gray-500 italic mb-1">${edu.degree} (${edu.date})</div>
                        <p class="text-sm text-gray-600">Completed with honors. Focus on software engineering principles and system architecture.</p>
                    </div>
                    `).join('')}
                </section>

                <!-- EXPERIENCE (TIMELINE) -->
                <section>
                    <h2 class="text-lg font-bold uppercase tracking-widest mb-6 text-gray-900">${t.experience}</h2>
                    <div class="border-l border-gray-300 ml-1 space-y-8 pb-2">
                        ${data.experience.map(job => `
                        <div class="relative pl-8 timeline-item">
                            <h3 class="text-sm font-bold uppercase tracking-wide text-gray-800">${job.title}</h3>
                            <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">${job.company} (${job.date})</div>
                            <p class="text-sm text-gray-600 leading-relaxed">
                                ${job.description[0]}
                            </p>
                        </div>
                        `).join('')}
                    </div>
                </section>

            </div>
        </div>

        <!-- FOOTER -->
        <footer class="mt-auto pt-8 border-t border-gray-200 flex justify-center gap-12 text-xs text-gray-500 tracking-wider uppercase">
            <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                ${data.personalInfo.email}
            </div>
            <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                ${data.personalInfo.phone}
            </div>
            <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                ${data.personalInfo.location}
            </div>
        </footer>

    </div>
</body>
</html>
    `;
}
