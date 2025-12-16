import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: AvatarSize;
    className?: string;
}

const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export const Avatar = ({
    src,
    alt = '',
    name,
    size = 'md',
    className = ''
}: AvatarProps) => {
    const classes = [
        'ui-avatar',
        `ui-avatar--${size}`,
        className
    ].filter(Boolean).join(' ');

    if (src) {
        return (
            <div className={classes}>
                <img src={src} alt={alt || name || 'Avatar'} className="ui-avatar__image" />
            </div>
        );
    }

    if (name) {
        return (
            <div className={classes}>
                <span className="ui-avatar__initials">{getInitials(name)}</span>
            </div>
        );
    }

    return (
        <div className={classes}>
            <svg className="ui-avatar__placeholder" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
        </div>
    );
};
