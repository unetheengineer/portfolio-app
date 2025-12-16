import { useState, useEffect, useCallback, useRef } from 'react';
import './ProjectCard.css';
import { Card, Label, ArrowLink, Image } from '../ui';
import type { CardVariant } from '../ui';

export interface Project {
    title: string;
    description?: string;
    image: string;
    href?: string;
}

export interface ProjectCardProps {
    label?: string;
    title?: string;
    projects: Project[];
    cardVariant?: CardVariant;
    href?: string;
    /** Text to show next to arrow on hover */
    arrowLabel?: string;
    className?: string;
    /** Enable single image carousel mode with auto-rotate */
    carousel?: boolean;
    /** Auto-rotate interval in ms (default: 4000) */
    autoRotateInterval?: number;
    onArrowClick?: () => void;
}

const ChevronLeftIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
    </svg>
);

export const ProjectCard = ({
    label = 'Showcase',
    title = 'Projects',
    projects,
    cardVariant = 'glass',
    href,
    arrowLabel,
    className = '',
    carousel = false,
    autoRotateInterval = 4000,
    onArrowClick
}: ProjectCardProps) => {
    // For infinite carousel: we add clones at start and end
    // [lastClone, ...original, firstClone]
    // So slideIndex 0 = lastClone, 1 = first original, etc.
    const [slideIndex, setSlideIndex] = useState(1); // Start at first real slide
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false); // Prevent rapid clicks
    const [isHovered, setIsHovered] = useState(false);
    const slidesRef = useRef<HTMLDivElement>(null);

    const totalSlides = projects.length;
    const extendedLength = totalSlides + 2; // with clones

    // Get actual project index (0 to totalSlides-1)
    const getActualIndex = (index: number) => {
        if (index === 0) return totalSlides - 1; // showing last clone = last project
        if (index === extendedLength - 1) return 0; // showing first clone = first project
        return index - 1;
    };

    const actualIndex = getActualIndex(slideIndex);

    const goToNext = useCallback(() => {
        if (isAnimating) return; // Prevent rapid clicks
        setIsAnimating(true);
        setIsTransitioning(true);
        setSlideIndex((prev) => prev + 1);
    }, [isAnimating]);

    const goToPrev = useCallback(() => {
        if (isAnimating) return; // Prevent rapid clicks
        setIsAnimating(true);
        setIsTransitioning(true);
        setSlideIndex((prev) => prev - 1);
    }, [isAnimating]);

    // Handle infinite loop jump (after transition ends)
    const handleTransitionEnd = () => {
        setIsAnimating(false); // Allow clicks again
        if (slideIndex === 0) {
            // Jumped to last clone, instantly go to real last slide
            setIsTransitioning(false);
            setSlideIndex(totalSlides);
        } else if (slideIndex === extendedLength - 1) {
            // Jumped to first clone, instantly go to real first slide
            setIsTransitioning(false);
            setSlideIndex(1);
        }
    };

    // Re-enable transition after instant jump
    useEffect(() => {
        if (!isTransitioning) {
            // Small delay to allow DOM update, then re-enable transition
            const timer = setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    // Auto-rotate effect - always goes right
    useEffect(() => {
        if (!carousel || isHovered || totalSlides <= 1) return;

        const interval = setInterval(() => {
            goToNext();
        }, autoRotateInterval);

        return () => clearInterval(interval);
    }, [carousel, isHovered, totalSlides, autoRotateInterval, goToNext]);

    const goToSlide = (index: number) => {
        setIsTransitioning(true);
        setSlideIndex(index + 1); // +1 because of leading clone
    };

    const classes = [
        'project-card',
        carousel && 'project-card--carousel',
        className
    ].filter(Boolean).join(' ');

    const renderSlide = (project: Project, key: string | number) => (
        <div key={key} className="project-card__carousel-slide">
            {project.href ? (
                <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        rounded="md"
                        aspectRatio="16/9"
                    />
                </a>
            ) : (
                <Image
                    src={project.image}
                    alt={project.title}
                    rounded="md"
                    aspectRatio="16/9"
                />
            )}
            {/* Hover Overlay */}
            <div className="project-card__carousel-overlay">
                <h4 className="project-card__carousel-title">{project.title}</h4>
                {project.description && (
                    <p className="project-card__carousel-description">{project.description}</p>
                )}
            </div>
        </div>
    );

    const renderGalleryItem = (project: Project, index: number) => {
        const content = (
            <>
                <Image
                    src={project.image}
                    alt={project.title}
                    rounded="md"
                    aspectRatio="16/9"
                />
                <div className="project-card__overlay">
                    <span className="project-card__project-title">{project.title}</span>
                </div>
            </>
        );

        if (project.href) {
            return (
                <a
                    key={index}
                    href={project.href}
                    className="project-card__item"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {content}
                </a>
            );
        }

        return (
            <div key={index} className="project-card__item">
                {content}
            </div>
        );
    };

    const renderCarousel = () => {
        // Create extended slides array: [last, ...originals, first]
        const extendedSlides = [
            projects[totalSlides - 1], // Clone of last
            ...projects,
            projects[0], // Clone of first
        ];

        return (
            <div
                className="project-card__carousel"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                    <>
                        <button
                            className="project-card__nav project-card__nav--prev"
                            onClick={(e) => { e.preventDefault(); goToPrev(); }}
                            aria-label="Previous project"
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            className="project-card__nav project-card__nav--next"
                            onClick={(e) => { e.preventDefault(); goToNext(); }}
                            aria-label="Next project"
                        >
                            <ChevronRightIcon />
                        </button>
                    </>
                )}

                {/* Image Slider Container */}
                <div className="project-card__carousel-track">
                    <div
                        ref={slidesRef}
                        className={`project-card__carousel-slides ${!isTransitioning ? 'no-transition' : ''}`}
                        style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {extendedSlides.map((project, index) => renderSlide(project, `slide-${index}`))}
                    </div>
                </div>

                {/* Dots indicator */}
                {totalSlides > 1 && (
                    <div className="project-card__dots">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                className={`project-card__dot ${index === actualIndex ? 'project-card__dot--active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to project ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <Card variant={cardVariant} padding="md" hoverable className={classes}>
            {carousel ? renderCarousel() : (
                <div className="project-card__gallery">
                    {projects.map(renderGalleryItem)}
                </div>
            )}
            <div className="project-card__footer">
                <div className="project-card__info">
                    <Label size="sm" variant="default">{label}</Label>
                    <span className="project-card__title">{title}</span>
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
