import type { Direction } from '@/router/transitions';
import { getDirection, getPath } from '@/router/transitions';
import { FabPortal } from '@/services/fab/FabPortal';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './app.scss';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

function App() {
    const location = useLocation();
    const prevPath = useRef(getPath(location));
    const [direction, setDirection] = useState<Direction>('backward');

    useEffect(() => {
        const curr = getPath(location);
        const prev = prevPath.current;
        setDirection(getDirection(curr, prev));
        prevPath.current = curr;
    }, [location]);

    return (
        <div className="app">
            <Header />
            <main
                className={`app__content app__content--${direction}`}
                key={location.key}
            >
                <Outlet />
            </main>
            <Footer />
            <FabPortal />
        </div>
    );
}

export default App;
