import { Router } from 'express';
import reservationC from '../controllers/ReservationC';

class ResrevationR {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.post('/', reservationC.insertInfo.bind(reservationC));
        this.router.get('/', reservationC.getInfo);
        this.router.get('/:id', reservationC.getInfoById);
        this.router.get('/one/:id', reservationC.getOneInfoById);
        this.router.delete('/:id', reservationC.deleteReservation);
    }
}

const reservationR = new ResrevationR();
export default reservationR.router;