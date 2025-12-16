import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Language, getTranslations, type Translations } from './i18n';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
    defaultLanguage?: Language;
}

export const LanguageProvider = ({
    children,
    defaultLanguage = 'en'
}: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>(defaultLanguage);
    const t = getTranslations(language);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        // Fallback when used outside provider
        return {
            language: 'en',
            setLanguage: () => { },
            t: getTranslations('en'),
        };
    }
    return context;
};
