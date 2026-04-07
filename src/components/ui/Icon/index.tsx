import './icon.scss';
import { iconSizes, type IconId, type IconSize } from './icon.type';

type IconProps = {
    id: IconId;
    size?: IconSize;
    className?: string;
    label?: string;
};

function Icon({ id, size = 'md', className = '', label }: IconProps) {
    const px = iconSizes[size];

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
