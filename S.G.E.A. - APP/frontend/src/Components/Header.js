export default function Header() {
  return(
    <header>
      <div className="title">
        <a href="/">
          <h1>SGEA</h1>
        </a>
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
            <a href="/delete">
              Remover Produto
            </a>
          </li>
          <li>
            <a href="/cadastro">
              Cadastrar Produto
            </a>
          </li>
          <li>
            <a href="/consulta">
              Consultar Produto
            </a>
          </li>
          <li>
            <a href="/alterar">
              Alterar Produto
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
};
