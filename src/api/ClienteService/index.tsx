import api from '../axios'

export interface ICliente {
    id: number,
    nome: string;
    cpf: string;
    rg?: string,
    email: string;
    telefone: string;
    endereco?: {
        rua: string,
        numero: number,
        bairro: string,
        cidade: string,
        cep: string
    }
}

export const cadastrarCliente = (cliente: ICliente) => new Promise<string> (
    (resolve, reject) => {
        api.post('/clientes', cliente)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const listarClientes = () => new Promise<ICliente[]> (
    (resolve, reject) => {
        api.get('/clientes')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const buscarPorCpf = (cpf: string) => new Promise<ICliente> (
    (resolve, reject) => {
        api.get(`/clientes/${cpf}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const buscarPorId = (id: number) => new Promise<ICliente> (
    (resolve, reject) => {
        api.get(`/clientes/cl/${id}`)
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

export const alterarCliente = (cliente: ICliente) => new Promise<string> (
    (resolve, reject) => {
        api.put('/clientes', cliente)
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