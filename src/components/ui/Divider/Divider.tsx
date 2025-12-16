import './Divider.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'default' | 'subtle' | 'strong';

export interface DividerProps {
    orientation?: DividerOrientation;
    variant?: DividerVariant;
    withText?: string;
    className?: string;
}

export const Divider = ({
    orientation = 'horizontal',
    variant = 'default',
    withText,
    className = ''
}: DividerProps) => {
    const classes = [
        'ui-divider',
        `ui-divider--${orientation}`,
        `ui-divider--${variant}`,
        withText && 'ui-divider--with-text',
        className
    ].filter(Boolean).join(' ');

    if (withText) {
        return (
            <div className={classes}>
                <span className="ui-divider__line" />
                <span className="ui-divider__text">{withText}</span>
                <span className="ui-divider__line" />
            </div>
        );
    }

    return orientation === 'horizontal'
        ? <hr className={classes} />
        : <div className={classes} />;
};
