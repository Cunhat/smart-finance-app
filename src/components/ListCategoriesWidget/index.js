import React from 'react';
import './styles.css';
import { PanelMenu } from 'primereact/panelmenu';
import PropTypes from 'prop-types';

function ListCategoriesWidget({ categories, message }) {
  return (
    <div className="listCategoriesContainer" style={{ height: !categories ? '189px' : 'auto' }}>
      <span className="listCategoriesContainerWidgetTitle">List Categories and Sub-Categories</span>
      {categories.length > 0 ? (
        <PanelMenu model={categories} style={{ width: '100%' }} multiple />
      ) : (
        <span>{message}</span>
      )}
    </div>
  );
}

ListCategoriesWidget.propTypes = {
  categories: PropTypes.string,
  message: PropTypes.string
};

export default ListCategoriesWidget;
