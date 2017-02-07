import React, { PropTypes } from 'react';

import DangerousBlock from '../DangerousBlock';


const EntryList = ({ entries }) => entries ? (
  <div>
    {entries.map(entry => (
      <div key={`entry${entry.id}`}>

      <h2 className={styles.entryTitle}>
        {entry.title.rendered.replace(/^Private: /i, '')}
      </h2>

      <DangerousBlock html={entry.content.rendered} />
      {entry.current_music ? (
        <p>Currently listening to: {entry.current_music}</p>
      ) : null}
      </div>
    ))}
  </div>
) : null;

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.shape({
      raw: PropTypes.string,
      rendered: PropTypes.string,
    }),
    content: PropTypes.shape({
      raw: PropTypes.string,
      rendered: PropTypes.string,
    }),
    date: PropTypes.string,
    current_music: PropTypes.string,
  })).isRequired,
};

export default EntryList;
