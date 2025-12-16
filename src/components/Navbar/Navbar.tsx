import './Navbar.css';

export interface NavItem {
    label: string;
    href: string;
    isActive?: boolean;
}

export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'tr';

export interface NavbarProps {
    /** Logo or brand element */
    logo?: React.ReactNode;
    /** Brand/site name */
    brandName?: string;
    /** Navigation items */
    items?: NavItem[];
    /** Right side actions (e.g., buttons, icons) */
    actions?: React.ReactNode;
    /** Make navbar sticky */
    sticky?: boolean;
    /** Navbar variant */
    variant?: 'solid' | 'glass' | 'transparent';
    /** Current theme mode */
    theme?: ThemeMode;
    /** Theme change callback */
    onThemeChange?: (theme: ThemeMode) => void;
    /** Show theme toggle */
    showThemeToggle?: boolean;
    /** Current language */
    language?: Language;
    /** Language change callback */
    onLanguageChange?: (lang: Language) => void;
    /** Show language switcher */
    showLanguageSwitcher?: boolean;
    /** Additional class name */
    className?: string;
}

// Icons
const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const MoonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

export const Navbar = ({
    logo,
    brandName,
    items = [],
    actions,
    sticky = false,
    variant = 'glass',
    theme = 'dark',
    onThemeChange,
    showThemeToggle = false,
    language = 'en',
    onLanguageChange,
    showLanguageSwitcher = false,
    className = '',
}: NavbarProps) => {
    const classes = [
        'navbar',
        `navbar--${variant}`,
        sticky && 'navbar--sticky',
        className
    ].filter(Boolean).join(' ');

    const handleThemeToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        onThemeChange?.(newTheme);
    };

    const handleLanguageChange = (lang: Language) => {
        onLanguageChange?.(lang);
    };

    return (
        <nav className={classes}>
            <div className="navbar__container">
                {/* Brand Section */}
                <div className="navbar__brand">
                    {logo && <div className="navbar__logo">{logo}</div>}
                    {brandName && <span className="navbar__brand-name">{brandName}</span>}
                </div>

                {/* Navigation Links */}
                {items.length > 0 && (
                    <ul className="navbar__nav">
                        {items.map((item, index) => (
                            <li key={index} className="navbar__nav-item">
                                <a
                                    href={item.href}
                                    className={`navbar__nav-link ${item.isActive ? 'navbar__nav-link--active' : ''}`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Right Side: Controls + Actions */}
                <div className="navbar__right">
                    {/* Language Switcher */}
                    {showLanguageSwitcher && (
                        <div className="navbar__lang-switcher">
                            <button
                                className={`navbar__lang-btn ${language === 'en' ? 'navbar__lang-btn--active' : ''}`}
                                onClick={() => handleLanguageChange('en')}
                            >
                                EN
                            </button>
                            <button
                                className={`navbar__lang-btn ${language === 'tr' ? 'navbar__lang-btn--active' : ''}`}
                                onClick={() => handleLanguageChange('tr')}
                            >
                                TR
                            </button>
                        </div>
                    )}

                    {/* Theme Toggle */}
                    {showThemeToggle && (
                        <button
                            className="navbar__theme-toggle"
                            onClick={handleThemeToggle}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                    )}


                    {/* Actions Section */}
                    {actions && <div className="navbar__actions">{actions}</div>}
                </div>
            </div>

        </nav>
    );
};
