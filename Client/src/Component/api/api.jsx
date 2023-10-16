import axios from 'axios';

export default axios.create({
    baseURL: 'https://tutorbackend-com.onrender.com' || 'http://localhost:8000'
})