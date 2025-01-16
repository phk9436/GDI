import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    *, *::before, *::after {
      box-sizing: border-box;
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    html, body {
      margin: 0;
      padding: 0;
      font-family: "Noto Sans KR", 'sans-serif';
    }

    ul {
      list-style-type: none;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: auto;
    }

    em {
      font-style: normal;
    }

    form{
      display: contents;
    }
`;

export default GlobalStyle;
