
import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://websiteapi.herokuapp.com/api',
=======
    baseURL: process.env.REACT_API_URL,
>>>>>>> 561067b5d6fe6a64eaae43afab2b053a5751f180
})

export const insertMatAlapTask = payload => api.post(`/matalap_task`, payload)
export const getAllMatAlapTasks = () => api.get(`/matalap_tasks`)
export const insertGeneralTask = payload => api.post(`/addGeneralTask`,payload)
export const getAllGeneralTasks = () => api.get(`/getAllGeneralTasks`)

const apis = {
    insertMatAlapTask,
    getAllMatAlapTasks,
    insertGeneralTask,
    getAllGeneralTasks,
}

export default apis