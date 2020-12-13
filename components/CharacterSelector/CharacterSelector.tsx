import React from 'react';
import { CharacterSelectorWrapper } from './CharacterSelector.style';

const CharacterSelector = () => {
  React.useEffect(() => {
    // Pane Slide
    const button_open = document.querySelectorAll('.toggle');
    const button_close = document.querySelector('.close');
    const pane = document.querySelector('.pane');
    const pane_cover = document.querySelector('.pane-cover');

    if (button_open) {
      button_open.forEach(function (link) {
        link.addEventListener('click', () => {
          pane.classList.add('open');
          pane_cover.classList.toggle('visible');
        });
      });
    }

    if (button_close) {
      button_close.addEventListener('click', () => {
        pane.classList.toggle('open');
        pane_cover.classList.toggle('visible');
      });
    }
  }, []);

  return (
    <CharacterSelectorWrapper>
      <div className="pane-cover"></div>
      <div className="pane">
        <a className="close">
          <img src="/images/pane-close.svg" />
        </a>
        <div className="pane-content">
          <h2>Cambiar de personaje</h2>
          <ul className="list-personajes">
            <li>
              <a href="" className="">
                Alba
                <img src="/images/icon-selected-char.svg" />
              </a>
            </li>
            <li>
              <a href="" className="active">
                Carey
                <img src="img/icon-selected-char.svg" />
              </a>
            </li>
            <li>
              <a href="" className="">
                Elvira
                <img src="img/icon-selected-char.svg" />
              </a>
            </li>
            <li>
              <a href="" className="">
                Marina
                <img src="img/icon-selected-char.svg" />
              </a>
            </li>
            <li>
              <a href="" className="">
                Mercado
                <img src="img/icon-selected-char.svg" />
              </a>
            </li>
            <li>
              <a href="" className="">
                Sales
                <img src="img/icon-selected-char.svg" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="header-top">
        <div className="header-top-inner">
          <nav className="nav">
            <a href="#" className="toggle menu-elcubo">
              <div className="icon-bell">
                <img src="img/icon-bell.svg" />
              </div>
              <img src="img/icon-menu.svg" />
            </a>
          </nav>
        </div>
      </div>
    </CharacterSelectorWrapper>
  );
};

export default CharacterSelector;
