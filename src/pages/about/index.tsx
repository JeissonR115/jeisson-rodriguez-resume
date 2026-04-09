import { AboutSection } from './AboutSection';
import { EducationSection } from './EducationSection';
import { ExperienceSection } from './ExperienceSection';
import { SkillsSection } from './SkillsSection';
import './about.scss';

function About() {
    return (
        <>
            <AboutSection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
        </>
    );
}

export default About;
