import './ModalEmprestimo.scss'
import { useEffect, useState } from 'react';
import { format } from 'date-fns'
import pt from "date-fns/locale/pt";
import { formatDate } from '../../utils/dateUtils';
import Alert, { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaTimes } from 'react-icons/fa';
import { RiQrScan2Line } from 'react-icons/ri';
import { getEmprestimo, realizarEmprestimo } from '../../api/EmprestimoService';
import Botao from '../Botao';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PageSize, Alignment } from "pdfmake/interfaces";
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface IProps {
  idCliente: number,
  handleClose: () => void,
  open: boolean
}

export default function ModalEmprestimo({ idCliente, open, handleClose }: IProps) {
  const [codigoLivro, setCodigoLivro] = useState('');
  const [linkImpressao, setLinkImpressao] = useState(false);
  const [feedback, setFeedback] = useState(false)
  const [msg, setMsg] = useState({ resp: '', severity: '' })
  const { t } = useTranslation()

  const emprestar = async () => {
    try {
      // faz requisição para o servidor
      const msg = await realizarEmprestimo(idCliente, codigoLivro)
      setMsg({ resp: msg, severity: 'success' })
      setLinkImpressao(true)
      setFeedback(true)
      sendEmail()
    } catch (error: any) {
      setMsg({ resp: error?.response?.data, severity: 'error' })
      setFeedback(true)
    }
  }

  const sendEmail = async () => {
    const emprestimo = await getEmprestimo(codigoLivro)
    const emailParams = {
      to_name: emprestimo.nomeCliente,
      client_email: emprestimo.cliente.email,
      book_title: emprestimo.livro.titulo,
      devolution_date: formatDate(emprestimo.dataDevolucao)
    }

    emailjs.send("serviceMail_bdgazj6", "template_znj3kkn", emailParams, "BeoUG3OH4NcSY8UCF")
      .then((res) => console.log('Email enviado com SUCESSO'))
      .catch(err => console.log('ERRO: ' + err))
  }

  const gerarComprovante = async () => {
    const emprestimo = await getEmprestimo(codigoLivro)

    // estrutura o pdf do comprovante
    let docDefinition = {
      pageSize: 'A4' as PageSize,

      content: [
        { text: 'Biblioteca', style: 'header', alignment: 'center' as Alignment, fontSize: 26 },
        '\n',
        { text: 'Comprovante de Empréstimo', style: 'subheader', alignment: 'center' as Alignment, fontSize: 15, color: '#666' },
        '\n',
        {
          text: [
            { text: 'Leitor(a): ', bold: true }, `${emprestimo.nomeCliente}\n`,
            { text: 'Livro: ', bold: true }, `${emprestimo.livro.titulo}\n`,
            { text: 'Data de Empréstimo: ', bold: true }, `${formatDate(emprestimo.emprestadoEm)}\n`,
            { text: 'Data de Devolução: ', bold: true }, `${formatDate(emprestimo.dataDevolucao)}\n`,
          ]
        },
        '\n',
        { text: 'Atente-se ao prazo de devolução para evitar pagamento de multa!', color: '#f00' },
        '\n',
        { text: format(new Date(), "'Rio, ' dd 'de' MMMM 'de' yyyy'", { locale: pt }), alignment: 'right' as Alignment },

      ]
    }
    pdfMake.createPdf(docDefinition).print();
    handleClose()
  }

  // efeito que tira o feedback e o link de impressão, quando a variavel codigoLivro for alterada
  useEffect(() => {
    setFeedback(false)
    setLinkImpressao(false)
  }, [codigoLivro]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className='closeBtn'><FaTimes onClick={handleClose} /></div>
          <div className='scanCodeBox'>
            <h2>{t("modal.scanCode")}</h2>
            <div>
              <RiQrScan2Line size={80} />
            </div>
            <p>
              {t("modal.insertCode")}
            </p>
            <input
              type="text"
              value={codigoLivro}
              onChange={e => setCodigoLivro(e.target.value)}
            />
            {// caso feedback for true, mostra alerta com a resposta do servidor
              feedback && <Alert severity={msg.severity as AlertColor}>{msg.resp}</Alert>
            }
            {linkImpressao && <span className="link_imprimir" onClick={gerarComprovante}>{t("modal.printReceipt")}</span>}
            <Botao size='small' className='scanCodeBox__btn' onClick={emprestar}>{t("modal.confirm")}</Botao>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
