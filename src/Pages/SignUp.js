import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { URL_Base } from "../URL"
import { useNavigate } from "react-router-dom"
import Context from "../Context/context"

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
            .then(() => navigate("/home"))
            .catch(err => alert(err.response.data.message))
    }

    console.log(turma)

    return (
        <form onSubmit={register}>
            <label htmlFor="nome">Nome:</label> <br />
            <input id="nome" value={name} onChange={e => setName(e.target.value)} required /><br />

            <label htmlFor="email">Email:</label> <br />
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /><br />

            <label htmlFor="cpf">Cpf:</label> <br />
            <input id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} required /><br />

            <label htmlFor="Foto">Foto:</label> <br />
            <input id="Foto" type="url" value={foto} onChange={e => setFoto(e.target.value)} required /><br />

            <label htmlFor="turma">Turma:</label>
            <select id="turma" value={turma} onChange={e => setTurma(e.target.value)}>
                <option value="" selected disabled>Selecionar...</option>
                {context.turmasProjetos.turmas.map(t => (
                    <option key={t.id} value={`${t.id}`}>{t.name_turma}</option>
                ))}
            </select><br />

            <button>Cadastrar</button>
        </form>
    )
}