import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ats-new-backend-ave7edeebycda8g0.centralindia-01.azurewebsites.net/api',
});

export default api;
