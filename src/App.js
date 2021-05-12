import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Components/FontawsomeIcons";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import Funcionalidade from "./Components/Funcionalidade/Funcionalidade";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/funcionalidade/*" element={<Funcionalidade />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
