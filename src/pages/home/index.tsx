import heroImg from '@/assets/hero.png';
import { useTheme } from '@/context/theme/useTheme';
import socialConfig from '@/data/social.json';
import type { Language } from '@/locales/types';
import { useTranslation } from 'react-i18next';

type Action = { label: string; href: string; variant: string };

function Home() {
    const { toggle: toggleTheme } = useTheme();
    const { t, i18n } = useTranslation('home');

    const languages = Object.keys(i18n.options.resources!) as Language[];

    const toggleLanguage = () => {
        const current = languages.indexOf(i18n.language as Language);
        const next = languages[(current + 1) % languages.length];
        i18n.changeLanguage(next);
    };

    const actions = t('hero.actions', { returnObjects: true }) as Action[];

    return (
        <main>
            {/* HERO */}
            <section className="hero container">
                <div className="hero__content">
                    <h1 onClick={toggleTheme}>
                        {t('hero.greeting')}{' '}
                        <span className="accent">{t('hero.name')}</span>
                    </h1>
                    <p className="hero__subtitle">{t('hero.subtitle')}</p>
                    <div className="hero__actions">
                        {actions.map((action) => (
                            <a
                                key={action.href}
                                href={action.href}
                                className={`btn ${action.variant}`}
                            >
                                {action.label}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="hero__image" onClick={toggleLanguage}>
                    <img src={heroImg} alt={t('hero.name')} />
                </div>
            </section>

            {/* ABOUT */}
            <section className="about container">
                <h2>{t('about.title')}</h2>
                <p>{t('about.description')}</p>
            </section>

            {/* SKILLS */}
            <section className="skills container">
                <h2>{t('skills.title')}</h2>
                <div className="skills__list">
                    {(
                        t('skills.items', { returnObjects: true }) as string[]
                    ).map((skill) => (
                        <span key={skill}>{skill}</span>
                    ))}
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="contact container">
                <h2>{t('contact.title')}</h2>
                <p>{t('contact.description')}</p>
                <div className="contact__links">
                    {socialConfig.links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;
