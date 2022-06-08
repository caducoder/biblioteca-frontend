import './CadastroLivro.scss'
import { TextField, Select } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import Botao from '../../../components/Botao';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const CadastroLivroSchema = Yup.object().shape({
    isbn: Yup.string(),
    issn: Yup.string(),
    doi: Yup.string(),
})

interface LivroFormValues {
    isbn: string,
    issn: string,
    doi: string,
    autor: string,
    titulo: string,
    editora: string,
    idioma: string,
    descricao: string,
    numeroDePaginas: number | null,
    anoEdicao: number | null
}

function FormCadastroDeLivros() {
    const initialValues: LivroFormValues = {
        isbn: '',
        issn: '',
        doi: '',
        autor: '',
        titulo: '',
        editora: '',
        idioma: '',
        descricao: '',
        numeroDePaginas: null,
        anoEdicao: null
    }

    const enviarDados = (dados: LivroFormValues) => {
        console.log(dados)
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
                                    type='text'
                                    label='Ano'
                                    size='small'
                                    value={values.anoEdicao}
                                    onChange={handleChange}
                                />
                            </div>
                            <Field
                                component={Select}
                                // formHelperText={{ children: 'Test' }}
                                id="idioma"
                                labelId="idioma"
                                name="idioma"
                                label="Idioma"
                                size='small'
                                sx={{width: 140}}
                            >
                                <MenuItem value={'PORTUGUES'}>Português</MenuItem>
                                <MenuItem value={'ESPANHOL'}>Espanhol</MenuItem>
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
                                maxRows={5}
                                value={values.descricao}
                                onChange={handleChange}
                                sx={{width: 500}}
                            />
                        </div>
                        <div className='botaoCadLivro'><Botao type='submit'>Cadastrar</Botao></div>
                    </Form>
                )}
            </Formik>
        </section>
     );
}

export default FormCadastroDeLivros;