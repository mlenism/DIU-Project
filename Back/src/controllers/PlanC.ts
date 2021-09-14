import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class PlanC {

    public async getInfo(req: Request, res: Response): Promise<Response> {
        try {
            const query = `SELECT t1.name, t1.description, t2.image
            FROM plan AS t1
            JOIN image AS t2
            ON t1.image_id = t2.image_id`;
            const data: QueryResult = await pool.query(query);
            return res.status(200).json(data.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const planC = new PlanC();
export default planC;