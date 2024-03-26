import { NextFunction, Request, Response } from "express";

function missingParams(
  userid: string,
  estoque: string,
  produto: string,
  price: string
) {
  if (!userid && !estoque && !produto && !price) {
    return true;
  } else {
    return false;
  }
}

async function CadastroRoute(req: Request, res: Responseicr) {
  try {
    console.log(req.body);
    const { userid, estoque, produto, price } = req.body;
    console.log(userid);

    if (missingParams()) {
      res.status(401).json({ error: "Missing params." });
    } else {
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default CadastroRoute;
