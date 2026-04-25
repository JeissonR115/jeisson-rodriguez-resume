import Button from '@/components/ui/button';
import { iconSizes } from '@/components/ui/Icon/icon.type';
import Logo from '@/components/ui/logo';
import { useTheme } from '@/context/theme/useTheme';
import type { Language } from '@/locales/types';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './header.scss';

function Header() {
    const { t, i18n } = useTranslation('nav');
    const { theme, toggle: toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { to: '/', label: t('home') },
        { to: '/about', label: t('about') },
        { to: '/projects', label: t('projects') },
    ] as const;
    const languages = Object.keys(i18n.options.resources!) as Language[];
    const toggleLanguage = () => {
        const current = languages.indexOf(i18n.language as Language);
        const next = languages[(current + 1) % languages.length];
        i18n.changeLanguage(next);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="header">
            <nav className="header__nav container">
                <NavLink to="/" onClick={closeMenu}>
                    <Logo collapsed={menuOpen} />
                </NavLink>

                <ul
                    className={`header__links ${menuOpen ? 'header__links--open' : ''}`}
                >
                    <li className="header__links-bracket header__links-bracket--open">
                        {'{'}
                    </li>
                    {navLinks.map(({ to, label }, i) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={to === '/'}
                                onClick={closeMenu}
                            >
                                {label}
                                {i < navLinks.length - 1 && (
                                    <span className="header__comma">,</span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                    <li className="header__links-bracket header__links-bracket--close">
                        {'}'}
                    </li>
                </ul>

                <div className="header__actions">
                    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                        {i18n.language.toUpperCase()}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={
                            theme === 'dark' ? (
                                <Sun size={iconSizes.sm} />
                            ) : (
                                <Moon size={iconSizes.sm} />
                            )
                        }
                        onClick={toggleTheme}
                        aria-label={
                            theme === 'dark' ? 'Light mode' : 'Dark mode'
                        }
                    />
                    <Button
                        className="header__hamburger"
                        variant="ghost"
                        size="sm"
                        iconOnly
                        icon={
                            menuOpen ? (
                                <X size={iconSizes.sm} />
                            ) : (
                                <Menu size={iconSizes.sm} />
                            )
                        }
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label="Menu"
                    />
                </div>
            </nav>

            {menuOpen && (
                <div className="header__overlay" onClick={closeMenu} />
            )}
        </header>
    );
}

export default Header;
