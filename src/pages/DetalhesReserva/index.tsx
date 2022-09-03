import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { reservarLivro } from '../../api/LivroService';
import './DetalhesReserva.scss'
import Modal from './Popup'
import { useTranslation } from 'react-i18next'

function DetalhesReserva() {
    const {state: livro}: any = useLocation()
    const [msg, setMsg] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const [err, setErr] = useState({err: false, msg: ''});
    const [cpf, setCpf] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // caso livro estiver reservado ou emprestado, desativa campo e botao de emprestimo
    const indisponivel = livro.estadoLivro === "RESERVADO" || livro.estadoLivro === "EMPRESTADO"

    const handleClickReservar = async (cpf: string) => {
        // verifica se existe letra no cpf
        if(cpf.match(/[a-zA-Z]+/gm)) {
            setErr({err: true, msg: 'Apenas números'})
            return;
        }
        // verifica tamanho do cpf
        if(cpf.length !== 11 ){
            setErr({err:true, msg: 'CPF deve conter 11 números'})
            return;
        }
        
        try {
            // faz requisição de reserva e aguarda resposta
            const response = await reservarLivro(livro.id, cpf)
            setSucesso(true)
            setMsg(response)
            handleOpen()
        } catch (error: any) {
            // caso de erro, seta a mensagem de erro e abre o modal
            setSucesso(false)
            setMsg(error.response.data)
            handleOpen()
        }
    }

    // efeito que tira o erro ao editar o cpf
    useEffect(() => {
        setErr({err: false, msg: ''})
    }, [cpf]);

    const { t } = useTranslation();
    return ( 
        <section className='container'>
            <div className='container__bread'>
                <Breadcrumbs separator='>' aria-label="breadcrumb">
                    <Link to='/acervo' color="inherit">
                        {t("reservation.collection")}
                    </Link>
                    <Typography color="text.primary"> {t("reservation.details")} </Typography>
                </Breadcrumbs>
            </div>
            <div className='detalhes'>
                <div className='detalhes__isbn'>
                    <Typography variant='h6'> {t("reservation.isbn")} </Typography>
                    <p>{livro.isbn}</p>
                </div>
                <div className='detalhes__titulo'>
                    <Typography variant='h6'> {t("reservation.title")} </Typography>
                    <p>{livro.titulo}</p>
                </div>
                <div className='detalhes__descricao'>
                    <Typography variant='h6'> {t("reservation.description")} </Typography>
                    <p>{livro.descricao}</p>
                </div>
                <div className='detalhes__idioma'>
                    <Typography variant='h6'> {t("reservation.language")} </Typography>
                    <p>{livro.idioma}</p>
                </div>
                <div className='detalhes__autor'>
                    <Typography variant='h6'> {t("reservation.author")} </Typography>
                    <p>{livro.autor}</p>
                </div>
                <div className='detalhes__numeroDePaginas'>
                    <Typography variant='h6'> {t("reservation.number")} </Typography>
                    <p>{livro.numeroDePaginas}</p>
                </div>
                <div className='detalhes__estado'>
                    <Typography variant='h6'> {t("reservation.state")} </Typography>
                    <p>{livro.estadoLivro}</p>
                </div>
                <div className='detalhes__editora'>
                    <Typography variant='h6'> {t("reservation.company")} </Typography>
                    <p>{livro.editora}</p>
                </div>
                
                <div className='detalhes__anoEdicao'>
                    <Typography variant='h6'> {t("reservation.year")} </Typography>
                    <p>{livro.anoEdicao}</p>
                </div>
                
            </div>
            <div className='reserva'>
                <TextField
                    error={err.err}
                    helperText={err.msg}
                    label={t("reservation.cpf")}
                    size='small'
                    value={cpf}
                    onChange={(ev) => setCpf(ev.target.value)}
                    disabled={indisponivel}
                />
                <Button disabled={indisponivel} variant="contained" onClick={() => handleClickReservar(cpf)}>{t("reservation.reserve")}</Button>
            </div>
            <Modal open={open} handleClose={handleClose} msg={msg} sucesso={sucesso}/>
        </section>
    )
}

export default DetalhesReserva;