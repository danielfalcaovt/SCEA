import Main from "./Components/pages/Main";
import axios from "axios";
import Root from "./Components/Root";
import Login from "./Components/auth/Login";
import { useEffect, useState } from "react";
import ErrorPage from "./Components/pages/error/ErrorPage";
import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Consulta from "./Components/pages/gerenciadores/Consulta";
import Cadastro from "./Components/pages/gerenciadores/Cadastro";
import Alteracao from "./Components/pages/gerenciadores/Alteracao";
import Remocao from "./Components/pages/gerenciadores/Remocao";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="gerenciador?" element={<Main />} >
            <Route path="gerenciador/:idGerenciador?" loader={({ params })=>{console.log(params)}}} element={<Consulta/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
