import { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { buscarPorCpf } from "../../api/ClienteService";
import Botao from "../../components/Botao";
import EmprestimosCliente from "./EmprestimosCliente";
import { isPast } from 'date-fns'
import ModalEmprestimo from "../../components/ModalEmprestimo";
import { IEmprestimo } from "../../api/EmprestimoService";
import { formatDate } from "../../utils/dateUtils";
import { useTranslation } from 'react-i18next'

export interface DataEmpr {
    id: number,
    nomeLivro: string,
    dataEmprestimo: string,
    dataDevolucao: string,
    estado: JSX.Element,
}

function createData(
    id: number,
    nomeLivro: string,
    dataEmprestimo: string,
    dataDevolucao: string,
    estado: JSX.Element,
): DataEmpr {
    return {id, nomeLivro, dataEmprestimo, dataDevolucao, estado };
}

function Emprestimo() {
    const [cpf, setCpf] = useState('');
    const [emprestimos, setEmprestimos] = useState<DataEmpr[]>([]);
    const [nomeCliente, setNomeCliente] = useState('');
    const [openModal, setOpen] = useState(false);
    const [idCliente, setIdCliente] = useState<number>(0);
    const [err, setErr] = useState({err: false, msg: ''});
    const [msg, setMsg] = useState('');

    const buscarCliente = async () => {
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

        // faz a busca do cliente
        if(cpf) {
            try {
                const data = await buscarPorCpf(cpf)
                setIdCliente(data.id)
                setNomeCliente(data.nome)
                // refazer lógica no back
                //popularTabela(data.emprestimos)
            } catch (error: any) {
                setMsg(error?.response?.data)
            }
        }
        
    }

    const popularTabela = (emprestimos: Array<IEmprestimo>) => {
        const rows = emprestimos.map(empr => (
            createData(empr.id, empr.livro.titulo, formatDate(empr.emprestadoEm), formatDate(empr.dataDevolucao), verificaEstado(empr.dataDevolucao))
        ))

        setEmprestimos(rows)
    }


    const verificaEstado = (dataDevolucao: string): JSX.Element => {
        // se a data de devolução for menor q a data de hoje, está atrasado
        if(isPast(new Date(dataDevolucao))) {
            return <span className="red">Atrasado</span>
        }

        // se não, regular
        return <span className="green">Regular</span>
    }

    const handleClickAdicionar = () => {
        // abre modal de adicão de empréstimo
        setOpen(true);
    }

    const handleCloseModal = () => {
        // fecha modal
        setOpen(false)
    }

    // efeito que atualiza lista de empréstimo quando a variável 'openModal' for modificada
    useEffect(() => {
        buscarCliente()
    }, [openModal]);

    // efeito que reseta estado ao alterar campo do cpf
    useEffect(() => {
        setMsg('')
        setNomeCliente('')
        setErr({err: false, msg: ''})
    }, [cpf]);

   const { t } = useTranslation();
    return ( 
        <section className="container">
            <div className='container__bread'>
                <Breadcrumbs separator='>' aria-label="breadcrumb">
                    <Link to='/dashboard' className='no_style'>
                        <Typography color="text.secondary"> {t("loan.title")} </Typography>
                    </Link>
                    <Typography color="text.primary"> {t("loan.performLoan")} </Typography>
                </Breadcrumbs>
            </div>
            <div>
                <form>
                    <TextField 
                        label="CPF" 
                        error={err.err}
                        helperText={err.msg}
                        variant="outlined" 
                        size="small" 
                        sx={{marginBottom: '10px'}}
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                    />
                    <br />
                    <Botao onClick={buscarCliente}>{t("loan.search")}</Botao>
                </form>
                {nomeCliente ?
                    <EmprestimosCliente 
                        nomeCliente={nomeCliente} 
                        emprestimos={emprestimos} 
                        handleClickAdicionar={handleClickAdicionar}
                    />
                    : <p>{msg}</p>
                }
                <ModalEmprestimo idCliente={idCliente} open={openModal} handleClose={handleCloseModal}/>
            </div>
        </section>
     );
}

export default Emprestimo;