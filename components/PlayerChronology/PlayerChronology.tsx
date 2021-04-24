import React from 'react';
import { ListChronoCover } from './PlayerChronology.style';

const PlayerChronology = ({ character, chronology }) => {
  if (!chronology.length) {
    return <> </>;
  }
  return (
    <ListChronoCover>
      <div className="chrono-list">
        <h2>
          <span>Cronología</span> de {character}{' '}
        </h2>
        <img className="line-right" src="/images/line-chrono.png" />
        <ul className={'list-chrono ' + character.toLowerCase()}>
          {chronology.map((chrono) => (
            <li key={chrono.id}>
              <a className={`${chrono.active ? 'active' : ''}`} href={chrono.link}>
                {console.log(chrono.image)}
                <img src={chrono.image} />
                {chrono.name}
                <span className="circle" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ListChronoCover>
  );
};

export default PlayerChronology;
