import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 85% 5%;
`;

export const Header = styled.header`
    width: 100%;
    background: var(--header-color);
    display: flex;
    justify-content: center;
`;

export const HeaderContent = styled.div`
    flex: 1;
    max-width: 150rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > img {
        width: 200px;
        height: 75%;
    }

    a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20rem;
        height: 7rem;
        border-radius: 10px;
        font-weight: 500;
        background-color: var(--contrast-color);
        margin-right: 15rem;
        text-decoration: none;
        color: var(--button-text-color);
        transition: all .4s ease;
    
        &:hover {
            background: var(--contrast-details-color);
        }
    }
`;

export const Main = styled.main`
    display: flex;
    padding: 4rem 8rem 0px;
`;

export const Description = styled.div`
    display: flex;
    width: 50%;
    height: 100%;
    flex-direction: column;

    align-items: center;

    > img {
        margin: 48px 0 16px 0;
        width: 60rem;
    }

    h1 {
        flex: 1;
        font-size: 10rem;
        text-align: center;
    }

    h2 {
        flex: 1;
        margin-top: 50px;
        font-size: 3rem;
    }

    strong {
        color: var(--contrast-color);
        font-weight: 700;
    }

    h3 {
        margin-top: 15px;
        text-align: center;
        font-size: 3rem;
    }

    h3 strong {
        font-size: 4rem;
    }
`;

export const Register = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;

    align-items: center;

    animation: ${appearFromLeft} 1s;

    Button {
        margin-top: 16px;
    }

    section > h1 {
        font-size: 8rem;
        margin-bottom: 10px;
        color: var(--contrast-color);
    }

    section > p {
        font-size: 3rem;
        margin-bottom: 10px;
    }

`;

export const RegisterContent = styled.div`
    max-width: 75rem;
`;

export const FormContent = styled.fieldset`
    border: 0;

    legend {
        font-size: 3rem;
        margin-bottom: 8px;
    }
`;

export const UserFormContent = styled.fieldset`
    border: 0;
    margin-top: 8px;

    legend {
        font-size: 3rem;
        margin-bottom: 8px;
    }
`;

export const Footer = styled.footer`
    width: 100%;
    margin-top: 20px;
    background: var(--header-color);
    display: flex;
    align-items: center;

    div {
        margin-left: 30rem;
        color: var(--secondary-text-color);
        
        a {
            text-decoration: none;
            color: var(--contrast-color);
        }
    }
`;
