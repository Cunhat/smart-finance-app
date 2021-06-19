import React, { useState } from 'react';

import './styles.css';
import { PanelMenu } from 'primereact/panelmenu';

function ListCategoriesWidget({ categories, message }) {
   return (
      <div className="listCategoriesContainer" style={{ height: !categories ? '189px' : 'auto' }}>
         <span className="listCategoriesContainerWidgetTitle">List Categories and Sub-Categories</span>
         {categories.length > 0 ? (
            <PanelMenu model={categories} style={{ width: '100%' }} multiple={true} />
         ) : (
            <span>{message}</span>
         )}
      </div>
   );
}

export default ListCategoriesWidget;
