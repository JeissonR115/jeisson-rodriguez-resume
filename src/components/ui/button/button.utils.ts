export type Variant = 'primary' | 'secondary' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';

export const isVariant = (v: string): v is Variant =>
    ['primary', 'secondary', 'ghost'].includes(v);

export const isSize = (v: string): v is Size => ['sm', 'md', 'lg'].includes(v);
