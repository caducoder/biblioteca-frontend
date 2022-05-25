import api from '../axios'

export const contarClientes = () => new Promise<number> (
    (resolve, reject) => {
        api.get('/clientes/quantidade')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)