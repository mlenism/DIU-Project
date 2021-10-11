import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';
import fs from 'fs';
import LastImage from '../services/LastImage';
import imgService from '../services/CreateImage';

class RoomC {

    private fecha: Date;

    constructor() {
        this.fecha = new Date();
    }

    public async getInfo(req: Request, res: Response): Promise<Response> {
        try {
            const query = `SELECT t1.uuid, t1.name, t1.description, t1.cost,
            t1.adults, t1.children, t2.image_id
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
            const query = `SELECT t1.uuid, t1.name, t1.description, t1.cost,
            t1.adults, t1.children, t2.image_id
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
            const query = `SELECT t1.uuid, t1.name, t1.description, t1.cost,
            t1.adults, t1.children, t2.image_id
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

    public async createRoom(req: Request, res: Response): Promise<Response> {
        try {
            const query = `SELECT uuid, name, description, cost,
            adults, children, image_id FROM create_select_room()`;
            const data: QueryResult = await pool.query(query);
            imgService.copyImage(data.rows[0].image_id);
            return res.status(200).json(data.rows[0]);
        } catch (e) {
            console.error(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async updateInfo(req: Request, res: Response): Promise<Response> {
        try {
            const { uuid, name, cost, adults, children, description } = req.body;
            console.log(req.body)
            const query = `UPDATE room SET name = $1, description = $2, cost = $3, adults = $4, children = $5 WHERE uuid = $6`;
            await pool.query(query, [name, description, cost, adults, children, uuid]);
            this.fecha = new Date();
            return res.status(201).json(this.fecha.toLocaleString('es-CO'));
        } catch (e) {
            console.error(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async updateRoomImg(req: Request, res: Response): Promise<Response> {
        console.info(req.body)
        const { name } = req.body;
        const query = `SELECT update_img_room.id_before, update_img_room.id_after FROM update_img_room($1);`;
        const data: void | QueryResult<any> = await pool.query(query, [name]).catch(e => console.error(e));
        if (data) {
            LastImage.ID = data.rows[0].id_after;
            const idB4 = data.rows[0].id_before;
            const img = await imgService.insertImage(req);
            const path = `${imgService.makePath(idB4)}/${idB4}.webp`
            fs.unlinkSync(path)
            console.log(LastImage.ID)
            if (img) {
                this.fecha = new Date();
                return res.status(201).json(this.fecha.toLocaleString('es-CO'));
            } else {
                return res.status(500).send('Internal server error');
            }
        } else {
            return res.status(500).send('Internal server error');
        }
    }

    public async deleteRoom(req: Request, res: Response): Promise<Response> {
        try {
            let msg = 'ok';
            const { uuid } = req.params;
            const query = `SELECT delete_room($1)`;
            const data: any = await pool.query(query, [uuid]).catch(err => {
                if (err.code === '23503') {
                    console.error(err);
                    msg = '23503';
                } else {
                    console.error(err);
                }
            });
            if (msg === '23503') {
                return res.status(200).json(msg);
            }
            if (data) {
                imgService.deleteImage(data.rows[0].delete_room);
                return res.status(200).json(msg);
            } else {
                return res.status(500).json('Internal server error');
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const roomC = new RoomC();
export default roomC;