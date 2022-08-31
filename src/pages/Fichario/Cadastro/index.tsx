import { TextField } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import Botao from '../../../components/Botao';
import * as Yup from 'yup'
import './CadastroCliente.scss'
import { cadastrarCliente } from '../../../api/ClienteService';
import { useState } from 'react';
import { Alert, AlertColor, Card } from '@mui/material';
import { useTranslation } from 'react-i18next'

// esquema de validação do cadastro de clientes
export const CadastroClienteSchema = Yup.object().shape({
    nome: Yup.string().min(3, 'deve ter pelo menos 3 caracteres').required('Obrigatório'),
    cpf: Yup.string().length(11, 'Somente números, exatamente 11').required('Obrigatório'),
    rg: Yup.string().length(9, 'Somente números, sem pontuação').nullable(),
    email: Yup.string().email('Precisa ser um email válido').required('Obrigatório'),
    telefone: Yup.string(),
    endereco: Yup.object({
        rua: Yup.string(),
        bairro: Yup.string(),
        numero: Yup.number(),
        cidade: Yup.string().min(3),
        cep: Yup.string()
    })
})

export interface ClienteFormValues {
    id?: number;
    nome: string,
    cpf: string,
    rg?: string,
    email: string,
    telefone: string,
    endereco: {
        rua: string,
        bairro: string,
        numero: number | null,
        cidade: string,
        cep: string
    }
}

function FormCadastroCliente() {
    const [feedback, setFeedback] = useState(false);
    const [msg, setMsg] = useState({ resp: '', severity: '' });
    const initialValues: ClienteFormValues = {
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

    const enviarDados = async (dados: any, { resetForm }: any) => {
        try {
            const resp = await cadastrarCliente(dados)

            setMsg({ resp: resp, severity: 'success' })
            setFeedback(true)
            resetForm({})
        } catch (error: any) {
            setMsg({ resp: error?.response?.data, severity: 'error' })
            setFeedback(true)
        }

    }

    const { t } = useTranslation();
    return (
        <section className='cadastroClienteContainer'>
            <Card sx={{ p: '20px', mt: '30px', borderRadius: '10px' }} >
                <h2> {t("clientRegistration.title")} </h2>
                {feedback && <Alert severity={msg.severity as AlertColor}>{msg.resp}</Alert>}
                <Formik
                    validateOnBlur={false}
                    initialValues={initialValues}
                    onSubmit={enviarDados}
                    validationSchema={CadastroClienteSchema}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit} onChange={() => setFeedback(false)}>
                            <div className='padd-15-flex'>
                                <div className='margin-r-45'>
                                    <Field
                                        component={TextField}
                                        name='nome'
                                        type='text'
                                        label='Nome'
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
                                    label='Telefone'
                                    size='small'
                                    value={values.telefone}
                                    onChange={handleChange}
                                />
                            </div>
                            <fieldset>
                                <legend> {t("clientRegistration.address")} </legend>
                                <div className='padd-15-flex'>
                                    <div className='margin-r-45'>
                                        <Field
                                            component={TextField}
                                            name='endereco.rua'
                                            type='text'
                                            label='Rua'
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
                                            label='Número'
                                            size='small'
                                            value={values.endereco.numero}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <Field
                                        component={TextField}
                                        name='endereco.bairro'
                                        type='text'
                                        label='Bairro'
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
                                            label='Cidade'
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
                            <div className='botaoCadCliente'><Botao type='submit'>{t("clientRegistration.register")}</Botao></div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </section>
    );
}

export default FormCadastroCliente;