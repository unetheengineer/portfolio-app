import './SkillsCard.css';
import { Card, Label, ArrowLink } from '../ui';
import type { CardVariant } from '../ui/Card';

export interface Skill {
    name: string;
    icon: React.ReactNode;
}

export interface SkillsCardProps {
    label?: string;
    title?: string;
    skills: Skill[];
    columns?: 2 | 3 | 4 | 5 | 6;
    variant?: 'grid' | 'orbital';
    cardVariant?: CardVariant;
    href?: string;
    arrowLabel?: string;
    className?: string;
    onArrowClick?: () => void;
}

export const SkillsCard = ({
    label = 'Most Use',
    title = 'Skills',
    skills,
    columns = 4,
    variant = 'grid',
    cardVariant = 'glass',
    href,
    arrowLabel,
    className = '',
    onArrowClick
}: SkillsCardProps) => {
    const classes = [
        'skills-card',
        `skills-card--${variant}`,
        className
    ].filter(Boolean).join(' ');

    // Center skill is the first one, rest split into 3 orbits
    const centerSkill = skills[0];
    const innerOrbit = skills.slice(1, 4);      // 3 skills
    const middleOrbit = skills.slice(4, 8);     // 4 skills
    const outerOrbit = skills.slice(8);         // remaining skills

    const renderGridVariant = () => (
        <div
            className="skills-card__grid"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
            {skills.map((skill, index) => (
                <div key={index} className="skills-card__skill" title={skill.name}>
                    {skill.icon}
                </div>
            ))}
        </div>
    );

    const renderOrbitRing = (
        orbitSkills: typeof skills,
        orbitClass: string
    ) => (
        <div className={`skills-card__orbit-ring ${orbitClass}`}>
            {orbitSkills.map((skill, index) => (
                <div
                    key={index}
                    className="skills-card__orbiting-skill"
                    style={{
                        '--skill-index': index,
                        '--skill-total': orbitSkills.length,
                    } as React.CSSProperties}
                    title={skill.name}
                >
                    <div className="skills-card__skill-icon">
                        {skill.icon}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderOrbitalVariant = () => (
        <div className="skills-card__orbital">
            {/* Center skill (fixed, not rotating) */}
            {centerSkill && (
                <div className="skills-card__center-skill" title={centerSkill.name}>
                    {centerSkill.icon}
                </div>
            )}

            {/* Inner orbit */}
            {innerOrbit.length > 0 && renderOrbitRing(innerOrbit, 'skills-card__orbit-ring--inner')}

            {/* Middle orbit */}
            {middleOrbit.length > 0 && renderOrbitRing(middleOrbit, 'skills-card__orbit-ring--middle')}

            {/* Outer orbit */}
            {outerOrbit.length > 0 && renderOrbitRing(outerOrbit, 'skills-card__orbit-ring--outer')}
        </div>
    );

    return (
        <Card variant={cardVariant} padding="lg" hoverable className={classes}>
            {variant === 'orbital' ? renderOrbitalVariant() : renderGridVariant()}
            <div className="skills-card__footer">
                <div className="skills-card__info">
                    <Label size="sm" variant="default">{label}</Label>
                    <span className="skills-card__title">{title}</span>
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
