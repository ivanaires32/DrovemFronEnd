import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { URL_Base } from "../URL"
import { useNavigate } from "react-router-dom"
import Context from "../Context/context"
import styled from "styled-components"

export function Home({ setDadosAluno }) {
    const [selectTurma, setSelectTurma] = useState()
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
            .catch(err => alert(err.response.data.message))
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

    return (
        <Container>
            <Sidebar>
                <nav>
                    <ul>
                        {context.turmasProjetos.turmas.map(t => (
                            <Li selec={selectTurma === t.id ? "#120a8f" : ""}><a onClick={() => turma(t.id)}>{`Turma ${t.id}`}</a></Li>
                        ))}
                    </ul>
                </nav>

                <Buttons>
                    <button onClick={entregar}>Entregar Projeto</button>
                    <button onClick={cadastrar}>Cadastrar Aluno</button>
                    <button onClick={notas}>Ajustar Notas</button>
                </Buttons>
            </Sidebar>


            <Alunos>
                <nav>
                    <h1>{selectTurma ? `Estudantes da Turma ${selectTurma}` : "Selecione a Turma"}</h1>
                    <ul>
                        {alunos.map((a) => (
                            <div key={a.id} onClick={() => aluno(a.cpf)}>
                                <img src="https://revistacipa.com.br/wp-content/uploads/2021/04/logo-social.png" />
                                <h3>{a.name}</h3>
                            </div>
                        ))}
                    </ul>
                </nav>
            </Alunos>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
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
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        div{
            background-color: #FFFFFF;
            margin: 10px 0;
            width: 90%;
            height: 70px;
            display: flex;
            align-items: center;
            padding-left: 2%;
            border-radius: 10px;
            border: 1px solid #000000;
            cursor: pointer;
            img{
                width: 50px;
                height: 50px;
                border-radius: 25px;
                margin-right: 2%;
            }
            h3{
                font-size: 20px;
                text-transform: uppercase;
                font-weight: 400;
            }
            }
        }
    
`

const Sidebar = styled.div`
    background-color: #FFFFFF;
    width: 300px;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
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

const Buttons = styled.div`
        display: flex;
        width: 100%;
        margin-bottom: 30px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button{
            width: 95%;
            height: 50px;
            margin-top: 7px;
            cursor: pointer;
            background-color: #4882f7;
            border: 0;
        }
`

const Li = styled.li`
    cursor: pointer;
    color: ${props => props.selec};
    font-weight: ${props => props.selec === "#120a8f" ? "bold" : ""};
    text-decoration: ${props => props.selec === "#120a8f" ? "underline" : ""};
`