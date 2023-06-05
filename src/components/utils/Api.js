import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localNetworkAddress = `http://${window.location.hostname}:8000`;
        const token = localStorage.getItem('token'); // Replace with your token storage approach

        if (!token) {
          // Handle case when token is not available
          setError('Authentication token is missing');
          return;
        }

        const headers = {
          Authorization: `Token ${token}`,
        };

        const response = await axios.get(`${localNetworkAddress}/api/${endpoint}/`, { headers });
        setData(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, error };
};

export default useFetchData;
