import type { Route } from './routes';
import { routes } from './routes';

export const routeOrder = Object.fromEntries(
    routes.map((route, i) => [route, i]),
) as Record<Route, number>;

export type Direction = 'forward' | 'backward';

export function getPath(location: { pathname: string; hash: string }): Route {
    const path = location.pathname || '/';
    return (routes as readonly string[]).includes(path) ? (path as Route) : '/';
}

export function getDirection(curr: Route, prev: Route): Direction {
    return routeOrder[curr] >= routeOrder[prev] ? 'forward' : 'backward';
}
