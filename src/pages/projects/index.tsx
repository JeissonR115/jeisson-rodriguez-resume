import Button from '@/components/ui/button';
import Carousel from '@/components/ui/carousel';
import Tag from '@/components/ui/tag';
import projectsData from '@/data/projects.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';
import './projects.scss';

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
                        {project.images.length > 0 && (
                            <Carousel
                                images={project.images}
                                alt={t(`items.${project.id as ProjectId}.name`)}
                            />
                        )}
                        <div className="projects__body">
                            <h2>
                                {t(`items.${project.id as ProjectId}.name`)}
                            </h2>
                            <p>
                                {t(
                                    `items.${project.id as ProjectId}.description`,
                                )}
                            </p>
                            <div className="projects__tech">
                                {project.tech.map((tech) => (
                                    <Tag key={tech} label={tech} />
                                ))}
                            </div>
                            <Button
                                as="a"
                                href={project.href}
                                target="_blank"
                                rel="noreferrer"
                                variant="ghost"
                                size="sm"
                            >
                                GitHub
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;
