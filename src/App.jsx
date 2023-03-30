import "./App.css";
import { Routes, Route } from "react-router-dom";
import Entrar from "./pages/Entrar";
import Home from "./pages/Home";
import User from "./pages/User";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Entrar />} /> 

      <Route path="/user/*" element={<User />} />

      <Route path="*" element={<Home/>} />

    </Routes>
  );
}

export default App;
