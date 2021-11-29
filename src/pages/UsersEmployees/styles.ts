import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 600px;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        color: var(--details-color);
        font-size: 17px;
        font-weight: 500;
        transition: all  .4s ease-in-out;

        svg {
            margin-right: 4px;
        }
    }

    > button:hover{
        color: var(--contrast-color);
    }
`;
export const UsersContent = styled.div`
    width: 1300px;
    padding-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

export const User = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--input-color);
    border: 1px solid var(--contrast-color);
    padding: 16px 28px;
    margin-bottom: 4px;
    font-size: 20px;

    span {
        font-weight: 400;
    }

    h2 {
        color: var(--contrast-color);
    }
`;

export const ButtonDelete = styled.button`
    background-color: transparent;
    color: var(--details-color);
    margin: 0;
    border: none;
    outline: none;
    right: calc(-15% + 24px);
    top: 8px;
    position: absolute;


    &:hover {
        color: var(--contrast-color);
    }
`;

export const Employee = styled.div`
    display: flex;
    justify-content: space-evenly;
    position: relative;

    > svg {
        color: var(--contrast-color);
    }

    > div {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    div > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DeleteContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const DeleteContent = styled.div`
    width: 500px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px;
    background-color: var(--body-color);
    border-radius: 20px;

    div {
        display: flex;
        justify-content: space-between;
    }

    button {
        width: 150px;
        height: 50px;
        background-color: #2e656a;
        color: #fff;
        letter-spacing: .8px;
        border: none;
        border-radius: 20px;
        font-weight: 700;
        transition: all .2s ease-in-out;
    }

    button:last-child {
        background-color: #c53030;
        color: #fff;
        margin-left: 2rem;
    }

    button:hover {
        opacity: 0.7;
    }
`;