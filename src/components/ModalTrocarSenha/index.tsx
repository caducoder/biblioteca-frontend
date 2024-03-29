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
import { useTranslation } from 'react-i18next';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

interface IProps {
    open: {open: boolean, id: number | null},
    handleClose: () => void,
}

function ModalTrocarSenha({ open, handleClose}: IProps) {
    const [feedback, setFeedback] = useState(false)
    const [msg, setMsg] = useState({resp: '', severity: ''})

    const mudarSenha = async (values: any, id: number, resetForm: any) => {
        try {
            // faz requisição para o servidor
            const resp = await alterarSenha(id, values.newPass)
            setMsg({resp: resp, severity: 'success'})
            setFeedback(true)
            resetForm({})
        } catch (error: any) {
            setMsg({resp: error?.response?.data, severity: 'error'})
            setFeedback(true)
        }
    }

    const { t } = useTranslation()
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
                        // faz a validação das senhas
                        validationSchema={object().shape({
                            newPass: string().min(8, 'Nova senha deve ser de no mínimo 8 caracteres').required('Nova senha é obrigatória'),
                            confirmPass: string()
                                .oneOf([ref('newPass')], 'Senhas não batem')
                                .required('Confirmar senha é obrigatória'),
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
                                        label={t("modal.newPassword")}
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
                                        label={t("modal.confirmPassword")}
                                        variant="standard"
                                        size='small'
                                        value={values.confirmPass}
                                        onChange={handleChange}
                                        required
                                    />
                                </Stack>
                                <div className='botoes'>
                                    <Botao type="submit">{t("modal.alter")}</Botao>
                                    <Botao onClick={handleClose}>{t("modal.cancel")}</Botao>
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