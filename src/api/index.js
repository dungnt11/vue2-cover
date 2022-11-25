import axios from 'axios';

const API_CLIENT = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
})

API_CLIENT.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
         config.headers["Content-Type"] = "application/json"
      }
      return config
    }
)

export default API_CLIENT;