import profile from '@/data/profile.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';
import './educationSection.scss';

type EducationT = AppResources['education'];

type EducationDegreeId = keyof EducationT['degrees'];
type CertificationId = keyof EducationT['certifications'];
type LanguageNameId = keyof EducationT['languages']['names'];
type LanguageLevelId = keyof EducationT['languages']['levels'];

export function EducationSection() {
    const { t } = useTranslation('education');

    return (
        <section className="education container">
            <h2>{t('title')}</h2>
            {profile.education.map((edu) => (
                <div key={edu.id} className="education__item">
                    <h3>
                        {t(`degrees.${edu.id as EducationDegreeId}.degree`)}
                    </h3>
                    <p>{edu.institution}</p>
                    <p>
                        {edu.start} — {edu.end ?? t('present')}
                    </p>
                </div>
            ))}

            <h2>{t('certificationsTitle')}</h2>
            {profile.certifications.map((cert) => (
                <div key={cert.id} className="education__item">
                    <h3>
                        {t(`certifications.${cert.id as CertificationId}.name`)}
                    </h3>
                    <p>
                        {cert.start} — {cert.end}
                    </p>
                </div>
            ))}

            <h2>{t('languages.title')}</h2>
            {profile.languages.map((lang) => (
                <p key={lang.id}>
                    {t(`languages.names.${lang.id as LanguageNameId}`)} —{' '}
                    {t(`languages.levels.${lang.level as LanguageLevelId}`)}
                </p>
            ))}
        </section>
    );
}
