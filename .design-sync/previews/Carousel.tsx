import { Carousel } from 'jeisson-rodriguez-resume';

// Real usage data: src/data/projects.json's "api-rest" entry. Carousel loads
// images from a fixed `/projects/<file>` path; this repo's public/projects/
// folder isn't populated yet (see .design-sync/NOTES.md), so the photo itself
// 404s here exactly as it would on the live site today — the carousel chrome
// (nav arrows, dots) is still real and complete.
export function ProjectGallery() {
    return (
        <div style={{ maxWidth: 480 }}>
            <Carousel images={['api.png', 'api-2.png']} alt="API REST project screenshot" />
        </div>
    );
}
