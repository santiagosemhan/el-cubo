import { createGlobalStyle } from 'styled-components';

export const RewardReflexiveStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,500;1,300;1,400;1,500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
body {
    margin: 0;
    /* background: black;*/
    font-family: Inter;
    color: white;
}

:root {
    /* Full grid area variable */
    --fullGrid: 1 / 1 / -1 / -1;
}

.header-top {
    -moz-animation: fadein 3s;
    /* Firefox */
    -webkit-animation: fadein 3s;
    /* Safari and Chrome */
    -o-animation: fadein 3s;
}

.app-elcubo.recompensa {
    max-width: 75vw;
    margin: auto;
    margin-top: 30vh;
    position: relative;
    z-index: 1;
    animation: fadein 3s;
    -moz-animation: fadein 3s;
    /* Firefox */
    -webkit-animation: fadein 3s;
    /* Safari and Chrome */
    -o-animation: fadein 3s;
    /* Opera */
}

@media screen and (min-width: 1600px) {
    .app-elcubo.recompensa {
        max-width: 60vw;
    }
}

.bg-recompensa {
    width: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    animation: fadein 2s;
    -moz-animation: fadein 2s;
    /* Firefox */
    -webkit-animation: fadein 2s;
    /* Safari and Chrome */
    -o-animation: fadein 2s;
    /* Opera */
}

.title-recompensa {
    color: white;
    font-family: Inter;
    font-size: 2.3rem;
    letter-spacing: -1px;
    font-weight: 600;
    opacity: 1;
    animation: fadein 1s;
    -moz-animation: fadein 1s;
    /* Firefox */
    -webkit-animation: fadein 1s;
    /* Safari and Chrome */
    -o-animation: fadein 1s;
}

.desc-recompensa {
    letter-spacing: -0.3px;
    font-size: 18px;
    line-height: 26px;
}

/* button */

.cover-link {
    width: 365px;
    margin: auto;
}
.cover-link a {
    border: 1px solid rgb(26, 40, 57);
    padding: 3px 30px 3px 0px;
    border-radius: 30px;
    font-weight: 500;
    font-family: Inter;
    text-decoration: none;
    float: left;
    margin-top: 30px;
    margin-bottom: 30px;
}

.cover-link a:hover {
    background: #56EBFD;
}

.cover-link a span {
    font-size: 20px;
    line-height: 2.2em;
    float: left;
}

.cover-link a img {
    margin-left: 10px;
    margin-top: 3px;
    margin-right: 5px;
    float: left;
}

.copy button img {
    float: right;
    margin-left: 10px;
}

.button-cyan {
    background-color: rgb(69, 180, 193);
    color: rgb(26, 40, 57);
}

@media (max-width: 860px) {

    .cover-link {
        width: 295px;
    }
    .cover-link a span {
        font-size: 16px;
    }

    .cover-link a img {
        width: 25px;
    }
}

`;
