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
    margin-bottom: 12px;
    position: relative;

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
    margin: 0 10px;
    position: absolute;
    right: 0;

    svg {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #FFF;
        text-align: center;
        &::before {
            border-color: #c53030 transparent;
        }
    }
`;

export const ContainerData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 2rem;

    width: 350px;
    height: 300px;

    .react-datepicker__month-container {
        flex: 1;
        height: 100%;
    }

    .react-datepicker__day-names {
        margin: 0;
        
        div {
            width: 4rem;
            color: var(--button-text-color);
            font-weight: 500;
        }
    }

    .react-datepicker__week {
        div {
            width: 4rem;
        }
    }

    .react-datepicker__header.react-datepicker__header--custom {
        background-color: var(--contrast-color);
    }

`;

export const CalendarHeader = styled.div`
    margin: 10px;
    display: flex;
    justify-content: center;
`;
export const CalendarButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: transparent;

    svg {
        margin: 0;
        color: var(--button-text-color);
    }
`;