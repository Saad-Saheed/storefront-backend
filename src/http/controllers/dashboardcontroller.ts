import { Request, Response } from 'express';
import { dashboardQueries } from '../services/dashboard';

const dashboard = new dashboardQueries();

//get five Most Porpular products
const fiveMostPorpular = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostPorpular();
    res.status(200).json({ status: "success", data: products });
  } catch (error: unknown) {
    const err = error as string;
    res.status(401).json({status: "failed", message: err.toString()});
  }
};

const categoryProducts = async (req: Request, res: Response) => {
  try {
    const products = await dashboard.categoryProducts(req.params.category);
    res.status(200).json({ status: "success", data: products });
  } catch (error: unknown) {
    const err = error as string;
    res.status(401).json({status: "failed", message: err.toString()});
  }
};

export { fiveMostPorpular, categoryProducts };
