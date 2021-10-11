import { Router } from 'express';
import roomC from '../controllers/RoomC';
import upload from '../services/storage';

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
        this.router.get('/n/e/w', roomC.createRoom.bind(roomC));
        this.router.put('/img', upload, roomC.updateRoomImg.bind(roomC));
        this.router.post('/', upload, roomC.updateInfo.bind(roomC));
        this.router.delete('/:uuid', roomC.deleteRoom.bind(roomC));
    }
}

const roomR = new RoomR();
export default roomR.router;