import Button from '@/components/ui/button';
import Icon from '@/components/ui/Icon';
import type { IconId } from '@/components/ui/Icon/icon.type';
import profile from '@/data/profile.json';
import socialConfig from '@/data/social.json';
import './footer.scss';

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
