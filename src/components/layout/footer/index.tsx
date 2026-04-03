import { useTranslation } from 'react-i18next';
import socialConfig from '../../../data/social.json';

function Footer() {
    const { i18n } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer__inner container">
                <span className="footer__copy">
                    © {new Date().getFullYear()} Jeisson Rodriguez
                </span>

                <ul className="footer__links">
                    {socialConfig.links.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <span className="footer__lang">
                    {i18n.language.toUpperCase()}
                </span>
            </div>
        </footer>
    );
}

export default Footer;
