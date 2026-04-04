import './tag.scss';

type TagVariant = 'default' | 'accent';

type TagProps = {
    label: string;
    variant?: TagVariant;
};

function Tag({ label, variant = 'default' }: TagProps) {
    return <span className={`tag tag--${variant}`}>{label}</span>;
}

export default Tag;
