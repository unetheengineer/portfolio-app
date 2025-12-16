import './SectionTitle.css';

export interface SectionTitleProps {
    /** Main title text */
    title: string;
    /** Subtitle text */
    subtitle?: string;
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
    /** Use gradient text for title */
    gradient?: boolean;
    /** Additional CSS class */
    className?: string;
}

export const SectionTitle = ({
    title,
    subtitle,
    align = 'center',
    gradient = false,
    className = ''
}: SectionTitleProps) => {
    const classNames = [
        'section-title',
        `section-title--${align}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classNames}>
            <h2 className={gradient ? 'section-title__heading section-title__heading--gradient' : 'section-title__heading'}>
                {title}
            </h2>
            {subtitle && (
                <p className="section-title__subtitle">{subtitle}</p>
            )}
        </div>
    );
};

export default SectionTitle;
