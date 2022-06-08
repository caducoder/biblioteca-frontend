import api from '../axios'

export interface ICliente {
    id: number,
    nome: string;
    sobrenome: string;
    cpf: number;
    email: string;
    telefone: string;
}

export const listarClientes = () => new Promise<ICliente[]> (
    (resolve, reject) => {
        api.get('/clientes')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const buscarPorCpf = (cpf: string) => new Promise<any> (
    (resolve, reject) => {
        api.get(`/clientes/${cpf}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const contarClientes = () => new Promise<number> (
    (resolve, reject) => {
        api.get('/clientes/quantidade')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const deletarCliente = (id: number) => new Promise (
    (resolve, reject) => {
        api.delete(`/clientes/${id}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)