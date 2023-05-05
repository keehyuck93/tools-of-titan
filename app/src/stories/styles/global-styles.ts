import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const globalStyles = createGlobalStyle`
    ${normalize};

    html {
        font-size: 14px;
    }
`;

export default globalStyles;
