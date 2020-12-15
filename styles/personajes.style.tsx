import { createGlobalStyle } from 'styled-components';

export const PersonajesGlobalStyle = createGlobalStyle`
body {
    margin: 0;
    background: black;
}

:root {
    /* Full grid area variable */
    --fullGrid: 1 / 1 / -1 / -1;
}

.header-top {
    width: 100%;
}

.logo-elcubo {
    margin: auto;
    z-index: 11;
}

.logo--image {
    width: 60px;
    height: auto;
    position: absolute;
    top: 120px;
    left: 40px;
    z-index: 11;
}

.characters .parent {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    float: left;
    display: flex;
}

.characters .child {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-transition: all 1.5s;
    -moz-transition: all 1.5s;
    -o-transition: all 1.5s;
    transition: all 1.5s;
}

/* Page characters */

.characters-wrapper {
    height: 100vh;
}

.characters-wrapper .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}

.characters-wrapper .row.row-first {
    height: 100vh;
}

.characters .column {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    width: 16.67%;
}

.characters .parent .child {
    background-color: black;
    cursor: pointer;
}

.characters .parent .child img.img-bn {
    position: absolute;
    top: 10vh;
    width: 100%;
    z-index: 1;
}

.characters .parent .child img.img-color {
    position: absolute;
    top: 10vh;
    width: 100%;
    z-index: 0;
}

.characters .parent:hover .child img.img-color,
.characters .parent:focus .child img.img-color,
.characters .parent .child.is-selected img.img-color {
    z-index: 1;
}

.characters .icon-selected {
    display: none;
    width: 30px;
    height: auto;
    position: absolute;
    z-index: 2;
    bottom: 400px;
    left: 42%;
}

.characters .is-selected .icon-selected {
    display: block;
}

.characters .name {
    display: none;
    font-size: 30px;
    font-family: 'Inter';
    color: #45B4C1;
    text-align: center;
    margin: auto;
    position: absolute;
    left: 0;
    bottom: 350px;
    right: 0;
    text-decoration: none;
    z-index: 2;
}

.characters .is-selected .name {
    display: block;
    color: white;
}

.characters .projectButton {
    display: none;
    font-family: 'Inter';
    font-size: 13px;
    color: #45B4C1;
    text-align: center;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 300px;
    cursor: pointer;
    border: 2px solid #45B4C1;
    padding: 5px;
    width: 130px;
    border-radius: 30px;
    text-decoration: none;
    z-index: 2;
}

.characters .parent:hover .child,
.characters .parent:focus .child {
    -ms-transform: scale(1.06);
    -moz-transform: scale(1.06);
    -webkit-transform: scale(1.06);
    -o-transform: scale(1.06);
    transform: scale(1.06);
}

.characters .parent .child.is-selected {
    -ms-transform: scale(1.3);
    -moz-transform: scale(1.3);
    -webkit-transform: scale(1.3);
    -o-transform: scale(1.3);
    transform: scale(1.3);
}

.characters .parent .child.is-selected .name {
    font-size: 1.5em;
}

.characters .parent:hover a,
.characters .parent:focus a {
    display: block;
}

.characters .parent:hover .name,
.characters .parent:focus .playButton {
    display: block;
}

/* Pane Slide */

.characters .pane {
    position: fixed;
    top: 0;
    z-index: 10001;
    right: -50%;
    height: 100vh;
    width: 30%;
    background: black;
    -webkit-box-shadow: -58px 0px 66px 0px rgba(69, 180, 193, 0.1);
    -moz-box-shadow: -58px 0px 66px 0px rgba(69, 180, 193, 0.1);
    box-shadow: -58px 0px 66px 0px rgba(69, 180, 193, 0.1);
    transition: 0.5s all ease;
    overflow: hidden;
}

.characters .pane-cover {
    width: 100%;
    height: 100%;
    display: none;
    position: absolute;
    background: black;
    opacity: 0.3;
}

.characters .pane-cover.visible {
    display: flex;
    z-index: 10000;
}

.characters .pane video {
    width: 150%;
    margin-left: -23%;
}

.characters .pane-content {
    text-align: center;
    font-family: 'Inter';
    color: white;
    position: absolute;
    bottom: 25vh;
    z-index: 99;
    width: 100%;
}

.characters .pane h2 {
    font-family: 'Inter';
    font-size: 30px;
    text-transform: capitalize;
    color: #45B4C1 !important;
    margin: 0;
}

.characters .pane-content a {
    width: 60px;
    border-radius: 30px;
    line-height: 1em;
    padding: 8px 20px;
    background: #45B4C1;
    color: #1A2839;
    text-decoration: none;
    font-weight: 600;
}

.characters .pane a.close {
    cursor: pointer;
    padding: 20px;
    float: left;
}

.characters .pane-video {
    overflow: hidden;
    clear: both;
}

.characters .bg-video {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 20;
}

.characters .pane-content a:hover {
    cursor: pointer;
}

.characters .pane p {
    font-size: 16px;
    line-height: 1.4;
    padding: 20px 30px 40px 30px;
    margin: 0;
}

.characters .pane.open {
    right: 0vw;
    z-index: 10001;
}

/* hide menu */

.characters .selector-mode {
    width: 100%;
    position: absolute;
    bottom: 40px;
    z-index: 90;
    transition: 2s all ease;
    opacity: 1;
}

.characters .selector-mode.is-hidden {
    display: block;
    opacity: 0;
}

.characters .selector-cover {
    width: 380px;
    margin: auto;
}

.characters .selector-cover img,
.characters .selector-cover ul {
    float: left;
}

.characters .selector-cover ul {
    opacity: 0;
    color: #45B4C1;
    font-family: 'Inter';
    font-weight: 600;
    font-size: 20px;
    list-style-type: none;
    transition: 0.5s all ease;
}

.characters .selector-cover:hover ul {
    opacity: 1;
}

.characters .selector-cover ul li {
    line-height: 1.3em;
    margin-bottom: 10px;
}

.characters .selector-cover ul li a {
    color: #45B4C1;
    text-decoration: none;
}

.characters .selector-cover ul li:hover,
.characters .selector-cover ul li:hover a {
    color: white;
}

.characters .selector-cover ul li:nth-child(1) img {
    margin-top: 7px;
    margin-right: 10px;
}

.characters .selector-cover ul li:nth-child(2) img {
    margin-top: 3px;
    margin-right: 10px;
}

.characters .selector-cover ul li:nth-child(3) img {
    margin-top: 3px;
    margin-right: 10px;
    margin-left: 8px;
}

.characters .selector-cover img {
    margin-left: 0px;
    margin-top: 20px;
}

.characters .selector-mode.selector-mobile {
    display: none;
}

/* Reset Highlights */

button,
textarea,
input,
select,
a {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

@media only screen and (max-width: 1024px) {
    body {
        width: 100vw;
        overflow: hidden;
    }

    .characters-wrapper .row.row-first {
        height: 90vh;
        margin-top: 10vh;
    }

    .characters-wrapper .row.row-first .column {
        width: 33.33%;
        flex: none;
        float: left;
        height: 45vh;
        z-index: 11;
    }
    .characters-wrapper .row.row-first .column .parent {
        height: 45vh;
    }
    .characters .pane.open {
        width: 100%;
        padding-right: 0;
    }
    .characters .bg-video {
        bottom: 0;
        height: 100vh;
    }
    .characters .pane a.close {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
    }
    .characters .pane-video {
        margin-top: 60px;
    }

    .characters .parent .child img.img-bn {
        top: 0px;
    }
    .characters .parent .child img.img-color {
        top: 0px;
    }
    .characters-wrapper .row {
        display: block;
    }
    .characters .selector-desktop {
        display: none;
    }

    .characters .selector-cover {
        width: 100% !important;
    }
    .characters .selector-mode.selector-mobile {
        display: block;
        bottom: 20px;
        z-index: 12;
        transition: 2s all ease;
        opacity: 1;
        text-align: center;
    }
    .characters .selector-mode.is-hidden {
        z-index: -2;
        transition: 1s all ease;
        opacity: 0;
    }
    .characters .selector-mode.selector-mobile .selector-cover ul {
        opacity: 1;
        width: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    .characters .selector-mode.selector-mobile .selector-cover img {
        float: none;
        width: 40px;
        margin-bottom: 10px;
    }
    .characters .selector-mode.selector-mobile .selector-cover ul li {
        width: 33.33%;
        float: left;
        font-size: 16px;
    }

    .characters .parent:hover .child,
    .characters .parent:focus .child {
    -ms-transform: scale(1);
    -moz-transform: scale(1);
    -webkit-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    }

    .characters .parent .child.is-selected {
        -ms-transform: scale(1);
        -moz-transform: scale(1);
        -webkit-transform: scale(1);
        -o-transform: scale(1);
        transform: scale(1);
    }

    .characters .projectButton {
        display: none;
    }
    .characters .parent:hover a,
    .characters .parent:focus a {
        display: none;
    }
    .characters .name {
        bottom: 150px;
        font-size: 20px;
    }
    .characters .icon-selected {
        bottom: 130px;
        width: 20px;
    }

    .characters .parent .child.char-4727 img.img-bn,
    .characters .parent .child.char-4728 img.img-bn,
    .characters .parent .child.char-4730 img.img-bn,
    .characters .parent .child.char-4727 img.img-color,
    .characters .parent .child.char-4728 img.img-color,
    .characters .parent .child.char-4730 img.img-color {
        top: -55px;
    }
  
    .characters .parent .child.char-4727 .name,
    .characters .parent .child.char-4728 .name,
    .characters .parent .child.char-4730 .name {
        bottom: 200px;
    }
    .characters .parent .child.char-4727 .icon-selected,
    .characters .parent .child.char-4728 .icon-selected,
    .characters .parent .child.char-4730 .icon-selected {
        bottom: 180px;
    }
    .input-search, #menu-mobile-button {
        display: none;
    }
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
`;
