import styled, { css } from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: var(--input-color);
    border-radius: 10px;
    border: 2px solid var(--input-color);
    padding: 8px;
    width: 100%;
    border: 2px solid var(--input-color);
    color: var(--details-color);
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    position: relative;

    & + div {
        margin-top: 8px;
    }

    ${props => props.isFocused && css`
        color: var(--contrast-color);
        border-color: var(--contrast-color);
    `}
    ${props => props.isFilled && css`
        color: var(--contrast-color);
    `}
    
    textarea {
        flex: 1;
        background: transparent;
        border: 0;
        resize: none;
        color: var(--text-color);
        &::placeholder {
            color: var(--details-color);
        }
    }
`;