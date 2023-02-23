import Client from '../database';

export type productType = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class Product {
  async index(): Promise<productType[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products ORDER BY id DESC';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<productType> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: productType): Promise<productType> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const product = result.rows[0];

      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  // update product
  public async update(id: unknown, product: productType): Promise<productType> {
    try {
      const product_id = id as number;
      const conn = await Client.connect();
      const sql =
        'UPDATE products SET name=$1, price=$2, category=$3 WHERE id=($4) RETURNING *';
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
        product_id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro: ${error}`);
    }
  }
}
