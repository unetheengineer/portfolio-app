import './NavLink.css';

export interface NavLinkProps {
    children: React.ReactNode;
    href: string;
    active?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}

export const NavLink = ({
    children,
    href,
    active = false,
    className = '',
    onClick
}: NavLinkProps) => {
    const classes = [
        'ui-nav-link',
        active && 'ui-nav-link--active',
        className
    ].filter(Boolean).join(' ');

    return (
        <a
            href={href}
            className={classes}
            onClick={onClick}
        >
            {children}
        </a>
    );
};
