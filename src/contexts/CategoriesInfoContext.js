/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';
import { DEV_ENDPOINT } from '../Configs';
import { GET_CATEGORIES_AND_SUBATEGORIES } from '../api/queries';

export const CategoriesInfoContext = createContext();

function getCategory() {
  return useQuery('category', async () => {
    const data = await request(DEV_ENDPOINT, GET_CATEGORIES_AND_SUBATEGORIES);
    return data;
  });
}

export function CategoriesInfoContextProvider({ children }) {
  const [categorySelectItems, setCategorySelectItems] = useState([]);
  const [subCategorySelectItems, setSubCategorySelectItems] = useState([]);
  const { data, error } = getCategory();

  useEffect(() => {
    if (data !== undefined) {
      setCategorySelectItems(data.category);
      setSubCategorySelectItems(data.subCategory);
    }
    if (error) {
      NotificationManager.error(
        'Error loadig Categories and SubCategories',
        'Ooops an error has occurred !',
        5000
      );
    }
  }, [data, error]);

  const value = { categorySelectItems, subCategorySelectItems };

  return <CategoriesInfoContext.Provider value={value}>{children}</CategoriesInfoContext.Provider>;
}
