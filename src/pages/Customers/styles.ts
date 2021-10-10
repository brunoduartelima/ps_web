import styled, { css } from "styled-components";

interface CustomerDataProps {
    isOpen: boolean;
}

export const Container = styled.main``;
export const CustomersContainer = styled.div`
    max-width: 1200px;
    height: 100%;
    padding-top: 64px;
    margin: 0 auto;
`;
export const ServicesContent = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        color: var(--details-color);
        margin-right: 24px;
        font-size: 17px;
        font-weight: 500;
        transition: all  .4s ease-in-out;

        svg {
            margin-right: 4px;
        }
    }

    button:hover{
        color: var(--contrast-color);
    }

    span {
        padding-top: 1.5px;
        margin: 0 24px;
        font-size: 16px;
        font-weight: 500;
    }
`;

export const SearchContent = styled.div`
    display: flex;
    width: 340px;
    height: 40px;

    div {
        padding: 8px;
        margin-right: -5px;
        background: var(--contrast-color);
        color: var(--input-color);
        min-width: 50px;
        text-align: center;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
        border: 1px solid var(--details-color);
    }

    input {
        width: 320px;
        height: 40px;
        padding: 10px;
        color: var(--text-color);
        border: 1px solid var(--details-color);
        background-color: var(--input-color);
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
    }

    input::placeholder {
        color: var(--text-color);
    }

    input:focus {
        border: 2px solid var(--contrast-color);
    }
`;

export const CustomersContent = styled.div`
    width: 1000px;
    margin: 48px auto 0 auto;
`;

export const Customer = styled.li`
    list-style: none;
    background-color: var(--input-color);
    border: 1px solid var(--contrast-color);
    padding: 4px;
    margin-bottom: 4px;
    font-size: 20px;
`;
export const CustomerOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;

    span {
        margin-left: 8px;
        font-weight: 700;
        font-size: 20px;
    }
`;
export const CustomerOptionsContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        border: none;
        background-color: transparent;
        margin-right: 12px;
        color: var(--details-color);

        svg {
            transition: all  .2s ease-in-out;
        }

        svg:hover {
            color: var(--contrast-color);
        }

    }
`;
export const CustomerData = styled.div<CustomerDataProps>`
    ${props => props.isOpen && css`
        display: none;
    `}

    li {
        list-style: none;
        padding: 4px 0;
        margin-left: 8px;

        span {
            font-weight: 500;
        }
    }

    strong {
        font-size: 3rem;
        margin-left: 8px;
    }


`;