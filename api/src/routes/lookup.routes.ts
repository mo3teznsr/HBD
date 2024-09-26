import { Router } from 'express';
import { lookupController } from '../controllers/lookup.controller';


const router = Router();

router.get('/airports', lookupController.getAirports);
router.get('/airlines', lookupController.getAirlines);
router.get('/countries', lookupController.getCountries);
router.get('/cities', lookupController.getCities);

export default router;
