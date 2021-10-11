import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';
import fs from 'fs';
import LastImage from '../services/LastImage';
import imgService from '../services/CreateImage';

class PlanC {

    private fecha: Date;

    constructor() {
        this.fecha = new Date();
    }

    public async getInfo(req: Request, res: Response): Promise<Response> {
        try {
            const query = `SELECT t1.uuid, t1.name, t1.description, t2.image_id
            FROM plan AS t1
            JOIN image AS t2
            ON t1.image_id = t2.image_id
            ORDER BY t1.name`;
            const data: QueryResult = await pool.query(query);
            return res.status(200).json(data.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async createPlan(req: Request, res: Response): Promise<Response> {
        try {
            const query = `SELECT uuid, name, description, image_id FROM create_select_plan()`;
            const data: QueryResult = await pool.query(query);
            this.copyImage(data.rows[0].image_id);
            return res.status(200).json(data.rows[0]);
        } catch (e) {
            console.error(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async updateInfo(req: Request, res: Response): Promise<Response> {
        try {
            const { uuid, name, description } = req.body;
            console.log(req.body)
            const query = `UPDATE plan SET name = $1, description = $2 WHERE uuid = $3`;
            await pool.query(query, [name, description, uuid]);
            this.fecha = new Date();
            return res.status(201).json(this.fecha.toLocaleString('es-CO'));
        } catch (e) {
            console.error(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async updatePlanImg(req: Request, res: Response): Promise<Response> {
        console.info(req.body)
        const { name } = req.body;
        const query = `SELECT update_img_plan.id_before, update_img_plan.id_after FROM update_img_plan($1);`;
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

    public async deletePlan(req: Request, res: Response): Promise<Response> {
        try {
            let msg = 'ok';
            const { uuid } = req.params;
            const query = `SELECT delete_plan($1)`;
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
                imgService.deleteImage(data.rows[0].delete_plan);
                return res.status(200).json(msg);
            } else {
                return res.status(500).json('Internal server error');
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json('Internal server error');
        }
    }

    private async copyImage(id: number): Promise<Boolean> {
        let dir = `${imgService.makePath(id)}/${id}.webp`;
        fs.copyFileSync (`build/public/images/0/1.webp`, dir);
        return true;
    }
}

const planC = new PlanC();
export default planC;