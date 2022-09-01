import './EdicaoFuncionario.scss'
import { TextField } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import Botao from '../../../components/Botao';
import { useNavigate, useParams } from 'react-router';
import { FuncionarioFormValues } from '../Cadastro'
import { alterarFuncionario, buscarPorCpf, IFuncionario } from '../../../api/FuncionarioService';
import { useState, useEffect } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'

export const EdicaoFuncionarioSchema = Yup.object().shape({
    nome: Yup.string().min(3, 'deve ter pelo menos 3 caracteres').required('Obrigatório'),
    cpf: Yup.string().length(11, 'Somente números, sem pontuação').required('Obrigatório'),
    rg: Yup.string().length(8, 'Somente números, sem pontuação'),
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

function FormEdicaoFuncionario() {
    const navigate = useNavigate()
    const [funcionario, setFuncionario] = useState<IFuncionario>();
    const { cpf: CpfFuncionario }: any = useParams()
    const [feedback, setFeedback] = useState(false)
    const [msg, setMsg] = useState({resp: '', severity: ''})

    const initialValues: FuncionarioFormValues = {
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

    // preenche o formulário com os dados vindos do servidor
    const preencherForm = (funcionario: IFuncionario) => {
        initialValues.id = funcionario.id
        initialValues.nome = funcionario.nome || ''
        initialValues.cpf = funcionario.cpf || ''
        initialValues.rg = funcionario.rg || ''
        initialValues.email = funcionario.email || ''
        initialValues.telefone = funcionario.telefone || ''
        initialValues.endereco.rua = funcionario.endereco?.rua || ''
        initialValues.endereco.bairro = funcionario.endereco?.bairro || ''
        initialValues.endereco.cidade = funcionario.endereco?.cidade || ''
        initialValues.endereco.numero = funcionario.endereco?.numero || 0
        initialValues.endereco.cep = funcionario.endereco?.cep || ''
    }

    // efeito que busca os dados do funcionario pelo cpf para preencher o formulário
    useEffect(() => {
        const getFuncionario = async () => {
            const funcionario = await buscarPorCpf(CpfFuncionario)

            setFuncionario(funcionario)
            preencherForm(funcionario)
        }

        getFuncionario()
    }, []);

    const enviarDadosModificados = async (dados: any) => {
        try {
            const response = await alterarFuncionario(dados)
            setMsg({resp: response, severity: 'success'})
            setFeedback(true)
            
            // volta para a página da equipe dps de 2 segundos
            setTimeout(() => {
                navigate('/equipe')
            }, 2000)
        } catch (error: any) {
            setMsg({resp: error?.response?.data, severity: 'error'})
            setFeedback(true)
        }
    }

    const { t } = useTranslation();
    return (
        <section className='edicaoFuncionarioContainer'>
            {feedback && 
                <Alert severity={msg.severity as AlertColor}>{msg.resp}</Alert>
            }      
            <h3> {t("employeeEdition.title")} </h3>
            <Formik
                validateOnBlur={false}
                initialValues={initialValues}
                onSubmit={enviarDadosModificados}
                validationSchema={EdicaoFuncionarioSchema}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit} onChange={() => setFeedback(false)}>
                        <div className='campo01'>
                            <div className='campoNome'> 
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
                            <div className='campoCPF'> 
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
                        <div className='campo02'>
                            <div className='campoEmail'> 
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
                            <div className='campoTelefone'> 
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
                        </div>
                        
                        <fieldset>
                            <legend> {t("employeeEdition.address")} </legend>
                            <div className='campo03'>
                                <div className='campoRua'> 
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
                                <div className='campoNumero'> 
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
                            <div className='campo04'>
                                <div className='campoCidade'> 
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
                        
                        <div className='botoes'>
                            <Botao type='submit'>{t("employeeEdition.save")}</Botao>
                            <Botao onClick={() => navigate(-1)}>{t("employeeEdition.cancel")}</Botao>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormEdicaoFuncionario;