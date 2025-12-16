import './Icon.css';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'muted';

export interface IconProps {
    name: string;
    size?: IconSize;
    variant?: IconVariant;
    className?: string;
}

/**
 * Icon component - Lucide icons veya custom SVG kullanımı için
 * SVG'yi children olarak geçirin veya name prop'u ile ikon belirtin
 */
export const Icon = ({
    name,
    size = 'md',
    variant = 'default',
    className = ''
}: IconProps) => {
    const classes = [
        'ui-icon',
        `ui-icon--${size}`,
        `ui-icon--${variant}`,
        className
    ].filter(Boolean).join(' ');

    // Basit ikonlar için inline SVG kullan
    // İlerleşik kullanım için lucide-react import edilebilir
    return (
        <span className={classes} data-icon={name} aria-hidden="true">
            {/* SVG içeriği buraya children olarak geçilebilir */}
        </span>
    );
};

// SVG children kabul eden versiyon
export interface IconWrapperProps {
    children: React.ReactNode;
    size?: IconSize;
    variant?: IconVariant;
    className?: string;
}

export const IconWrapper = ({
    children,
    size = 'md',
    variant = 'default',
    className = ''
}: IconWrapperProps) => {
    const classes = [
        'ui-icon',
        `ui-icon--${size}`,
        `ui-icon--${variant}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classes} aria-hidden="true">
            {children}
        </span>
    );
};
