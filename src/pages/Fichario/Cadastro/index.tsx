import { TextField } from 'formik-mui';
import { Formik, Form, Field } from 'formik';
import Botao from '../../../components/Botao';
import * as Yup from 'yup'
import './CadastroCliente.scss'

const CadastroClienteSchema = Yup.object().shape({
    nome: Yup.string().min(3, 'deve ter pelo menos 3 caracteres').required('Obrigatório'),
    cpf: Yup.string().length(11, 'Somente números, exatamente 11').required('Obrigatório'),
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

interface ClienteFormValues {
    nome: string,
    cpf: string,
    rg: string,
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

    const enviarDados = (values: any) => {
        console.log(values)
        
    }

    return ( 
        <section className='cadastroClienteContainer'>
            <h2>Formulário de Cadastro de Clientes</h2>
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
                    <Form noValidate onSubmit={handleSubmit}>
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
                        <Field 
                            component={TextField}
                            name='rg'
                            type='text'
                            label='RG'
                            size='small'
                            value={values.rg}
                            onChange={handleChange}
                        />
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
                        <fieldset>
                            <legend>Endereço</legend>
                            <Field 
                                component={TextField}
                                name='endereco.rua'
                                type='text'
                                label='Rua'
                                size='small'
                                value={values.endereco.rua}
                                onChange={handleChange}
                            />
                            <Field 
                                component={TextField}
                                name='endereco.numero'
                                type='number'
                                label='Número'
                                size='small'
                                value={values.endereco.numero}
                                onChange={handleChange}
                            />
                            <Field 
                                component={TextField}
                                name='endereco.bairro'
                                type='text'
                                label='Bairro'
                                size='small'
                                value={values.endereco.bairro}
                                onChange={handleChange}
                            />
                            <Field 
                                component={TextField}
                                name='endereco.cidade'
                                type='text'
                                label='Cidade'
                                size='small'
                                value={values.endereco.cidade}
                                onChange={handleChange}
                            />
                            <Field 
                                component={TextField}
                                name='endereco.cep'
                                type='text'
                                label='CEP'
                                size='small'
                                value={values.endereco.cep}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <Botao type='submit'>Cadastrar</Botao>
                    </Form>
                )}
            </Formik>
        </section>
     );
}

export default FormCadastroCliente;