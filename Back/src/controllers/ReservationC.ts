import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';
import nodemailer from '../services/nodemailer';

class ReservationC {

    public async insertInfo(req: Request, res: Response): Promise<Response> {
        const { form, info } = req.body;
        const { name, last_name, email, tel, country, city, address } = form;
        const { dateIn, dateOut, roomUUID, packUUID, adults, children, roomName, pack } = info;
        const information = [name, last_name, email, tel, country, city, address, dateIn, dateOut, roomUUID, packUUID, adults, children];
        console.info(information);
        try {
            const query = `SELECT insert_reservation($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
            const data: QueryResult = await pool.query(query, information);
            let the_pack = (packUUID === null) ? 'no aplica' : pack;
            const contentHtml =
            `<h1> Información de la reserva </h1>
            <ul>
                <li><span style="font-weight: bold">Código de factura:</span> ${data.rows[0].insert_reservation}</li>
                <li>Cliente: ${name} ${last_name}</li>
                <li>Fecha de entrada: ${dateIn}</li>
                <li>Fecha de salida: ${dateOut}</li>
                <li>Adultos: ${adults}</li>
                <li>Niños: ${children}</li>
                <li>Habitación: ${roomName}</li>
                <li>Paquete: ${the_pack}</li>
            </ul>
            <hr>
            <p>Este es un mensaje automático y no es necesario responder.</p>`;
            const mailOptions = nodemailer.getMailOptions(email, contentHtml);
            console.info(`Reservación: ${data.rows[0].insert_reservation}`)
            const mailer = await nodemailer.getTransporter();
            await mailer.sendMail(mailOptions);
            return res.status(201).json('ok');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getInfo(req: Request, res: Response): Promise<Response> {
        try {
            const query = `SELECT CONCAT(tb2.name, ' ', tb2.last_name) AS name, tb1.entrance::TEXT, tb1.departure::TEXT, timestamp::TEXT
            FROM reservation AS tb1
            JOIN reserver AS tb2
            ON tb1.reserver_id = tb2.reserver_id`;
            const data: QueryResult = await pool.query(query);
            return res.status(201).json(data.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getInfoById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const query = `SELECT CONCAT(tb2.name, ' ', tb2.last_name) AS name, tb1.entrance::TEXT, tb1.departure::TEXT, timestamp::TEXT
            FROM reservation AS tb1
            JOIN reserver AS tb2
            ON tb1.reserver_id = tb2.reserver_id
            WHERE LOWER(CONCAT(tb2.name, ' ', tb2.last_name)) LIKE LOWER(CONCAT('%',$1::TEXT,'%'))`;
            const data: QueryResult = await pool.query(query, [id]);
            return res.status(201).json(data.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async getOneInfoById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const query = `SELECT timestamp::TEXT, CONCAT(tb2.name, ' ', tb2.last_name) AS name, tb1.entrance::TEXT, tb1.departure::TEXT,
            tb1.adults, tb1.children, tb3.name AS room, tb5.name AS plan, tb3.cost, tb1.uuid
            FROM reservation AS tb1
            JOIN reserver AS tb2
            ON tb1.reserver_id = tb2.reserver_id
            JOIN room AS tb3
            ON tb1.room_id = tb3.room_id
            LEFT JOIN plan_reservation AS tb4
            ON tb1.reservation_id = tb4.reservation_id
            LEFT JOIN plan AS tb5
            ON tb4.plan_id = tb5.plan_id
            WHERE timestamp = $1`;
            const data: QueryResult = await pool.query(query, [id]);
            return res.status(201).json(data.rows[0]);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }

    public async deleteReservation(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const query1 = `SELECT delete_reservation($1)`;
            const data1: QueryResult = await pool.query(query1, [id]);
            const query2 = `DELETE FROM reserver WHERE reserver_id = $1`;
            await pool.query(query2, [data1.rows[0].delete_reservation]).catch(err => console.error(err));
            return res.status(201).json('ok');
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal server error');
        }
    }
}

const reservationC = new ReservationC();
export default reservationC;