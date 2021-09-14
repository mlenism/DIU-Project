import { Router } from 'express';
import planC from '../controllers/PlanC';

class PlanR {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.get('/', planC.getInfo);
    }
}

const planR = new PlanR();
export default planR.router;