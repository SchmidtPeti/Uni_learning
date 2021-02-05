
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
})

export const insertMatAlapTask = payload => api.post(`/matalap_task`, payload)
export const getAllMatAlapTasks = () => api.get(`/matalap_tasks`)
export const updateMatTask = (id,payload) => api.put(`/updateMatTask/${id}`,payload)
export const deleteMatTask = (id) => api.delete(`/deleteMatTask/${id}`)
export const insertGeneralTask = payload => api.post(`/addGeneralTask`,payload)
export const getAllGeneralTasks = () => api.get(`/getAllGeneralTasks`)
export const updateGeneralTask = (id,payload) => api.put(`/updateGeneralTask/${id}`,payload)
export const deleteGeneralTask = (id,payload) => api.delete(`deleteGeneralTask/${id}`,payload)

const apis = {
    insertMatAlapTask,
    getAllMatAlapTasks,
    updateMatTask,
    deleteMatTask,
    insertGeneralTask,
    getAllGeneralTasks,
    updateGeneralTask,
    deleteGeneralTask
}

export default apis