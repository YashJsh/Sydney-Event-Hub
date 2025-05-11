import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
    baseURL : url
})

