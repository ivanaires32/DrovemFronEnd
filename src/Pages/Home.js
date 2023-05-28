import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { URL_Base } from "../URL"
import { useNavigate } from "react-router-dom"
import Context from "../Context/context"

export function Home({ setDadosAluno }) {
    const [selectTurma, setSelectTurma] = useState()
    const [selectProject, setSelectProject] = useState()
    const [alunos, setAlunos] = useState([])
    const context = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${URL_Base}/turmas`)
            .then(res => context.setTurmasProjetos(res.data))
            .catch(err => console.log(err.response.data))
    }, [])

    function turma(id_turma) {
        setSelectTurma(id_turma)
        axios.get(`${URL_Base}/turmas/${id_turma}`)
            .then(res => setAlunos(res.data))
            .catch(err => console.log(err.response.data.message))
    }

    function aluno(cpf_aluno) {
        axios.get(`${URL_Base}/turmas/${selectTurma}/${cpf_aluno}`)
            .then(res => {
                setDadosAluno(res.data)
                navigate("/aluno")
            })
            .catch(err => console.log(err.response.data.message))
    }

    function entregar() {
        navigate("/entregar")
    }

    function cadastrar() {
        navigate("/signup")
    }

    function notas() {
        navigate("/notas")
    }

    function projetos(name_project) {
        setSelectProject(name_project)
    }

    return (
        <>
            <div className="sidebar">
                <nav>
                    <ul>
                        {context.turmasProjetos.turmas.map(t => (
                            <li><a onClick={() => turma(t.id)}>{`Turma ${t.id}`}</a></li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div>
                <nav>
                    <h1>{selectTurma ? `Estudantes da Turma ${selectTurma}` : ""}</h1>
                    <ul>
                        {alunos.map((a) => (
                            <div key={a.id} onClick={() => aluno(a.cpf)}>
                                <img src={a.foto} />
                                <h3>{a.name}</h3>
                            </div>
                        ))}
                    </ul>
                </nav>

                <button onClick={entregar}>Entregar Projeto</button>
                <button onClick={cadastrar}>Cadastrar Aluno</button>
                <button onClick={notas}>Ajustar Notas</button>
            </div>
        </>
    )
}