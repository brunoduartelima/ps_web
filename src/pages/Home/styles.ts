import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
`;

export const Header = styled.header`
    width: 100%;
    height: 100px;
    background: var(--header-color);
    display: flex;
    justify-content: center;
`;

export const HeaderContent = styled.div`
    flex: 1;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > img {
        width: 200px;
        height: 80px;
    }

    Button {
        width: 10rem;
    }
`;

export const Main = styled.main`
    display: flex;
    padding: 2rem 4rem 0px;
`;

export const Description = styled.div`
    display: flex;
    width: 50%;
    flex-direction: column;

    > img {
        margin-top: 15px;
        width: 30rem;
    }

    h1 {
        flex: 1;
        font-size: 5rem;
        text-align: center;
    }

    h2 {
        flex: 1;
        margin-top: 50px;
        font-size: 1.5rem;
    }

    strong {
        color: var(--contrast-color);
        font-weight: 700;
    }

    h3 {
        margin-top: 15px;
        text-align: center;
        font-size: 1.5rem;
    }

    h3 strong {
        font-size: 2rem;
    }
`;

export const Register = styled.div``;
export const Form = styled.form``;
export const FormContent = styled.fieldset``;


