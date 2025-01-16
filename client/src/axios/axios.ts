import axios from "axios";

axios.defaults.withCredentials = true

export default axios.create({
    baseURL: 'https://crimson-server.onrender.com',
    headers: {
        'Access-Control-Allow-Origin': 'https://crimson-01b3.onrender.com',
        'Access-Control-Max-Age': '1800',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': true
    }, withCredentials: true
})