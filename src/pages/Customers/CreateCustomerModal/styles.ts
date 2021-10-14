import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Content = styled.div`
    width: 1000px;
    padding: 0 60px 40px;
    background-color: var(--body-color);
    border-radius: 20px;

    button:first-child {
        background-color: transparent;
        border: none;
        outline: none;
        right: calc(-100% + 40px);
        position: relative;
        top: 24px;
    }

    button:last-child {
        margin-top: 3rem;
    }

    h1 {
        margin-bottom: 12px;
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

export const NameContent = styled.section`
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;


    input {
        width: 45rem;
    }

    select {
        width: 49.5rem;
    }
`;
export const ContactContent = styled.section`
    display: flex;
    justify-content: space-between;

    input {
        width: 45rem;
    }
`;
export const AddressContent = styled.section`
    display: flex;
    justify-content: space-between;

    input {
        width: 45rem;
    }
`;

export const DocumentContent = styled.section`
    display: flex;
    justify-content: space-between;

    input {
        width: 45rem;
    }
`;