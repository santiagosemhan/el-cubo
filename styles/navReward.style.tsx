import { createGlobalStyle } from 'styled-components';

export const NavRewardStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

body {
    margin: 0;
    background: black;
}

.nav {
    position: absolute;
    left: 30px;
    top: 30px;
    z-index: 11;
}

.nav a.back-to-season span {
    color: white;
    margin-left: 5px;
    margin-top: 12px;
    opacity: 0;
    transition: opacity 0.5s ease 0s;
    will-change: opacity;
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    float: left;
}

.nav a.back-to-season img {
    float: left;
}

.nav a.back-to-season:hover span {
    opacity: 1;
}
`;
