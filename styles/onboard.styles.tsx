import { createGlobalStyle } from 'styled-components';

export const OnboardStyles = createGlobalStyle`
body {
    margin: 0;
    /* background: black;*/
}

:root {
    /* Full grid area variable */
    --fullGrid: 1 / 1 / -1 / -1;
}

.hero {
    /* Create grid spanning viewport width & height */
    display: grid;
    grid-template-rows: 100vh;
    overflow: hidden;
}

.copy-cover {
    /* Span the full grid */
    grid-area: var(--fullGrid);
    /* Center Content */
    display: grid;
    justify-content: center;
    align-content: center;
    background: rgba(0, 0, 0, 0.6);
}

.copy {
    margin: 0;
    z-index: 100;
    width: 60vw;
    margin: auto;
    text-align: center;
    font-family: 'Inter';
}

.copy p {
    color: white;
    font-size: 26px;
    font-weight: 400;
    font-family: 'Inter';
    letter-spacing: -1px;
}

.copy .cover-link {
    width: 186px;
    margin: auto;
}

.cover-link a {
    border: 1px solid rgb(26, 40, 57);
    padding: 3px 10px 0px 30px;
    border-radius: 30px;
    font-weight: 500;
    font-family: Inter;
    text-decoration: none;
    float: left;
}

.cover-link a span {
    font-size: 20px;
    line-height: 2.2em;
    float: left;
}

.cover-link a img {
    margin-left: 10px;
    margin-top: 3px;
}

.onboard {
    background-size: cover;
}

.onboard .copy {
    margin-top: 30vh;
}

.copy-phrase {
    font-size: 40px;
    margin-bottom: 10px;
    line-height: 1.2;
    float: left;
    width: 100%;
}

.copy button img {
    float: right;
    margin-left: 10px;
}

.hide {
    display: none;
}

.button-cyan {
    background-color: rgb(69, 180, 193);
    color: rgb(26, 40, 57);
}

`;