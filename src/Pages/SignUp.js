import axios from "axios"
import { useState } from "react"
import { URL_Base } from "../URL"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [cpf, setCpf] = useState()
    const [foto, setFoto] = useState()
    const [turma, setTurma] = useState("T1")
    const navigate = useNavigate()

    function register(e) {
        e.preventDefault()
        const obj = { name, email, cpf, foto, turma }
        axios.post(`${URL_Base}/signup`, obj)
            .then(() => navigate("/home"))
            .catch(err => alert(err.response.data))
    }

    return (
        <form onSubmit={register}>
            <label for="nome">Nome:</label> <br />
            <input id="nome" value={name} onChange={e => setName(e.target.value)} required /><br />

            <label for="email">Email:</label> <br />
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /><br />

            <label for="cpf">Cpf:</label> <br />
            <input id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} required /><br />

            <label for="Foto">Foto:</label> <br />
            <input id="Foto" type="url" value={foto} onChange={e => setFoto(e.target.value)} required /><br />

            <label for="turma">Turma:</label>
            <select id="turma" value={turma} onChange={e => setTurma(e.target.value)}>
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
            </select><br />

            <button>Cadastrar</button>
        </form>
    )
}