import './App.scss';
import heroImg from './assets/hero.png';

function App() {
    return (
        <main>
            {/* HERO / PRESENTACIÓN */}
            <section className="hero container">
                <div className="hero__content">
                    <h1>
                        Hola, soy{' '}
                        <span className="accent">Jeisson Rodriguez</span>
                    </h1>

                    <p className="hero__subtitle">
                        Software Developer enfocado en construir sistemas
                        escalables, arquitectura limpia y soluciones eficientes.
                    </p>

                    <div className="hero__actions">
                        <a href="#projects" className="btn primary">
                            Ver proyectos
                        </a>

                        <a href="#contact" className="btn secondary">
                            Contacto
                        </a>
                    </div>
                </div>

                <div className="hero__image">
                    <img src={heroImg} alt="Jeisson Rodriguez" />
                </div>
            </section>

            {/* ABOUT */}
            <section className="about container">
                <h2>Sobre mí</h2>

                <p>
                    Soy desarrollador de software con experiencia en desarrollo
                    web, arquitectura de sistemas y optimización de procesos. Me
                    apasiona crear soluciones escalables, mantener código limpio
                    y aprender constantemente nuevas tecnologías.
                </p>
            </section>

            {/* SKILLS */}
            <section className="skills container">
                <h2>Habilidades</h2>

                <div className="skills__list">
                    <span>React</span>
                    <span>TypeScript</span>
                    <span>.NET</span>
                    <span>SQL Server</span>
                    <span>Arquitectura</span>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="contact container">
                <h2>Contacto</h2>

                <p>Puedes encontrarme en:</p>

                <div className="contact__links">
                    <a href="https://github.com/" target="_blank">
                        GitHub
                    </a>
                    <a href="https://linkedin.com/" target="_blank">
                        LinkedIn
                    </a>
                </div>
            </section>
        </main>
    );
}

export default App;
