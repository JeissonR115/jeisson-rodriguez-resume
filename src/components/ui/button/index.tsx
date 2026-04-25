import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import {
    Link,
    NavLink,
    type LinkProps,
    type NavLinkProps,
} from 'react-router-dom';
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
type ButtonAsLink = BaseProps & LinkProps & { as: 'link' };
type ButtonAsNavLink = BaseProps & NavLinkProps & { as: 'navlink' };

type ButtonProps =
    | ButtonAsButton
    | ButtonAsAnchor
    | ButtonAsLink
    | ButtonAsNavLink;

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

    if (Tag === 'navlink') {
        return (
            <NavLink
                {...(rest as NavLinkProps)}
                className={({ isActive }) =>
                    `${classes} ${isActive ? 'active' : ''}`
                }
            >
                {content}
            </NavLink>
        );
    }

    if (Tag === 'link') {
        return (
            <Link className={classes} {...(rest as LinkProps)}>
                {content}
            </Link>
        );
    }

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
