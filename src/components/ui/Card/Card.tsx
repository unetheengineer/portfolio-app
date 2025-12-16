import './Card.css';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient' | 'gradient-secondary' | 'gradient-tertiary';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
    children: React.ReactNode;
    variant?: CardVariant;
    padding?: CardPadding;
    hoverable?: boolean;
    glow?: boolean;
    className?: string;
    onClick?: () => void;
}

export const Card = ({
    children,
    variant = 'default',
    padding = 'md',
    hoverable = false,
    glow = false,
    className = '',
    onClick
}: CardProps) => {
    const classes = [
        'ui-card',
        `ui-card--${variant}`,
        `ui-card--padding-${padding}`,
        hoverable && 'ui-card--hoverable',
        glow && 'ui-card--glow',
        onClick && 'ui-card--clickable',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};
