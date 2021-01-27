import React from 'react';
import { ListChronoCover } from './PlayerChronology.style';

const PlayerChronology = ({ character, chronology }) => {
  if (!chronology.length) {
    return <> </>;
  }
  return (
    <ListChronoCover>
      <h2><span>Cronología</span> de {character} </h2>
      <img className="line-right" src="/images/line-chrono.png" />
      <ul className="list-chrono">
        {chronology.map((chrono) => (
          <li key={chrono.id}>
            <a className={`${chrono.active ? 'active' : ''}`} href={chrono.link}>
              <img src={chrono.image} />
              {chrono.name}
              <span className="circle"></span>
            </a>
          </li>
        ))}
      </ul>
    </ListChronoCover>
  );
};

export default PlayerChronology;
