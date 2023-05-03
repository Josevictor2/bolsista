import { BrowserRouter as Router, Route,Routes, BrowserRouter } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard";


function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
