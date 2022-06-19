import { TextField, Select } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import Botao from '../../../components/Botao';
import * as Yup from 'yup';
import './CadastroFuncionario.scss';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent, useState } from 'react';
import { cadastrarFuncionario, IFuncionario } from '../../../api/FuncionarioService';
import { Alert, AlertColor } from '@mui/material';

export const CadastroFuncionarioSchema = Yup.object().shape({
    nome: Yup.string().min(3, 'deve ter pelo menos 3 caracteres').required('Obrigatório'),
    cpf: Yup.string().length(11, 'Somente números, sem pontuação').required('Obrigatório'),
    rg: Yup.string().length(8, 'Somente números, sem pontuação'),
    email: Yup.string().email('Precisa ser um email válido').required('Obrigatório'),
    telefone: Yup.string(),
    senha: Yup.string().min(8, 'deve ter pelo menos 8 caracteres').required('Obrigatório'),
    endereco: Yup.object({
        rua: Yup.string(),
        bairro: Yup.string(),
        numero: Yup.number(),
        cidade: Yup.string().min(3),
        cep: Yup.string()
    })
})

export interface FuncionarioFormValues {
    id?: number,
    nome: string,
    cpf: string,
    rg?: string,
    email: string,
    telefone: string,
    senha?: string,
    endereco: {
        rua: string,
        bairro: string,
        numero: number,
        cidade: string,
        cep: string
    }
}

function FormCadastroFuncionario() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [feedback, setFeedback] = useState(false)
    const [msg, setMsg] = useState({resp: '', severity: ''})
    const initialValues: FuncionarioFormValues = {
        nome: '',
        cpf: '',
        rg: '',
        email: '',
        telefone: '',
        senha: '',
        endereco: {
            rua: '',
            bairro: '',
            numero: 0,
            cidade: '',
            cep: ''
        }
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsAdmin(event.target.checked);
      };

    const enviarDados = async (funcionario: any, {resetForm}: any) => {
        
        try {
            const resp = await cadastrarFuncionario(funcionario, isAdmin);
            setMsg({resp: resp, severity: 'success'})
            setFeedback(true)
            resetForm({})
        } catch (error: any) {
            setMsg({resp: error?.response?.data, severity: 'error'})
            setFeedback(true)
            console.log(error?.response)
        }
    }

    return ( 
        <section className='cadastroFuncionarioContainer'>
            <h2>Formulário de Cadastro de Funcionários</h2>
            {feedback && <Alert severity={msg.severity as AlertColor}>{msg.resp}</Alert>}
            <Formik
                validateOnBlur={false}
                initialValues={initialValues}
                onSubmit={enviarDados}
                validationSchema={CadastroFuncionarioSchema}
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
                        <div className='admCheckbox'>
                            <FormControlLabel control={<Checkbox checked={isAdmin} onChange={handleCheckboxChange} />} label="Administrador" />
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
                        <div className='botaoCadFuncionario'><Botao type='submit'>Cadastrar</Botao></div>
                    </Form>
                )}
            </Formik>
        </section>
     );
}

export default FormCadastroFuncionario;