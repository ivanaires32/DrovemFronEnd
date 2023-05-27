import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { useState } from "react";
import { Aluno } from "./Pages/Aluno";
import Context from "./Context/context";
import { Entregar } from "./Pages/Entregar";

function App() {
  const [dadosAluno, setDadosAluno] = useState()
  const [turmas, setTurmas] = useState()

  return (
    <BrowserRouter>
      <Context.Provider value={{ turmas: turmas, setTurmas }}>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home setDadosAluno={setDadosAluno} />} />
          <Route path="/aluno" element={<Aluno dadosAluno={dadosAluno} />} />
          <Route path="/entregar" element={<Entregar />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
