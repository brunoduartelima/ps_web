import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiBarChart, FiPackage, FiHome, FiSettings } from 'react-icons/fi';
import { RiLogoutBoxRLine, RiContactsLine, RiTeamLine, RiHandCoinLine } from 'react-icons/ri';

import logo from '../../assets/logo2.png';
import { useAuth } from '../../hooks/auth';

import {
    HeaderContainer,
    LogoContent,
    Navbar,
    ConfigContent,
    LogoutContent
} from './styles';

const Header: React.FC = () => {
    const { signOut, company } = useAuth();

    return (
        <HeaderContainer>
            <LogoContent>
                <img src={logo} alt="Personal Manager"/>
                <strong>{company.name}</strong>
            </LogoContent>
            <Navbar>
                <ul> 
                    <li>
                        <Link to="/dashboard">
                            <FiHome />
                            Início
                        </Link>
                    </li>
                    <li>
                        <Link to="/clients">
                            <RiContactsLine />
                            Clientes
                        </Link>
                    </li>
                    <li>
                        <Link to="/employees">
                            <RiTeamLine />
                            Colaboradores
                        </Link>
                    </li>
                    <li>
                        <Link to="/sales">
                            <FiShoppingCart />
                            Vendas
                        </Link>
                    </li>
                    <li>
                        <Link to="/financials">
                            <FiBarChart />
                            Financeiro
                        </Link>
                    </li>
                    <li>
                        <Link to="/products">
                            <FiPackage />
                            Produtos
                        </Link>
                    </li>
                    <li>
                        <Link to="/services">
                            <RiHandCoinLine />
                            Serviços
                        </Link>
                    </li>
                </ul>
            </Navbar>
            <ConfigContent>
                <Link to="/services">
                    <FiSettings />
                    Configurações
                </Link>
            </ConfigContent>
            <LogoutContent>
                <button type="button" onClick={signOut}><RiLogoutBoxRLine />Sair</button>
            </LogoutContent>
        </HeaderContainer>
    )
};

export default Header;