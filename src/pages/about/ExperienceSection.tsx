import profile from '@/data/profile.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';
import './experienceSection.scss';

type ExperienceT = AppResources['experience'];
type ExperienceItemId = keyof ExperienceT['items'];

export function ExperienceSection() {
    const { t } = useTranslation('experience');

    return (
        <section className="experience container">
            <h2>{t('title')}</h2>

            <div className="experience__timeline">
                {profile.experience.map((exp, i) => {
                    const expId = exp.id as ExperienceItemId;
                    const works = t(`items.${expId}.works`, {
                        returnObjects: true,
                    }) as string[];
                    const current = exp.end == null;

                    return (
                        <div key={exp.id} className="experience__item">
                            <span
                                className={
                                    'experience__marker' +
                                    (current || i === 0
                                        ? ' experience__marker--active'
                                        : '')
                                }
                            />
                            <div className="experience__card">
                                <div className="experience__header">
                                    <h3>{exp.company}</h3>
                                    <span
                                        className={
                                            'experience__period' +
                                            (current
                                                ? ' experience__period--current'
                                                : '')
                                        }
                                    >
                                        {exp.start} — {exp.end ?? t('present')}
                                    </span>
                                </div>
                                <p className="experience__role">
                                    {t(`items.${expId}.role`)}
                                </p>
                                <p className="experience__description">
                                    {t(`items.${expId}.description`)}
                                </p>
                                <h4 className="experience__works-title">
                                    {t(`items.${expId}.worksTitle`)}
                                </h4>
                                <ul className="experience__works">
                                    {works.map((work) => (
                                        <li key={work}>{work}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
