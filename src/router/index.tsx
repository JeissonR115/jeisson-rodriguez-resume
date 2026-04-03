import App from '@/App';
import About from '@/pages/about';
import Home from '@/pages/home';
import Projects from '@/pages/projects';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'projects', element: <Projects /> },
        ],
    },
]);
