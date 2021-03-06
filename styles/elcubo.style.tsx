import { createGlobalStyle } from 'styled-components';

export const ElcuboGlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,500;1,300;1,400;1,500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
:root {
    /* Base font size */
    /* Full grid area variable */
    --fullGrid: 1 / 1 / -1 / -1;
}

body {
    font-family: 'Inter', Arial, sans-serif;
    background-color: black;
    margin: 0;
    color: white;
    overflow-x: hidden;
}

body {
    opacity: 1;
    transition: 0.7s opacity;
}

body.fade {
    opacity: 0;
    transition: none;
}

.header-top {
    width: 100%;
}

.logo-elcubo {
    margin: auto;
    z-index: 11;
}

.nav {
    position: absolute;
    right: 50px;
    top: 130px;
    z-index: 11;
}

.logo--image {
    width: 150px;
    height: auto;
    position: fixed;
    top: 120px;
    left: 40px;
    z-index: 14;
}

.header-temporal.scrolled .logo--image {
    z-index: 11;
}

.logo-season .logo--image {
    /*width: 60px;*/
    height: auto;
    position: absolute;
    top: 120px;
    left: 40px;
    z-index: 13;
}

.hero {
    /* Create grid spanning viewport width & height */
    display: grid;
    grid-template-rows: 100vh;
    overflow: hidden;
}

.hero-cover-1 {
    background: url(/portada/img/gradient.png) no-repeat 0 0;
    background-size: 100% 200px;
    padding-top: 200px;
    position: relative;
    z-index: 15;
}

.hero-1:hover {
    cursor: pointer !important;
}

.hero-1 {
    /* Create grid spanning viewport width & height */
    display: grid;
    grid-template-rows: 100vh;
    overflow: hidden;
    background: black;
}

.hero-1 .video-overlay {
    justify-content: top;
    align-content: top;
}

.row-description {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.video-bg {
    /* Span the full grid */
    grid-area: var(--fullGrid);
    /* Re-size video to cover full screen while maintaining aspect ratio */
    min-width: 100%;
    min-height: 100%;
    object-fit: contain;
    /* Display video below overlay */
    z-index: -1;
}

#hero-3 .video-bg {
    width: 100%;
    height: auto;
    min-height: auto;
    object-fit: contain;
}

.video-bg::-webkit-media-controls {
    display: none !important;
}

.video-overlay {
    /* Span the full grid */
    grid-area: var(--fullGrid);
    /* Center Content */
    display: grid;
    justify-content: center;
    align-content: center;
    text-align: left;
}

a ol li {
    color: white;
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: 'Bitter';
}

h1 {
    font-size: calc(1.4em + 2.5vw);
    line-height: 1.5;
    letter-spacing: 0.02em;
    color: #fff;
    text-shadow: 0.05em 0.05em 0.05em rgba(0, 0, 0, 0.4);
}

h2 {
    font-size: calc(3em + 0.2vw);
    font-weight: 600;
    text-align: center;
    margin: 1.2em 0;
    color: #111;
}

.app-elcubo p {
    font-family: 'Inter';
    font-size: calc(2em + 0.2vw);
    font-weight: 400;
    line-height: 2;
    color: white;
}

::-moz-selection {
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
}

::selection {
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
}

/* Custom */

.app-elcubo nav a {
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    margin-left: 30px;
}

.copy,
.copy-final {
    font-weight: 400;
    text-align: left;
    line-height: 0.8;
}

.cyan-light {
    color: #45b4c1;
}

.cyan-strong {
    color: #3b99a6;
}

.copy-cover {
    position: relative;
    width: 950px;
    margin: auto;
    /* height: 200px;*/
}

.hero-0 {
    position: static;
    top: 0;
    width: 100%;
    grid-template-rows: none;
}

.hero-0 .video-bg,
.hero-0 .img-bg-pc {
    position: fixed;
}

/* Hero 1 */

.hero-1 {
    position: relative;
    z-index: 12;
    background: black;
}

#hero-0 #hero-1 h1 span.first {
    margin-top: 0;
}

.hero-0 .hero-1 .video-bg,
.hero-0 .hero-1 .img-bg-pc,
.hero-0 .hero-2 .video-bg,
.hero-0 .hero-2 .img-bg-pc {
    position: absolute;
}

.paragraph-message {
    width: 500px;
}

.hero-1 .paragraph-message {
    margin: auto;
    /*margin-top: 100px;*/
}

.paragraph-message hr {
    float: left;
    width: 125px;
    height: 7px;
    background: #45b4c1;
    border: 0;
    margin-bottom: 20px;
}

.paragraph-message p {
    font-size: 1.5rem;
    line-height: 1.4;
    letter-spacing: 1px;
    float: left;
    clear: both;
    width: 100%;
}

.hero-1 .copy-cover {
    width: 810px;
    margin: auto;
    padding-top: 10%;
}

.hero-1 .copy-cover .first {
    float: left;
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.hero-1 .copy-cover .second {
    font-size: 3.5rem;
    margin-left: 100px;
}

.arrow-down-2 {
    z-index: 100;
    position: absolute;
    bottom: auto;
    top: 190vh;
}

.arrow-down-2 img {
    z-index: 20;
}

/* Hero 2 */

.hero-2 {
    position: relative;
    z-index: 15;
    background: black;
}

.hero-2 h1 {
    margin: 0;
}

.hero-2 .copy-cover {
    width: 810px;
}

.hero-2 .second {
    font-size: 3.5rem;
}


/* Hide Cookies */

.app__CookieAlert {
    color: #ffffff;
    text-align: center;
    -webkit-transition: opacity 1s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    -ms-transition: opacity 1s ease-in-out;
    -o-transition: opacity 1s ease-in-out;
    opacity: 1;
    display: none;
}

.app__CookieAlert.hidden {
    opacity: 0;
    display: none;
}

/* Input search */

#cover-search {
    display: flex;
    -webkit-transition: opacity 1s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    -ms-transition: opacity 1s ease-in-out;
    -o-transition: opacity 1s ease-in-out;
    opacity: 1;
}

#cover-search.hidden {
    display: none;
    opacity: 0;
}

#inputsearch {
    box-shadow: rgb(18, 18, 18) 0px 0px 30px 15px;
    color: rgb(255, 255, 255);
    border-radius: 30px;
    height: 3vw;
    border: 1px solid rgb(71, 70, 70);
    line-height: 34px;
    width: 40vw;
    padding: 5px 50px 10px 55px;
    outline: none;
    margin-left: 5px;
    box-sizing: border-box;
    transition: all 0.5s ease 0s;
    position: relative;
    font-family: Dosis, sans-serif;
    font-size: 2rem;
    background-color: rgb(71, 70, 70) !important;
    font-weight: 100 !important;
}

.AtSearchFocus__ContentCloseModal {
    position: absolute;
    z-index: 1;
    right: -7vw;
    top: -5vw;
    color: rgb(255, 255, 255);
    font-family: Dosis, sans-serif;
    font-size: 2rem;
    font-weight: 200 !important;
}

.AtSearchFocus__AtIconButtonCloseModal {
    position: absolute;
    left: 80px;
    top: -10px;
}

.AtSearchFocus__AtIconButtonSearchclose {
    position: absolute;
    left: 16px;
    top: 0;
    z-index: 1;
    border: none;
    background: rgba(0, 0, 0, 0);
    outline: none;
    padding: 6px;
    margin: 0px;
    cursor: pointer;
}

.AtSearchFocus__AtIconButtonSearch {
    position: absolute;
    right: 10px;
    top: 0;
    padding: 6px;
}

/* sub menu */

.visible {
    display: flex;
}

.submenu-items {
    display: block;
    position: relative;
    box-sizing: border-box;
    margin-top: 20px;
    margin-left: -10px;
    width: auto;
}

/* mobile menu */

.metismenu-container {
    list-style: none;
}

.metismenu-container .metismenu-container .metismenu-link {
    padding-left: 1em;
}

.gYZXrR {
    width: 75vw;
    height: 34px;
    border-radius: 17px;
    transition: all 1s ease 0s;
    box-shadow: rgb(0, 0, 0) 0px 0px 15px;
    margin-left: 20px;
}

.hgCave {
    display: block;
    background-color: rgb(66, 66, 66);
    width: 190px;
    height: 34px;
    border-radius: 17px;
    border: 5px solid rgb(66, 66, 66);
    box-sizing: border-box;
    overflow: hidden;
    float: left;
}

.iXlDQC {
    font-family: Dosis, sans-serif;
    color: rgb(255, 255, 255);
    display: block;
    line-height: 24px;
    font-weight: 300;
    font-size: 0.875rem;
}

.fDRKxi {
    display: block;
    background-color: rgb(66, 66, 66);
    height: 34px;
    border-radius: 17px;
    box-sizing: border-box;
    overflow: hidden;
    border: 5px solid rgb(0, 0, 0);
    width: 123px;
    float: right;
    transform: translateY(-34px);
}

.gypvI {
    position: relative;
    background-color: rgb(0, 0, 0);
    width: 100%;
    height: 100%;
    border: 1px solid rgb(66, 66, 66);
    border-radius: 13px;
    box-sizing: border-box;
}

.fnsUvw {
    position: absolute;
    top: 2.5px;
    left: 8px;
    border-radius: 50%;
    border: 2px solid rgba(164, 16, 41, 0.7);
    background-color: rgba(236, 41, 75, 0.7);
    width: 17px;
    height: 17px;
    box-sizing: border-box;
}

.UGRSu {
    font-family: Dosis, sans-serif;
    color: rgb(255, 255, 255);
    display: block;
    font-weight: 300;
    line-height: 22px;
    font-size: 0.65rem;
    text-align: right;
    margin-right: 1rem;
    text-transform: uppercase;
}

/* Logo animation */

.logo--image {
    opacity: 0;
    animation: fadeInLogo 1s ease-in both;
}

.logo--image {
    animation-delay: 0s;
}

@keyframes fadeInLogo {
    from {
        opacity: 0;
        transform: translate3d(0, -20%, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

/* video hide animation */

#hero-0 video.hide {
    -webkit-animation: 15s ease 0s normal forwards 1 hideVideo;
    animation: 15s ease 0s normal forwards 1 hideVideo;
}

@keyframes hideVideo {
    0% {
        opacity: 1;
    }
    66% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@-webkit-keyframes hideVideo {
    0% {
        opacity: 1;
    }
    66% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

#hero-1 video.hide {
    -webkit-animation: 10s ease 0s normal forwards 1 hideVideo;
    animation: 10s ease 0s normal forwards 1 hideVideo;
}

#hero-2 video.hide {
    -webkit-animation: 6s ease 0s normal forwards 1 hideVideo;
    animation: 6s ease 0s normal forwards 1 hideVideo;
}

#hero-3 video.hide {
    -webkit-animation: 14s ease 0s normal forwards 1 hideVideo;
    animation: 14s ease 0s normal forwards 1 hideVideo;
}

/* Animation Hero 1 */

#hero-1 .paragraph-message p {
    margin: 0;
}

#hero-1 .paragraph-message p span {
  font-size: 1.8rem;
}

.section-1 {
    height: 118vh;
}

.section-1 video {
    height: 100%;
    width: auto;
}

/*
#hero-1.playing .paragraph-message {
    animation: fadeInParagraph 2s ease-in both;
    animation-delay: 0s;
}*/

.hero-1 .paragraph-message {
    width: 810px;
}

/*
#hero-1.playing .copy-cover {
    animation: fadeInParagraph 3s ease-in both;
    animation-delay: 5s;
}*/

@keyframes fadeInParagraph {
    from {
        opacity: 0;
        transform: translate3d(0, -20%, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

/* Animation Hero 2 */

#hero-2 .copy-cover {
    opacity: 1;
    margin-left: 0;
}

/*
#hero-2.playing .copy-cover {
    animation: fadeInParagraph 2s ease-in both;
    animation-delay: 2s;
}*/

/* Animation Hero Season */

#hero-3 .cover-first {
    width: 800px;
    margin-left: 0;
}

#hero-3 .cover-first {}

#hero-3 .img-bg-pc {
    opacity: 1;
}

#hero-3 .img-bg-pc {
    animation-delay: 5s;
}

.cover-second h1 {
    margin-bottom: 20px;
}

.hero-3 .third {
    font-size: 1.8rem;
    margin-left: 30px;
    font-style: italic;
}

#hero-3 .cover-second {
    opacity: 0;
    margin-left: 30px;
}

#hero-3 .cover-second {}

#hero-3 .paragraph-message {
    opacity: 0;
    margin-left: 30px;
}

#hero-3 .paragraph-message {
    width: 780px;
}

#hero-3 .paragraph-message-1.active-fadein {
    animation: fadeInPhrase 1.5s ease-in both;
    animation-delay: 1s;
}

#hero-3 .paragraph-message-2.active-fadein {
    animation: fadeInPhrase 1.5s ease-in both;
    animation-delay: 2s;
}

/* Hero 3 cover reveal 1 */

/* Cursor */

#mouse-circle {
    position: absolute;
    width: 18px;
    height: 18px;
    margin: -9px 0px 0px -9px;
    border-radius: 0%;
    background: cyan;
    box-shadow: 0 0 16px rgba(255, 255, 255, 0);
    transition: width 0.5s, height 0.5s, margin 0.5s;
    overflow: hidden;
    z-index: 14;
}

@media only screen and (max-width: 1024px) {
    #mouse-circle {
        display: none;
    }
}

#mouse-circle span {
    display: none;
}

#mouse-circle.big {
    width: 90px;
    height: 90px;
    margin: -3rem 0px 0px -3rem;
    cursor: pointer !important;
}

#mouse-circle.big span {
    display: block;
    text-align: center;
    transition: display 0.5s;
}

#mouse-circle.big span a {
    color: #1a2839;
    font-weight: 500;
    padding-top: 30px;
    padding-bottom: 30px;
    float: left;
    text-decoration: none;
    font-size: 12px;
}

.is-hidden {
    display: none;
    transition: display 0.5s;
}

/* Page 2 */

.hero-3 {
    grid-template-rows: auto;
    padding-bottom: 200px;
}

.hero-3 .first {
    font-size: 3rem;
    margin-bottom: 20px;
    float: left;
    clear: both;
    width: 100%;
}

.hero-3 .arrow-down {
    display: none;
}

.hero-3 .paragraph-message {
    width: 640px;
}

.hero-3 .paragraph-message p {
    font-family: 'Bitter';
    font-weight: 100;
    font-size: 18px;
}

.paragraph-message strong {
    font-weight: 600;
}

.hero-3 .paragraph-message em {
    color: #276899;
}

.hero-3 ol {
    font-family: 'Bitter';
    font-weight: 100;
    font-size: 18px;
    margin-top: 20px;
    padding-left: 18px;
    margin-bottom: 50px;
}

.hero-3 ol li {
    line-height: 1.6em;
    font-size: 18px;
}

.hero-3 .paragraph-message p {
    line-height: 1.6;
}

.hero-3 .paragraph-message strong em {
    color: white;
}

.hero-3 .copy-cover-2.cover-first {
    margin-top: 340px;
}

.hero-3 .copy-cover-2 h1 {
    margin: 0;
    float: left;
    width: 100%;
}

.hero-3 .copy-cover-2 h1 span {
    margin-bottom: 0;
}

.hero-3 .copy-cover-2 .cover-reveal-row-1:nth-child(3) {
    margin-top: -20px;
    font-weight: 300;
}

.hero-3 .copy-cover-2 .cover-reveal-row-3 span {
    margin-bottom: 0;
}

.temporada-1 #mouse-circle.big span {
    line-height: 1;
}

.temporada-1 #mouse-circle.big span a {
    padding-top: 34px;
    float: left;
}



/* Animate words */

/*
.playing h1.char-animate {
    font-weight: 400;
    transform: scale(1.5);
    animation: scale 10s forwards cubic-bezier(0.5, 1, 0.89, 1);
    float: left;
    margin-left: 130px;
}

.playing h1.char-animate @keyframes scale {
    100% {
        transform: scale(1);
    }
}

.playing h1.char-animate span {
    display: inline-block;
    opacity: 0;
    filter: blur(4px);
    color: white;
    font-size: 28px;
    letter-spacing: 1px;
    float: left;
    margin-right: 8px;
}

.playing h1.char-animate span:nth-child(1) {
    animation: fade-in 0.8s 4.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

.playing h1.char-animate span:nth-child(2) {
    animation: fade-in 0.8s 4.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

.playing h1.char-animate span:nth-child(3) {
    animation: fade-in 0.8s 4.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

.playing h1.char-animate span:nth-child(4) {
    animation: fade-in 0.8s 4.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

.playing h1.char-animate span:nth-child(5) {
    animation: fade-in 0.8s 5s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

.playing h1.char-animate span:nth-child(6) {
    animation: fade-in 0.8s 5.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

.playing h1.char-animate span:nth-child(7) {
    animation: fade-in 0.8s 5.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

@keyframes fade-in {
    100% {
        opacity: 1;
        filter: blur(0);
    }
}

/* Mobile */

.button-mobile {
    display: none;
    border: 1px solid #1a2839;
    color: #1a2839;
    background-color: #45b4c1;
    font-size: 14px;
    border-radius: 25px;
    line-height: 2em;
    padding: 10px 30px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
}

.nav {
    display: none;
}

.img-bg-pc {
    position: absolute;
    width: 100%;
    z-index: -2;
}

.img-bg-mobile {
    display: none;
}

/* Sound */

#audio-player-container #play-pause {
    cursor: pointer;
}

#audio-player-container {
    width: 145px;
    position: fixed;
    top: 130px;
    right: 30px;
    z-index: 100;
}

#audio-player-container .column-1,
#audio-player-container .column-2 {
    width: 50%;
    float: left;
}

.listen.hide,
.mute.hide {
    display: none;
    font-size: 11px;
}

.listen,
.mute {
    color: #3b99a6;
    padding-bottom: 20px;
}

.Sound {
    width: 40px;
    heigth: 25px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
}

.Sound:hover span {
    background-color: cyan;
}

.Sound span {
    display: block;
    width: 2px;
    margin-right: 1px;
    background-color: cyan;
    animation: sound 0ms -.8s linear infinite alternate;
    transition: height .8s, background .3s;
}

.Sound span:nth-child(1) {
    height: 1px;
    animation-duration: 474ms;
}

.Sound span:nth-child(2) {
    height: 3px;
    animation-duration: 433ms;
}

.Sound span:nth-child(3) {
    height: 5px;
    animation-duration: 407ms;
}

.Sound span:nth-child(4) {
    height: 7px;
    animation-duration: 458ms;
}

.Sound span:nth-child(5) {
    height: 8px;
    animation-duration: .4s;
}

.Sound.off span {
    animation: none;
}

.Sound.off span:nth-child(1) {
    height: 8px;
    animation-duration: 474ms;
}

.Sound.off span:nth-child(2) {
    height: 3px;
    animation-duration: 433ms;
}

.Sound.off span:nth-child(3) {
    height: 5px;
    animation-duration: 407ms;
}

.Sound.off span:nth-child(4) {
    height: 4px;
    animation-duration: 458ms;
}

.Sound.off span:nth-child(5) {
    height: 8px;
    animation-duration: .4s;
}

.Sound.off {
    margin-top: 7px;
}

@keyframes sound {
    0% {
        opacity: .35;
        height: 6px
    }
    100% {
        opacity: 1;
        height: 23px
    }
}

@media only screen and (max-width: 1024px) {
    footer {
        position: relative;
        z-index: 10;
    }
    .logo--image {
        width: 60px;
        top: 80px;
        left: 20px;
    }
    .video-bg {
        height: 100vh;
        background: black;
        display: none;
    }
    .button-mobile {
        display: inline;
    }
    /* Home */
    .img-bg-pc {
        display: none;
    }
    .img-bg-mobile {
        display: block;
        position: absolute;
        width: 100%;
        z-index: 0;
    }
    .video-bg {
        z-index: 1;
    }
    .hero {
        background: black;
    }
    .first {
        font-size: 19px;
        float: left;
        line-height: 1;
    }
    .copy .second,
    .copy-final .second {
        font-size: 26px;
        margin-left: 60px;
        margin-top: 5px;
        line-height: 1;
    }
    .hero-1 .video-overlay,
    .hero-2 .video-overlay,
    .hero-1 .copy-cover,
    .hero-2 .copy-cover,
    .paragraph-message {
        width: auto;
    }
    .hero-1 .paragraph-message {
        padding-left: 40px;
        padding-right: 40px;
        z-index: 10;
    }
    .hero-2 .video-overlay {
        padding-left: 40px;
        padding-right: 40px;
    }
    .hero-2 .first {
        font-size: 26px;
    }
    .paragraph-message p {
        font-size: 16px;
    }

    /* Pagina temporada */
    .hero-3 {
        grid-template-rows: auto;
        height: auto;
    }
    .hero-3 .arrow-down {
        display: none;
        z-index: 15;
    }
    .hero-3 .video-overlay,
    .hero-3 .copy-cover,
    .hero-3 .paragraph-message {
        width: auto;
        z-index: 10;
    }
    .hero-3 .video-overlay {
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 60px;
        padding-bottom: 60px;
        height: auto;
    }
    .copy-cover-2 {
        text-align: center;
    }
    .hero-3 .button-mobile {
        width: 190px;
        margin: auto;
        margin-bottom: 100px;
    }
    .hero-3 .copy {
        margin-left: 16%;
        margin-top: 160px;
        margin-bottom: 40px;
    }
    .hero-3 .third {
        font-size: 1.5rem !important;
    }
    .video-overlay {
        height: 100vh;
        z-index: 10;
    }
    .input-search,
    #menu-mobile-button {
        display: none;
    }
}

#hero-0 .video-overlay {
    align-content: flex-start;
}

h1.cover-reveal {
    margin: 0;
    text-align: left;
    overflow: hidden;
    color: white;
    line-height: 1.2;
}

h1.cover-reveal-1 span.reveal-first {
    margin-top: 0px;
}

h1.active span.reveal-first {
    opacity: 1;
    animation: reveal 1.3s cubic-bezier(.5, 0, 0, 1) 0.2s;
}

h1.active span.reveal-second {
    opacity: 1;
    animation: reveal 1.6s cubic-bezier(.5, 0, 0, 1) 0.2s;
}

@keyframes reveal {
    0% {
        transform: translate(0, 100%);
        opacity: 0;
    }
    100% {
        transform: translate(0, 0);
        opacity: 1;
    }
}

@keyframes fadeInPhrase {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

section:nth-child(1) .cover-scroll {
    margin-top: 40vh;
    float: left;
    margin-left: 40px;
}

h1 span.reveal-first {
    display: block;
    font-size: 3rem;
    float: left;
    clear: both;
    width: 100%;
    color: #3b99a6;
    font-weight: 300;
    margin-bottom: 0;
    opacity: 0;
}

h1.cover-reveal-row {
    overflow: hidden;
    color: white;
    line-height: 1.2;
    margin: 0;
}

p.cover-reveal-row {
    overflow: hidden;
    color: white;
}

div.cover-reveal-row {
    overflow: hidden;
}

h1 span.first {
    display: block;
    font-size: 3rem;
    float: left;
    clear: both;
    width: 100%;
    color: #3b99a6;
    font-weight: 300;
    margin-bottom: 0;
}

#hero-0 h1 span.first {
    margin-top: 0vh;
}

#hero-0 section:nth-child(2) .cover-scroll,
#hero-0 section:nth-child(3) .cover-scroll,
#hero-0 section:nth-child(4) .cover-scroll,
#hero-0 section:nth-child(6) .cover-scroll {
    margin-top: 40vh;
    float: left;
    margin-left: 40px;
}

span.first {
    position: relative;
    top: 100px;
    transition: all .7s ease;
}

h1 span.reveal-second {
    display: block;
    font-size: 4.5rem;
    font-weight: 500;
    margin-top: 0px;
    margin-left: 30px;
    font-family: Bitter;
    opacity: 0;
}

h1 span.second {
    display: block;
    font-size: 4.5rem;
    font-weight: 500;
    margin-top: 0px;
    margin-left: 30px;
    font-family: Bitter;
}

span.second {
    position: relative;
    top: 100px;
    transition: all .7s ease;
    transition-delay: .2s;
}

span.third {
    position: relative;
    top: 100px;
    transition: all .7s ease;
    transition-delay: .4s;
}

.cover-reveal-row-6 span.first {
    transition-delay: 1s;
}

.cover-reveal-row-6 span.second {
    transition-delay: 1.3s;
}


.cover-reveal-row.active .first {
    top: 0;
}

.cover-reveal-row.active .second {
    top: 0;
}

.cover-reveal-row.active .third {
    top: 0;
}

h1.cover-reveal-row-4 span {
    font-size: 2.9rem;
    color: white;
}

.cover-reveal-row-4 span.second {
    margin-left: 0;
}

p span.reveal-first {
    opacity: 0;
}

.scrolldown {
    width: 2px;
    height: 60px;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    margin: 0 auto;
    overflow: hidden;
    background: #3b99a6;
}

.scrolldown .line {
    width: 100%;
    height: 100%;
    display: block;
    background: linear-gradient(to bottom, rgb(44, 44, 44) 50%, rgba(0, 0, 0, 0) 50%);
    background-position: 0 -60px;
    background-size: 100% 200%;
    animation: scrolldown 3.2s cubic-bezier(0.76, 0, 0.3, 1) forwards infinite;
}

@keyframes scrolldown {
    0% {
        background-position: 0 -60px;
    }
    75% {
        background-position: 0 0;
    }
    100% {
        background-position: 0 60px;
    }
}


.scroll-container {
    /*height: 100vh;*/
    width: 100vw;
    overflow-y: scroll;
    /*scroll-snap-type: y mandatory;*/
    scroll-snap-type: y proximity;
    padding: 0;

    /*scroll-snap-points-x: repeat(100%);
  scroll-snap-type: mandatory;
  scroll-snap-destination: 50% 50%;*/
}

.scroll-container.slow {
    scroll-snap-type: none;
}

section {
    height: 100vh;
    scroll-snap-align: start;
}

/* Footer */

footer {
  font-family: 'Dosis';
  position: relative;
  z-index: 101;
}

/* Hide Cookies */

.app__CookieAlert {
  color: #ffffff;
  text-align: center;
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -ms-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  opacity: 1;
  display: none;
}

.app__CookieAlert.hidden {
  opacity: 0;
  display: none;
}

/* Input search */

#cover-search {
  display: flex;
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -ms-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  opacity: 1;
}

#cover-search.hidden {
  display: none;
  opacity: 0;
}

#inputsearch {
  box-shadow: rgb(18, 18, 18) 0px 0px 30px 15px;
  color: rgb(255, 255, 255);
  border-radius: 30px;
  height: 3vw;
  border: 1px solid rgb(71, 70, 70);
  line-height: 34px;
  width: 40vw;
  padding: 5px 50px 10px 55px;
  outline: none;
  margin-left: 5px;
  box-sizing: border-box;
  transition: all 0.5s ease 0s;
  position: relative;
  font-family: Dosis, sans-serif;
  font-size: 2rem;
  background-color: rgb(71, 70, 70) !important;
  font-weight: 100 !important;
}

.AtSearchFocus__ContentCloseModal {
  position: absolute;
  z-index: 1;
  right: -7vw;
  top: -5vw;
  color: rgb(255, 255, 255);
  font-family: Dosis, sans-serif;
  font-size: 2rem;
  font-weight: 200 !important;
}

.AtSearchFocus__AtIconButtonCloseModal {
  position: absolute;
  left: 80px;
  top: -10px;
}

.AtSearchFocus__AtIconButtonSearchclose {
  position: absolute;
  left: 16px;
  top: 0;
  z-index: 1;
  border: none;
  background: rgba(0, 0, 0, 0);
  outline: none;
  padding: 6px;
  margin: 0px;
  cursor: pointer;
}

.AtSearchFocus__AtIconButtonSearch {
  position: absolute;
  right: 10px;
  top: 0;
  padding: 6px;
}

/* sub menu */

.visible {
  display: flex;
}

.submenu-items {
  display: block;
  position: relative;
  box-sizing: border-box;
  margin-top: 20px;
  margin-left: -10px;
  width: auto;
}

/* mobile menu */

.metismenu-container {
  list-style: none;
}

.metismenu-container .metismenu-container .metismenu-link {
  padding-left: 1em;
}

.gYZXrR {
  width: 75vw;
  height: 34px;
  border-radius: 17px;
  transition: all 1s ease 0s;
  box-shadow: rgb(0, 0, 0) 0px 0px 15px;
  margin-left: 20px;
}

.hgCave {
  display: block;
  background-color: rgb(66, 66, 66);
  width: 190px;
  height: 34px;
  border-radius: 17px;
  border: 5px solid rgb(66, 66, 66);
  box-sizing: border-box;
  overflow: hidden;
  float: left;
}

.iXlDQC {
  font-family: Dosis, sans-serif;
  color: rgb(255, 255, 255);
  display: block;
  line-height: 24px;
  font-weight: 300;
  font-size: 0.875rem;
}

.fDRKxi {
  display: block;
  background-color: rgb(66, 66, 66);
  height: 34px;
  border-radius: 17px;
  box-sizing: border-box;
  overflow: hidden;
  border: 5px solid rgb(0, 0, 0);
  width: 123px;
  float: right;
  transform: translateY(-34px);
}

.gypvI {
  position: relative;
  background-color: rgb(0, 0, 0);
  width: 100%;
  height: 100%;
  border: 1px solid rgb(66, 66, 66);
  border-radius: 13px;
  box-sizing: border-box;
}

.fnsUvw {
  position: absolute;
  top: 2.5px;
  left: 8px;
  border-radius: 50%;
  border: 2px solid rgba(164, 16, 41, 0.7);
  background-color: rgba(236, 41, 75, 0.7);
  width: 17px;
  height: 17px;
  box-sizing: border-box;
}

.UGRSu {
  font-family: Dosis, sans-serif;
  color: rgb(255, 255, 255);
  display: block;
  font-weight: 300;
  line-height: 22px;
  font-size: 0.65rem;
  text-align: right;
  margin-right: 1rem;
  text-transform: uppercase;
}

/* Logo animation */

.logo--image {
	opacity: 0;
	animation: fadeInLogo 3s ease-in both;
}

.logo--image {
	animation-delay: 3s;
}

@keyframes fadeInLogo {
	from {
		opacity: 0;
		transform: translate3d(0, -20%, 0);
	}
	to {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
}




/* Cursor */

#mouse-circle {
  position: absolute;
  width: 18px;
  height: 18px;
  margin: -9px 0px 0px -9px;
  border-radius: 50%;
  background: cyan;
  box-shadow: 0 0 16px rgba(255, 255, 255, 0);
  transition: width 0.5s, height 0.5s, margin 0.5s;
  overflow: hidden;
  z-index: 14;
}

@media only screen and (max-width: 1024px) {
  #mouse-circle {
    display: none;
  }
}

#mouse-circle span {
  display: none;
}

#mouse-circle.big {
  width: 90px;
  height: 90px;
  margin: -3rem 0px 0px -3rem;
  cursor: pointer !important;
  z-index: 100;
}

#mouse-circle.big span {
  display: block;
  text-align: center;
  transition: display 0.5s;
}

#mouse-circle.big span a {
  color: #1a2839;
  font-weight: 500;
  padding-top: 30px;
  padding-bottom: 30px;
  float: left;
  text-decoration: none;
  font-size: 12px;
}

.is-hidden {
  display: none;
  transition: display 0.5s;
}

.hero-3 h1.cover-reveal-row-2 {
  margin-top: 70px;
  float: left;
}

.hero-3 .cover-reveal-row-2 span {
  font-style: italic;
  font-weight: 400;
  margin-left: 30px;
}

.hero-3 .cover-reveal-row-2 sup {
  font-size: 22px;
  font-weight: 400;
  margin-left: 5px;
}


@media only screen and (max-width: 1024px) {
  footer {
    position: relative;
    z-index: 10;
  }
  .logo--image {
    width: 60px;
    top: 80px;
    left: 20px;
  }
  .video-bg {
    height: 100vh;
    background: black;
    display: none;
  }
  .button-mobile {
    display: inline;
  }
  /* Home */
  .img-bg-pc {
    display: none;
  }
  .img-bg-mobile {
    display: block;
    position: absolute;
    width: 100%;
    z-index: 0;
  }
  .video-bg {
    z-index: 1;
  }
  .hero {
    background: black;
  }
  .hero-0 .copy,
  .hero-0 .copy-final {
    left: 5%;
  }
  .first {
    font-size: 19px;
    float: left;
    line-height: 1;
  }
  .copy .second,
  .copy-final .second {
    font-size: 26px;
    margin-left: 60px;
    margin-top: 5px;
    line-height: 1;
  }
  .hero-1 .video-overlay,
  .hero-2 .video-overlay,
  .hero-1 .copy-cover,
  .hero-2 .copy-cover,
  .paragraph-message {
    width: auto;
  }
  .hero-1 .paragraph-message {
    padding-left: 40px;
    padding-right: 40px;
    z-index: 10;
  }
  .hero-2 .video-overlay {
    padding-left: 40px;
    padding-right: 40px;
  }
  .hero-2 .first {
    font-size: 26px;
  }
  .paragraph-message p {
    font-size: 16px;
  }

  /* Pagina temporada */
  .hero-3 {
    grid-template-rows: auto;
    height: auto;
  }
  .hero-3 .arrow-down {
    display: none;
    z-index: 15;
  }
  .hero-3 .video-overlay,
  .hero-3 .copy-cover,
  .hero-3 .paragraph-message {
    width: auto;
    z-index: 10;
  }
  .hero-3 .video-overlay {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 60px;
    padding-bottom: 60px;
    height: auto;
  }
  .copy-cover-2 {
    text-align: center;
  }
  .hero-3 .button-mobile {
    width: 190px;
    margin: auto;
    margin-bottom: 100px;
  }
  .hero-3 .copy {
    margin-left: 16%;
    margin-top: 160px;
    margin-bottom: 40px;
  }

  .hero-3 .third {
    font-size: 1.5rem !important;
  }

  .video-overlay {
    height: 100vh;
    z-index: 10;
  }


  .input-search, #menu-mobile-button {
    display: none;
  }

}



.steal {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: none;
}

.steal img {
    position: absolute;
    left: -15%;
    width: 130%;
    height: auto;
    display: none;
}

.steal_title {
    color: white;
    font-family: Inter;
    font-size: 2.3rem;
    letter-spacing: -1px;
    font-weight: 500;
    position: absolute;
    left: 20px;
    top: 10vh;
    z-index: 100;
    display: none;
  }


`;
