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

interface IPropsEmpr {
  emprestimo: IEmprestimo,
  setEmprestimo: Dispatch<SetStateAction<IEmprestimo | null>>
}

const MULTA_DIARIA = 2.00

function EmprestimoDetails({ emprestimo, setEmprestimo }: IPropsEmpr) {
    const [diasAtrasados, setDiasAtrasados] = useState<string>('');
    const [multa, setMulta] = useState('');
    const [pagmRealizado, setPagmRealizado] = useState(true);
    const [openPagmDialog, setOpenPagmDialog] = useState(false);
    const [status, setStatus] = useState<JSX.Element>();
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClose = () => setOpenPagmDialog(false);

    const confirmaPagamento = () => {
        setStatus(<span className='pagOk green'>Pagamento realizado <span className='doneIcon'><MdDone size={20} color='green'/></span></span>)
        setOpenPagmDialog(false);
        setPagmRealizado(true)  
    };

    const confirmaDevolucao = async () => {
        try {
          const response = await realizarDevolucao(emprestimo.livro.isbn)
          setMsg(response)
          setSuccess(true)
          console.log(response)
          setTimeout(() => {
            setEmprestimo(null)
          }, 2000)
        } catch (error: any) {
          console.log(error?.response?.data)
        }
    }

    const dataEmprestimo = addHours(parseISO(emprestimo.emprestadoEm), 3)
    const dataDevl = addHours(parseISO(emprestimo.dataDevolucao), 3)

    const calcularMulta = () => {
        const dias = +diasAtrasados.split(' ')[0]
        const multa = dias * MULTA_DIARIA
        setMulta(multa.toFixed(2))
        setOpenPagmDialog(true);
    }

    useEffect(() => {
        let days = ''
        if (isPast(dataDevl) && !isToday(dataDevl)) {
            days =  formatDistanceToNowStrict(dataDevl, {locale: pt, unit: 'day'})
        } else {
            days = '0';
        }
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
              {/* <p><span>Cliente:</span> {emprestimo.cliente.nome}</p> */}
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
              </div>
            </Paper>
            <ConfirmacaoPagamentoPopup 
                title='Confirmar pagamento da multa?'
                message={`Total: R$ ${multa}. Após confirmar, não é possível desfazer essa ação.`}
                onConfirm={confirmaPagamento} 
                handleClose={handleClose} 
                open={openPagmDialog}
            />
        </section>
     );
}

export default EmprestimoDetails;

interface IProps {
    title: string,
    message: string,
    open: boolean,
    handleClose: () => void,
    onConfirm: () => void
}

function ConfirmacaoPagamentoPopup({title, message, open, handleClose, onConfirm}: IProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog"
      >
        <DialogTitle id="alert-dialog">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>Confirmar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
