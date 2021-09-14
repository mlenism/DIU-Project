import { Router } from 'express';
import roomC from '../controllers/RoomC';

class RoomR {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.get('/', roomC.getInfo);
        this.router.get('/some', roomC.getPartialInfo);
        this.router.get('/:id', roomC.getInfoById);
    }
}

const roomR = new RoomR();
export default roomR.router;