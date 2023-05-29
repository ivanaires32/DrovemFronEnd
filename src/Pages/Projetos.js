import { useContext, useEffect, useState } from "react"
import Context from "../Context/context"
import axios from "axios"
import { URL_Base } from "../URL"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

export function Projetos() {
    const [selectTurma, setSelectTurma] = useState(undefined)
    const [selectProject, setSelectProject] = useState({ idProject: "" })
    const [alunos, setAlunos] = useState([])
    const [id_entrega, setIdEntrega] = useState()
    const [display, setDisplay] = useState("none")
    const [nota, setNota] = useState()
    const context = useContext(Context)
    const navigate = useNavigate()

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
                .catch(err => console.log(err.response.data.message))
        }
    }, [selectProject, selectTurma])

    function turma(id_turma) {
        setSelectTurma(id_turma)
    }

    function projetos(name_project, id) {
        setSelectProject({ name_project: name_project, idProject: id })
    }

    function mudarNota(id_entrega) {
        setDisplay("flex")
        setIdEntrega(id_entrega)
    }

    function atualizar() {
        const obj = { id_entrega, nota }
        axios.post(`${URL_Base}/notas`, obj)
            .then(() => {
                alert("Nota Atualizada")
                setDisplay("none")
            })
            .catch(err => alert(err.response.data.message))
    }

    function back() {
        setDisplay("none")
    }

    function backHome() {
        navigate("/")
    }

    return (
        <>

            <Header>
                <h1>Drovem</h1>
                <a onClick={backHome}>voltar</a>
            </Header>

            <Overlay display={display}>
                <Atualizar>
                    <div>
                        <a onClick={back}>X</a>
                    </div>
                    <Form onSubmit={atualizar}>
                        <label htmlFor="notas">Atualizar nota para:</label>
                        <br />
                        <select id="notas" value={nota} onChange={e => setNota(e.target.value)}>
                            <option value="" selected disabled>Selecionar...</option>
                            <option value="Abaixo das Expectativas">Abaixo das Expectativas</option>
                            <option value="Dentro das Expectativas">Dentro das Expectativas</option>
                            <option value="Acima das Expectativas">Acima das Expectativas</option>
                        </select>
                        <button>Atualizar</button>
                    </Form>
                </Atualizar>
            </Overlay>

            <Sidebar>
                <nav>
                    <ul>
                        {context.turmasProjetos.turmas.map(t => (
                            <LiSidebar selec={selectTurma === t.id ? "#120a8f" : ""} key={t.id}><a onClick={() => turma(t.id)}>{`Turma ${t.id}`}</a></LiSidebar>
                        ))}
                    </ul>
                </nav>

                <nav>
                    <ul>
                        {context.turmasProjetos.projetos.map(p => (
                            <LiSidebar selec={selectProject.idProject === p.id ? "#120a8f" : ""} key={p.id}><a onClick={() => projetos(p.name_project, p.id)}>{`${p.name_project}`}</a></LiSidebar>
                        ))}
                    </ul>
                </nav>
            </Sidebar>

            <Alunos>
                <nav>
                    <h1>{selectTurma && selectProject.idProject !== "" ? `${selectProject.name_project} na Turma ${selectTurma}` : "Selecione a turma e o projeto"}</h1>
                    <ul>
                        {alunos.length > 0 ?
                            alunos.map(n => (
                                <Li key={n.id}>
                                    <div>
                                        <img src={n.foto} />
                                        <h3>{n.name}</h3>
                                    </div>
                                    <a onClick={() => mudarNota(n.id_entrega)}>{n.result}</a>
                                </Li>
                            ))
                            : "Nem um projeto entregue"}
                    </ul>
                </nav>
            </Alunos>
        </>
    )
}

const Header = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    width: 95.88%;
    background-color: #FFFFFF;
    height: 69px;
    border: 1px solid #000000;
    display: flex;
    padding: 0 2%;
    justify-content: space-between;
    align-items: center;
    h1{
        font-size: 30px;
        font-weight: 700;
    }
    a{
        font-size: 30px;
        font-weight: 700;
    }
`

const Form = styled.form`
    padding: 2%;
    select{
        margin-bottom: 100px;
    }
`

const LiSidebar = styled.li`
    cursor: pointer;
    color: ${props => props.selec};
    font-weight: ${props => props.selec === "#120a8f" ? "bold" : ""};
    text-decoration: ${props => props.selec === "#120a8f" ? "underline" : ""};
`

const Atualizar = styled.div`
    display: ${props => props.display};
    background-color: white;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 300px;
    border: 1px solid #000000;
    border-radius: 10px;
    form{
        display: flex;
        flex-direction: column;
        button{
            cursor: pointer;
        }
    }
    div{
        width: 100%;
        text-align: right;
        margin-top: 2%;
        a{
            margin-right: 2%;
        }
    }
`

const Overlay = styled.div`
    background-color: rgba(230, 230, 230, 0.8);
    position: absolute;
    display: ${props => props.display};
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const Sidebar = styled.div`
    background-color: #FFFFFF;
    width: 300px;
    height: calc(100% - 70px);
    margin-top: 70px;
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