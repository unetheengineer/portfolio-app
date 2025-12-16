import './Textarea.css';

export type TextareaVariant = 'default' | 'filled' | 'ghost' | 'glass' | 'gradient' | 'gradient-secondary' | 'gradient-tertiary';
export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps {
    value?: string;
    placeholder?: string;
    variant?: TextareaVariant;
    size?: TextareaSize;
    disabled?: boolean;
    error?: boolean;
    glow?: boolean;
    rows?: number;
    maxLength?: number;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export const Textarea = ({
    value,
    placeholder,
    variant = 'default',
    size = 'md',
    disabled = false,
    error = false,
    glow = false,
    rows = 4,
    maxLength,
    className = '',
    onChange,
    onFocus,
    onBlur
}: TextareaProps) => {
    const classes = [
        'ui-textarea',
        `ui-textarea--${variant}`,
        `ui-textarea--${size}`,
        error && 'ui-textarea--error',
        glow && 'ui-textarea--glow',
        disabled && 'ui-textarea--disabled',
        className
    ].filter(Boolean).join(' ');

    return (
        <textarea
            className={classes}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            maxLength={maxLength}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};
