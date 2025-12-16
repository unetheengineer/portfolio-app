import './IconButton.css';

export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonVariant = 'default' | 'primary' | 'ghost' | 'glass';
export type IconButtonShape = 'circle' | 'square';

export interface IconButtonProps {
    children: React.ReactNode;
    size?: IconButtonSize;
    variant?: IconButtonVariant;
    shape?: IconButtonShape;
    disabled?: boolean;
    className?: string;
    ariaLabel: string;
    onClick?: () => void;
}

export const IconButton = ({
    children,
    size = 'md',
    variant = 'default',
    shape = 'circle',
    disabled = false,
    className = '',
    ariaLabel,
    onClick
}: IconButtonProps) => {
    const classes = [
        'ui-icon-btn',
        `ui-icon-btn--${size}`,
        `ui-icon-btn--${variant}`,
        `ui-icon-btn--${shape}`,
        disabled && 'ui-icon-btn--disabled',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            type="button"
        >
            {children}
        </button>
    );
};
