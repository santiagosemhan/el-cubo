import { createGlobalStyle } from 'styled-components';

export const MenuPlayerStyle = createGlobalStyle`

body {
  background: black;
}

.nav {
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 11;
  display: block !important;
}

.logo--image {
  width: 60px;
  height: auto;
  position: absolute;
  top: 160px;
  left: 40px;
  z-index: 11;
}

.icon-bell {
  width: 16px;
  height: 16px;
  background: #45B4C1;
  border-radius: 50%;
  padding: 2px;
  position: absolute;
  right: -5px;
}

/* Pane Slide */

.pane {
  position: fixed;
  top: 0;
  z-index: 100;
  right: -50%;
  padding: 1rem 2rem;
  height: 100vh;
  width: 30%;
  background: black;
  -webkit-box-shadow: -58px 0px 66px 0px rgba(69, 180, 193, 0.1);
  -moz-box-shadow: -58px 0px 66px 0px rgba(69, 180, 193, 0.1);
  box-shadow: -58px 0px 66px 0px rgba(69, 180, 193, 0.1);
  transition: 0.5s all ease;
  overflow: hidden;
  color: white;
  font-family: 'Inter';
}

.pane h2,
.pane ul {
  font-size: 20px;
  font-weight: 400;
}

.pane h2 {
  margin-left: 10px;
}

.pane ul {
  margin-top: 10px;
  list-style-type: none;
  padding: 0px 20px;
  line-height: 2em;
}

.pane a:hover {
  cursor: pointer;
}

.pane ul a {
  color: #45B4C1;
  font-weight: 400;
  text-decoration: none;
}

.pane ul a:hover,
.pane ul a.active {
  color: white;
}

.pane ul a img {
  display: none;
  margin-left: 5px;
}

.pane ul a.active img {
  display: inline;
}

.pane-cover {
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  background: black;
  opacity: 0.7;
  z-index: 20;
}

.pane-cover.visible {
  display: flex;
}

.pane.open {
  right: 0vw;
}

/* Menu Cronologia */

.list-chrono-cover {
  position: absolute;
  right: 100px;
  top: 220px;
  color: white;
  font-family: 'Inter';
}

.list-chrono-cover h2 {
  font-size: 20px;
  margin: 0;
  text-align: right;
}

.list-chrono-cover h3 {
  font-size: 17px;
  margin: 0;
  text-align: right;
  font-weight: 300;
}

ul.list-chrono {
  list-style-type: none;
  margin: 0;
  margin-top: 20px;
}

ul.list-chrono li {
  line-height: 2;
}

ul.list-chrono a img {
  width: 170px;
  border-radius: 15px;
  position: absolute;
  left: -190px;
  top: -35px;
  z-index: 2;
  opacity: 0;
  transition: .2s;
}

ul.list-chrono a {
  color: #45B4C1;
  text-decoration: none;
  position: relative;
  font-weight: 500;
}

ul.list-chrono a span {
  position: relative;
  z-index: 5;
  transition: .2s;
}

ul.list-chrono a:hover img {
  transition: .2s;
  opacity: 1;
}

ul.list-chrono a:hover,
ul.list-chrono a.active {
  color: white;
}

ul.list-chrono a img:hover {
  opacity: 0;
}

ul.list-chrono a span.circle {
  width: 10px;
  height: 10px;
  float: right;
  margin-left: 30px;
  margin-top: 10px;
  border-radius: 50%;
  background: #45B4C1;
}

ul.list-chrono a:hover span.circle,
ul.list-chrono a.active span.circle {
  background: white;
}

ul.list-chrono.height-big li {
  line-height: 6;
}

ul.list-chrono.height-big li span.circle {
  margin-top: 42px;
}

ul.list-chrono.height-medium li {
  line-height: 4;
}

ul.list-chrono.height-medium li span.circle {
  margin-top: 26px;
}

`;