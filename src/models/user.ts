import Client from '../database';
import { orderType } from './order';

export type UserType = {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password?: string;
};

export class User {
  public async index(): Promise<UserType[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users ORDER BY id DESC';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  public async show(id: string): Promise<UserType> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  public async activeOrders(id: string): Promise<orderType[]> {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='active'`;
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders. Error: ${err}`);
    }
  }

  public async completedOrders(id: string): Promise<orderType[]> {
    try {
      const sql =
        `SELECT * FROM orders WHERE user_id=($1) AND status='completed'`;
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find orders. Error: ${err}`);
    }
  }

  public async create(u: UserType): Promise<UserType> {
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        u.password,
      ]);

      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
    }
  }

    // delete user
    public async delete(id: string): Promise<UserType> {
      try {
        const sql = `DELETE FROM users WHERE id=($1) RETURNING *`;
        const conn = await Client.connect();      
  
        const result = await conn.query(sql, [id]);
        conn.release();
        
        return result.rows[0];
      } catch (err) {
        throw new Error(`Could not delete user ${id}. Error: ${err}`);
      }
    }

}
