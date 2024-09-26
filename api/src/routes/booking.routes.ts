import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';


const router = Router();

router.post('/flights', bookingController.searchFlights);
router.post('/hotels', bookingController.searchHotels);
router.post('/booking', bookingController.createBooking);
router.post('/traveler', bookingController.manageTraveler);


export default router;
