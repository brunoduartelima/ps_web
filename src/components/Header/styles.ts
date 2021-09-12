import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    width: 100%;
    height: 70px;
    background-color: var(--header-color);
`;
export const LogoContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 10rem;
    }

    strong {
        font-size: 2.5rem;
        color: var(--button-text-color);
    }
`;
export const Navbar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75%;

    ul {
       flex: 1;
       display: flex;
       align-items: center;
       justify-content: center;
    }

    li {
        list-style: none;
    }

    a {
        display: flex;
        justify-content: center;
        text-decoration: none;
        color: var(--button-text-color);
        font-size: 2.5rem;
        margin-right: 2rem;
        border: 1px solid transparent;
        padding-bottom: 2px;
        transition: all ease;

        svg {
            width: 24px;
            height: 24px;
            margin-right: .5rem;
        }

        &:hover {
            border-bottom: 2px solid var(--contrast-color);
        }
    }
    
`;
export const ConfigContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        display: flex;
        justify-content: center;
        text-decoration: none;
        color: var(--button-text-color);
        font-size: 2.5rem;
        border: 1px solid transparent;
        padding-bottom: 2px;
        transition: all ease;

        svg {
            width: 24px;
            height: 24px;
            margin-right: .5rem;
        }

        &:hover {
            border-bottom: 2px solid var(--contrast-color);
        }
    }

`;
export const LogoutContent = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--button-text-color);
        background-color: transparent;
        border: 1px solid transparent;
        font-size: 2.5rem;
        padding-bottom: 2px;
        transition: all ease;

        svg {
            width: 24px;
            height: 24px;
            margin-right: .5rem;
        }

        &:hover {
            border-bottom: 2px solid var(--contrast-color);
        }
    }
`;