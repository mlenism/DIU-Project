import { Router } from 'express';
import homeC from '../controllers/HomeC';

class HomeR {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.get('/', homeC.getInfo);
    }
}

const homeR = new HomeR();
export default homeR.router;