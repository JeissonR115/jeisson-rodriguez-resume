import { Outlet } from 'react-router-dom';
import './app.scss';
import Footer from './components/layout/footer';
import Header from './components/layout/header';

function App() {
    return (
        <div className="app">
            <Header />
            <main className="app__content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
