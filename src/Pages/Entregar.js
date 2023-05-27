import axios from "axios"
import { useEffect, useState } from "react"
import { URL_Base } from "../URL"
import { useNavigate } from "react-router-dom"

export function Entregar() {
    const [infos, setInfos] = useState({ turmas: [], alunos: [], projetos: [] })
    const [turmaSelect, setTurmaSelect] = useState()
    const [alunoSelect, setAlunoSelect] = useState()
    const [projetoSelect, setProjetoSelect] = useState()
    const [linkProject, setLinkProject] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${URL_Base}/entregar`)
            .then(res => {
                setInfos(res.data)
            })
            .catch(err => alert(err.response.data.message))
    }, [])

    function entregarProjeto(e) {
        e.preventDefault()
        const obj = { alunoSelect, turmaSelect, projetoSelect, linkProject }

        axios.post("/entregar", obj)
            .then(() => {
                alert("Projeto Enviado")
                navigate("/home")
            })
            .catch(() => alert("Projeto não enviado"))
    }

    console.log(alunoSelect)
    console.log(turmaSelect)
    console.log(projetoSelect)
    return (
        <div>
            <h1>Entrega de Projeto</h1>

            <form onSubmit={entregarProjeto}>
                <label for="turmas">Selecione sua turma:</label> <br />
                <select id="turmas" value={turmaSelect} onChange={e => setTurmaSelect(e.target.value)}>
                    <option value="" selected disabled>Selecionar...</option>
                    {infos.turmas.map(t => (
                        <option key={t.id} value={`${t.id}`}>{t.name_turma}</option>
                    ))}
                </select><br />

                <label for="nome">Selecione seu nome:</label> <br />
                <select id="nome" value={alunoSelect} onChange={e => setAlunoSelect(e.target.value)}>
                    <option value="" selected disabled>Selecionar...</option>
                    {infos.alunos.map(n => (
                        <option key={n.id} value={`${n.id}`}>{n.name}</option>
                    ))}
                </select><br />

                <label for="projeto">Selecione o projeto:</label> <br />
                <select id="projeto" selected={projetoSelect} onChange={e => setProjetoSelect(e.target.value)}>
                    <option value="" selected disabled>Selecionar...</option>
                    {infos.projetos.map(p => (
                        <option key={p.id} value={`${p.id}`}>{p.name_project}</option>
                    ))}
                </select><br />

                <label for="link">Link do projeto</label><br />
                <input type="text" id="link" value={linkProject} onChange={e => setLinkProject(e.target.value)} />
                <br />

                <button>Entregar</button>

            </form>
        </div>
    )
}