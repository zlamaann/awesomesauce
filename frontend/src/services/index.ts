import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:5500/api/v1",
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});

