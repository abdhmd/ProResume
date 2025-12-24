import { ResumeData } from "../types";

export interface StyleConfig {
    id: string;
    name: string;
    defaultData: ResumeData;
    features: {
        hasWebsite: boolean;
        hasAchievements: boolean;
        hasReferences: boolean;
        hasProfessionalTechnicalSkills: boolean;
    };
}

export const STYLES_CONFIG: Record<string, StyleConfig> = {
    "1": {
        id: "1",
        name: "Minimal (David)",
        features: {
            hasWebsite: false,
            hasAchievements: false,
            hasReferences: false,
            hasProfessionalTechnicalSkills: false,
        },
        defaultData: {
            personalInfo: {
                name: "David Miller",
                title: "Software Engineer",
                email: "david.miller@example.com",
                phone: "+1 234 567 890",
                location: "San Francisco, CA",
            },
            about: "Experienced software engineer with a focus on building scalable web applications. Proficient in modern JavaScript frameworks and cloud infrastructure.",
            experience: [
                {
                    title: "Full Stack Developer",
                    company: "Tech Solutions Inc.",
                    date: "2021 - Present",
                    description: ["Developed and maintained multiple client-facing web applications using React and Node.js.", "Optimized database queries, reducing load times by 30%."]
                }
            ],
            education: [
                {
                    degree: "B.S. in Computer Science",
                    school: "Stanford University",
                    date: "2016 - 2020"
                }
            ],
            skills: [
                { name: "JavaScript", level: "Expert" },
                { name: "React", level: "Expert" },
                { name: "Node.js", level: "Advanced" }
            ],
            languages: [
                { name: "English", proficiency: "Native" }
            ]
        }
    },
    "2": {
        id: "2",
        name: "Classic (David Anderson)",
        features: {
            hasWebsite: true,
            hasAchievements: true,
            hasReferences: true,
            hasProfessionalTechnicalSkills: false,
        },
        defaultData: {
            personalInfo: {
                name: "David Anderson",
                title: "Senior Graphic Designer",
                email: "david.anderson@design.com",
                phone: "+1 555 123 4567",
                location: "Chicago, IL",
                website: "www.davidanderson.design"
            },
            about: "Award-winning graphic designer with over 10 years of experience in branding and visual identity. Passionate about creating clean, impactful designs that tell a story.",
            experience: [
                {
                    title: "Creative Director",
                    company: "Visual Edge Studio",
                    date: "2018 - Present",
                    description: ["Overseeing all creative projects and leading a team of 5 designers.", "Successfully rebranded 3 Fortune 500 companies."]
                }
            ],
            education: [
                {
                    degree: "M.A. in Visual Communication",
                    school: "School of the Art Institute of Chicago",
                    date: "2012 - 2014"
                }
            ],
            skills: [
                { name: "Adobe Creative Suite", level: "Expert" },
                { name: "Branding", level: "Expert" },
                { name: "Typography", level: "Expert" }
            ],
            languages: [
                { name: "English", proficiency: "Native" },
                { name: "Spanish", proficiency: "Fluent" }
            ],
            achievements: [
                {
                    title: "Best Branding Award",
                    subtitle: "Design Week Awards",
                    date: "2022",
                    description: "Recognized for the outstanding rebranding project of Global Tech."
                }
            ],
            references: [
                {
                    name: "Sarah Jenkins",
                    title: "CEO, Visual Edge",
                    phone: "+1 555 987 6543",
                    email: "sarah@visualedge.com"
                }
            ]
        }
    },
    "4": {
        id: "4",
        name: "Modern (Michael)",
        features: {
            hasWebsite: false,
            hasAchievements: false,
            hasReferences: false,
            hasProfessionalTechnicalSkills: true,
        },
        defaultData: {
            personalInfo: {
                name: "Michael Stevens",
                title: "UX Researcher",
                email: "michael.stevens@ux.com",
                phone: "+1 444 555 6666",
                location: "Austin, TX",
            },
            about: "Dedicated UX Researcher with a background in psychology. Expert in conducting user interviews, usability testing, and translating insights into actionable design recommendations.",
            experience: [
                {
                    title: "Lead UX Researcher",
                    company: "UserFirst Systems",
                    date: "2019 - Present",
                    description: ["Implemented a new research repository that improved cross-team collaboration.", "Conducted over 100 usability tests for the flagship mobile app."]
                }
            ],
            education: [
                {
                    degree: "Ph.D. in Cognitive Psychology",
                    school: "University of Texas at Austin",
                    date: "2014 - 2019"
                }
            ],
            skills: [
                { name: "User Research", level: "Expert" },
                { name: "Usability Testing", level: "Expert" },
                { name: "Data Analysis", level: "Advanced" },
                { name: "Python", level: "Intermediate" }
            ],
            languages: [
                { name: "English", proficiency: "Native" },
                { name: "German", proficiency: "B1" }
            ]
        }
    }
};
