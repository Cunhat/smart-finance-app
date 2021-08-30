import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

function WidgetContainer({ children, ...restProps }) {
  return (
    <div className="widgetContainer" {...restProps}>
      {children}
    </div>
  );
}

WidgetContainer.propTypes = {
  children: PropTypes.any,
  restProps: PropTypes.any
};

export default WidgetContainer;
