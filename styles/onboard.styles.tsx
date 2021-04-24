import { createGlobalStyle } from 'styled-components';

export const OnboardStyles = createGlobalStyle`
body {
    margin: 0;
    /* background: black;*/
    background-color: black;
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
    align-content: end;
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
    font-weight: light;
    font-family: 'Inter';
    letter-spacing: -1px;
    float: left;
    margin-bottom: 35px;
    width: 100%;
}

.copy .cover-link {
    width: 196px;
    margin: auto;
}

.cover-link a {
    border: 1px solid rgb(26, 40, 57);
    padding: 3px 10px 3px 18px;
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
    letter-spacing: 0.3px;
}

.cover-link a img {
    margin-left: 10px;
    margin-top: 3px;
}

.onboard {
    background-size: cover;
    background-color: black;
}

.onboard .copy {
    margin-bottom: 140px;
    letter-spacing: -1px;
}

.copy-phrase {
    font-size: 38px;
    line-height: 1.2;
    float: left;
    font-weight: 400;
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

.button-cyan:hover {
    background-color: rgb(83, 235, 253);
}

.copy .p-winner {
    font-size: 22px;
    margin-top: 0;
}

.p-winner a {
    color: #45B4C1;
    text-decoration: none;
}

.p-winner a:hover {
    color: rgb(83, 235, 253);
}


@media only screen and (min-width: 1024px) {
    .onboarding-chrono .copy {
        width: 800px;
    }

    .onboarding-laberynth .copy {
        width: 800px;
    }

    .onboarding-laberynth .copy p {
        font-size: 36px;
    }

    .onboarding-reflexivo .copy {
        width: 650px;
    }

    .onboarding-laberynth .copy .p-winner {
        font-size: 22px;
    }
}



/* Cronologia */
@media (max-width: 540px) {

  #hero-onboarding {
      background-position: 54%;
  }

  .hero-onboarding .copy .cover-link {
      width: 186px;
      margin: auto;
  }

}


@media only screen and (max-width: 1024px) and (orientation: landscape) {
    /* Onboard */

    .copy {
        width: 50vw;
    }

    .onboard .copy p {
        font-size: 18px;
    }

    .copy-phrase {
        font-size: 22px;
    }

    .onboard .copy {
        margin-bottom: 40px;
    }
}

@media only screen and (max-width: 1024px) and (orientation: portrait) {
    /* Onboard */

    .app-elcubo.onboard {
        background-position: center center;
        background-repeat: no-repeat;
    }
    
    .onboard .copy p {
        font-size: 18px;
    }

    .copy-phrase {
        font-size: 22px;
    }
}

`;