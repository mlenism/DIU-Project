import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';

class RoomC {

    public async getInfo(req: Request, res: Response): Promise<Response> {
        try {
            const query = `SELECT t1.name, t1.description, t1.cost,
            t1.adults, t1.children, t1.season, t2.image
            FROM room AS t1
            JOIN image AS t2
            ON t1.image_id = t2.image_id
            LEFT JOIN (
                SELECT room_id FROM reservation AS s1
                WHERE (s1.entrance, s1.departure) OVERLAPS (CURRENT_DATE, CURRENT_DATE + 1)
            ) AS t3
            ON t1.room_id = t3.room_id
            WHERE t3.room_id IS NULL
            ORDER BY t1.name`;
            const data: QueryResult = await pool.query(query);
            return res.status(200).json(data.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getInfoById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        try {
            const query = `SELECT t1.name, t1.description, t1.cost,
            t1.adults, t1.children, t1.season, t2.image
            FROM room AS t1
            JOIN image AS t2
            ON t1.image_id = t2.image_id
            WHERE t1.name = $1
            ORDER BY t1.name`;
            const data: QueryResult = await pool.query(query, [id]);
            return res.status(200).json(data.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getPartialInfo(req: Request, res: Response): Promise<Response> {
        const {id, fd, ad, ch} = req.query // initial date, final date, adults, children
        try {
            const query = `SELECT t1.name, t1.description, t1.cost,
            t1.adults, t1.children, t1.season, t2.image
            FROM room AS t1
            JOIN image AS t2
            ON t1.image_id = t2.image_id
            LEFT JOIN (
                SELECT room_id FROM reservation AS s1
                WHERE (s1.entrance, s1.departure) OVERLAPS ($1, $2)
            ) AS t3
            ON t1.room_id = t3.room_id
            WHERE (t3.room_id IS NULL) AND (t1.adults >= $3) AND (t1.children >= $4)
            ORDER BY t1.name`;
            const data: QueryResult = await pool.query(query, [id, fd, ad, ch]);
            return res.status(200).json(data.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const roomC = new RoomC();
export default roomC;