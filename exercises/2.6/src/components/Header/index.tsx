import "./Header.css"

interface HeaderProps {
    children: React.ReactNode;
    logoUrl: string;
}

const Header = (props: HeaderProps) => {
    return (
        <header className="header">
            <div>{props.children}</div>
            <img src={props.logoUrl} alt="logo" className="logo"/>
        </header>
    )
}

export default Header;