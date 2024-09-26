import { Request, Response } from 'express';
import { searchFlights ,createBooking} from '../services/amadeus.service';

export const getFlights = async (req: Request, res: Response) => {

  try {
    const flights = await searchFlights(
      req.body
    );
    res.status(200).json(flights);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const bookFlightController = async (req: Request, res: Response) => {
  const { offerId, travelerInfo } = req.body;
  try {
    const booking = await createBooking(offerId, travelerInfo);
    res.status(200).json(booking);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
