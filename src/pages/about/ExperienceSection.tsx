import profile from '@/data/profile.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';

type ExperienceT = AppResources['experience'];
type ExperienceItemId = keyof ExperienceT['items'];

export function ExperienceSection() {
    const { t } = useTranslation('experience');

    return (
        <section className="experience container">
            <h2>{t('title')}</h2>
            {profile.experience.map((exp) => (
                <div key={exp.id} className="experience__item">
                    <h3>{exp.company}</h3>
                    <p className="experience__role">
                        {t(`items.${exp.id as ExperienceItemId}.role`)}
                    </p>
                    <p className="experience__period">
                        {exp.start} — {exp.end ?? t('present')}
                    </p>
                    <p>
                        {t(`items.${exp.id as ExperienceItemId}.description`)}
                    </p>
                </div>
            ))}
        </section>
    );
}
