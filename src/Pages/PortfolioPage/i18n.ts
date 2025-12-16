export type Language = 'en' | 'tr';

export interface Translations {
    // Static labels
    labels: {
        home: string;
        about: string;
        contact: string;
        showcase: string;
        projects: string;
        mostUse: string;
        skills: string;
        blogs: string;
        viewAll: string;
        readMore: string;
    };
}

export const translations: Record<Language, Translations> = {
    en: {
        labels: {
            home: 'Home',
            about: 'About',
            contact: 'Contact',
            showcase: 'Showcase',
            projects: 'Projects',
            mostUse: 'Most Use',
            skills: 'Skills',
            blogs: 'Blogs',
            viewAll: 'View All',
            readMore: 'Read More',
        },
    },
    tr: {
        labels: {
            home: 'Ana Sayfa',
            about: 'Hakkında',
            contact: 'İletişim',
            showcase: 'Vitrin',
            projects: 'Projeler',
            mostUse: 'En Çok Kullanılan',
            skills: 'Yetenekler',
            blogs: 'Blog',
            viewAll: 'Tümünü Gör',
            readMore: 'Devamını Oku',
        },
    },
};

export const getTranslations = (lang: Language): Translations => {
    return translations[lang] || translations.en;
};
