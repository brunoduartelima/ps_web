import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
    max-width: 1000px;
    height: 100%;
    margin: 32px auto;
    padding: 0 8rem;

    label > span {
        color: var(--secondary-text-color);
        font-style: italic;
        margin-left: 0.5rem;
    }

    h1 {
        margin-bottom: 12px;
        color: var(--contrast-color);
    }

    h2 {
        margin: 12px 0;
        color: var(--contrast-color);  
    }
`;

export const Title = styled.div`
    display: flex;
    align-items: center;

    svg {
        color: var(--contrast-color);
        margin-right: 3rem;
    }
    
    h1 {
        color: var(--contrast-color);
        margin-top: 8px;
    }
`;

export const Datalist = styled.div`
    div {
        margin: 0
    }
`;

export const DatalistOptions = styled.div`
    border: 1px solid var(--input-color);
    border-radius: 8px;
    border-top: none;
    background-color: var(--body-color);
    box-shadow: 20px 20px 20px 0 rgb(0 0 0 / 25%);
    position: absolute;
    z-index: 2;
    width: 40%;
`;

export const ProductOption = styled.div`
    padding: 8px;
    transition: all .4s ease;
    border-bottom: 1px solid var(--input-color);

    &:hover {
        background-color: var(--input-color);
    }

    div:last-child {
        margin-top: 4px;
    }

    div {
        display: flex;
        p:last-child {
            margin-left: 2rem;
        }
    }
`;

export const ProductsSelected = styled.div`
`;

export const ProductsSelectedContent = styled.div`
    display: flex;
    width: 50rem;
    background-color: var(--details-color);
    color: var(--button-text-color);
    border-radius: 1rem;
    padding: 16px;
    margin-bottom: 8px;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    div:last-child {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
    }

    button {
        background-color: transparent;
        border: none;
        outline: none;
        left: calc(20% + 16px);
        position: relative;
        color: var(--button-text-color);
        transition: all .4s ease;
    }

    button:hover {
        color: var(--secondary-text-color);
    }
`;

export const OperationContent = styled.section`
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
    
    input {
        width: 45rem;
    }

    select:first-child {
        width: 45rem;
    }
`;

export const ValueContent = styled.section`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    input {
        width: 45rem;
    }
`;