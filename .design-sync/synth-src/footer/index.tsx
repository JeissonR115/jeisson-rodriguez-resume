// CSS-fixed copy for design-sync — see .design-sync/synth-src/button/index.tsx header.
import profile from '@/data/profile.json';
import socialConfig from '@/data/social.json';
import Button from '../button/index.tsx';
import Icon from '../icon/index.tsx';
import type { IconId } from '../icon/icon.type.ts';
import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner container">
                <span className="footer__copy">
                    © {new Date().getFullYear()} {profile.name}
                </span>

                <ul className="footer__links">
                    {socialConfig.links.map((link) => (
                        <li key={link.href}>
                            <Button
                                as="a"
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                variant="ghost"
                                size="sm"
                                icon={
                                    <Icon id={link.icon as IconId} size="sm" />
                                }
                                aria-label={link.label}
                                iconOnly
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
