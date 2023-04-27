import axios from "axios"
const API_URL = "http://localhost:7000"
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = `bearer ${localStorage.getItem('accessToken')}`
    return config;
})

axiosInstance.interceptors.response.use(config => {
    return config;
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axiosInstance.post('auth/refresh')
            localStorage.setItem('accessToken', response.data.accessToken)
            return axiosInstance.request(originalRequest);
        } catch (error) {
            console.log(24)
        }
    }
    throw error
})
export default axiosInstance