import { QueryResult } from 'pg';
import { pool } from '../database';

export default class LastImage {

  public static ID: number = 0;

  public static async uploadLastImage() {
    const query = `SELECT max(image_id) FROM image`;
    const data: QueryResult = await pool.query(query);
    LastImage.ID = data.rows[0].max;
  }

}