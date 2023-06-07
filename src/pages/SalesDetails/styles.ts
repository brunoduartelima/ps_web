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
        margin: 8px 0;
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
`;

export const NameContent = styled.section`
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

export const Option = styled.div`
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

export const Selecteds = styled.ul`
`;

export const SelectedsContent = styled.li`
    display: flex;
    justify-content: space-between;
    width: 55rem;
    background-color: var(--details-color);
    color: var(--button-text-color);
    border-radius: 1rem;
    padding: 16px;
    margin-bottom: 8px;

    strong {
        font-size: 2.5rem;
    }

    div:first-child {
        display: flex;
        flex-direction: column;
        justify-content: center;

        input {
            border: 1px solid var(--input-color);
            border-radius: 4px;
            padding: 4px;
            width: 18rem;
        }
    }

    div:last-child {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const ButtonRemove = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    left: calc(-5% + 4px);
    position: relative;
    color: var(--button-text-color);
    transition: all .4s ease;

    &:hover {
        color: var(--secondary-text-color);
    }
`;

export const Amount = styled.div`
    display: flex;
    align-items: center;

    input {
        border: 1px solid var(--input-color);
        border-radius: 4px;
        text-align: center;
        padding: 6px;
        width: 42px;
    }

    button {
        background: none;
        border: 0;
        padding: 6px;
        color: var(--button-text-color);
        transition: all .4s ease;

        &:hover {
            color: var(--secondary-text-color);
        }

        &:disabled {
            color: var(--button-text-color);
            cursor: not-allowed;
        }
    }

`;

export const ValueContent = styled.section`
    display: flex;
    align-items: baseline;
    margin: 8px 0;
    
    span {
        color: #999;
        font-weight: bold;
    }
    
    strong {
        font-size: 28px;
        margin-left: 5px;
    }
`;