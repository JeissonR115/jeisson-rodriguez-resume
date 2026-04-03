import profile from '@/data/profile.json';
import { useTranslation } from 'react-i18next';

export function AboutSection() {
    const { t } = useTranslation('about');

    return (
        <section className="about container">
            <h1>{t('title')}</h1>
            <p className="about__role">{t('role')}</p>
            <p className="about__summary">{t('summary')}</p>
            {profile.available && (
                <span className="about__available">{t('available')}</span>
            )}
        </section>
    );
}
