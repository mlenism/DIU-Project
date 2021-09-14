import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class HomeC {

    public async getInfo(req: Request, res: Response): Promise<Response> {
        try {
            const query = `SELECT about_us, mission, vision, history, contact FROM hotel`;
            const data: QueryResult = await pool.query(query);
            return res.status(200).json(data.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const homeC = new HomeC();
export default homeC;