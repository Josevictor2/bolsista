import { BrowserRouter as Router, Route,Routes, BrowserRouter } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard";
import Bolsistas from "./components/BolsistasCadastro";
import Ponto from "./components/PontoBolsista";
import Login from "./components/LoginBolsista"

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/bolsistas" element={<Bolsistas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ponto" element={<Ponto />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
