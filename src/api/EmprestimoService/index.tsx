import api from "../axios";

export const realizarEmprestimo = (idCliente: number, codLivro: string) => new Promise<string> (
    (resolve, reject) => {
        api.get(`/emprestimo/${idCliente}/${codLivro}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const contarEmprestimos = () => new Promise<number> (
    (resolve, reject) => {
        api.get('/emprestimo/quantidade')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)