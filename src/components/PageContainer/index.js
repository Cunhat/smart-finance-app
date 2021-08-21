import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

function PageContainer({ children, ...restProps }) {
  return (
    <div className="pageContainer" {...restProps}>
      {children}
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.any,
  restProps: PropTypes.any
};

export default PageContainer;
