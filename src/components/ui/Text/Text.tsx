import './Text.css';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg';
export type TextVariant = 'primary' | 'secondary' | 'muted' | 'accent';

export interface TextProps {
    children: React.ReactNode;
    size?: TextSize;
    variant?: TextVariant;
    as?: 'p' | 'span' | 'div';
    className?: string;
}

export const Text = ({
    children,
    size = 'md',
    variant = 'primary',
    as: Tag = 'p',
    className = ''
}: TextProps) => {
    const classes = [
        'ui-text',
        `ui-text--${size}`,
        `ui-text--${variant}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <Tag className={classes}>
            {children}
        </Tag>
    );
};
