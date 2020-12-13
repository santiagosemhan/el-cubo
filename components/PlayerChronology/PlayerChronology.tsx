import React from 'react';
import { ListChronoCover } from './PlayerChronology.style';

const PlayerChronology = ({ character, chronology }) => {
  if (!chronology.length) {
    return <> </>;
  }

  return (
    <ListChronoCover
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
      onMouseOut={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
    >
      <h2>{character}</h2>
      <h3>Cronología</h3>
      <div className="line-right"></div>
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
