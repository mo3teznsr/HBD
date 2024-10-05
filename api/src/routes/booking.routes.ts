import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { searchAirports } from '../controllers/flight.controller';


const router = Router();

router.post('/flights', bookingController.searchFlights);
router.post('/hotels', bookingController.searchHotels);
router.post('/booking', bookingController.createBooking);
router.post('/traveler', bookingController.manageTraveler);
router.get('/airports',searchAirports);


export default router;
