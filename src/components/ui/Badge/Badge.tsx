import './Badge.css';

export type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'glass' | 'gradient' | 'gradient-secondary' | 'gradient-tertiary';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
}

export const Badge = ({
    children,
    variant = 'default',
    size = 'sm',
    className = ''
}: BadgeProps) => {
    const classes = [
        'ui-badge',
        `ui-badge--${variant}`,
        `ui-badge--${size}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classes}>
            {children}
        </span>
    );
};
