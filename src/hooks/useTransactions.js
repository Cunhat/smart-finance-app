/* eslint-disable no-debugger */
import { useQuery } from 'react-query';
import { request } from 'graphql-request';
import { DEV_ENDPOINT } from '../Configs';
import { GET_ALL_TRANSACTIONS } from '../api/queries';

const useTransactions = () => {
  const getTransactions = () =>
    useQuery('transactions', async () => {
      const data = await request(DEV_ENDPOINT, GET_ALL_TRANSACTIONS);
      return data;
    });
  const { data, error, status } = getTransactions();

  return { data, error, status };
};

export default useTransactions;
