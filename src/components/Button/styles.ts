import styled from 'styled-components';

export const Container = styled.button`
    background: var(--contrast-color);
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: var(--button-text-color);
    width: 100%;
    font-weight: 500;
    transition: all .4s ease;
    
    &:hover {
        background: var(--contrast-details-color);
    }
`;