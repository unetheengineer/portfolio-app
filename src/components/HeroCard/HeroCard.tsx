import './HeroCard.css';
import { Card, Label, Heading, Text, ArrowLink } from '../ui';
import type { CardVariant } from '../ui/Card';

export interface HeroCardProps {
    label?: string;
    name: string;
    description: string;
    href?: string;
    cardVariant?: CardVariant;
    className?: string;
    onArrowClick?: () => void;
}

export const HeroCard = ({
    label = 'A Web Developer',
    name,
    description,
    href,
    cardVariant = 'glass',
    className = '',
    onArrowClick
}: HeroCardProps) => {
    const classes = [
        'hero-card',
        className
    ].filter(Boolean).join(' ');

    return (
        <Card variant={cardVariant} padding="lg" hoverable className={classes}>
            <div className="hero-card__content">
                <Label size="sm" variant="default">{label}</Label>
                <Heading level="h2" variant="default">{name}</Heading>
                <Text size="sm" variant="secondary">{description}</Text>
            </div>
            <div className="hero-card__arrow">
                <ArrowLink
                    href={href}
                    variant="glass"
                    size="md"
                    onClick={onArrowClick}
                />
            </div>
        </Card>
    );
};
