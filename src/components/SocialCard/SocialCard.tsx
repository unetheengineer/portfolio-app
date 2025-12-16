import './SocialCard.css';
import { Card, IconButton } from '../ui';
import type { CardVariant } from '../ui/Card';

export interface SocialLink {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export interface SocialCardProps {
    links: SocialLink[];
    columns?: 1 | 2 | 3 | 4;
    rows?: 1 | 2 | 3 | 4;
    noContainer?: boolean;
    cardVariant?: CardVariant;
    className?: string;
}

export const SocialCard = ({
    links,
    columns = 2,
    rows,
    noContainer = false,
    cardVariant = 'glass',
    className = ''
}: SocialCardProps) => {
    const classes = [
        'social-card',
        `social-card--cols-${columns}`,
        rows && `social-card--rows-${rows}`,
        noContainer && 'social-card--no-container',
        className
    ].filter(Boolean).join(' ');

    const gridContent = (
        <div className="social-card__grid">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card__link"
                >
                    <IconButton
                        variant="glass"
                        size="lg"
                        shape="square"
                        ariaLabel={link.name}
                    >
                        {link.icon}
                    </IconButton>
                </a>
            ))}
        </div>
    );

    if (noContainer) {
        return <div className={classes}>{gridContent}</div>;
    }

    return (
        <Card variant={cardVariant} padding="lg" hoverable className={classes}>
            {gridContent}
        </Card>
    );
};
