import axios from "axios";

axios.defaults.withCredentials = true

export default axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Max-Age': '1800',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': true
    }, withCredentials: true
})