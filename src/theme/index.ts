// Theme tokens as TypeScript constants for type-safe usage
export const theme = {
    colors: {
        primary: 'var(--color-primary)',
        primaryHover: 'var(--color-primary-hover)',
        primaryLight: 'var(--color-primary-light)',
        primaryDark: 'var(--color-primary-dark)',

        secondary: 'var(--color-secondary)',
        secondaryHover: 'var(--color-secondary-hover)',
        secondaryLight: 'var(--color-secondary-light)',
        secondaryDark: 'var(--color-secondary-dark)',

        accent: 'var(--color-accent)',
        accentHover: 'var(--color-accent-hover)',
        accentLight: 'var(--color-accent-light)',
        accentDark: 'var(--color-accent-dark)',

        bgPrimary: 'var(--color-bg-primary)',
        bgSecondary: 'var(--color-bg-secondary)',
        bgTertiary: 'var(--color-bg-tertiary)',
        bgCard: 'var(--color-bg-card)',
        bgOverlay: 'var(--color-bg-overlay)',

        textPrimary: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-secondary)',
        textMuted: 'var(--color-text-muted)',
        textAccent: 'var(--color-text-accent)',

        border: 'var(--color-border)',
        borderHover: 'var(--color-border-hover)',
        borderFocus: 'var(--color-border-focus)',

        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
    },

    gradients: {
        primary: 'var(--gradient-primary)',
        accent: 'var(--gradient-accent)',
        dark: 'var(--gradient-dark)',
    },

    shadows: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: 'var(--shadow-glow)',
        glowAccent: 'var(--shadow-glow-accent)',
    },

    spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
    },

    radius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
    },

    transitions: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
    },
} as const;

export type Theme = typeof theme;
