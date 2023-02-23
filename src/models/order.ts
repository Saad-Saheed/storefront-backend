import Client from '../database';

export type orderType = {
  id?: number;
  user_id: bigint;
  status: string;
};

export type cartType = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: bigint;
};

export class Order {

  public async show(id: string): Promise<orderType> {
    try {
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const conn = await Client.connect();      

      const result = await conn.query(sql, [id]);
      conn.release();
      
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  public async create(o: orderType): Promise<orderType> {
    try {
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';

      const conn = await Client.connect();
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  // addProduct
  public async addProduct(cart: cartType): Promise<orderType> {
    try {
      const sql =
        `INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;

      const conn = await Client.connect();

      const result = await conn.query(sql, [
        cart.order_id,
        cart.product_id,
        cart.quantity,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add this product to order cart. Error: ${err}`
      );
    }
  }

  // update order
  public async update(id: unknown, order: orderType): Promise<orderType> {
    try {
      const order_id = id as number;
      const conn = await Client.connect();
      const sql =
        'UPDATE orders SET user_id=($1), status=($2) WHERE id=($3) RETURNING *';
      const result = await conn.query(sql, [
        order.user_id,
        order.status,
        order_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro: ${error}`);
    }
  }

}
