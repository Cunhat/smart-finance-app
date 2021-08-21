/* eslint-disable no-debugger */
import React, { useContext } from 'react';
import PersonalInfoWidget from '../../components/PersonalInfoWidget';
import './styles.css';
import CreateCategoryWidget from '../../components/CreateCategoryWidget';
import CreateSubCategoryWidget from '../../components/CreateSubCategoryWidget';
import ListCategoriesWidget from '../../components/ListCategoriesWidget';
import { CategoriesInfoContext } from '../../contexts/CategoriesInfoContext';

function Settings() {
  const categoriesContext = useContext(CategoriesInfoContext);

  return (
    <div className="mainPagesContainer">
      <h1>Settings</h1>
      <PersonalInfoWidget />
      <div className="categoriesWidgetsContainer">
        <div className="categoriesWidgetsContainerGrid">
          <div className="categoriesWidgetsItem">
            <CreateCategoryWidget />
          </div>
          <div className="categoriesWidgetsItem">
            <CreateSubCategoryWidget categories={categoriesContext.categorySelectItems} />
          </div>
        </div>
        <div className="categoriesWidgetsContainerGrid">
          <ListCategoriesWidget
            categories={categoriesContext.categorySelectItems}
            message={'No data to be shown!'}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
