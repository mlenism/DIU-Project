import { Router } from 'express';
import planC from '../controllers/PlanC';
import upload from '../services/storage';

class PlanR {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.get('/', planC.getInfo);
        this.router.get('/n/e/w', planC.createPlan.bind(planC));
        this.router.put('/img', upload, planC.updatePlanImg.bind(planC));
        this.router.post('/', upload, planC.updateInfo.bind(planC));
        this.router.delete('/:uuid', planC.deletePlan.bind(planC));
    }
}

const planR = new PlanR();
export default planR.router;