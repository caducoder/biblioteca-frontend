import api from '../axios'

export interface IRelatorio {
    id: number,
    idUsuario: number | null,
    idCliente: number | null,
    idLivro: number | null,
    tipoMovimentacao: string,
    dataHora: string
}

export const getRelatorio = (tipo: string) => new Promise<IRelatorio[]> (
    (resolve, reject) => {
        api.get(`/relatorios/${tipo}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)