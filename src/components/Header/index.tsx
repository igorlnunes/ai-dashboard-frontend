import portfolioImage from '../../assets/portfolio.svg';

import './Header.css';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Dashboard Stock Trading"}) => {
    return (
        <header className='main-header'>
            <div className="logo">
                <h1>{title}</h1>
                <img src={portfolioImage} alt='logomarca' />
            </div>
            <nav className="nav-menu">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;