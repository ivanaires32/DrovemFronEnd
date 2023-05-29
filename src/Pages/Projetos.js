import { useContext, useEffect, useState } from "react"
import Context from "../Context/context"
import axios from "axios"
import { URL_Base } from "../URL"
import styled from "styled-components"

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

            <Sidebar>
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
            </Sidebar>

            <Alunos>
                <nav>
                    <h1>{selectTurma && selectProject ? `${selectProject.name_project} na Turma ${selectTurma}` : "Selecione a turma e o projeto"}</h1>
                    <ul>
                        {alunos.length > 0 ?
                            alunos.map(n => (
                                <Li key={n.id}>
                                    <div>
                                        <img src={n.foto} />
                                        <h3>{n.name}</h3>
                                    </div>
                                    <a onClick={mudarNota}>{n.result}</a>
                                </Li>
                            ))
                            : "Nem um projeto entregue"}
                    </ul>
                </nav>
            </Alunos>
        </>
    )
}

const Sidebar = styled.div`
    background-color: #FFFFFF;
    width: 300px;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    border: 1px solid #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    nav{
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        ul{
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
        }
    }
`

const Alunos = styled.div`
    margin-left: 300px;
    width: calc(100% - 300px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 100px;
    nav{
        width: 100%;
    }
    h1{
        font-size: 30px;
        font-weight: bold;
    }
    ul {
        display: flex;
        align-items: center;
        margin-top: 10px;
        background-color: #FFFFFF;
        margin: 25px 2%;
        width: 90%;
        height: 70px;
        display: flex;
        align-items: center;
        padding-left: 2%;
        border-radius: 10px;
        border: 1px solid #000000;
        img{
            width: 50px;
            height: 50px;
            border-radius: 25px;
        }
        h3{
            font-size: 20px;
            text-transform: uppercase;
            font-weight: 400;
            }    
        }
    
`

const Li = styled.li`
    color: ${props => props.selec};
    font-weight: ${props => props.selec === "#120a8f" ? "bold" : ""};
    text-decoration: ${props => props.selec === "#120a8f" ? "underline" : ""};
    display: flex;
    width: 100%;
    padding: 0 2%;
    justify-content: space-between;
    align-items: center;
    div{
        display: flex;
    }
`