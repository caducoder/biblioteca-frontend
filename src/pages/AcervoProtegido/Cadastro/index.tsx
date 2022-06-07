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
    idioma: string,
    editora: string,
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
        idioma: '',
        editora: '',
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
                        <Field
                            component={TextField}
                            name='isbn'
                            type='text'
                            label='ISBN'
                            size='small'
                            value={values.isbn}
                            onChange={handleChange}
                        />
                        <Field 
                            component={TextField}
                            name='issn'
                            type='text'
                            label='ISSN'
                            size='small'
                            value={values.issn}
                            onChange={handleChange}
                        />
                        <Field 
                            component={TextField}
                            name='doi'
                            type='text'
                            label='DOI'
                            size='small'
                            value={values.doi}
                            onChange={handleChange}
                        />
                        <Field 
                            component={TextField}
                            name='autor'
                            type='text'
                            label='Autor'
                            size='small'
                            value={values.autor}
                            onChange={handleChange}
                        />
                        <Field 
                            component={TextField}
                            name='titulo'
                            type='text'
                            label='Título'
                            size='small'
                            value={values.titulo}
                            onChange={handleChange}
                        />
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
                        <Field 
                            component={TextField}
                            name='editora'
                            type='text'
                            label='Editora'
                            size='small'
                            value={values.editora}
                            onChange={handleChange}
                        />
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
                        <Botao type='submit'>Cadastrar</Botao>
                    </Form>
                )}
            </Formik>
        </section>
     );
}

export default FormCadastroDeLivros;