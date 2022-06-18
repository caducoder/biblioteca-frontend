import './EdicaoFuncionario.scss'
import { TextField, Select } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import Botao from '../../../components/Botao';
import { useNavigate, useParams } from 'react-router';
import {FuncionarioFormValues, CadastroFuncionarioSchema} from '../Cadastro'
import { alterarFuncionario, buscarPorCpf, IFuncionario } from '../../../api/FuncionarioService';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';

function FormEdicaoFuncionario() {
    const navigate = useNavigate()
    const [funcionario, setFuncionario] = useState<IFuncionario>();
    const { cpf: CpfFuncionario }: any = useParams()
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('');

    let initialValues: FuncionarioFormValues = {
        id: undefined,
        nome: '',
        cpf: '',
        rg: '',
        email: '',
        telefone: '',
        tipo: '',
        senha: '',
        endereco: {
            rua: '',
            bairro: '',
            numero: 0,
            cidade: '',
            cep: ''
        }
    }

    const preencherForm = (funcionario: IFuncionario) => {
        initialValues.id = funcionario.id
        initialValues.nome = funcionario.nome || ''
        initialValues.cpf = funcionario.cpf || ''
        initialValues.rg = funcionario.rg || ''
        initialValues.email = funcionario.email || ''
        initialValues.telefone = funcionario.telefone || ''
        initialValues.senha = ''
        initialValues.endereco.rua = funcionario.endereco?.rua || ''
        initialValues.endereco.bairro = funcionario.endereco?.bairro || ''
        initialValues.endereco.cidade = funcionario.endereco?.cidade || ''
        initialValues.endereco.numero = funcionario.endereco?.numero || 0
        initialValues.endereco.cep = funcionario.endereco?.cep || ''
    }

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
            let response: any = await alterarFuncionario(dados)
            setMsg(response)
            setSuccess(true)

            setTimeout(() => {
                navigate('/equipe')
            }, 1500)
        } catch (error: any) {
            console.log(error?.response?.data)
        }
    }

    return (
        <section className='edicaoFuncionarioContainer'>
            {success && 
                <Alert severity="success">{msg}</Alert>
            }
            <h3>Editar Funcionario</h3>
            <Formik
                validateOnBlur={false}
                initialValues={initialValues}
                onSubmit={enviarDadosModificados}
                validationSchema={CadastroFuncionarioSchema}
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
                            <div className='campoTelefone'> 
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
                            <div className='campoTelefone'> 
                            <Field 
                                component={TextField}
                                name='senha'
                                type='password'
                                label='Senha'
                                size='small'
                                value={values.senha}
                                onChange={handleChange}
                            />
                        </div>
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

export default FormEdicaoFuncionario;