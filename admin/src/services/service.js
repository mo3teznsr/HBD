import axios from "axios"




export const getServices=()=>{
    return axios.get('/api/services')
}