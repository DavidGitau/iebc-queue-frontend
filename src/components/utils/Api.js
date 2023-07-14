import axios from "axios";

const localNetworkAddress = `http://${window.location.hostname}:8000`; // Get dynamic local network address with port 8000

export const fetchData = async (endpoint) => {
  try {
    const token = localStorage.getItem('token'); // Replace with your token storage approach

    if (!token) {
      // Handle case when token is not available
      return;
    }
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(`${localNetworkAddress}/api/${endpoint}`, { headers });
    const data = response.data;
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await axios.post(`${localNetworkAddress}/api/${endpoint}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart form data
      },
    });

    return response;
  } catch (error) {
    console.log("Error posting data:", error);
    throw error;
  }
};


export const updateData = async (endpoint, data) => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage or your preferred storage mechanism

    // Generate a new token if it doesn't exist or is invalid
    if (!token) {
      const response = await axios.post(`${localNetworkAddress}/api/auth/token/`);
      const { token: newToken } = response.data;
      localStorage.setItem('token', newToken); // Save the new token to localStorage
      axios.defaults.headers.common['Authorization'] = `Token ${newToken}`; // Set the new token in the default request headers
    }

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = await axios.patch(`${localNetworkAddress}/api/${endpoint}`, data, config);
    return response.data;
  } catch (error) {
    console.log("Error updating data:", error);
    throw error;
  }
};
