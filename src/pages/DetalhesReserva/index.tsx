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
        if(cpf.match(/[a-zA-Z]+/gm)) {
            setErr({err: true, msg: 'Apenas números'})
            return;
        }
        if(cpf.length !== 11 ){
            setErr({err:true, msg: 'CPF deve conter 11 números'})
            return;
        }
        
        try {
            const response = await reservarLivro(livro.id, cpf)
            setSucesso(true)
            setMsg(response)
            handleOpen()
        } catch (error: any) {
            setSucesso(false)
            setMsg(error.response.data)
            handleOpen()
        }
    }

    useEffect(() => {
        setErr({err: false, msg: ''})
    }, [cpf]);

    return ( 
        <section className='container'>
            <div className='container__bread'>
                <Breadcrumbs separator='>' aria-label="breadcrumb">
                    <Link to='/acervo' color="inherit">
                        Acervo
                    </Link>
                    <Typography color="text.primary">Detalhes do livro</Typography>
                </Breadcrumbs>
            </div>
            <div className='detalhes'>
                <div className='detalhes__isbn'>
                    <Typography variant='h6'>ISBN</Typography>
                    <p>{livro.isbn}</p>
                </div>
                <div className='detalhes__titulo'>
                    <Typography variant='h6'>Título</Typography>
                    <p>{livro.titulo}</p>
                </div>
                <div className='detalhes__descricao'>
                    <Typography variant='h6'>Descrição</Typography>
                    <p>{livro.descricao}</p>
                </div>
                <div className='detalhes__idioma'>
                    <Typography variant='h6'>Idioma</Typography>
                    <p>{livro.idioma}</p>
                </div>
                <div className='detalhes__autor'>
                    <Typography variant='h6'>Autor</Typography>
                    <p>{livro.autor}</p>
                </div>
                <div className='detalhes__numeroDePaginas'>
                    <Typography variant='h6'>Número de Páginas</Typography>
                    <p>{livro.numeroDePaginas}</p>
                </div>
                <div className='detalhes__estado'>
                    <Typography variant='h6'>Estado</Typography>
                    <p>{livro.estadoLivro}</p>
                </div>
                <div className='detalhes__editora'>
                    <Typography variant='h6'>Editora</Typography>
                    <p>{livro.editora}</p>
                </div>
                
                <div className='detalhes__anoEdicao'>
                    <Typography variant='h6'>Ano de Publicação</Typography>
                    <p>{livro.anoEdicao}</p>
                </div>
                
            </div>
            <div className='reserva'>
                <TextField
                    error={err.err}
                    helperText={err.msg}
                    label="Seu CPF"
                    size='small'
                    value={cpf}
                    onChange={(ev) => setCpf(ev.target.value)}
                    disabled={indisponivel}
                />
                <Button disabled={indisponivel} variant="contained" onClick={() => handleClickReservar(cpf)}>Reservar</Button>
            </div>
            <Modal open={open} handleClose={handleClose} msg={msg} sucesso={sucesso}/>
        </section>
    )
}

export default DetalhesReserva;