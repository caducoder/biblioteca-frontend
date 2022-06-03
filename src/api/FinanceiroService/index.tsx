import api from "../axios";

export interface Finance {
    id: number,
    fileName: string,
    tipoOperacao: string,
    assunto: string,
    valor: number,
    data: string
}

export const uploadForm = (form: FormData) => new Promise<string> (
    (resolve, reject) => {
        api.post('/financeiro/upload', form)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const listarFinancas = () => new Promise<Finance[]> (
    (resolve, reject) => {
        api.get('/financeiro')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)

export const buscarPdf = (id: number) => new Promise<ArrayBuffer> (
    (resolve, reject) => {
        api.get(`/financeiro/download/${id}`, { responseType: 'arraybuffer' })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)