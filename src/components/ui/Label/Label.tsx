import './Label.css';

export type LabelSize = 'sm' | 'md';
export type LabelVariant = 'default' | 'primary' | 'accent';

export interface LabelProps {
    children: React.ReactNode;
    size?: LabelSize;
    variant?: LabelVariant;
    uppercase?: boolean;
    className?: string;
}

export const Label = ({
    children,
    size = 'sm',
    variant = 'default',
    uppercase = true,
    className = ''
}: LabelProps) => {
    const classes = [
        'ui-label',
        `ui-label--${size}`,
        `ui-label--${variant}`,
        uppercase && 'ui-label--uppercase',
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classes}>
            {children}
        </span>
    );
};
