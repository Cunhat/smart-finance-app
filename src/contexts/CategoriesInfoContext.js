/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';

export const CategoriesInfoContext = createContext();

export function CategoriesInfoContextProvider({ children }) {
  const [categorySelectItems, setCategorySelectItems] = useState([
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ]);

  const [subCategorySelectItems, setSubCategorySelectItems] = useState([
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ]);

  const value = { categorySelectItems, subCategorySelectItems };

  return <CategoriesInfoContext.Provider value={value}>{children}</CategoriesInfoContext.Provider>;
}
