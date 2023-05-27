import dayjs from "dayjs";

export function Aluno({ dadosAluno }) {

    return (
        <>
            <div>
                <h1>Registro de Estudante</h1>
                <img />
                <p>{`Nome: ${dadosAluno.name}`}</p>
                <p>{`CPF: ${dadosAluno.cpf}`}</p>
                <p>{`Email: ${dadosAluno.email}`}</p>
                <p>{`Turma:`}</p>
                {dadosAluno.transicoes.map((t) => (
                    <div>
                        <h3>{t.name_turma}</h3>
                        <p>{`Data de ingresso: ${dayjs(t.entrada).format("DD/MM/YYYY")}`}</p>
                        <p>{`Data de saída: ${t.saida === null ? "-" : dayjs(t.saida).format("DD/MM/YYYY")}`}</p>
                    </div>
                ))}
            </div>
        </>
    )
}