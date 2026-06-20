import { Tag } from 'jeisson-rodriguez-resume';

// Real usage: project tech-stack tags from src/data/projects.json.
export function TechStack() {
    return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Tag label="React" />
            <Tag label="TypeScript" />
            <Tag label="SCSS" />
        </div>
    );
}

export function Accent() {
    return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Tag label=".NET" variant="accent" />
            <Tag label="SQL Server" variant="accent" />
        </div>
    );
}
