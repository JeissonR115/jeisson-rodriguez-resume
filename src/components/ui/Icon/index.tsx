import './icon.scss';
import type { IconId } from './icon.type';

export type IconSize = 'sm' | 'md' | 'lg';

type IconProps = {
    id: IconId;
    size?: IconSize;
    className?: string;
    label?: string;
};

const sizes: Record<IconSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
};

function Icon({ id, size = 'md', className = '', label }: IconProps) {
    const px = sizes[size];

    return (
        <svg
            className={`icon icon--${size} ${className}`.trim()}
            width={px}
            height={px}
            aria-hidden={!label}
            aria-label={label}
            role={label ? 'img' : undefined}
        >
            <use href={`${import.meta.env.BASE_URL}icons.svg#${id}-icon`} />
        </svg>
    );
}

export default Icon;
