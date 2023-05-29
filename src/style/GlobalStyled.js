import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Open Sans', sans-serif;;
        font-style: normal;
        font-weight: 400;
    }
    body{
        background-color: #ccc;
    }
    a, button{
        cursor: pointer;
    }
`

export default GlobalStyle