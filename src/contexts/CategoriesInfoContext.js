/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { DEV_ENDPOINT } from '../Configs';

export const CategoriesInfoContext = createContext();

export function CategoriesInfoContextProvider({ children }) {
  const [categorySelectItems, setCategorySelectItems] = useState([]);
  const [subCategorySelectItems, setSubCategorySelectItems] = useState([]);

  useEffect(() => {
    function createCategoriesObj(data) {
      if (data?.length > 0) {
        const categoriesArray = [];
        data.forEach((elem) => {
          let obj = {
            id: elem.id,
            label: elem.name,
            icon: 'pi pi-fw pi-file',
            value: elem.name
          };

          const items = [];
          elem.subCategories.forEach((item) => {
            const subcategories = {
              label: item.name,
              icon: 'pi pi-fw pi-trash',
              value: item.name,
              id: item.id
            };
            items.push(subcategories);
          });
          obj = { ...obj, items };
          categoriesArray.push(obj);
        });
        setCategorySelectItems(categoriesArray);
      }
    }

    axios
      .get(`${DEV_ENDPOINT}categories/getAll`)
      .then((response) => {
        if (response.status === 200) {
          createCategoriesObj(response.data);
        }
      })
      .catch(() => {
        NotificationManager.error(
          'Error loadig Categories and SubCategories',
          'Ooops an error has occurred !',
          5000
        );
      });
  }, []);

  const value = { categorySelectItems, subCategorySelectItems };

  return <CategoriesInfoContext.Provider value={value}>{children}</CategoriesInfoContext.Provider>;
}
