import "./Home.css";
import logo from "../images/NeutroGuard2.png";
import { Link } from "react-router-dom";
import laboratory from "../images/neutrofilo.jpg";

function Home() {
  return (
    <div className="containerHome">
      <div className="nav-Header">
        <div className="nav-entrar">
          <img src={logo} alt="logo" id="logo2"></img>
        </div>
        <Link to="login">
          <button className="btn-entrar">ENTRAR</button>
        </Link>
      </div>

      <div className="card">
        <div className="text-container">
          <h4>Inteligência Artificial em prol do seu bem-estar</h4>
          <h1>
            Medir os níveis de neutrófilos com NeutroGuard é rápido. Evite uma
            punção desnecessária!
          </h1>
          <p>
            O NeutroGuard é um projeto em fase de teste cujo objetivo principal
            é ampliar a qualidade de vida do paciente oncológico. Este software
            prevê o número de neutrófilos em tempo real com um laser na ponta do
            dedo, sem necessidade de uso de agulhas. Se inscreva e entre em
            contato para mais informações.
          </p>
          <form>
            <input
              type={"email"}
              className="business-input"
              placeholder="Seu email corporativo"
              required
            ></input>
            <input className="btn-enviar" type="submit" value="ENVIAR"></input>
          </form>
        </div>
        <div className="image-container">
          <img src={laboratory} alt="lab" className="labImage"></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
