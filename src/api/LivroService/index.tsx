import api from "../axios";

export interface ILivro {
    id: number,
    isbn: string,
    issn: string,
    doi: string,
    autor: string,
    titulo: string,
    editora: string,
    idioma: string,
    descricao: string,
    numeroDePaginas: number,
    anoEdicao: number,
    estadoLivro: string
}

export const cadastrarLivro = (livro: ILivro) => new Promise<string> (
    (resolve, reject) => {
        api.post(`/livros`, livro)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const listarLivros = () => new Promise<ILivro[]> (
    (resolve, reject) => {
        api.get('/livros')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const buscarPorCodigo = (codLivro: string) => new Promise<ILivro> (
    (resolve, reject) => {
        api.get(`/livros/${codLivro}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const contarLivros = () => new Promise<number> (
    (resolve, reject) => {
        api.get('/livros/quantidade')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const contarReservas = () => new Promise<number> (
    (resolve, reject) => {
        api.get('/reservas/quantidade')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const reservarLivro = (idLivro: number, cpf: string) => new Promise<string> (
    (resolve, reject) => {
        api.get(`/livros/${idLivro}/${cpf}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const removerLivro = (idLivro: number)  => new Promise (
    (resolve, reject) => {
        api.delete(`/livros/${idLivro}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)