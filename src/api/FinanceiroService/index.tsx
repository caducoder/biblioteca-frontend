import api from "../axios";

export const uploadForm = (form: FormData) => new Promise<string> (
    (resolve, reject) => {
        api.post('/financeiro/upload', form)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    }
)