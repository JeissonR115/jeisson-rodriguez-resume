import { Button } from 'jeisson-rodriguez-resume';
import { Moon, Sun, X } from 'lucide-react';

// Real usage: the hero section's primary/secondary call-to-action pair
// (src/pages/home/index.tsx).
export function Variants() {
    return (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button variant="primary">View projects</Button>
            <Button variant="secondary">Download CV</Button>
            <Button variant="ghost">Contact</Button>
        </div>
    );
}

export function Sizes() {
    return (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    );
}

// Real usage: the header's theme toggle and language switcher
// (src/components/layout/header/index.tsx) — ghost + sm, icon-only.
export function IconOnly() {
    return (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="ghost" size="sm">
                EN
            </Button>
            <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<Sun size={16} />}
                aria-label="Light mode"
            />
            <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<Moon size={16} />}
                aria-label="Dark mode"
            />
            <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<X size={16} />}
                aria-label="Close menu"
            />
        </div>
    );
}

export function Disabled() {
    return (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="primary" disabled>
                Unavailable
            </Button>
            <Button variant="secondary" disabled>
                Unavailable
            </Button>
        </div>
    );
}

// Button also renders as a plain anchor (`as="a"`) for external links — the
// footer's GitHub/LinkedIn links use this form.
export function AsAnchor() {
    return (
        <Button as="a" href="https://github.com" variant="secondary">
            Download CV
        </Button>
    );
}

// Real usage: the hero CTAs render as router links (`as="link"`) so the
// styled button navigates client-side instead of doing a full page load
// (src/pages/home/index.tsx). Every card in this DS is wrapped in a
// MemoryRouter (cfg.provider in .design-sync/config.json) so this and
// every other react-router-dom consumer share one router instance.
export function AsLink() {
    return (
        <Button as="link" to="/projects" variant="primary">
            View projects
        </Button>
    );
}
