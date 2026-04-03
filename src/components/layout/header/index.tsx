import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../../context/theme/useTheme';
import type { Language } from '../../../locales/types';

function Header() {
    const { t, i18n } = useTranslation('nav');
    const { theme, toggle: toggleTheme } = useTheme();
    const languages = Object.keys(i18n.options.resources!) as Language[];

    const toggleLanguage = () => {
        const current = languages.indexOf(i18n.language as Language);
        const next = languages[(current + 1) % languages.length];
        i18n.changeLanguage(next);
    };

    return (
        <header className="header">
            <nav className="header__nav container">
                <NavLink to="/" className="header__logo">
                    {'{JR}'}
                </NavLink>

                <ul className="header__links">
                    <li>
                        <NavLink to="/">{t('home')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">{t('about')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects">{t('projects')}</NavLink>
                    </li>
                </ul>

                <div className="header__actions">
                    <button onClick={toggleLanguage}>
                        {i18n.language.toUpperCase()}
                    </button>
                    <button onClick={toggleTheme}>
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
