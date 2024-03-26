import { query } from "../dbConnection";

async function LookForProductInDatabase(lowercaseProduct: string) {
  try {
    const searchForProdutoInDatabase:any = await query(
      `SELECT * FROM posts WHERE LOWER(produto) LIKE $1`,[lowercaseProduct]);
    console.log(searchForProdutoInDatabase);
    console.log("here");
    if (searchForProdutoInDatabase.rows.length > 0) {
      const foundProdutoInDatabase = searchForProdutoInDatabase.rows[0];
      console.log(foundProdutoInDatabase);
      return { foundProdutoInDatabase };
    } else {
      console.log(false);
      return false;
    }
  } catch (err:Error) {
    console.error(err.message);
    return err.message;
  };
};

export { LookForProductInDatabase };
