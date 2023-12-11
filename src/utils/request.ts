import axios from 'axios';
export const request = axios.create({
    baseURL:'http://192.168.1.10:8000/api/'
});