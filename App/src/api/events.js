import axios from './axios.js'

//Peticiones a los eventos

export const postEventRequest = (data) => axios.post(`/addEvent`, data)