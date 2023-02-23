import { Request, Response } from 'express';
import { Product, productType } from '../../models/product';

export class ProductController {
  //get all
  public async index(_req: Request, res: Response) {
    try {
      const product = new Product();
      const products = await product.index();
      if (!products.length) res.status(404).json({status: "success", message: 'Product Not Found!'});
      else res.status(200).json({ status: "success", data: products });
    } catch (error: unknown) {
      const err = error as string;
      res.status(401).json({status: "failed", message: err.toString()});
    }
  }
  //get all
  public async show(req: Request, res: Response) {
    try {
      const productM = new Product();
      const product = await productM.show(req.params.id);
      if (!product) res.status(404).json({ status: "success", message: 'Product Not Found!' });
      else res.status(200).json({ status: "success", data: product });
    } catch (error: unknown) {
      const err = error as string;
      res.status(401).json({status: "failed", message: err.toString()});
    }
  }
  //create
  public async create(req: Request, res: Response) {
    try {
      // new product
      const newproduct: productType = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
      };
      const product = new Product();
      const products = await product.create(newproduct);
      res.status(200).json({ status: "success", message: 'Product Created Successfully', data: products });
    } catch (error: unknown) {
      const err = error as string;
      res.status(401).json({status: "failed", message: err.toString()});
    }
  }
  //update
  public async update(req: Request, res: Response) {
    try {
      // update product
      const updateproduct: productType = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
      };

      const productM = new Product();
      const product = await productM.update(req.params.id, updateproduct);
      res
        .status(200)
        .json({ status: "success", message: 'Product Updated Successfully', data: product });
    } catch (error: unknown) {
      const err = error as string;
      res.status(500).json({status: "failed", message: err.toString()});
    }
  }
}
