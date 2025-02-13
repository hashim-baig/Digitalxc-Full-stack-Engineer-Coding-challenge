import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadEmployees = async (employeesFile, assignmentsFile) => {
  const formData = new FormData();
  formData.append('employeesFile', employeesFile);
  formData.append('assignmentsFile', assignmentsFile);
  
  const response = await api.post('/upload-employees', formData);
  return response.data;
};

export const generateAssignments = async () => {
  const response = await api.post('/generate-assignments');
  return response.data;
};

export const downloadAssignments = async () => {
  const response = await api.get('/download-assignments', {
    responseType: 'blob',
  });
  return response.data;
};
