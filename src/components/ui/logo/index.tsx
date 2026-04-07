import './logo.scss';

type LogoSize = 'sm' | 'md' | 'lg';

type LogoProps = {
    size?: LogoSize;
};

function Logo({ size = 'md' }: LogoProps) {
    return (
        <span className={`logo logo--${size}`}>
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
