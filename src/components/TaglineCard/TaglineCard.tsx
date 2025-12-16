import './TaglineCard.css';
import { Card, Heading } from '../ui';
import type { CardVariant } from '../ui';

export interface TaglineCardProps {
    text: string;
    gradient?: boolean;
    cardVariant?: CardVariant;
    className?: string;
}

export const TaglineCard = ({
    text,
    gradient = true,
    cardVariant = 'glass',
    className = ''
}: TaglineCardProps) => {
    const classes = [
        'tagline-card',
        className
    ].filter(Boolean).join(' ');

    return (
        <Card variant={cardVariant} padding="lg" hoverable className={classes}>
            <div className="tagline-card__content">
                <Heading
                    level="h2"
                    variant={gradient ? 'gradient' : 'default'}
                >
                    {text}
                </Heading>
            </div>
        </Card>
    );
};
