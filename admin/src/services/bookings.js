import axios from "axios"

export const getFlights=(params={})=>{
    return axios.post('/api/bookings/flights',params)
}