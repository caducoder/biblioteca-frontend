import api from "../axios";

interface Livro {
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

export const listarLivros = () => new Promise<Livro[]> (
    (resolve, reject) => {
        api.get('/livros')
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