/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';

export const CategoriesInfoContext = createContext();

export function CategoriesInfoContextProvider({ children }) {
  const [categorySelectItems, setCategorySelectItems] = useState([
    { label: 'New York', value: 'New York' },
    { label: 'Rome', value: 'Rome' },
    { label: 'London', value: 'London' },
    { label: 'Istanbul', value: 'Istanbul' },
    { label: 'Paris', value: 'Paris' }
  ]);

  const [subCategorySelectItems, setSubCategorySelectItems] = useState([
    { label: 'New York', value: 'New York' },
    { label: 'Rome', value: 'Rome' },
    { label: 'London', value: 'London' },
    { label: 'Istanbul', value: 'Istanbul' },
    { label: 'Paris', value: 'Paris' }
  ]);

  const value = { categorySelectItems, subCategorySelectItems };

  return <CategoriesInfoContext.Provider value={value}>{children}</CategoriesInfoContext.Provider>;
}
