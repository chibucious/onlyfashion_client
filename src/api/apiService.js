// axiosInstance.js: This file should contain the code for creating the Axios instance.
// src/api/apiService.js
import axios from './axiosInstance';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
};
