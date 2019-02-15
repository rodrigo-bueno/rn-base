import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.20.200:3000', //Definindo a url base
})

export default api;

