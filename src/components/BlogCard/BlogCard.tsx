import './BlogCard.css';
import { Card, Label, ArrowLink, Image } from '../ui';
import type { CardVariant } from '../ui';

export interface BlogCardProps {
    title: string;
    description?: string;
    image: string;
    label?: string;
    cardVariant?: CardVariant;
    href?: string;
    arrowLabel?: string;
    className?: string;
    onArrowClick?: () => void;
}

export const BlogCard = ({
    title,
    description,
    image,
    label = 'Latest',
    cardVariant = 'glass',
    href,
    arrowLabel,
    className = '',
    onArrowClick
}: BlogCardProps) => {
    const classes = [
        'blog-card',
        className
    ].filter(Boolean).join(' ');

    return (
        <Card variant={cardVariant} padding="md" hoverable className={classes}>
            {/* Image with hover overlay */}
            <div className="blog-card__image-container">
                <Image
                    src={image}
                    alt={title}
                    rounded="md"
                    aspectRatio="16/9"
                    className="blog-card__image"
                />
                <div className="blog-card__overlay">
                    <h3 className="blog-card__overlay-title">{title}</h3>
                    {description && (
                        <p className="blog-card__overlay-description">{description}</p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="blog-card__footer">
                <div className="blog-card__info">
                    <Label size="sm" variant="default">{label}</Label>
                    <span className="blog-card__title">{title}</span>
                </div>
                <ArrowLink
                    href={href}
                    variant="glass"
                    size="md"
                    label={arrowLabel}
                    expandable={!!arrowLabel}
                    onClick={onArrowClick}
                />
            </div>
        </Card>
    );
};
