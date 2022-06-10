import './CadastroLivro.scss'
import { TextField, Select } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import Botao from '../../../components/Botao';
import MenuItem from '@mui/material/MenuItem';
import { cadastrarLivro } from '../../../api/LivroService';

const CadastroLivroSchema = Yup.object().shape({
    isbn: Yup.string().min(10, 'Mínimo 10 caracteres').max(13, 'Máximo 13 caracteres').required('Obrigatório'),
    issn: Yup.string().nullable(),
    doi: Yup.string().optional().nullable(),
    autor: Yup.string().required('Obrigatório'),
    titulo: Yup.string().required('Obrigatório'),
    editora: Yup.string().nullable(),
    idioma: Yup.mixed().oneOf(['PORTUGUES', 'ESPANHOL', 'INGLES']).required('Obrigatório'),
    descricao: Yup.string().nullable(),
    numeroDePaginas: Yup.number().min(1, 'Deve ser um número positivo'),
    anoEdicao: Yup.number().min(1, 'Deve ser um número positivo').required('Obrigatório')
})

interface LivroFormValues {
    isbn: string,
    issn: string,
    doi: string | null,
    autor: string,
    titulo: string,
    editora: string | null,
    idioma: string,
    descricao: string | null,
    numeroDePaginas: number | undefined,
    anoEdicao: number | undefined,
    estadoLivro: string
}

function FormCadastroDeLivros() {
    let initialValues: LivroFormValues = {
        isbn: '',
        issn: '',
        doi: '',
        autor: '',
        titulo: '',
        editora: '',
        idioma: '',
        descricao: '',
        numeroDePaginas: undefined,
        anoEdicao: undefined,
        estadoLivro: 'DISPONIVEL'
    }

    const enviarDados = async (dados: any, {resetForm}: any) => {
        try {
            const response = await cadastrarLivro(dados)
            console.log(response)
            resetForm({})
        } catch (error: any) {
            console.log("ERRO: ", error?.response?.data)
        }
    }


    return (
        <section className='cadastroLivroContainer'>
            <h2>Cadastro de livros</h2>
            <Formik
                validateOnBlur={false}
                initialValues={initialValues}
                onSubmit={enviarDados}
                validationSchema={CadastroLivroSchema}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div className='campo1'>
                            <div className='campoISBN'> 
                                <Field
                                    component={TextField}
                                    name='isbn'
                                    type='text'
                                    label='ISBN'
                                    size='small'
                                    value={values.isbn}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='campoISSN'> 
                                <Field 
                                    component={TextField}
                                    name='issn'
                                    type='text'
                                    label='ISSN'
                                    size='small'
                                    value={values.issn}
                                    onChange={handleChange}
                                />
                            </div>
                            <Field 
                                component={TextField}
                                name='doi'
                                type='text'
                                label='DOI'
                                size='small'
                                value={values.doi}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='campo2'>
                            <div className='campoAutor'> 
                                <Field 
                                    component={TextField}
                                    name='autor'
                                    type='text'
                                    label='Autor'
                                    size='small'
                                    value={values.autor}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='campoTitulo'>
                                <Field 
                                    component={TextField}
                                    name='titulo'
                                    type='text'
                                    label='Título'
                                    size='small'
                                    value={values.titulo}
                                    onChange={handleChange}
                                />
                            </div>
                            <Field 
                                component={TextField}
                                name='numeroDePaginas'
                                type='number'
                                label='Páginas'
                                size='small'
                                value={values.numeroDePaginas}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='campo3'>
                            <div className='campoEditora'>
                                <Field 
                                    component={TextField}
                                    name='editora'
                                    type='text'
                                    label='Editora'
                                    size='small'
                                    value={values.editora}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='campoAno'>
                                <Field 
                                    component={TextField}
                                    name='anoEdicao'
                                    type='number'
                                    label='Ano'
                                    size='small'
                                    value={values.anoEdicao}
                                    onChange={handleChange}
                                />
                            </div>
                            <Field
                                component={Select}
                                id="idioma"
                                labelId="idioma"
                                name="idioma"
                                label="Idioma"
                                size='small'
                                sx={{width: 140}}
                            >
                                <MenuItem value={'PORTUGUES'}>Português</MenuItem>
                                <MenuItem value={'ESPANHOL'}>Espanhol</MenuItem>
                                <MenuItem value={'INGLES'}>Inglês</MenuItem>
                            </Field>
                        </div>
                        <div className='campoDescricao'> 
                            <Field 
                                component={TextField}
                                name='descricao'
                                type='text'
                                label='Descricao'
                                size='small'
                                multiline
                                rows={4}
                                value={values.descricao}
                                onChange={handleChange}
                                sx={{width: 650}}
                            />
                        </div>
                        <input type="hidden" name="estadoLivro" value={values.estadoLivro} />
                        <div className='botaoCadLivro'><Botao type='submit'>Cadastrar</Botao></div>
                    </Form>
                )}
            </Formik>
        </section>
     );
}

export default FormCadastroDeLivros;