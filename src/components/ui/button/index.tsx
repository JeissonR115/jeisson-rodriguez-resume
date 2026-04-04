import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import './button.scss';

type BaseProps = {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    iconOnly?: boolean;
    className?: string;
};

type ButtonAsButton = BaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsAnchor = BaseProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

function Button({
    variant = 'primary',
    size = 'md',
    icon,
    iconOnly = false,
    as: Tag = 'button',
    className = '',
    children,
    ...rest
}: ButtonProps) {
    const classes = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        iconOnly && 'btn--icon',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const content = (
        <>
            {icon && <span className="btn__icon">{icon}</span>}
            {!iconOnly && children}
        </>
    );

    if (Tag === 'a') {
        return (
            <a
                className={classes}
                {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            className={classes}
            {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {content}
        </button>
    );
}

export default Button;
