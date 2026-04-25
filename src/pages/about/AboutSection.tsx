import profile from '@/data/profile.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';
import './aboutSection.scss';
type AboutT = AppResources['about'];

export function AboutSection() {
    const { t } = useTranslation('about');
    const highlights = t('highlights.items', {
        returnObjects: true,
    }) as AboutT['highlights']['items'];

    return (
        <section className="about container">
            <p className="about__role">{t('role')}</p>
            {profile.available && (
                <span className="about__available">{t('available')}</span>
            )}
            <p className="about__summary">{t('summary')}</p>

            <h2>{t('highlights.title')}</h2>
            <ul className="about__highlights">
                {highlights.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </section>
    );
}
