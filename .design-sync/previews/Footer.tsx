import { Footer } from 'jeisson-rodriguez-resume';

// Footer takes no props — real profile name + real social links from
// src/data/profile.json / src/data/social.json. The social icon glyphs
// themselves are invisible (Icon sprite limitation, see NOTES.md); the
// buttons, spacing, and copyright line are real.
export function Default() {
    return <Footer />;
}
