import { Request, Response } from "express";
import { LookForProductInDatabase } from "../database/products/LookForProductInDatabase";

async function Consulta(req: Request, res: Response) {
  try {
    const { produto } = req.body;
    const lowercaseProduto = produto.toLowerCase();
    // THE % IS GOING TO FILL THE LIKE STATEMENT IN SQL
    const foundProduct = await LookForProductInDatabase(
      `%${lowercaseProduto}%`
    );
    res.status(200).json({ product: foundProduct });
  } catch (error) {
    console.log(error);
    res.status(404).json({ product: "Not Found." });
  };
};

export default Consulta;
