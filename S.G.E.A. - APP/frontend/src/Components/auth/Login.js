import { useState, useEffect } from "react";
import axios from "axios";

export default function Login(props) {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState();

  function handleChange(evt) {
    const data = evt.target.value;
    const target = evt.target.name;

    setAuth({
      ...auth,
      [target]: data,
    });
  };

  async function fetchData(evt) {
    evt.preventDefault();
    try {
      const result = await axios({
        url: "http://localhost:5500/login",
        method: "post",
        data: { auth },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setResponse(result.data);
      console.log(auth);
      if (response === true) {
        props.Authorize(true);
      }else{
        props.Authorize(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  }


  return (
    <main>
      <article id="showPage">
        <h1>S.G.E.A.</h1>
      </article>
      <article id="loginPage">
        <div id="login">
          <h1>Login</h1>
          <form onSubmit={fetchData} action="/login" method="post">
            <input
              onChange={handleChange}
              placeholder="Email"
              type="email"
              name="email"
              id="username"
              required
              value={auth.email || ""}
            ></input>
            <input
              onChange={handleChange || ""}
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              required
              value={auth.password}
            ></input>
            <button>Confirmar</button>
          </form>
        </div>
      </article>
    </main>
  );
}
