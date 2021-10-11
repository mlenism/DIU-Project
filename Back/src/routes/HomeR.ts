import { Router } from 'express';
import homeC from '../controllers/HomeC';
import upload from '../services/storage';

class HomeR {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.get('/', homeC.getInfo);
        this.router.get('/:id', homeC.getImage);
        // this.router.post('/', upload, homeC.createImage.bind(homeC));
        this.router.post('/', upload, homeC.createInfo.bind(homeC));
        this.router.post('/footer', upload, homeC.createInfoFooter.bind(homeC));
        this.router.post('/about', upload, homeC.createInfoAbout.bind(homeC));
        this.router.put('/', upload, homeC.updateImage.bind(homeC));
    }
}

const homeR = new HomeR();
export default homeR.router;