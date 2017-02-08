import React, { PropTypes } from 'react';
import classNames from 'classnames';

import styles from './EntryList.styl';

function formatDate(date) {
  const dateObj = new Date(date);
  return [
    dateObj.getMonth() + 1,
    dateObj.getDate(),
    dateObj.getFullYear()
  ].join('/');
}

const EntryList = (props) => props.entries ? (
  <div className={classNames(props.className)}>
    {props.entries.map(entry => (
      <button
        className={classNames({
          [styles.entry]: true,
          [styles.selected]: props.selected && props.selected.id === entry.id
        })}
        key={`entry${entry.id}`}
        onClick={() => {
          if (props.selected && props.selected.id === entry.id) {
            return props.onEdit(null);
          }
          // If we click a post again, close the editor
          return props.onEdit(entry);
        }}
      >
        {/* eslint-disable react/no-danger */}
        <h2 dangerouslySetInnerHTML={{
          __html: entry.title.rendered.replace(/^Private: /i, '')
        }} />
        {/* eslint-enable react/no-danger */}
        <p>{formatDate(entry.date)}</p>
      </button>
    ))}
  </div>
) : null;

const entryShape = PropTypes.shape({
  id: PropTypes.number,
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
});
EntryList.propTypes = {
  className: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  selected: entryShape,
  entries: PropTypes.arrayOf(entryShape).isRequired,
};

export default EntryList;
