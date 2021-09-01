import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

function Info({ label, info, color, ...restProps }) {
  return (
    <div className="infoContainer" {...restProps}>
      <span className="infoLabel">{label}</span>
      <span className="infoInfo" style={{ color }}>
        {info}
      </span>
    </div>
  );
}

Info.propTypes = {
  label: PropTypes.string,
  info: PropTypes.string,
  color: PropTypes.string,
  restProps: PropTypes.any
};

export default Info;
