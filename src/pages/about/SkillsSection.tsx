import Tag from '@/components/ui/tag';
import profile from '@/data/profile.json';
import { typedEntries } from '@/helpers/typedEntries';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';

type SkillsT = AppResources['skills'];

type SkillCategoryId = keyof SkillsT['technical']['categories'];

export function SkillsSection() {
    const { t } = useTranslation('skills');

    const skillEntries = typedEntries(profile.skills.technical) as [
        SkillCategoryId,
        string[],
    ][];
    const softSkills = t('soft.items', { returnObjects: true }) as string[];

    return (
        <section className="skills container">
            <h2>{t('title')}</h2>

            <h3>{t('technical.title')}</h3>
            {skillEntries.map(([category, items]) => (
                <div key={String(category)} className="skills__group">
                    <h4>{t(`technical.categories.${category}`)}</h4>
                    <div className="skills__list">
                        {items.map((skill) => (
                            <Tag key={skill} label={skill} variant="accent" />
                        ))}
                    </div>
                </div>
            ))}

            <h3>{t('soft.title')}</h3>
            <div className="skills__list">
                {softSkills.map((skill) => (
                    <Tag key={skill} label={skill} variant="accent" />
                ))}
            </div>
        </section>
    );
}
