import './logo.scss';

type LogoSize = 'sm' | 'md' | 'lg';

type LogoProps = {
    size?: LogoSize;
    collapsed?: boolean;
};

function Logo({ size = 'md', collapsed = false }: LogoProps) {
    return (
        <span
            className={`logo logo--${size} ${collapsed ? 'logo--collapsed' : ''}`}
        >
            <span className="logo-bracket">{'{'}</span>
            <span className="logo-name">
                <span className="logo-j">J</span>
                <span className="logo-eis">eis</span>
                <span className="logo-son">SON</span>
            </span>
            <span className="logo-bracket">{'}'}</span>
        </span>
    );
}

export default Logo;
