import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { URL_Base } from "../URL"
import { useNavigate } from "react-router-dom"
import Context from "../Context/context"
import styled from "styled-components"

export function Entregar() {
    const [infos, setInfos] = useState({ turmas: [], alunos: [], projetos: [] })
    const [turmaSelect, setTurmaSelect] = useState()
    const [alunoSelect, setAlunoSelect] = useState()
    const [projetoSelect, setProjetoSelect] = useState()
    const [linkProject, setLinkProject] = useState()
    const context = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${URL_Base}/entregar`)
            .then(res => {
                setInfos(res.data)
            })
            .catch(err => alert(err.response.data.message))

        axios.get(`${URL_Base}/turmas`)
            .then(res => context.setTurmasProjetos(res.data))
            .catch(err => console.log(err.response.data))
    }, [])


    function entregarProjeto(e) {
        e.preventDefault()
        const obj = { alunoSelect, turmaSelect, projetoSelect, linkProject }

        axios.post(`${URL_Base}/entregar`, obj)
            .then(() => {
                alert("Projeto Enviado")
                navigate("/")
            })
            .catch(err => alert(err.response.data))
    }

    function backHome() {
        navigate("/")
    }

    return (
        <Container>
            <Header>
                <h1>Drovem</h1>
                <a onClick={backHome}>voltar</a>
            </Header>

            <Projeto>

                <h1>Entrega de Projeto</h1>

                <Form onSubmit={entregarProjeto}>
                    <label for="turmas">Selecione sua turma:</label> <br />
                    <select id="turmas" value={turmaSelect} onChange={e => setTurmaSelect(e.target.value)}>
                        <option value="" selected disabled>Selecionar...</option>
                        {context.turmasProjetos.turmas.map(t => (
                            <option key={t.id} value={`${t.id}`}>{t.name_turma}</option>
                        ))}
                    </select>

                    <label for="nome">Selecione seu nome:</label> <br />
                    <select id="nome" value={alunoSelect} onChange={e => setAlunoSelect(e.target.value)}>
                        <option value="" selected disabled>Selecionar...</option>
                        {infos.alunos.map(n => (
                            <option key={n.id} value={`${n.id}`}>{n.name}</option>
                        ))}
                    </select>

                    <label for="projeto">Selecione o projeto:</label> <br />
                    <select id="projeto" selected={projetoSelect} onChange={e => setProjetoSelect(e.target.value)}>
                        <option value="" selected disabled>Selecionar...</option>
                        {infos.projetos.map(p => (
                            <option key={p.id} value={`${p.id}`}>{p.name_project}</option>
                        ))}
                    </select>

                    <label for="link">Link do projeto</label><br />
                    <input type="text" id="link" value={linkProject} onChange={e => setLinkProject(e.target.value)} />
                    <br />

                    <button>Entregar</button>

                </Form>
            </Projeto>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Projeto = styled.div`
    margin: 0 auto;
    h1{
        margin-top: 150px;
        font-size: 30px;
        font-weight: bold;
    }
`

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
    background-color: #4b83b8;
    border-radius: 5px;
    padding: 2%;
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    h1{
        text-align: center;
        font-size: 25px;
        font-weight:400;
        margin-bottom: 10px;
    }

    select{
        height: 35px;
        border-radius: 10px;
        padding-left: 2%;
        font-size: 20px;
        margin: 10px 0 40px 0;
        border: 0;
        outline: 0;
    }
    button{
        height: 50px;
        border-radius: 10px;
        border: 0;
        font-size: 22px;
    }
    input{
        height: 35px;
        border-radius: 10px;
        border: 0;
        outline: 0;
        padding-left: 2%;
    }
`
