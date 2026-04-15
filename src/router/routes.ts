export const routes = ['/', '/about', '/projects'] as const;
export type Route = (typeof routes)[number];
