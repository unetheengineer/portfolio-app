import './SkillTag.css';

export type SkillTagVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'glass';
export type SkillTagSize = 'sm' | 'md' | 'lg';

export interface Skill {
    /** Skill name */
    name: string;
    /** Optional icon (emoji or React node) */
    icon?: React.ReactNode;
    /** Optional category for grouping */
    category?: string;
}

export interface SkillTagProps {
    /** Skill or skill name */
    skill: Skill | string;
    /** Visual variant */
    variant?: SkillTagVariant;
    /** Size variant */
    size?: SkillTagSize;
    /** Show hover effect */
    hoverable?: boolean;
    /** Click handler */
    onClick?: () => void;
    /** Additional CSS class */
    className?: string;
}

export interface SkillTagListProps {
    /** Array of skills */
    skills: (Skill | string)[];
    /** Visual variant for all tags */
    variant?: SkillTagVariant;
    /** Size variant for all tags */
    size?: SkillTagSize;
    /** Show hover effect */
    hoverable?: boolean;
    /** Layout direction */
    direction?: 'horizontal' | 'vertical';
    /** Gap between tags */
    gap?: 'sm' | 'md' | 'lg';
    /** Click handler for individual skill */
    onSkillClick?: (skill: Skill | string) => void;
    /** Additional CSS class */
    className?: string;
}

export const SkillTag = ({
    skill,
    variant = 'default',
    size = 'md',
    hoverable = true,
    onClick,
    className = ''
}: SkillTagProps) => {
    const skillData = typeof skill === 'string' ? { name: skill } : skill;

    const classes = [
        'ui-skill-tag',
        `ui-skill-tag--${variant}`,
        `ui-skill-tag--${size}`,
        hoverable && 'ui-skill-tag--hoverable',
        onClick && 'ui-skill-tag--clickable',
        className
    ].filter(Boolean).join(' ');

    return (
        <span
            className={classes}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {skillData.icon && (
                <span className="ui-skill-tag__icon">{skillData.icon}</span>
            )}
            <span className="ui-skill-tag__name">{skillData.name}</span>
        </span>
    );
};

export const SkillTagList = ({
    skills,
    variant = 'default',
    size = 'md',
    hoverable = true,
    direction = 'horizontal',
    gap = 'md',
    onSkillClick,
    className = ''
}: SkillTagListProps) => {
    const classes = [
        'ui-skill-tag-list',
        `ui-skill-tag-list--${direction}`,
        `ui-skill-tag-list--gap-${gap}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            {skills.map((skill) => (
                <SkillTag
                    key={typeof skill === 'string' ? skill : skill.name}
                    skill={skill}
                    variant={variant}
                    size={size}
                    hoverable={hoverable}
                    onClick={onSkillClick ? () => onSkillClick(skill) : undefined}
                />
            ))}
        </div>
    );
};

export default SkillTag;
