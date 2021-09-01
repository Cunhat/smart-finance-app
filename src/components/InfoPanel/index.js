import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

function InfoPanel({ children, ...restProps }) {
  return (
    <div className="infoPanelContainer" {...restProps}>
      {children}
    </div>
  );
}

InfoPanel.propTypes = {
  children: PropTypes.any,
  restProps: PropTypes.any
};

export default InfoPanel;
