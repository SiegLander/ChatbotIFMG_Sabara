import React from "react";

import Arquivos from "./Pages/Arquivos";
import Historico from "./Pages/Historico";
import Intencao from "./Pages/Intencao";
import Lixeira from "./Pages/Lixeira";
import PalavraChave from "./Pages/PalavraChave";
import Respostas from "./Pages/Respostas";

import Navbar from "./Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const Funcionalidade = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/arquivo" element={<Arquivos />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/intencoes" element={<Intencao />} />
        <Route path="/lixeira" element={<Lixeira />} />
        <Route path="/palavrachave" element={<PalavraChave />} />
        <Route path="/respostas" element={<Respostas />} />
      </Routes>
    </>
  );
};

export default Funcionalidade;
