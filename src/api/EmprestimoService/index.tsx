import api from "../axios";

export const contarEmprestimos = () => new Promise<number> (
    (resolve, reject) => {
        api.get('/emprestimo/quantidade')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)