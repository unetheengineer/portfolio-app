import './Heading.css';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingVariant = 'default' | 'gradient' | 'accent';

export interface HeadingProps {
    children: React.ReactNode;
    level?: HeadingLevel;
    variant?: HeadingVariant;
    className?: string;
}

export const Heading = ({
    children,
    level = 'h2',
    variant = 'default',
    className = ''
}: HeadingProps) => {
    const Tag = level;

    const classes = [
        'ui-heading',
        `ui-heading--${level}`,
        `ui-heading--${variant}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <Tag className={classes}>
            {children}
        </Tag>
    );
};
