import axios from 'axios';
import router from '@/router'
const request = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

request.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('adminToken')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
         config.headers["Content-Type"] = "application/json"
      } else {
        
      }
      return config
    }
)

request.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem("adminToken")
    router.push({name: 'admin-login'})
   }
  return Promise.reject(error);
});

export default request;