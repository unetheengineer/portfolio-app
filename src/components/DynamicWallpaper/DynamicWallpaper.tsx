import './DynamicWallpaper.css';

export type WallpaperVariant = 'gradient' | 'particles' | 'mesh' | 'aurora' | 'noise';

export interface DynamicWallpaperProps {
    variant?: WallpaperVariant;
    className?: string;
    /** Color scheme - primary colors to use */
    colors?: string[];
    /** Animation speed multiplier (1 = normal, 0.5 = slow, 2 = fast) */
    speed?: number;
    /** Opacity of the wallpaper effect */
    opacity?: number;
}

export const DynamicWallpaper = ({
    variant = 'gradient',
    className = '',
    colors,
    speed = 1,
    opacity = 1,
}: DynamicWallpaperProps) => {
    const classes = [
        'dynamic-wallpaper',
        `dynamic-wallpaper--${variant}`,
        className
    ].filter(Boolean).join(' ');

    const style = {
        '--wallpaper-speed': speed,
        '--wallpaper-opacity': opacity,
        ...(colors && colors[0] && { '--wallpaper-color-1': colors[0] }),
        ...(colors && colors[1] && { '--wallpaper-color-2': colors[1] }),
        ...(colors && colors[2] && { '--wallpaper-color-3': colors[2] }),
        ...(colors && colors[3] && { '--wallpaper-color-4': colors[3] }),
    } as React.CSSProperties;

    const renderVariant = () => {
        switch (variant) {
            case 'particles':
                return (
                    <div className="dynamic-wallpaper__particles">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <div
                                key={i}
                                className="dynamic-wallpaper__particle"
                                style={{
                                    '--particle-index': i,
                                    '--particle-x': Math.random() * 100,
                                    '--particle-y': Math.random() * 100,
                                    '--particle-size': 2 + Math.random() * 4,
                                    '--particle-duration': 10 + Math.random() * 20,
                                    '--particle-delay': Math.random() * 10,
                                } as React.CSSProperties}
                            />
                        ))}
                    </div>
                );

            case 'mesh':
                return (
                    <div className="dynamic-wallpaper__mesh">
                        <div className="dynamic-wallpaper__blob dynamic-wallpaper__blob--1" />
                        <div className="dynamic-wallpaper__blob dynamic-wallpaper__blob--2" />
                        <div className="dynamic-wallpaper__blob dynamic-wallpaper__blob--3" />
                        <div className="dynamic-wallpaper__blob dynamic-wallpaper__blob--4" />
                    </div>
                );

            case 'aurora':
                return (
                    <div className="dynamic-wallpaper__aurora">
                        <div className="dynamic-wallpaper__aurora-layer dynamic-wallpaper__aurora-layer--1" />
                        <div className="dynamic-wallpaper__aurora-layer dynamic-wallpaper__aurora-layer--2" />
                        <div className="dynamic-wallpaper__aurora-layer dynamic-wallpaper__aurora-layer--3" />
                    </div>
                );

            case 'noise':
                return (
                    <div className="dynamic-wallpaper__noise">
                        <div className="dynamic-wallpaper__noise-overlay" />
                    </div>
                );

            case 'gradient':
            default:
                return (
                    <div className="dynamic-wallpaper__gradient" />
                );
        }
    };

    return (
        <div className={classes} style={style}>
            {renderVariant()}
        </div>
    );
};
