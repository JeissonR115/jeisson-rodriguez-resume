// CSS-fixed copy for design-sync — see .design-sync/synth-src/button/index.tsx header.
//
// KNOWN LIMITATION (see .design-sync/NOTES.md): the real Icon renders
// <use href="${BASE_URL}icons.svg#${id}-icon">, referencing this site's own
// SVG sprite (public/icons.svg) served at its own origin. The design-sync
// converter has no general mechanism to ship and serve that sprite inside
// claude.ai/design's preview iframe, so every Icon renders as an empty box
// there — this is the real component's real behavior outside this one site,
// not a bug introduced by this copy.
import './icon.css';
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
            <use href={`/icons.svg#${id}-icon`} />
        </svg>
    );
}

export default Icon;
