import Client from '../../database';
import { productType } from '../../models/product';

export class dashboardQueries {

  //get five Most Porpular products
  public async fiveMostPorpular(): Promise<{ id: number, name: string; price: number, quantity: bigint}[]> {
    try {
      const conn = await Client.connect();
      const sql =
        `SELECT p.*, sum(op.quantity) AS quantity 
        FROM products p 
        INNER JOIN order_products op ON p.id = op.product_id 
        INNER JOIN orders o ON op.order_id = o.id 
        GROUP BY p.id ORDER BY quantity DESC LIMIT 5`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products: ${err}`);
    }
  }
   // read all product from this category
   public async categoryProducts(category: string): Promise<productType[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE (category LIKE '%' || $1 || '%')`;
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get product under this category. Error: ${err}`
      );
    }
  }

}
