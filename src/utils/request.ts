import axios from 'axios';
export const request = axios.create({
    baseURL:'https://movies-app.me/api/'
});