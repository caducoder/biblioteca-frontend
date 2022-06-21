import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Field, Form, Formik } from "formik";
import Botao from "../Botao";
import { object, ref, string } from "yup";
import { TextField } from 'formik-mui';
import Stack from "@mui/material/Stack";
import { alterarSenha } from "../../api/FuncionarioService";
import { useState } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IProps {
    open: {open: boolean, id: number | null},
    handleOpen: (id: number) => void,
    handleClose: () => void,
}

function ModalTrocarSenha({ open, handleOpen, handleClose}: IProps) {
    const [feedback, setFeedback] = useState(false)
    const [msg, setMsg] = useState({resp: '', severity: ''})

    const mudarSenha = async (values: any, id: number, resetForm: any) => {
        try {
            const resp = await alterarSenha(id, values.newPass)
            setMsg({resp: resp, severity: 'success'})
            setFeedback(true)
            resetForm({})
        } catch (error: any) {
            setMsg({resp: error?.response?.data, severity: 'error'})
            setFeedback(true)
        }
    }

    return ( 
        <div>
            <Modal
                open={open.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Alterar Senha
                </Typography>
                {feedback && <Alert severity={msg.severity as AlertColor}>{msg.resp}</Alert>}
                <Formik
                    validateOnBlur={false}
                    initialValues={{
                        newPass: '',
                        confirmPass: '',
                    }}
                    validationSchema={object().shape({
                        newPass: string().min(8, 'Nova senha deve ser de no mínimo 8 caracteres').required('Nova senha é obrigatória'),
                        confirmPass: string()
                            .oneOf([ref('newPass')], 'Senhas não batem')
                            .required('Senha é obrigatória'),
                    })}
                    onSubmit={(v, {resetForm}) => mudarSenha(v, open.id ? open.id : -1, resetForm)}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit} onChange={() => setFeedback(false)}>
                            <Stack spacing={2}>
                                <Field 
                                    component={TextField}
                                    name='newPass'
                                    type='password'
                                    label='Nova Senha'
                                    variant="standard"
                                    size='small'
                                    value={values.newPass}
                                    onChange={handleChange}
                                    required
                                />
                                <Field 
                                    component={TextField}
                                    name='confirmPass'
                                    type='password'
                                    label='Confirmar Senha'
                                    variant="standard"
                                    size='small'
                                    value={values.confirmPass}
                                    onChange={handleChange}
                                    required
                                />
                            </Stack>
                            <div className='botoes'>
                                <Botao type="submit">Alterar</Botao>
                                <Botao onClick={handleClose}>Cancelar</Botao>
                            </div>
                        </Form>
                    )}
                </Formik>
                </Box>
            </Modal>
        </div>
     );
}

export default ModalTrocarSenha;