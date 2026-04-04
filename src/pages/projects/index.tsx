import Tag from '@/components/ui/tag';
import projectsData from '@/data/projects.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';

type ProjectsT = AppResources['projects'];
type ProjectId = keyof ProjectsT['items'];

function Projects() {
    const { t } = useTranslation('projects');

    return (
        <section className="projects container">
            <h1>{t('title')}</h1>
            <div className="projects__grid">
                {projectsData.items.map((project) => (
                    <div key={project.id} className="projects__card">
                        <h2>{t(`items.${project.id as ProjectId}.name`)},</h2>
                        <p>
                            {t(`items.${project.id as ProjectId}.description`)}
                        </p>
                        <div className="projects__tech">
                            {project.tech.map((tech) => (
                                <Tag key={tech} label={tech} />
                            ))}
                        </div>
                        <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            className="projects__link"
                        >
                            GitHub
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;
