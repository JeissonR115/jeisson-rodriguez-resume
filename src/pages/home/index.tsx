import heroImg from '@/assets/hero.png';
import profile from '@/data/profile.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type HomeT = AppResources['home'];
type Action = HomeT['hero']['actions'][number];

function Home() {
    const { t: tHome } = useTranslation('home');
    const { t: tAbout } = useTranslation('about');

    const actions = tHome('hero.actions', { returnObjects: true }) as Action[];

    return (
        <main>
            <section className="hero container">
                <div className="hero__content">
                    <h1>
                        {tHome('hero.greeting')}{' '}
                        <span className="accent">{profile.name}</span>
                    </h1>
                    <p className="hero__subtitle">{tAbout('summary')}</p>
                    <div className="hero__actions">
                        {actions.map((action) => (
                            <Link
                                key={action.href}
                                to={action.href}
                                className={`btn ${action.variant}`}
                            >
                                {action.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="hero__image">
                    <img src={heroImg} alt={profile.name} />
                </div>
            </section>
        </main>
    );
}

export default Home;
