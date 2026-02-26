import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ats-backends.azurewebsites.net/api'
});

export default api;
