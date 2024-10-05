// @ts-ignore
import Amadeus from 'amadeus';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});
type searchParams = {
  origin: string,
  destination: string,
  departureDate: string,
  returnDate?: string,
  adults: number ,
  children: number ,
  infants: number ,
  oneWay: boolean ,
  travelClass: string ,
  currencyCode:string
}
export const searchFlights = async ({ origin, destination, departureDate, returnDate, adults=1, children=0, infants=0,travelClass="ECONOMY", oneWay=false,currencyCode="SAR" }: any) => {
  try {
    const Flightparams = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      // children,
      // infants,
      // travelClass, // You can make this dynamic
      // ...(returnDate && !oneWay ? { returnDate } : {}),
      // ...(oneWay ? { nonStop: true } : {}),
      currencyCode
    };

    // Call Amadeus API for flight search
   // const response = await amadeus.shopping.flightOffersSearch.get({ Flightparams });
  const response = await amadeus.shopping.flightOffersSearch.get(Flightparams)

    // Process the response data as needed
    return response.data;
  } catch (error) {
    console.error('Error fetching flight offers:', error);
    throw new Error('Flight search failed');
  }
};

export const  searchHotels=async(cityCode: string, checkInDate: string, checkOutDate: string) =>{
  try {
    const response = await amadeus.shopping.hotelOffers.get({
      cityCode,
      checkInDate,
      checkOutDate,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching hotel offers');
  }
}

export const createBooking=async(travelerId: number, flightId?: number, hotelId?: number)=> {
  try {
    return await prisma.booking.create({
      data: {
        travelerId,
        flightId,
        hotelId,
      },
    });
  } catch (error) {
    throw new Error('Error creating booking');
  }
}

export const  manageTraveler=async(data: { firstName_ar: string,
   lastName_ar: string, firstName_en: string,
    lastName_en: string, email: string,
     phone: string }) =>{
  try {
    return await prisma.traveler.create({
      data,
    });
  } catch (error) {
    throw new Error('Error managing traveler');
  }
}

export const getAirports=async(keyword:any)=> {
  try {
    const response = await amadeus.referenceData.locations.get({
       subType: 'AIRPORT,CITY',
      keyword,
     
    })
  
    

    // await response.data.map(async(airport:any) => ({
    //   code: airport.iataCode,
    //   name: airport.name,
    //   cityId: await getCityId(airport.address.cityName, airport.address.countryCode, airport.address.cityCode),
    //   countryId: await getCountryId(airport.address.countryCode, airport.address.countryName),
    // }));

    // // Save airports to database (example)
    // const airports =await response.data.map(async(airport:any) => ({
    //   code: airport.iataCode,
    //   name: airport.name,
    //   cityId: await getCityId(airport.address.cityName, airport.address.countryCode, airport.address.cityCode),
    //   countryId: await getCountryId(airport.address.countryCode, airport.address.countryName),
    // }));
    // console.log('airports',airports)
    // await prisma.airport.createMany({ data: airports });
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error));
  }
}

// Fetch all airlines
export const getAirlines=async()=> {
  try {
    const response = await amadeus.referenceData.airlines.get();
    const airlines = response.data.map((airline:any) => ({
      iataCode: airline.iataCode,
      name: airline.businessName || airline.commonName,
    }));

    await prisma.airline.createMany({ data: airlines });
    return airlines;
  } catch (error) {
    throw new Error('Error fetching airlines');
  }
}

// Fetch all countries
export const getCountries=async() =>{
  try {
    const response = await amadeus.referenceData.locations.countries.get();
    const countries = response.data.map((country:any) => ({
      code: country.alpha2Code,
      name: country.name,
    }));

    await prisma.country.createMany({ data: countries });
    return countries;
  } catch (error) {
    throw new Error('Error fetching countries');
  }
}

// Fetch all cities
export const getCities=async(countryCode: string)=> {
  try {
    const response = await amadeus.referenceData.locations.get({
      subType: 'CITY',
      keyword: countryCode, // Fetch cities by country code
    });

    const cities = response.data.map(async(city:any) => ({
      code: city.iataCode,
      name: city.name,
      countryId: await getCountryId(city.address.countryCode),
    }));

    await prisma.city.createMany({ data: cities });
    return cities;
  } catch (error) {
    throw new Error('Error fetching cities');
  }
}

// Helper to get or create country by code
export const getCountryId=async(code: string,countryName:string='')=> {
  let country = await prisma.country.findFirst({ where: { code } });
  if (!country) {
    country = await prisma.country.create({
      data: { code, name: '' }, // Optionally provide name
    });
  }
  return country.id;
}

// Helper to get or create city by name and country
export const getCityId=async(name: string, countryCode: string, code: string) =>{
  const countryId = await getCountryId(countryCode);
  let city = await prisma.city.findFirst({ where: { name, countryId } });
  if (!city) {
    city = await prisma.city.create({
      data: { name, countryId ,code},
    });
  }
  return city.id;
}
