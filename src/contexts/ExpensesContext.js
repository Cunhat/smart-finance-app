/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */

import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { DEV_ENDPOINT } from '../Configs';

export const ExpensesContext = createContext();

export function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get(`${DEV_ENDPOINT}expense/getAll/1`)
      .then((response) => {
        if (response.status === 200) {
          setExpenses(response.data);
        }
      })
      .catch(() => {
        NotificationManager.error('Error loadig Expenses', 'Ooops an error has occurred !', 5000);
      });
  }, []);
  const value = { expenses, setExpenses };
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}
