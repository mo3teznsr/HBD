import { Request, Response } from 'express';
import { searchHotels } from '../services/amadeus.service';

export const getHotels = async (req: Request, res: Response) => {
  const { cityCode, checkInDate, checkOutDate } = req.query;
  try {
    const hotels = await searchHotels(
      cityCode as string,
      checkInDate as string,
      checkOutDate as string
    );
    res.status(200).json(hotels);
  } catch (error:any) {
    res.status(500).json({ message: error?.message });
  }
};
