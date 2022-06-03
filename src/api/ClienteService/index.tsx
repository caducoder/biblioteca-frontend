import api from '../axios'

export interface Cliente {
    id: number,
    nome: string;
    sobrenome: string;
    cpf: number;
    email: string;
    telefone: string;
}

export const listarClientes = () => new Promise<Cliente[]> (
    (resolve, reject) => {
        api.get('/clientes')
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

export const deletarCliente = () => new Promise<string> (
    (resolve, reject) => {
        api.delete(`/clientes/id`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)