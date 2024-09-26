const { useMemo } = require("react")
import {airportsList} from "../assets/data/airports.js"


const Airport=({value='',onChange=()=>{},keyword})=>{

    const airports=useMemo(()=>{
        const list=airportsList.filter(item=>item.airport_name.toLowerCase().includes(keyword.toLowerCase()||item.country_name.toLowerCase().includes(keyword.toLowerCase()))||item.icao_code.toLowerCase().includes(keyword.toLowerCase())||item.city_iata_code.toLowerCase().includes(keyword.toLowerCase())).slice(0,9)
        const items=list.map(item=>({
            ...item,
            label:`(${item.icao_code}) ${item.airport_name} - ${item.country_name}`,
            value:item.icao_code

        }))
        return items
    },[keyword])


    return <Autocomplete
    disablePortal
    options={airports}
    fullWidth
    value={value}
    onChange={(event, newValue) => {
        onChange(newValue)
    }}
    renderInput={(params) => <TextField {...params} label="Movie" />}
  />
}


export default Airport