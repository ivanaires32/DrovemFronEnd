import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function Aluno({ dadosAluno }) {
    const navigate = useNavigate()

    function backHome() {
        navigate("/")
    }
    return (
        <>
            <Header>
                <h1>Drovem</h1>
                <a onClick={backHome}>voltar</a>
            </Header>

            <Dados>
                <h1>Registro de Estudante</h1>
                <img src={dadosAluno.foto} />
                <div>
                    <p>{`Nome Completo: ${dadosAluno.name}`}</p>
                    <p>{`CPF: ${dadosAluno.cpf}`}</p>
                    <p>{`Email: ${dadosAluno.email}`}</p>
                    <p>{`Turmas:`}</p>
                    {dadosAluno.transicoes.map((t) => (
                        <Turmas>
                            <h3>{t.name_turma}</h3>
                            <div>
                                <p>{`Data de ingresso: ${dayjs(t.entrada).format("DD/MM/YYYY")}`}</p>
                                <p>{`Data de saída: ${t.saida === null ? "-" : dayjs(t.saida).format("DD/MM/YYYY")}`}</p>
                            </div>
                        </Turmas>
                    ))}
                </div>
            </Dados>
        </>
    )
}

const Turmas = styled.div`
    background-color: #FFFFFF;
    height: 90px;
    padding-left: 2%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px;
    border: 1px solid #000000;
`

const Dados = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    img{
        width: 200px;
        height: 200px;
        border-radius: 100px;
        margin: 0 auto 15px auto;
    }
    h1{
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: center;
    }
    p{
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 10px;
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