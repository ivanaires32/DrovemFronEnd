import { useContext, useEffect, useState } from "react"
import Context from "../Context/context"
import axios from "axios"
import { URL_Base } from "../URL"

export function Projetos() {
    const [selectTurma, setSelectTurma] = useState()
    const [selectProject, setSelectProject] = useState()
    const [alunos, setAlunos] = useState([])
    const [notas, setNotas] = useState()
    const context = useContext(Context)

    useEffect(() => {
        axios.get(`${URL_Base}/turmas`)
            .then(res => context.setTurmasProjetos(res.data))
            .catch(err => console.log(err.response.data))
    }, [])

    useEffect(() => {
        if (selectProject && selectTurma) {
            const obj = { id_project: selectProject.idProject, id_turma: selectTurma }
            axios.post(`${URL_Base}/projetos`, obj)
                .then(res => setAlunos(res.data))
                .catch(err => alert(err.response.data.message))
        }
    }, [selectProject, selectTurma])

    function turma(id_turma) {
        setSelectTurma(id_turma)
    }

    function projetos(name_project, id) {
        setSelectProject({ name_project: name_project, idProject: id })
    }

    function mudarNota() {

    }

    return (
        <>

            <div className="overlay">
                <from className="modal-confirm">
                    <label htmlFor="notas">Atualizar nota para:</label> <br />
                    <select id="notas" value={notas} onChange={e => setNotas(e.target.value)}>
                        <option value="" selected disabled>Selecionar...</option>
                        <option value="Abaixo das Expectativas">Abaixo das Expectativas</option>
                        <option value="Dentro das Expectativas">Dentro das Expectativas</option>
                        <option value="Acima das Expectativas">Acima das Expectativas</option>
                    </select>
                    <button>Atualizar</button>
                </from>
            </div>

            <div className="sidebar">
                <nav>
                    <ul>
                        {context.turmasProjetos.turmas.map(t => (
                            <li key={t.id}><a onClick={() => turma(t.id)}>{`Turma ${t.id}`}</a></li>
                        ))}
                    </ul>
                </nav>

                <nav>
                    <ul>
                        {context.turmasProjetos.projetos.map(p => (
                            <li key={p.id}><a onClick={() => projetos(p.name_project, p.id)}>{`${p.name_project}`}</a></li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div>
                <nav>
                    <h1>{selectTurma && selectProject ? `${selectProject.name_project} na Turma ${selectTurma}` : "Selecione a turma e o projeto"}</h1>
                    <ul>
                        {alunos.length > 0 ?
                            alunos.map(n => (
                                <li key={n.id}>
                                    <div>
                                        <img src={n.foto} />
                                        <h3>{n.name}</h3>
                                    </div>
                                    <a onClick={mudarNota}>{n.result}</a>
                                </li>
                            ))
                            : "Nem um projeto entregue"}
                    </ul>
                </nav>
            </div>
        </>
    )
}