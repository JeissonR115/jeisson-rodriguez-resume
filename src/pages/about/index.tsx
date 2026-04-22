import TableOfContents from '@/components/ui/tableOfContents/TableOfContents';
import { AboutSection } from './AboutSection';
import { EducationSection } from './EducationSection';
import { ExperienceSection } from './ExperienceSection';
import { SkillsSection } from './SkillsSection';
import './about.scss';

function About() {
    return (
        <div className="about-page container">
            <aside className="about-page__toc">
                <TableOfContents levels={[2, 3]} collapsible={true} />
            </aside>
            <div className="about-page__content">
                <AboutSection />
                <ExperienceSection />
                <EducationSection />
                <SkillsSection />
            </div>
        </div>
    );
}

export default About;
