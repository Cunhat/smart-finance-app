import React from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function Icon({ icon, color, ...restProps }) {
  return (
    <div className="iconContainer">
      <FontAwesomeIcon className="iconPanel" icon={icon} {...restProps} />
    </div>
  );
}

Icon.propTypes = {
  icon: PropTypes.any,
  color: PropTypes.string,
  restProps: PropTypes.any
};

export default Icon;
