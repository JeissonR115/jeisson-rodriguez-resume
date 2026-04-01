import heroImg from '../../assets/hero.png';
import config from '../../config/pages/home.json';
import socialConfig from '../../config/social.json';
import { useLanguage } from '../../context/language/useLanguage';
import { useTheme } from '../../context/theme/useTheme';
import { usePageConfig } from '../../hooks/usePageConfig';

function Home() {
    const { toggle: toggleTheme } = useTheme();
    const { toggle: toggleLanguage } = useLanguage();
    const { hero, about, skills, contact } = usePageConfig(config);

    return (
        <main>
            {/* HERO */}
            <section className="hero container">
                <div className="hero__content">
                    <h1
                        onClick={() => {
                            toggleTheme();
                        }}
                    >
                        {hero.greeting}{' '}
                        <span className="accent">{hero.name}</span>
                    </h1>
                    <p className="hero__subtitle">{hero.subtitle}</p>
                    <div className="hero__actions">
                        {hero.actions.map((action) => (
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
                    <img src={heroImg} alt={hero.name} />
                </div>
            </section>

            {/* ABOUT */}
            <section className="about container">
                <h2>{about.title}</h2>
                <p>{about.description}</p>
            </section>

            {/* SKILLS */}
            <section className="skills container">
                <h2>{skills.title}</h2>
                <div className="skills__list">
                    {skills.items.map((skill) => (
                        <span key={skill}>{skill}</span>
                    ))}
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="contact container">
                <h2>{contact.title}</h2>
                <p>{contact.description}</p>
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
