import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class ReservationC {

    public async insertInfo(req: Request, res: Response): Promise<Response> {
        const {filter, form, plan, room} = req.body;
        const {name, last_name, email, tel, country, city, address} = form;
        const {startDate, finishDate} = filter;
        try {
            const query = `SELECT insert_plan($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
            const data: QueryResult = await pool.query(query, [name, last_name, email, tel, country, city, address, startDate, finishDate, room, plan]);
            console.log([name, last_name, email, tel, country, city, address, startDate, finishDate, room, plan]);
            return res.status(201).json('ok');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const reservationC = new ReservationC();
export default reservationC;