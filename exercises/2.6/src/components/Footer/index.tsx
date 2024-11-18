import "./Footer.css"

interface FooterProps {
    children: React.ReactNode;
    logoUrl: string;
}

const Footer = (props: FooterProps) => {
    return (
        <footer className="footer">
            <div>{props.children}</div>
            <img src={props.logoUrl} alt="logo" className="logo"/>
        </footer>
    )
}

export default Footer;