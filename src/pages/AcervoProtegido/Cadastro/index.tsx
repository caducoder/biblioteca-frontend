import './CadastroLivro.scss'
import { TextField, Select } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import Botao from '../../../components/Botao';
import MenuItem from '@mui/material/MenuItem';
import { cadastrarLivro } from '../../../api/LivroService';
import { useState } from 'react';
import { Alert, AlertColor } from '@mui/material';
import { useTranslation } from 'react-i18next'

// esquema de validação do cadastro do livro
export const CadastroLivroSchema = Yup.object().shape({
    isbn: Yup.string().when('issn', {
        is: ((issn: string) => !issn || issn == ''),
        then: Yup.string()
            .min(10, 'Mínimo 10 caracteres').max(13, 'Máximo 13 caracteres').required('Pelo menos um é obrigatório.')
    }),
    issn: Yup.string().when('isbn', {
        is: ((isbn: string) => !isbn || isbn == ''),
        then: Yup.string()
            .required('Pelo menos um é obrigatório.')
    }),
    doi: Yup.string().optional().nullable(),
    autor: Yup.string().required('Obrigatório'),
    titulo: Yup.string().required('Obrigatório'),
    editora: Yup.string().nullable(),
    idioma: Yup.mixed().oneOf(['PORTUGUES', 'ESPANHOL', 'INGLES']).required('Obrigatório'),
    descricao: Yup.string().nullable(),
    numeroDePaginas: Yup.number().min(1, 'Deve ser um número positivo'),
    anoEdicao: Yup.number().min(1, 'Deve ser um número positivo').required('Obrigatório')
}, [['isbn', 'issn']])

export interface LivroFormValues {
    id?: number,
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
    const [feedback, setFeedback] = useState(false);
    const [msg, setMsg] = useState({ resp: '', severity: '' });
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

    // função que envia os dados do livro para o servidor
    const enviarDados = async (dados: any, { resetForm }: any) => {
        try {
            const response = await cadastrarLivro(dados)
            setMsg({ resp: response, severity: 'success' })
            setFeedback(true)
            resetForm({})
        } catch (error: any) {
            setMsg({ resp: error?.response?.data, severity: 'error' })
            setFeedback(true)
        }
    }

    const { t } = useTranslation();
    return (
        <section className='cadastroLivroContainer'>
            <h2> {t("registration.registration")} </h2>
            {feedback && <Alert severity={msg.severity as AlertColor}>{msg.resp}</Alert>}
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
                    <Form noValidate onSubmit={handleSubmit} onChange={() => setFeedback(false)} className='form'>
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
                                    label={t("registration.author")}
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
                                    label={t("registration.title")}
                                    size='small'
                                    value={values.titulo}
                                    onChange={handleChange}
                                />
                            </div>
                            <Field
                                component={TextField}
                                name='numeroDePaginas'
                                type='number'
                                label={t("registration.number")}
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
                                    label={t("registration.company")}
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
                                    label={t("registration.year")}
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
                                label={t("registration.language")}
                                size='small'
                                sx={{ width: 200 }}
                            >
                                <MenuItem value={'PORTUGUES'}> {t("registration.portuguese")} </MenuItem>
                                <MenuItem value={'ESPANHOL'}> {t("registration.spanish")} </MenuItem>
                                <MenuItem value={'INGLES'}> {t("registration.english")} </MenuItem>
                            </Field>
                        </div>
                        <div className='campoDescricao'>
                            <Field
                                component={TextField}
                                name='descricao'
                                type='text'
                                label={t("registration.description")}
                                size='small'
                                multiline
                                rows={4}
                                value={values.descricao}
                                onChange={handleChange}
                                sx={{ width: 650 }}
                            />
                        </div>
                        <input type="hidden" name="estadoLivro" value={values.estadoLivro} />
                        <div className='botaoCadLivro'><Botao type='submit'>{t("registration.register")}</Botao></div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormCadastroDeLivros;