import styled, { keyframes } from "styled-components";

const gradient = keyframes`
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
`;

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;

    overflow: scroll;
    overflow: hidden;

    justify-content: center;
    align-items: center;

    Form {
        position: absolute;
        z-index: 1;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 60rem;
        height: 400px;
        background: #fff;
        border-radius: 1rem;
        box-shadow: 20px 20px 20px 0 rgb(0 0 0 / 25%);
    }
`;

export const SimpleContent = styled.div`
    z-index: 0;
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormContent = styled.fieldset`
    width: 400px;
    height: 90%;
    border: none;

    Button {
        margin-top: 2rem;
    }

    a {
        text-decoration: none;
        color: var(--contrast-color);
        font-weight: 500;
        transition: all .4s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 3rem;
        
        svg {
            margin-right: 16px;
        }
    }

    a:hover {
        color: var(--contrast-details-color);
    }
`;

export const LegendContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;

    img {
        width: 130px;
        height: 70px;
    }

    legend {
        font-size: 3rem;
        font-weight: 500;
        color: var(--contrast-color);
        margin-bottom: 20px;
    }
`;

export const CheckUserContent = styled.div`
    padding-top: 0.5rem;
    
    input {
        margin-right: 0.5rem;
    }

    label + input {
        margin-left: 6rem;
    }
`;

export const StyledContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
    width: 50%;
    height: 100vh;
    background-image: linear-gradient(
        44deg, 
        #ED7F45,
        #ED7F45, 
        var(--contrast-color),
        var(--contrast-color)
    );
    background-size: 400% 400%;
    animation: ${gradient} 10s ease infinite;

    div {
        width: 300px;
        color: var(--body-color);
        margin-bottom: 140px;

        > p {
            font-weight: 100;
            font-size: 6rem;
            margin-bottom: 2rem;
        }

        p + p {
            font-weight: 500;
            font-size: 4rem;
        }
    }
`;
