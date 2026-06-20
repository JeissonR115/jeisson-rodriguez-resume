import { Projects } from 'jeisson-rodriguez-resume';

// Projects takes no props — renders the real project grid from
// src/data/projects.json. The "api-rest" card's photo 404s because
// public/projects/ isn't populated in this repo yet (see NOTES.md); the
// "portfolio" card has no images and renders without a Carousel, which is
// also real behavior (Carousel only mounts when `images.length > 0`).
export function Default() {
    return <Projects />;
}
