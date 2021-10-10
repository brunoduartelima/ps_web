import styled, { css } from "styled-components";

interface PageDataProps {
    isActual: boolean;
}

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    div {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div:last-child {
        svg {
            transform: rotateY(180deg);
        }
    }
`;

export const GoFirst = styled.div`
    margin-right: 2rem;
`;

export const GoLast = styled.div`
    margin-left: 2rem;
`;

export const Page = styled.div<PageDataProps>`
    text-align: center;
    width: 4rem;
    height: 32px;
    font-weight: 500;

    ${props => props.isActual && css`
        border-radius: 30px;
        background-color: var(--contrast-color);
        color: var(--button-text-color);
    `}
`;