import api from '../axios'

export interface IFuncionario {
    id: number,
    nome: string,
    cpf: string,
    rg?: string,
    email: string,
    telefone: string,
    tipo?: string,
    senha: string,
    salario?: string,
    endereco: {
        rua: string,
        numero: number,
        bairro: string,
        cidade: string,
        cep: string
    }
}

export const cadastrarFuncionario = (funcionario: IFuncionario, isAdmin: boolean) => new Promise<string> (
    (resolve, reject) => {
        api.post(`/${isAdmin ? 'admin' : 'bibliotecarios'}`, funcionario)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const listarFuncionarios = () => new Promise<any[]> (
    (resolve, reject) => {
        api.get('/funcionarios')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const buscarPorCpf = (cpf: string) => new Promise<any> (
    (resolve, reject) => {
        api.get(`/funcionarios/${cpf}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const alterarFuncionario = (funcionario: IFuncionario) => new Promise<string> (
    (resolve, reject) => {
        api.put('/funcionarios', funcionario)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const alterarSenha = (id: number, newPass: string) => new Promise<string> (
    (resolve, reject) => {
        api.post(`/funcionarios/${id}`, newPass, {
            headers: {
                'Content-Length': 0,
                'Content-Type': 'text/plain'
            },
           responseType: 'text'
        })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const deletarFuncionario = (id: number) => new Promise (
    (resolve, reject) => {
        api.delete(`/funcionarios/${id}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)