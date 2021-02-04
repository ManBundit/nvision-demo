import axios from 'axios'
import humps from 'humps'
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const axiosInstance = axios.create({
  baseURL: apiUrl,
})

axiosInstance.interceptors.request.use((config) => {  
  if (config.data) {
    config.data = humps.decamelizeKeys(config.data)
  }
  if (config.params) {
    config.params = humps.decamelizeKeys(config.params)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response) => {
  response.data = humps.camelizeKeys(response.data)
	return response
})

export default axiosInstance