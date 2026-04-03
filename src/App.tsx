import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
