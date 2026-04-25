import type { ButtonHTMLAttributes } from 'react';
import './fab.scss';

export type FabPosition =
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left';
export type FabSize = 'sm' | 'md' | 'lg';
export type FabVariant = 'primary' | 'secondary';

type FabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ReactNode;
    label: string;
    showLabel?: boolean;
    position?: FabPosition;
    size?: FabSize;
    variant?: FabVariant;
    active?: boolean;
};

function Fab({
    icon,
    label,
    showLabel = false,
    position = 'bottom-right',
    size = 'md',
    variant = 'primary',
    active = false,
    className = '',
    ...rest
}: FabProps) {
    const classes = [
        'fab',
        `fab--${size}`,
        `fab--${variant}`,
        `fab--${position}`,
        active && 'fab--active',
        showLabel && 'fab--labeled',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={classes} aria-label={label} {...rest}>
            <span className="fab__icon">{icon}</span>
            {showLabel && <span className="fab__label">{label}</span>}
        </button>
    );
}
export default Fab;
