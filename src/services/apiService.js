import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const signupVendor = async (formData) => {
  const formDataWithFile = new FormData();
  Object.keys(formData).forEach((key) => {
    if (key === 'document' && formData[key]) {
      formDataWithFile.append(key, formData[key]);
    } else {
      formDataWithFile.append(key, formData[key]);
    }
  });

  try {
    const response = await axios.post(`http://localhost:5000/api/vendors/register`, formDataWithFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getAllVendors = async () => {
  try {
    const response = await api.get('/vendors');
    return response.data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};

export const approveVendor = async (vendorId, isApproved, comment = '') => {
  try {
    const response = await api.post('http://localhost:5000/api/vendors/approve', { vendorId, isApproved, comment });
    return response.data;
  } catch (error) {
    console.error('Error approving vendor:', error);
    throw error;
  }
};

export const rejectVendor = async (vendorId, comment) => {
  try {
    const response = await api.post('/vendors/reject', { vendorId, comment });
    return response.data;
  } catch (error) {
    console.error('Error rejecting vendor:', error);
    throw error;
  }
};
export const getVendorDocument = async (vendorId) => {
  try {
    const response = await api.get(`/vendors/${vendorId}/document`, {
      responseType: 'blob', // Specify the response type as blob
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};
export default api;
