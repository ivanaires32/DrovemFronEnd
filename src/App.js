import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { useState } from "react";
import { Aluno } from "./Pages/Aluno";
import Context from "./Context/context";
import { Entregar } from "./Pages/Entregar";
import { Projetos } from "./Pages/Projetos";

function App() {
  const [dadosAluno, setDadosAluno] = useState()
  const [turmasProjetos, setTurmasProjetos] = useState({ turmas: [], projetos: [] })

  return (
    <BrowserRouter>
      <Context.Provider value={{ turmasProjetos, setTurmasProjetos }}>
        <Routes>
          <Route path="/" element={<Home setDadosAluno={setDadosAluno} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aluno" element={<Aluno dadosAluno={dadosAluno} />} />
          <Route path="/entregar" element={<Entregar />} />
          <Route path="/notas" element={<Projetos />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
