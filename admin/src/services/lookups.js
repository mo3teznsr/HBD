import axios from "axios"




export const getAirports=(params={})=>{
    return axios.get(`/api/lookups/airports?${new URLSearchParams(params).toString()}`)
}
export const getAirlines=(params={})=>{
    return axios.get('/api/lookups/airlines',params)
}
export const getCountries=(params={})=>{
    return axios.get('/api/lookups/countries',params)
}
export const getCities=(params={})=>{
    return axios.get('/api/lookups/cities',params)
}