import TableOfContents from '@/components/ui/tableOfContents';
import { useFab } from '@/services/fab/useFab';
import { useModal } from '@/services/modal/useModal';
import { TableOfContents as IconTableOfContents } from 'lucide-react';
import { AboutSection } from './AboutSection';
import { EducationSection } from './EducationSection';
import { ExperienceSection } from './ExperienceSection';
import { SkillsSection } from './SkillsSection';
import './about.scss';

function About() {
    const { openModal } = useModal();

    useFab({
        icon: <IconTableOfContents />,
        label: 'Table of contents',
        onClick: () =>
            openModal(<p>Texto de prueba</p>, {
                title: 'Contents',
                showClose: false,
            }),
    });

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
