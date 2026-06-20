// CSS-fixed copy for design-sync — see .design-sync/synth-src/button/index.tsx header.
import './tag.css';

type TagVariant = 'default' | 'accent';

type TagProps = {
    label: string;
    variant?: TagVariant;
};

function Tag({ label, variant = 'default' }: TagProps) {
    return <span className={`tag tag--${variant}`}>{label}</span>;
}

export default Tag;
