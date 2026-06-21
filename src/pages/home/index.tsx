import Button from '@/components/ui/button';
import { isVariant } from '@/components/ui/button/button.utils';
import Tag from '@/components/ui/tag';
import profile from '@/data/profile.json';
import type { AppResources } from '@/locales/types';
import { useTranslation } from 'react-i18next';
import './home.scss';

type HomeT = AppResources['home'];
type Action = HomeT['hero']['actions'][number];

function Home() {
    const { t: tHome } = useTranslation('home');
    const { t: tAbout } = useTranslation('about');

    const actions = tHome('hero.actions', { returnObjects: true }) as Action[];
    const tech = tHome('hero.tech', { returnObjects: true }) as string[];

    return (
        <section className="hero container">
            {/* ─── Copy ─────────────────────────────── */}
            <div className="hero__content">
                {profile.available && (
                    <span className="hero__badge">
                        <span className="hero__badge-dot" aria-hidden />
                        {profile.location} · {tHome('hero.badge')}
                    </span>
                )}

                <h1 className="hero__name">
                    {tHome('hero.greeting')}
                    <span className="hero__name-accent">{profile.name}</span>
                </h1>

                <p className="hero__role">&lt; {tAbout('role')} /&gt;</p>

                <p className="hero__subtitle">{tHome('hero.subtitle')}</p>

                <blockquote className="hero__quote">
                    {tHome('hero.quote')}
                </blockquote>

                <div className="hero__actions">
                    {actions.map((action) => (
                        <Button
                            key={action.href}
                            as="link"
                            to={action.href}
                            size="lg"
                            variant={
                                isVariant(action.variant)
                                    ? action.variant
                                    : 'secondary'
                            }
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>

                <div className="hero__tags">
                    {tech.map((label, i) => (
                        <Tag
                            key={label}
                            label={label}
                            variant={i === 0 ? 'accent' : 'default'}
                        />
                    ))}
                </div>
            </div>

            {/* ─── Visual: composición tecnológica ──── */}
            <div className="hero__visual" aria-hidden>
                <div className="hero__glow" />

                <div className="hero__code">
                    <div className="hero__code-bar">
                        <span className="hero__dot hero__dot--a" />
                        <span className="hero__dot hero__dot--b" />
                        <span className="hero__dot hero__dot--c" />
                        <span className="hero__code-file">OrderService.cs</span>
                    </div>
                    <pre className="hero__code-body">
                        <code>
                            <span className="cm">
                                {'// Arquitectura limpia · capa de aplicación'}
                            </span>
                            {'\n'}
                            <span className="kw">public class</span>{' '}
                            <span className="ty">OrderService</span> :{' '}
                            <span className="ty">IOrderService</span>
                            {'\n{\n    '}
                            <span className="kw">private readonly</span>{' '}
                            <span className="ty">IUnitOfWork</span> _uow;
                            {'\n\n    '}
                            <span className="kw">public async</span>{' '}
                            <span className="ty">Task</span>&lt;
                            <span className="ty">Result</span>&gt;{' '}
                            <span className="fn">ProcessAsync</span>(
                            <span className="ty">Order</span> order)
                            {'\n    {\n        '}
                            <span className="kw">await</span> _uow.Orders.
                            <span className="fn">AddAsync</span>(order);
                            {'\n        '}
                            <span className="kw">return await</span> _uow.
                            <span className="fn">CommitAsync</span>();
                            <span className="hero__caret" />
                            {'\n    }\n}'}
                        </code>
                    </pre>
                </div>

                <div className="hero__chip hero__chip--dotnet">
                    <span className="hero__chip-icon">.N</span>
                    <span className="hero__chip-text">
                        <strong>.NET</strong>
                        <em>C# · Backend</em>
                    </span>
                </div>

                <div className="hero__chip hero__chip--sql">
                    <span className="hero__chip-icon hero__chip-icon--blue">
                        DB
                    </span>
                    <span className="hero__chip-text">
                        <strong>SQL Server</strong>
                        <em>Datos · T-SQL</em>
                    </span>
                </div>

                <div className="hero__chip hero__chip--js">
                    <span className="hero__chip-icon hero__chip-icon--amber">
                        JS
                    </span>
                    <span className="hero__chip-text">
                        <strong>JavaScript</strong>
                        <em>Frontend · SPA</em>
                    </span>
                </div>

                <div className="hero__chip hero__chip--api">
                    <span className="hero__chip-label">Arquitectura API</span>
                    <div className="hero__flow">
                        <span>Client</span>
                        <i>→</i>
                        <span className="hero__flow-mid">API</span>
                        <i>→</i>
                        <span>DB</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
