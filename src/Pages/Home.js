import axios from "axios"
import { useEffect, useState } from "react"
import { URL_Base } from "../URL"
import { useNavigate } from "react-router-dom"

export function Home({ setDadosAluno }) {
    const [idTurma, setIdTurma] = useState(1)
    const [alunos, setAlunos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${URL_Base}/turmas/${idTurma}`)
            .then(res => setAlunos(res.data))
            .catch(err => console.log(err.response.data.message))
    }, [idTurma])

    function aluno(cpf_aluno) {
        axios.get(`${URL_Base}/turmas/${idTurma}/${cpf_aluno}`)
            .then(res => {
                setDadosAluno(res.data)
                navigate("/aluno")
            })
            .catch(err => console.log(err.response.data.message))
    }

    function entregar() {
        navigate("/entregar")
    }

    return (
        <>
            <div className="sidebar">
                <nav>
                    <ul>
                        <li><a onClick={() => setIdTurma(1)}>Turma 1</a></li>
                        <li><a onClick={() => setIdTurma(2)}>Turma 2</a></li>
                        <li><a onClick={() => setIdTurma(3)}>Turma 3</a></li>
                        <li><a onClick={() => setIdTurma(4)}>Turma 4</a></li>
                    </ul>
                </nav>
            </div>

            <div>
                <nav>
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
            </div>
        </>
    )
}