import './EdicaoLivro.scss'
import { TextField, Select } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import Botao from '../../../components/Botao';
import { useNavigate, useParams } from 'react-router';
import {LivroFormValues, CadastroLivroSchema} from '../Cadastro'
import { alterarLivro, buscarPorCodigo, ILivro } from '../../../api/LivroService';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next'

function FormEdicaoLivro() {
    const navigate = useNavigate()
    const [livro, setLivro] = useState<ILivro>();
    const { isbn: isbnLivro }: any = useParams()
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('');

    let initialValues: LivroFormValues = {
        id: undefined,
        isbn: '',
        issn: '',
        doi: '',
        autor: '',
        titulo: '',
        editora: '',
        idioma: '',
        descricao: '',
        numeroDePaginas: 0,
        anoEdicao: 0,
        estadoLivro: '',
    }

    const preencherForm = (livro: ILivro) => {
        initialValues.id = livro.id
        initialValues.isbn = livro.isbn || ''
        initialValues.issn = livro.issn || ''
        initialValues.doi = livro.doi || ''
        initialValues.autor = livro.autor || ''
        initialValues.titulo = livro.titulo || ''
        initialValues.editora = livro.editora || ''
        initialValues.idioma = livro.idioma || ''
        initialValues.descricao = livro.descricao|| ''
        initialValues.numeroDePaginas = livro.numeroDePaginas 
        initialValues.anoEdicao = livro.anoEdicao 
        initialValues.estadoLivro = livro.estadoLivro || ''
    }

    useEffect(() => {
        const getLivro = async () => {
            const livro = await buscarPorCodigo(isbnLivro)

            setLivro(livro)
            preencherForm(livro)
        }

        getLivro()
    }, []);

    // envia as alterações pro servidor
    const enviarDadosModificados = async (dados: any) => {
        try {
            let response = await alterarLivro(dados)
            setMsg('Livro alterado com sucesso!')
            setSuccess(true)

            setTimeout(() => {
                navigate('/acervo-gestao/consulta')
            }, 1500)
        } catch (error: any) {
            console.log(error?.response?.data)
        }
    }

    const { t } = useTranslation();
    return (
        <section className='edicaoLivroContainer'>
            {success && 
                <Alert severity="success">{msg}</Alert>
            }
            <h3> {t("edition.title")} </h3>
            <Formik
                validateOnBlur={false}
                initialValues={initialValues}
                onSubmit={enviarDadosModificados}
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
                                <MenuItem value={'PORTUGUES'}> {t("edition.portuguese")} </MenuItem>
                                <MenuItem value={'ESPANHOL'}> {t("edition.spanish")} </MenuItem>
                                <MenuItem value={'INGLES'}> {t("edition.english")} </MenuItem>
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
                        <div className='botoes'>
                            <Botao type='submit'>{t("edition.save")}</Botao>
                            <Botao onClick={() => navigate(-1)}>{t("edition.cancel")}</Botao>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormEdicaoLivro;