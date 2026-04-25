import App from '@/App';
import About from '@/pages/about';
import Home from '@/pages/home';
import Projects from '@/pages/projects';
import { createHashRouter } from 'react-router-dom';
import type { Route } from './routes';

type RouteConfig = {
    path: Route;
    element: React.ReactNode;
    index?: boolean;
};

const children: RouteConfig[] = [
    { path: '/', element: <Home />, index: true },
    { path: '/about', element: <About /> },
    { path: '/projects', element: <Projects /> },
];

export const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: children.map(({ path, element, index }) => ({
            index,
            path: index ? undefined : path.slice(1),
            element,
        })),
    },
]);
