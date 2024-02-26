import axios from 

export default function Login() {
  return(
    <main>
      <article id="showPage">
          <h1>S.G.E.A.</h1>
      </article>
      <article id="loginPage">
        <div id="login">
          <h1>Login</h1>
          <form action="/login" method="post">
            <input placeholder="Email" type="email" name="username" id="username"></input>
            <input placeholder="Password" type="password" name="password" id="password"></input>
            <button>Confirmar</button>
          </form>
        </div>
      </article>
    </main>
  )
};
