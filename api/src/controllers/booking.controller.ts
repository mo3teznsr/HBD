import { Request, Response } from 'express';
import { createBooking, manageTraveler, searchFlights, searchHotels } from '../services/amadeus.service';


class BookingController {

  async searchFlights(req: Request, res: Response) {
    try {
      const flights = await searchFlights(
      req.body
      );
      res.json(flights);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  async searchHotels(req: Request, res: Response) {
    const { cityCode, checkInDate, checkOutDate } = req.query;
    try {
      const hotels = await searchHotels(
        cityCode as string,
        checkInDate as string,
        checkOutDate as string
      );
      res.json(hotels);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  async createBooking(req: Request, res: Response) {
    const { travelerId, flightId, hotelId } = req.body;
    try {
      const booking = await createBooking(travelerId, flightId, hotelId);
      res.json(booking);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  async manageTraveler(req: Request, res: Response) {
    const { firstName, lastName, email, phone } = req.body;
    try {
      const traveler = await manageTraveler({ firstName, lastName, email, phone });
      res.json(traveler);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

}

export const bookingController = new BookingController();
