import axios from 'axios';

const API_CLIENT = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

API_CLIENT.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
         config.headers["Content-Type"] = "application/json"
      } else {
        
      }
      return config
    }
)

export default API_CLIENT;