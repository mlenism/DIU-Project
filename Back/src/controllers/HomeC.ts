import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';
import fs from 'fs';
import LastImage from '../services/LastImage';
import imgService from '../services/CreateImage';

class HomeC {

    private fecha: Date;

    constructor() {
        this.fecha = new Date();
    }

    public async getInfo(req: Request, res: Response): Promise<Response> {
        const query = `SELECT about_us, mission, vision, history, contact FROM hotel`;
        const data: void | QueryResult<any> = await pool.query(query).catch(e => console.error(e));
        if (data) {
            return res.status(200).json(data.rows[0]);
        } else {
            return res.status(500).json('Internal server error');
        }
    }

    public async createInfo(req: Request, res: Response): Promise<Response> {
        const { mission, vision, history } = req.body;
        const query = `UPDATE hotel SET mission = $1, vision = $2, history = $3 WHERE hotel_id = true`;
        const data: void | QueryResult<any> = await pool.query(query, [mission, vision, history]).catch(e => console.error(e));
        if (data) {
            this.fecha = new Date();
            return res.status(201).json(this.fecha.toLocaleString('es-CO'));
        } else {
            return res.status(500).send('Internal server error');
        }
    }

    public async createInfoFooter(req: Request, res: Response): Promise<Response> {
        const { contact } = req.body;
        const query = `UPDATE hotel SET contact = $1 WHERE hotel_id = true`;
        const data: void | QueryResult<any> = await pool.query(query, [contact]).catch(e => console.error(e));
        if (data) {
            this.fecha = new Date();
            return res.status(201).json(this.fecha.toLocaleString('es-CO'));
        } else {
            return res.status(500).send('Internal server error');
        }
    }

    public async createInfoAbout(req: Request, res: Response): Promise<Response> {
        const { about } = req.body;
        const query = `UPDATE hotel SET about_us = $1 WHERE hotel_id = true`;
        const data: void | QueryResult<any> = await pool.query(query, [about]).catch(e => console.error(e));
        if (data) {
            this.fecha = new Date();
            return res.status(201).json(this.fecha.toLocaleString('es-CO'));
        } else {
            return res.status(500).send('Internal server error');
        }
    }

    public async getImage(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const query = `SELECT image_id FROM static_image WHERE name = $1`;
        const data: void | QueryResult<any> = await pool.query(query, [id]).catch(e => console.error(e));
        if (data) {
            return res.status(200).json(data.rows[0].image_id);
        } else {
            return res.status(500).send('Internal server error');
        }
    }

    public async updateImage(req: Request, res: Response): Promise<Response> {
        console.info(req.body)
        const name = req.body.name;
        const query = `SELECT update_img.id_before, update_img.id_after FROM update_img($1);`;
        const data: void | QueryResult<any> = await pool.query(query, [name]).catch(e => console.error(e));
        if (data) {
            LastImage.ID = data.rows[0].id_after;
            const idB4 = data.rows[0].id_before;
            const img = await imgService.insertImage(req);
            const path = `${imgService.makePath(idB4)}/${idB4}.webp`
            fs.unlinkSync(path)
            console.log(LastImage.ID)
            if (img) {
                return res.status(201).json(LastImage.ID);
            } else {
                return res.status(500).send('Internal server error');
            }
        } else {
            return res.status(500).send('Internal server error');
        }
    }

}

const homeC = new HomeC();
export default homeC;