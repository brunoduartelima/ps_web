import styled from "styled-components";

export const Container = styled.main``;
export const Content = styled.div`
    max-width: 1000px;
    height: 100%;
    margin: 32px auto;
    padding: 0 8rem;

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
        width: 49rem;
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