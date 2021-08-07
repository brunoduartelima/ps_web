import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: var(--input-color);
    border-radius: 10px;
    border: 2px solid var(--input-color);
    padding: 16px;
    width: 100%;
    border: 2px solid var(--input-color);
    color: var(--details-color);
    display: flex;
    align-items: center;
    & + div {
        margin-top: 8px;
    }
    ${props => props.isErrored && css`
        border-color: #c53030;
    `}
    ${props => props.isFocused && css`
        color: var(--contrast-color);
        border-color: var(--contrast-color);
    `}
    ${props => props.isFilled && css`
        color: var(--contrast-color);
    `}
    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: var(--text-color);
        &::placeholder {
            color: var(--details-color);
        }
    }
    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    
    svg {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #FFF;
        &::before {
            border-color: #c53030 transparent;
        }
    }
`;