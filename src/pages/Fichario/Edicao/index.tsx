import './EdicaoCliente.scss'
import { TextField } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import Botao from '../../../components/Botao';
import { useNavigate, useParams } from 'react-router';
import {ClienteFormValues, CadastroClienteSchema} from '../Cadastro'
import { alterarCliente, buscarPorId, ICliente } from '../../../api/ClienteService';
import { useState, useEffect } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import { useTranslation } from 'react-i18next'

function FormEdicaoCliente() {
    const navigate = useNavigate()
    const [cliente, setCliente] = useState<ICliente>();
    const { id: idCliente }: any = useParams()
    const [feedback, setFeedback] = useState(false);
    const [msg, setMsg] = useState({resp: '', severity: ''})

    let initialValues: ClienteFormValues = {
        id: undefined,
        nome: '',
        cpf: '',
        rg: '',
        email: '',
        telefone: '',
        endereco: {
            rua: '',
            bairro: '',
            numero: 0,
            cidade: '',
            cep: ''
        }
    }

    const preencherForm = (cliente: ICliente) => {
        initialValues.id = cliente.id
        initialValues.nome = cliente.nome || ''
        initialValues.cpf = cliente.cpf || ''
        initialValues.rg = cliente.rg || ''
        initialValues.email = cliente.email || ''
        initialValues.telefone = cliente.telefone || ''
        initialValues.endereco.rua = cliente.endereco?.rua || ''
        initialValues.endereco.bairro = cliente.endereco?.bairro || ''
        initialValues.endereco.cidade = cliente.endereco?.cidade || ''
        initialValues.endereco.numero = cliente.endereco?.numero || 0
        initialValues.endereco.cep = cliente.endereco?.cep || ''
    }

    // busca dados do cliente pelo id para preencher o formulário de edição
    useEffect(() => {
        const getCliente = async () => {
            const cliente = await buscarPorId(idCliente)

            setCliente(cliente)
            preencherForm(cliente)
        }

        getCliente()
    }, []);

    

    const enviarDadosModificados = async (dados: any) => {
        try {
            const response = await alterarCliente(dados)
            setMsg({resp: response, severity: 'success'})
            setFeedback(true)

            // navega para o fichário após 2 segundos
            setTimeout(() => {
                navigate('/fichario')
            }, 2000)
        } catch (error: any) {
            setMsg({resp: error?.response?.data, severity: 'error'})
            setFeedback(true)
        }
    }

    const { t } = useTranslation();
    return (
        <section className='edicaoClienteContainer'>
            {feedback && 
                <Alert severity={msg.severity as AlertColor}>{msg.resp}</Alert>
            }
            <h3> {t("clientEdition.title")} </h3>
            <Formik
                validateOnBlur={false}
                initialValues={initialValues}
                onSubmit={enviarDadosModificados}
                validationSchema={CadastroClienteSchema}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div className='padd-15-flex'>
                            <div className='margin-r-45'> 
                                <Field 
                                    component={TextField}
                                    name='nome'
                                    type='text'
                                    label={t("clientEdition.name")}
                                    size='small'
                                    value={values.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='margin-r-45'> 
                                <Field 
                                    component={TextField}
                                    name='cpf'
                                    type='text'
                                    label='CPF'
                                    size='small'
                                    value={values.cpf}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Field 
                                component={TextField}
                                name='rg'
                                type='text'
                                label='RG'
                                size='small'
                                value={values.rg}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='padd-15-flex'>
                            <div className='margin-r-45'> 
                                <Field 
                                    component={TextField}
                                    name='email'
                                    type='text'
                                    label='Email'
                                    size='small'
                                    value={values.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Field 
                                component={TextField}
                                name='telefone'
                                type='text'
                                label={t("clientEdition.cellPhone")}
                                size='small'
                                value={values.telefone}
                                onChange={handleChange}
                            />
                        </div>
                        <fieldset>
                            <legend> {t("clientEdition.address")} </legend>
                            <div className='padd-15-flex'>
                                <div className='margin-r-45'> 
                                    <Field 
                                        component={TextField}
                                        name='endereco.rua'
                                        type='text'
                                        label={t("clientEdition.street")}
                                        size='small'
                                        value={values.endereco.rua}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='margin-r-45'> 
                                    <Field 
                                        component={TextField}
                                        name='endereco.numero'
                                        type='number'
                                        label={t("clientEdition.number")}
                                        size='small'
                                        value={values.endereco.numero}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Field 
                                    component={TextField}
                                    name='endereco.bairro'
                                    type='text'
                                    label={t("clientEdition.neighborhood")}
                                    size='small'
                                    value={values.endereco.bairro}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='padd-15-flex'>
                                <div className='margin-r-45'> 
                                    <Field 
                                        component={TextField}
                                        name='endereco.cidade'
                                        type='text'
                                        label={t("clientEdition.city")}
                                        size='small'
                                        value={values.endereco.cidade}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Field 
                                    component={TextField}
                                    name='endereco.cep'
                                    type='text'
                                    label='CEP'
                                    size='small'
                                    value={values.endereco.cep}
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                        
                        <div className='botoes'>
                            <Botao type='submit'>{t("clientEdition.save")}</Botao>
                            <Botao onClick={() => navigate(-1)}>{t("clientEdition.cancel")}</Botao>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormEdicaoCliente;