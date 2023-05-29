import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { URL_Base } from "../URL"
import { useNavigate } from "react-router-dom"
import Context from "../Context/context"
import styled from "styled-components"

export default function SignUp() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [cpf, setCpf] = useState()
    const [foto, setFoto] = useState()
    const [turma, setTurma] = useState()
    const context = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${URL_Base}/turmas`)
            .then(res => context.setTurmasProjetos(res.data))
            .catch(err => console.log(err.response.data))
    }, [])

    function register(e) {
        e.preventDefault()
        const obj = { name, email, cpf, foto, turma }
        axios.post(`${URL_Base}/signup`, obj)
            .then(() => {
                alert("Aluno cadastrado com sucesso")
                navigate("/")
            })
            .catch(err => alert(err.response.data))
    }

    function backHome() {
        navigate("/")
    }

    console.log(turma)

    return (
        <>
            <Header>
                <h1>Drovem</h1>
                <a onClick={backHome}>voltar</a>
            </Header>
            <Container>
                <Form onSubmit={register}>
                    <h1>Digite os dados do aluno</h1>
                    <label htmlFor="nome">Nome:</label> <br />
                    <Input id="nome" value={name} onChange={e => setName(e.target.value)} required />

                    <label htmlFor="email">Email:</label> <br />
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

                    <label htmlFor="cpf">Cpf:</label> <br />
                    <Input id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} required />

                    <label htmlFor="Foto">Foto:</label> <br />
                    <Input id="Foto" type="url" value={foto} onChange={e => setFoto(e.target.value)} required />

                    <label htmlFor="turma">Turma:</label>
                    <select id="turma" value={turma} onChange={e => setTurma(e.target.value)}>
                        <option value="" selected disabled>Selecionar...</option>
                        {context.turmasProjetos.turmas.map(t => (
                            <option key={t.id} value={`${t.id}`}>{t.name_turma}</option>
                        ))}
                    </select>

                    <button>Cadastrar</button>
                </Form>
            </Container>
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

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
    background-color: #4b83b8;
    border-radius: 5px;
    padding: 2%;
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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
`
const Input = styled.input`
    height: 35px;
    border-radius: 10px;
    border: 0;
    outline: 0;
    padding-left: 2%;
    margin-bottom: 10px;
`