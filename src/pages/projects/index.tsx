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
    const projects = projectsData.items;

    return (
        <section className="projects container">
            <header className="projects__head">
                <div>
                    <span className="projects__eyebrow">
                        <span className="projects__eyebrow-line" />
                        {t('eyebrow')}
                    </span>
                    <h1>{t('title')}</h1>
                </div>
                <span className="projects__count">
                    {String(projects.length).padStart(2, '0')}{' '}
                    {t('countLabel')}
                </span>
            </header>

            <div className="projects__grid">
                {projects.map((project, i) => {
                    const pid = project.id as ProjectId;
                    const name = t(`items.${pid}.name`);
                    const index = String(i + 1).padStart(2, '0');
                    const hasImages = project.images.length > 0;

                    return (
                        <article key={project.id} className="projects__card">
                            <div className="projects__media">
                                {hasImages ? (
                                    <Carousel
                                        images={project.images}
                                        alt={name}
                                    />
                                ) : (
                                    <div
                                        className="projects__cover"
                                        aria-hidden
                                    >
                                        <span className="projects__cover-file">
                                            {project.id}
                                        </span>
                                        <span className="projects__cover-glyph">
                                            &lt;/&gt;
                                        </span>
                                    </div>
                                )}
                                <span className="projects__index">{index}</span>
                            </div>

                            <div className="projects__body">
                                <h2>{name}</h2>
                                <p>{t(`items.${pid}.description`)}</p>
                                <div className="projects__tech">
                                    {project.tech.map((tech) => (
                                        <Tag key={tech} label={tech} />
                                    ))}
                                </div>
                                <div className="projects__footer">
                                    <Button
                                        as="a"
                                        href={project.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        variant="ghost"
                                        size="sm"
                                    >
                                        Ver en GitHub →
                                    </Button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default Projects;
