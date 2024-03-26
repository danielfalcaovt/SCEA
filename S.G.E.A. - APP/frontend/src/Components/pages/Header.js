import { Link } from "react-router-dom"

export default function Header() {
  return(
    <header>
      <div className="title">
        <Link to="/">
          <h1>SGEA</h1>
        </Link>
      </div>
      <div id="hamburguer">
        <button>
          <div id="ft-line"></div>
          <div id="mid-line"></div>
          <div id="bot-line"></div>
        </button>
      </div>
      <nav className="invisible" id="menu">
        <ul>
          <li>
            <Link to="/gerenciador/1">
              Remover Produto
            </Link>
          </li>
          <li>
            <Link to="/gerenciador/2">
              Cadastrar Produto
            </Link>
          </li>
          <li>
            <Link to="/gerenciador/3">
              Consultar Produto
            </Link>
          </li>
          <li>
            <Link to="/gerenciador/4">
              Alterar Produto
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};
