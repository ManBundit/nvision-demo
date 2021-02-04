import axiosInstance from 'service/axiosInstance'

const axiosClient = options => axiosInstance({
  ...options
})

export default axiosClient