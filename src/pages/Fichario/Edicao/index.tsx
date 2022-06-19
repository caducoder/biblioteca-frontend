import './EdicaoCliente.scss'
import { TextField } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import Botao from '../../../components/Botao';
import { useNavigate, useParams } from 'react-router';
import {ClienteFormValues, CadastroClienteSchema} from '../Cadastro'
import { alterarCliente, buscarPorId, ICliente } from '../../../api/ClienteService';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

function FormEdicaoCliente() {
    const navigate = useNavigate()
    const [cliente, setCliente] = useState<ICliente>();
    const { id: idCliente }: any = useParams()
    const [feedback, setFeedback] = useState(false);
    const [msg, setMsg] = useState('');

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
        initialValues.endereco.numero = cliente.endereco?.numero || null
        initialValues.endereco.cep = cliente.endereco?.cep || ''
    }

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
            let response: any = await alterarCliente(dados)
            setMsg(response)
            setFeedback(true)

            setTimeout(() => {
                navigate('/fichario')
            }, 1500)
        } catch (error: any) {
            console.log(error?.response?.data)
        }
    }

    return (
        <section className='edicaoClienteContainer'>
            {feedback && 
                <Alert severity="success">{msg}</Alert>
            }
            <h3>Editar Cliente</h3>
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
                            <Field 
                                component={TextField}
                                name='telefone'
                                type='text'
                                label='Telefone'
                                size='small'
                                value={values.telefone}
                                onChange={handleChange}
                                //placeholder='000000000'
                            />
                        </div>
                        <fieldset>
                            <legend>Endereço</legend>
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
                            <Botao type='submit'>Salvar</Botao>
                            <Botao onClick={() => navigate(-1)}>Cancelar</Botao>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default FormEdicaoCliente;