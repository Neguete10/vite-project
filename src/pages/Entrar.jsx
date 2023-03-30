import "./Entrar.css";
import logo from "../images/NeutroGuard1.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../baseUrl";

export default function Entrar() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await axios
      .post(`${BASE_URL}/login`, { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data);
        navigate("/user");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="grid-container">
      <div className="grid-child containerPhoto">
        <img src={logo} alt="logo" className="nav-logo"></img>
      </div>

      <div className="grid-child containerInput">
        <h1>Acesse o Neutro Guard</h1>
        <form onSubmit={handleSubmit}>
          <input
            id="user"
            type="user"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Usuario"
            className="userLogin"
            name="username"
            required
          ></input>
          <br></br>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Senha"
            className="passLogin"
            name="password"
            required
          ></input>
          <br></br>
          <input type="submit" className="btn-Login" value="Prever"></input>
        </form>
        <b>Ainda não faz parte?</b>
        <Link to="/">Peça o convite</Link>
      </div>
    </div>
  );
}
