import { Router } from "express";
import { getFlights } from "../controllers/flight.controller";

const router = Router();


router.post("/flights", getFlights);


export default router;