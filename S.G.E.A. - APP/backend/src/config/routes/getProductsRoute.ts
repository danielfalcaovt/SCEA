import { Request, Response } from "express";
import { getAllProductsInDatabase } from "../database/products/getAllProductsInDatabase";

async function getProductsRoute(req: Request, res: Response) {
  try {
    const allDatabaseProducts = await getAllProductsInDatabase();
    if (allDatabaseProducts) {
      return res.status(200).json({ allDatabaseProducts });
    } else {
      return res.status(404).json({ error: "Products not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getProductsRoute;
