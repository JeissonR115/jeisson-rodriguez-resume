import skillsData from '@/data/skills.json';
import { typedEntries } from '@/helpers/typedEntries';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';
import './skillsSection.scss';

type SkillsT = AppResources['skills'];
type SkillCategoryId = keyof SkillsT['technical']['categories'];
type SkillItem = { name: string; score: number };

export function SkillsSection() {
    const { t } = useTranslation('skills');

    const skillEntries = typedEntries(skillsData.technical) as [
        SkillCategoryId,
        SkillItem[],
    ][];
    type SoftSkillId = keyof SkillsT['soft']['items'];

    const { maxScore } = skillsData;

    return (
        <section className="skills container">
            <h2>{t('title')}</h2>

            <h3>{t('technical.title')}</h3>
            {skillEntries.map(([category, items]) => (
                <div key={String(category)} className="skills__group">
                    <h4>{t(`technical.categories.${category}`)}</h4>
                    <div className="skills__list">
                        {items.map((skill) => (
                            <div key={skill.name} className="skills__item">
                                <div className="skills__item-header">
                                    <span className="skills__item-name">
                                        {skill.name}
                                    </span>
                                    <span className="skills__item-score">
                                        {skill.score}/{maxScore}
                                    </span>
                                </div>
                                <div className="skills__bar">
                                    <div
                                        className="skills__bar-fill"
                                        style={{
                                            width: `${(skill.score / maxScore) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <h3>{t('soft.title')}</h3>
            <div className="skills__list">
                {skillsData.softSkills.map((skill) => (
                    <div key={skill.id} className="skills__item">
                        <div className="skills__item-header">
                            <span className="skills__item-name">
                                {t(`soft.items.${skill.id as SoftSkillId}`)}
                            </span>
                            <span className="skills__item-score">
                                {skill.score}/{maxScore}
                            </span>
                        </div>
                        <div className="skills__bar">
                            <div
                                className="skills__bar-fill"
                                style={{
                                    width: `${(skill.score / maxScore) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
