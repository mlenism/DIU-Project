import { Router } from 'express';
import reservationC from '../controllers/ReservationC';

class ResrevationR {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.post('/', reservationC.insertInfo);
    }
}

const reservationR = new ResrevationR();
export default reservationR.router;