import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { IEmprestimo, renovarEmprestimo } from "../../api/EmprestimoService";
import { addDays, format } from 'date-fns'
import './ModalRenovacao.scss'
import Botao from "../Botao";
import { formatDate } from "../../utils/dateUtils";
import { useState } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import pt from "date-fns/locale/pt";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PageSize, Alignment} from "pdfmake/interfaces";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
      open: {open: boolean, codLivro: string | undefined},
      handleClose: () => void,
      onConfirm?: (codLivro: string) => void,
      emprestimo: IEmprestimo
  }

function ModalRenovacao({ open, handleClose, emprestimo}: IProps) {
    const [feedback, setFeedback] = useState(false)
    const [msg, setMsg] = useState({resp: '', severity: ''})
    const [linkImpressao, setLinkImpressao] = useState(false);
    const [newEmprestimo, setNewEmprestimo] = useState<IEmprestimo>();
    console.log(emprestimo)

    const confirmaRenovacao = async () => {
        try {
            const novoEmpr = await renovarEmprestimo(emprestimo.livro.isbn || emprestimo.livro.issn)
            setNewEmprestimo(novoEmpr)
            setMsg({resp: 'Empréstimo renovado com sucesso!', severity: 'success'})
            setFeedback(true)
            setLinkImpressao(true)
        } catch (error: any) {
            setMsg({resp: error?.response?.data, severity: 'error'})
            setFeedback(true)
        }
    }

    const gerarComprovante = () => {
        let docDefinition = {
            pageSize: 'A4' as PageSize,

            content: [
                {text: 'Biblioteca', style: 'header', alignment: 'center' as Alignment, fontSize: 26},
                '\n',
                {text: 'Comprovante de Renovação', style: 'subheader', alignment: 'center' as Alignment, fontSize: 15, color: '#666'},
                '\n',
                {text: [
                    {text: 'Leitor: ', bold: true},`${emprestimo.nomeCliente || 'N/A'}\n`,
                    {text: 'Livro: ', bold: true}, `${emprestimo.livro.titulo}\n`,
                    {text: 'Data de Empréstimo: ', bold: true},`${formatDate(emprestimo.emprestadoEm)}\n`,
                    {text: 'Data de Devolução: ', bold: true},`${formatDate(emprestimo.dataDevolucao)}\n`,
                    {text: '\nNova Data de Devolução: ', bold: true},`${formatDate(newEmprestimo ? newEmprestimo.dataDevolucao : '')}\n`
                    ]
                },
                '\n',
                { text: 'Atente-se ao prazo de devolução para evitar pagamento de multa!', color: '#f00' },
                '\n',
                {text: format(new Date(), "'Rio, ' dd 'de' MMMM 'de' yyyy'", {locale: pt}), alignment: 'right' as Alignment},
                
            ]
        }
        pdfMake.createPdf(docDefinition).print();
        handleClose()
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
                    Renovação do Empréstimo
                </Typography>
                {feedback && <Alert severity={msg.severity as AlertColor}>{msg.resp}</Alert>}
                <table className="tabela-renovacao">
                    <tbody>
                    <tr>
                        <td>Livro</td>
                        <td>{emprestimo.livro.titulo}</td>
                    </tr>
                    <tr>
                        <td>Data de Empréstimo</td>
                        <td>{formatDate(emprestimo.emprestadoEm)}</td>
                    </tr>
                    <tr>
                        <td>Data de Devolução</td>
                        <td>{formatDate(emprestimo.dataDevolucao)}</td>
                    </tr>
                    <tr>
                        <td>Nova data de Devolução</td>
                        <td>{format(addDays(new Date(emprestimo.dataDevolucao), 16), 'dd/MM/yyyy')}</td>
                    </tr>
                    </tbody>
                </table>
                {linkImpressao && <span className="link_imprimir" onClick={gerarComprovante}>Imprimir Comprovante</span>}
                <div className='botoes'>
                    <Botao onClick={confirmaRenovacao} disabled={feedback}>Confirmar</Botao>
                    <Botao onClick={handleClose}>Cancelar</Botao>
                </div>
                </Box>
            </Modal>
        </div>
     );
}

export default ModalRenovacao;