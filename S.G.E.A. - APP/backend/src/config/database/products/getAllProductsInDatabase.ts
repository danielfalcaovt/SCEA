import { query } from "../dbConnection";

function checkIfHasProducts(targetToCheck:any) {
  if (targetToCheck.rows.length > 0) {
    return true;
  }else{
    return false;
  };
};

async function getAllProductsInDatabase() {
  try {
    const productsData:any = await query("SELECT * FROM posts");
    if (checkIfHasProducts(productsData)) {
      const productsInDatabase = productsData.rows;
      return {
        products: productsInDatabase
      };
    } else {
      return false;
    };
  } catch (error) {
    return {
      error: error,
    };
  };
};

export {
  getAllProductsInDatabase
};
