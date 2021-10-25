import styled, { css } from "styled-components";

interface ProductDataProps {
    isOpen: boolean;
}

export const Container = styled.main``;
export const ProductsContainer = styled.div`
    max-width: 1200px;
    height: 100%;
    padding-top: 64px;
    margin: 0 auto;
`;
export const ServicesContent = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        color: var(--details-color);
        margin-right: 24px;
        font-size: 17px;
        font-weight: 500;
        transition: all  .4s ease-in-out;

        svg {
            margin-right: 4px;
        }
    }

    button:hover{
        color: var(--contrast-color);
    }

    span {
        padding-top: 1.5px;
        margin-right: 3rem;
        font-size: 16px;
        font-weight: 500;
    }

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        font-weight: 500;
        color: var(--details-color);
        transition: all  .4s ease-in-out;
    }

    a:hover{
        color: var(--contrast-color);
    }
`;

export const SearchContent = styled.div`
    display: flex;
    width: 340px;
    height: 40px;
    margin-right: 3rem;

    div {
        padding: 8px;
        margin-right: -5px;
        background: var(--contrast-color);
        color: var(--input-color);
        min-width: 50px;
        text-align: center;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
        border: 1px solid var(--details-color);
    }

    input {
        width: 320px;
        height: 40px;
        padding: 10px;
        color: var(--text-color);
        border: 1px solid var(--details-color);
        background-color: var(--input-color);
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
    }

    input::placeholder {
        color: var(--text-color);
    }

    input:focus {
        border: 2px solid var(--contrast-color);
    }
`;

export const ProductsContent = styled.div`
    width: 1000px;
    margin: 48px auto 0 auto;
`;

export const Product = styled.li`
    list-style: none;
    background-color: var(--input-color);
    border: 1px solid var(--contrast-color);
    padding: 4px;
    margin-bottom: 4px;
    font-size: 20px;
`;
export const ProductOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;

    span {
        margin-left: 8px;
        font-weight: 700;
        font-size: 20px;
    }
`;

export const ProductOptionsContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const OptionButton = styled.button`
    border: none;
    background-color: transparent;
    margin-right: 1.5rem;
    color: var(--details-color);

    svg {
        transition: all .2s ease-in-out;
    }

    svg:hover {
        color: var(--contrast-color);
    }
`;

export const DeleteContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const DeleteContent = styled.div`
    width: 500px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px;
    background-color: var(--body-color);
    border-radius: 20px;

    div {
        display: flex;
        justify-content: space-between;
    }
    
    button {
        width: 150px;
        height: 50px;
        background-color: #2e656a;
        color: #fff;
        letter-spacing: .8px;
        border: none;
        border-radius: 20px;
        font-weight: 700;
        transition: all .2s ease-in-out;
    }

    button:last-child {
        background-color: #c53030;
        color: #fff;
        margin-left: 2rem;
    }

    button:hover {
        opacity: 0.7;
    }
`;

export const ProductData = styled.div<ProductDataProps>`
    ${props => props.isOpen && css`
        display: none;
    `}

    li {
        list-style: none;
        padding: 4px 0;
        margin-left: 8px;

        span {
            font-weight: 500;
        }
    }

    strong {
        font-size: 3rem;
        margin-left: 8px;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;

        a {
            display: flex;
            align-items: center;
            width: 29rem;
            text-decoration: none;
            margin-left: 8px;
            color: var(--text-color);
            font-weight: 500;
            transition: all  .2s ease-in-out;
        }

        a:hover {
            color: var(--contrast-color);
        }
    }
`;