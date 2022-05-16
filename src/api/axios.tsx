import axios from 'axios';

const apiURL = 'http://localhost:8080/biblioteca-api-1.0';

const api = axios.create({
   baseURL: `${apiURL}`
})

export default api