// CSS-fixed copy for design-sync — see .design-sync/synth-src/button/index.tsx header.
import projectsData from '@/data/projects.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';
import Button from '../button/index.tsx';
import Carousel from '../carousel/index.tsx';
import Tag from '../tag/index.tsx';
import './projects.css';

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
