import { Request, Response } from 'express';
import { getAirlines, getAirports, getCities, getCountries } from '../services/amadeus.service';

class LookupController {
  async getAirports(req: Request, res: Response) {
    try {
      const airports = await getAirports();
      res.json(airports);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAirlines(req: Request, res: Response) {
    try {
      const airlines = await getAirlines();
      res.json(airlines);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCountries(req: Request, res: Response) {
    try {
      const countries = await getCountries();
      res.json(countries);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCities(req: Request, res: Response) {
    const { countryCode } = req.query;
    try {
      const cities = await getCities(countryCode as string);
      res.json(cities);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const lookupController = new LookupController();
