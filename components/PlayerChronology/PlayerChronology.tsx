import React from 'react';
import { ListChronoCover } from './PlayerChronology.style';

const PlayerChronology = ({ character, chronology }) => {
  if (!chronology.length) {
    return <> </>;
  }

  return (
    <ListChronoCover>
      <h2>{character}</h2>
      <h3>Cronología</h3>
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
