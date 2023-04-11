import { createGlobalStyle } from 'styled-components';
import { device } from './breakpoints';

export const GlobalStyle = createGlobalStyle`

  :root {
    --black: #000000;

    --blue: #0b1b73;
    --dark-blue: #020f5b;
    --light-blue: #062efe;

    --secondary-blue: #b8c6e5;
    
    
    --white: #ffffff;
    --light-white: #f5f5f5;
    --backgroud: #f0f1fa;

    --grey: #707070;
    --max-width: 1150px;

    --danger: #c00000;
    --success: #009100;

    ${device.md`
    	--max-width: 100vw;
    `};
  }

  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body, button, input, textarea{
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
      font-weight: 600;
  }

  body {
    background: var(--backgroud);
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
