import React from 'react';

import styles from './Hello.styl';
import moogle from './mini_moogle_by_morganedematons-d57jb7w.gif';

const Hello = ({ addressee }) => (
  <h2 className={styles.hello}>
    <img src={moogle} alt="sprite of a dancing moogle" /> Hello, {addressee}
  </h2>
);

Hello.propTypes = {
  addressee: React.PropTypes.string.isRequired,
};

export default Hello;
