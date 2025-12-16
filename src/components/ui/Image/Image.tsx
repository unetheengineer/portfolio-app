import './Image.css';

export type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ImageAspectRatio = 'auto' | 'square' | '16/9' | '4/3' | '3/2';

export interface ImageProps {
    src: string;
    alt: string;
    rounded?: ImageRounded;
    aspectRatio?: ImageAspectRatio;
    className?: string;
    loading?: 'lazy' | 'eager';
}

export const Image = ({
    src,
    alt,
    rounded = 'md',
    aspectRatio = 'auto',
    className = '',
    loading = 'lazy'
}: ImageProps) => {
    const classes = [
        'ui-image',
        `ui-image--rounded-${rounded}`,
        aspectRatio !== 'auto' && `ui-image--ratio-${aspectRatio.replace('/', '-')}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            <img
                src={src}
                alt={alt}
                loading={loading}
                className="ui-image__img"
            />
        </div>
    );
};
