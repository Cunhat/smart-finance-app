/* eslint-disable no-debugger */
import React, { useContext } from 'react';
import PersonalInfoWidget from '../../components/PersonalInfoWidget';
import './styles.css';
import CreateCategorySubCategoryWidget from '../../components/CreateCategorySubCategoryWidget';
import ListCategoriesWidget from '../../components/ListCategoriesWidget';
import { CategoriesInfoContext } from '../../contexts/CategoriesInfoContext';
import { createCategory, createSubCategory } from '../../api/queries';

function Settings() {
  const categoriesContext = useContext(CategoriesInfoContext);

  return (
    <div className="mainPagesContainer">
      <h1>Settings</h1>
      <PersonalInfoWidget />
      <div className="categoriesWidgetsContainer">
        <div className="categoriesWidgetsContainerGrid">
          <div className="categoriesWidgetsItem">
            <CreateCategorySubCategoryWidget
              title={'Create Category'}
              inputPlaceHolder={'Add new category...'}
              type={'Category'}
              mutationFunction={createCategory}
            />
          </div>
          <div className="categoriesWidgetsItem">
            <CreateCategorySubCategoryWidget
              title={'Create SubCategory'}
              inputPlaceHolder={'Add new subCategory...'}
              type={'SubCategory'}
              mutationFunction={createSubCategory}
            />
          </div>
        </div>
        <div className="categoriesWidgetsContainerGrid">
          <ListCategoriesWidget
            categories={categoriesContext.categorySelectItems}
            subCategories={categoriesContext.subCategorySelectItems}
            message={'No data to be shown!'}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
