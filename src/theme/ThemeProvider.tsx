import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Theme mode type
type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
    defaultMode?: ThemeMode;
}

export const ThemeProvider = ({
    children,
    defaultMode = 'dark'
}: ThemeProviderProps) => {
    const [mode, setModeState] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme-mode');
            return (saved === 'dark' || saved === 'light') ? saved : defaultMode;
        }
        return defaultMode;
    });

    useEffect(() => {
        localStorage.setItem('theme-mode', mode);
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    const toggleMode = () => {
        setModeState(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeProvider;
