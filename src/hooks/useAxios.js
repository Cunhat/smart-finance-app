import { useState, useEffect } from 'react';
import axios from 'axios';
import { DEV_ENDPOINT } from '../Configs';

axios.defaults.baseURL = DEV_ENDPOINT;

const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []); // execute once only

  return { response, error };
};
export default useAxios;
