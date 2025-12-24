export interface ExperienceItem {
    title: string;
    company: string;
    date: string;
    description: string[];
}

export interface EducationItem {
    degree: string;
    school: string;
    date: string;
}

export interface SkillItem {
    name: string;
    level: string;
}

export interface LanguageItem {
    name: string;
    proficiency: string;
}

export interface AchievementItem {
    title: string;
    subtitle: string;
    date: string;
    description: string;
}

export interface ReferenceItem {
    name: string;
    title: string;
    phone: string;
    email: string;
}

export interface ResumeData {
    personalInfo: {
        name: string;
        title: string;
        email: string;
        phone: string;
        location: string;
        website?: string;
    };
    about: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: SkillItem[];
    languages: LanguageItem[];
    achievements?: AchievementItem[];
    references?: ReferenceItem[];
}
