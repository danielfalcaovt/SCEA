import Router, { Request, Response } from "express";
import Consulta from "./ConsultaRoute";
import getProductsRoute from "./getProductsRoute";
import Cadastro from "./CadastroRoute";

const Routes = Router();

Routes.get("/", getProductsRoute);

Routes.post("/gerenciamento/1", Consulta);

Routes.post("/gerenciamento/2", Cadastro);

Routes.listen(3000, ()=>{
  console.log("App is running in 3000.");
});

export default Routes;
