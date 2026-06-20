import { Logo } from 'jeisson-rodriguez-resume';

export function Sizes() {
    return (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Logo size="sm" />
            <Logo size="md" />
            <Logo size="lg" />
        </div>
    );
}

export function Collapsed() {
    return <Logo size="md" collapsed />;
}
