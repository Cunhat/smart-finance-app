import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { Accordion, AccordionTab } from 'primereact/accordion';

function ListCategoriesWidget({ categories, message, subCategories }) {
  return (
    <div className="listCategoriesContainer" style={{ height: !categories ? '189px' : 'auto' }}>
      <span className="listCategoriesContainerWidgetTitle">List Categories and Sub-Categories</span>
      <Accordion multiple>
        <AccordionTab header="Categories">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div className="listedInfoClass" key={category.id}>
                {category.name}
              </div>
            ))
          ) : (
            <span>{message}</span>
          )}
        </AccordionTab>
        <AccordionTab header="SubCategories">
          {categories.length > 0 ? (
            subCategories.map((subCategory) => (
              <div className="listedInfoClass" key={subCategory.id}>
                {subCategory.name}
              </div>
            ))
          ) : (
            <span>{message}</span>
          )}
        </AccordionTab>
      </Accordion>
    </div>
  );
}

ListCategoriesWidget.propTypes = {
  categories: PropTypes.string,
  message: PropTypes.string,
  subCategories: PropTypes.string
};

export default ListCategoriesWidget;
