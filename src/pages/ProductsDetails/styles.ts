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
    margin-top: 4rem;
    input {
        width: 45rem;
    }
`;

export const ValueContent = styled.section`
    display: flex;
    justify-content: space-between;

    input {
        width: 45rem;
    }
`;