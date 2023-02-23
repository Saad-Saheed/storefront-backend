import Client from "../../database";
import { UserType } from "../../models/user";
import bcrypt from 'bcrypt';

const { PASSWORD_SALT, SALT_ROUNDS } = process.env;

export class Auth  {
    public async login(
        username: string,
        password: string
      ): Promise<UserType | null> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users WHERE username=($1)';
    
        const result = await conn.query(sql, [username]);
    
        if (result.rows.length) {
          const user = result.rows[0];
          if (bcrypt.compareSync(password + PASSWORD_SALT, user.password)) {
            return user;
          }
        }
        return null;
      }
    
}