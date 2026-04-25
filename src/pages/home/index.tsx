import heroImg from '@/assets/hero.png';
import Button from '@/components/ui/button';
import { isVariant } from '@/components/ui/button/button.utils';
import profile from '@/data/profile.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';
import './home.scss';

type HomeT = AppResources['home'];
type Action = HomeT['hero']['actions'][number];

function Home() {
    const { t: tHome } = useTranslation('home');
    const { t: tAbout } = useTranslation('about');
    const actions = tHome('hero.actions', { returnObjects: true }) as Action[];

    return (
        <section className="hero container">
            <div className="hero__content">
                <p className="hero__greeting">{tHome('hero.greeting')}</p>
                <h1 className="hero__name">{profile.name}</h1>
                <p className="hero__role">{tAbout('role')}</p>
                <p className="hero__subtitle">{tAbout('summary')}</p>
                <div className="hero__actions">
                    {actions.map((action) => (
                        <Button
                            key={action.href}
                            as="link"
                            to={action.href}
                            variant={
                                isVariant(action.variant)
                                    ? action.variant
                                    : 'secondary'
                            }
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="hero__image">
                <img src={heroImg} alt={profile.name} />
            </div>
        </section>
    );
}

export default Home;
