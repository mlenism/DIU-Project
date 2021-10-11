import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import LastImage from './services/LastImage';
import homeR from './routes/HomeR';
import planR from './routes/PlanR';
import roomR from './routes/RoomR';
import reservationR from './routes/ReservationR';

class Server {

    public app: Application;

    constructor() {
        LastImage.uploadLastImage();
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    routes(): void {
        this.app.use('/home', homeR);
        this.app.use('/plan', planR);
        this.app.use('/room', roomR);
        this.app.use('/reservation', reservationR);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("server on port", this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();