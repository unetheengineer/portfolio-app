import './ArrowLink.css';

export type ArrowLinkSize = 'sm' | 'md' | 'lg';
export type ArrowLinkVariant = 'default' | 'primary' | 'glass';

export interface ArrowLinkProps {
    href?: string;
    size?: ArrowLinkSize;
    variant?: ArrowLinkVariant;
    /** Text to show on the left side of the arrow (visible on hover when expandable) */
    label?: string;
    /** If true, arrow expands on hover to show label */
    expandable?: boolean;
    className?: string;
    onClick?: () => void;
}

export const ArrowLink = ({
    href,
    size = 'md',
    variant = 'default',
    label,
    expandable = false,
    className = '',
    onClick
}: ArrowLinkProps) => {
    const classes = [
        'ui-arrow-link',
        `ui-arrow-link--${size}`,
        `ui-arrow-link--${variant}`,
        expandable && 'ui-arrow-link--expandable',
        label && 'ui-arrow-link--has-label',
        className
    ].filter(Boolean).join(' ');

    const ArrowIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
    );

    const content = (
        <>
            {label && <span className="ui-arrow-link__label">{label}</span>}
            <span className="ui-arrow-link__icon">
                <ArrowIcon />
            </span>
        </>
    );

    if (href) {
        return (
            <a href={href} className={classes}>
                {content}
            </a>
        );
    }

    return (
        <button type="button" className={classes} onClick={onClick}>
            {content}
        </button>
    );
};
