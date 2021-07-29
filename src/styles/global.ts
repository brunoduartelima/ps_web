import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root{
        --contrast-color: #4B75F2;
        --text-color: #0B0B0D;
        --secondary-text-color: #BFBFBF;
        --header-color: #262626;
        --details-color: #454C59;
        --body-color: #F2F2F2;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    body {
        background: var(--body-color);
        color: var(--text-color);
        -webkit-font-smoothing: antialiased;
    }
    body, input, button {
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
    }
    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }
    button {
        cursor: pointer;
    }
`;