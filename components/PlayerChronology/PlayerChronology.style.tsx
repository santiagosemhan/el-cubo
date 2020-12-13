import styled from 'styled-components';

export const ListChronoCover = styled.div`
  position: absolute;
  right: 30px;
  top: 5vh;
  color: white;
  font-family: 'Inter';
  z-index: 2;
  h2 {
    color: white;
    font-family: 'Inter';
    font-size: 20px;
    margin: 0;
    text-align: right;
  }

  h3 {
    color: white;
    font-family: 'Inter';
    font-size: 17px;
    margin: 0;
    text-align: right;
    font-weight: 300;
  }

  ul {
    list-style-type: none;
    margin: 0;
    margin-top: 20px;
  }

  ul li {
    line-height: 2;
  }

  ul a img {
    width: 170px;
    border-radius: 15px;
    position: absolute;
    left: -190px;
    top: -35px;
    z-index: 2;
    opacity: 0;
    transition: 0.2s;
  }

  ul a {
    color: #45b4c1;
    text-decoration: none;
    position: relative;
    font-weight: 500;
  }

  ul a span {
    position: relative;
    z-index: 5;
    transition: 0.2s;
  }

  ul a:hover img {
    transition: 0.2s;
    opacity: 1;
  }

  ul a:hover,
  ul a.active {
    color: white;
  }

  ul a img:hover {
    opacity: 0;
  }

  ul a span.circle {
    width: 10px;
    height: 10px;
    float: right;
    margin-left: 30px;
    margin-top: 10px;
    border-radius: 50%;
    background: #45b4c1;
  }

  ul a:hover span.circle,
  ul a.active span.circle {
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

  .line-right {
    position: absolute;
    height: 320px;
    width: 1px;
    background: #858585;
    right: 4px;
    top: 80px;
    opacity: 0.4;
  }
`;
