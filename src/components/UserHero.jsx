import "./UserHero.css";

function Hero(props) {
  return (
    <div className="hero">
      <h1>{props.laboratory}</h1>
      <h2>Welcome to our Healthcare Portal</h2>
      <p>
        Com o NeutroGuard, medir os níveis de neutrófilos agora é rápido e
        indolor. O objetivo principal deste projeto em fase de teste é ampliar a
        qualidade de vida dos pacientes oncológicos, eliminando a necessidade de
        punções dolorosas e desnecessárias. O software utiliza um laser na ponta
        do dedo para prever o número de neutrófilos em tempo real, permitindo
        aos pacientes e profissionais de saúde monitorar a saúde de forma mais
        fácil e eficiente.
      </p>
    </div>
  );
}

export default Hero;
