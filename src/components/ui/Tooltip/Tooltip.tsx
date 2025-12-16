import { useState, useRef } from 'react';
import './Tooltip.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    children: React.ReactNode;
    content: string;
    position?: TooltipPosition;
    delay?: number;
    className?: string;
}

export const Tooltip = ({
    children,
    content,
    position = 'top',
    delay = 200,
    className = ''
}: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const showTooltip = () => {
        timeoutRef.current = window.setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const classes = [
        'ui-tooltip',
        className
    ].filter(Boolean).join(' ');

    const tooltipClasses = [
        'ui-tooltip__content',
        `ui-tooltip__content--${position}`,
        isVisible && 'ui-tooltip__content--visible'
    ].filter(Boolean).join(' ');

    return (
        <div
            className={classes}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            <div className={tooltipClasses} role="tooltip">
                {content}
            </div>
        </div>
    );
};
