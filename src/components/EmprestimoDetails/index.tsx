import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper, Typography } from "@mui/material";
import { 
    format, 
    formatDistanceToNowStrict, 
    isPast, 
    parseISO,
    addHours,
    isToday,
} from "date-fns";
import pt from 'date-fns/locale/pt-BR';
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { IEmprestimo, realizarDevolucao } from "../../api/EmprestimoService";
import Botao from "../Botao";
import { MdDone } from 'react-icons/md';
import Alert from '@mui/material/Alert';
import './EmprestimoDetails.scss'
import ModalRenovacao from '../ModalRenovacao';
import ConfirmacaoPagamentoPopup from '../ConfirmacaoPagamentoPopup';

interface IPropsEmpr {
  emprestimo: IEmprestimo,
  setEmprestimo: Dispatch<SetStateAction<IEmprestimo | null>>
}

const MULTA_DIARIA = 2.00

function EmprestimoDetails({ emprestimo, setEmprestimo }: IPropsEmpr) {
    const [diasAtrasados, setDiasAtrasados] = useState<string>('');
    const [multa, setMulta] = useState('');
    const [pagmRealizado, setPagmRealizado] = useState(true);
    const [status, setStatus] = useState<JSX.Element>();
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('');
    const [openPagmDialog, setOpenPagmDialog] = useState(false);
    const [openRenovacaoModal, setOpenRenovacaoModal] = useState<{open: boolean, codLivro: string}>({open: false, codLivro: ''});
    
    // função para fechar o modal de renovação
    const handleCloseRenovacaoModal = () => setOpenRenovacaoModal({open: false, codLivro: ''})

    // função para abrir o modal de renovação, passando o cod do livro
    const handleOpenRenovacaoModal = (codLivro: string) => {
      setOpenRenovacaoModal({open: true, codLivro: codLivro})
    }

    // função para quando clicar no botão de renovar, dispara abertura do modal
    const handleClickRenovar = () => {
      handleOpenRenovacaoModal(emprestimo.livro.isbn || emprestimo.livro.issn)
    }

    // função para fechar o popup de pagamento
    const handleClosePagmDialog = () => setOpenPagmDialog(false);

    // função que valida o pagamento da multa e mostra status de pagamento realizado
    const confirmaPagamento = () => {
        setStatus(<span className='pagOk green'>Pagamento realizado <span className='doneIcon'><MdDone size={20} color='green'/></span></span>)
        setOpenPagmDialog(false);
        setPagmRealizado(true)  
    };

    // função para efetivar a devolução no sistema
    const confirmaDevolucao = async () => {
        try {
          const response = await realizarDevolucao(emprestimo.livro.isbn || emprestimo.livro.issn)
          setMsg(response)
          setSuccess(true)
          
          setTimeout(() => {
            setEmprestimo(null)
          }, 2000)
        } catch (error: any) {
          console.log(error?.response?.data)
        }
    }

    // corrigindo datas com acrescimo de 3 horas, pois está voltando um dia por causa do timezone
    const dataEmprestimo = addHours(parseISO(emprestimo.emprestadoEm), 3)
    const dataDevl = addHours(parseISO(emprestimo.dataDevolucao), 3)

    // função que calcula multa e abre popup para confirmação do pagamento
    const calcularMulta = () => {
        const dias = +diasAtrasados.split(' ')[0]
        const multa = dias * MULTA_DIARIA

        setMulta(multa.toFixed(2))
        setOpenPagmDialog(true);
    }

    // efeito que verifica se há atraso no empréstimo, toda vez que o componente é renderizado
    useEffect(() => {
        let days = ''

        // se data de devolução for anterior ao dia de hoje, calcula dias de atraso
        if (isPast(dataDevl) && !isToday(dataDevl)) {
            days =  formatDistanceToNowStrict(dataDevl, {locale: pt, unit: 'day'})
        } else {
            days = '0';
        }

        // condicional para mostrar o status do empréstimo
        if(days != '0'){
            setStatus(<span className='red'>Pagamento pendente</span>)
            setPagmRealizado(false)
        } else {
            setStatus(<span className='green'>Regular</span>)
        }
        
        setDiasAtrasados(days)
    }, []);


    return ( 
        <section>
            <Typography variant='h3'>Empréstimo:</Typography>
            <Paper elevation={3} sx={{padding: 2, marginTop: '20px'}}>
              {success && 
                  <Alert severity="success">{msg}</Alert>
              }
              <p><span className='bold'>Cliente:</span> {emprestimo.nomeCliente}</p>
              <p><span className='bold'>Livro:</span> {emprestimo.livro.titulo}</p>
              <p><span className='bold'>Data de Empréstimo:</span> {format(dataEmprestimo, "dd/MM/yyyy")}</p>
              <p><span className='bold'>Data de Devolução:</span> {format(dataDevl, "dd/MM/yyyy")}</p>
              <p>
                  <span className='bold'>Dias atrasados:</span> {diasAtrasados == '0' ? diasAtrasados : <span className="red">{diasAtrasados}</span>}
                  {pagmRealizado ? '' : <Botao size="small" onClick={calcularMulta} className='calcMultaBtn'>Calcular Multa</Botao>}
              </p>
              <div><span className='bold'>Status:</span> {status}</div>
              <div className='devlBtn'>
                  <Botao disabled={!pagmRealizado} onClick={confirmaDevolucao}>Confirmar Devolução</Botao>
                  <Botao disabled={!pagmRealizado} onClick={handleClickRenovar}>Renovar Empréstimo</Botao>
              </div>
            </Paper>
            <ConfirmacaoPagamentoPopup 
                title='Confirmar pagamento da multa?'
                message={<span>Total: R$ <span className='valor'>{multa}</span>. Após confirmar, não é possível desfazer essa ação.</span>}
                onConfirm={confirmaPagamento} 
                handleClose={handleClosePagmDialog} 
                open={openPagmDialog}
            />
            <ModalRenovacao 
              open={openRenovacaoModal}
              handleClose={handleCloseRenovacaoModal}
              emprestimo={emprestimo}
            />
        </section>
     );
}

export default EmprestimoDetails;
