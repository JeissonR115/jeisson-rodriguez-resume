// CSS-fixed-tree copy for design-sync — verbatim from src/components/ui/Icon/icon.type.ts.
export type IconId =
    | 'github'
    | 'linkedin'
    | 'x'
    | 'discord'
    | 'bluesky'
    | 'documentation'
    | 'social'
    | 'sun'
    | 'moon';
export const iconSizes: Record<IconSize, number> = {
    sm: 16,
    md: 20,
    lg: 24,
};
export type IconSize = 'sm' | 'md' | 'lg';
