import { Icon } from 'jeisson-rodriguez-resume';

// KNOWN LIMITATION (.design-sync/NOTES.md): Icon renders
// <use href="/icons.svg#<id>-icon">, referencing this site's own SVG sprite
// (public/icons.svg). That sprite isn't part of the uploaded bundle and
// nothing in claude.ai/design's preview iframe serves it, so the glyph
// itself is invisible here — this composition still documents the real ids,
// sizes, and the realistic "icon inside a labeled row" usage pattern from
// src/components/layout/header/index.tsx and the footer's social links.
const IDS = ['github', 'linkedin', 'x', 'discord', 'bluesky'] as const;

export function SocialLinks() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {IDS.map((id) => (
                <div
                    key={id}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                    <Icon id={id} size="md" label={id} />
                    <span>{id}</span>
                </div>
            ))}
        </div>
    );
}

export function Sizes() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon id="sun" size="sm" label="sun" />
                <span>sm</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon id="sun" size="md" label="sun" />
                <span>md</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon id="sun" size="lg" label="sun" />
                <span>lg</span>
            </div>
        </div>
    );
}
