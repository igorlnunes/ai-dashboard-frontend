import portfolioImage from '../../assets/portfolio.svg';

import './Header.css';

const Header: React.FC = () => {
    return (
        <header>
            <h1><a href='#'>IA Dashboard Previsões de Ações</a></h1>
            <img src={portfolioImage} alt="Logo site" />
        </header>
    )
}

export default Header;