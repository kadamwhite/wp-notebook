import React, { PropTypes } from 'react';

/* eslint-disable react/no-danger */
const DangerousBlock = ({ html, ...props }) => (
  <div {...props} dangerouslySetInnerHTML={{ __html: html }} />
);
/* eslint-enable react/no-danger */

DangerousBlock.propTypes = {
  html: PropTypes.string.isRequired,
};

export default DangerousBlock;
