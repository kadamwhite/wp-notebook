import React from 'react';

import styles from './Logo.styl';

const Logo = ({ text }) => (
  <div className={styles.logo}>{ text }</div>
);

Logo.propTypes = {
  text: React.PropTypes.string.isRequired,
};

export default Logo;
