import api from "../axios";
import { ICliente } from "../ClienteService";
import { ILivro } from "../LivroService";

export interface IEmprestimo {
    id: number,
    nomeCliente: string,
    emprestadoEm: string,
    dataDevolucao: string,
    livro: ILivro,
    cliente: ICliente
}

export const realizarEmprestimo = (idCliente: number, codLivro: string) => new Promise<string> (
    (resolve, reject) => {
        api.get(`/emprestimo/${idCliente}/${codLivro}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const renovarEmprestimo = (codLivro: string) => new Promise<IEmprestimo> (
    (resolve, reject) => {
        api.get(`/emprestimo/renovar/${codLivro}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const realizarDevolucao = (codLivro: string) => new Promise<string> (
    (resolve, reject) => {
        api.get(`/emprestimo/devolucao/${codLivro}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)


export const getEmprestimo = (codLivro: string) => new Promise<IEmprestimo> (
    (resolve, reject) => {
        api.get(`/emprestimo/${codLivro}`)
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