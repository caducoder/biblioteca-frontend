import {RiAccountBoxFill} from 'react-icons/ri'
import Botao from '../../../components/Botao';
import './EmprestimosCliente.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataEmpr } from '..';
import { useTranslation } from 'react-i18next'

interface IProps {
    nomeCliente: string,
    emprestimos: Array<DataEmpr>,
    handleClickAdicionar: () => void
}

function EmprestimosCliente({nomeCliente, emprestimos, handleClickAdicionar}: IProps) {
   const { t } = useTranslation();
    return ( 
        <section className='clienteEmpr'>
            <RiAccountBoxFill size={100}/>
            <div className='clienteEmpr__box'>
                <p><span className='bold'> {t("clientLoan.name")} </span> {nomeCliente}</p>
                <p><span className='bold'> {t("clientLoan.situation")} </span> {t("clientLoan.active")} </p>
                <div className='clienteEmpr__box__btn'>
                    <span className='bold'> {t("clientLoan.loans")} </span>
                    <Botao onClick={handleClickAdicionar} size='small'>{t("clientLoan.add")}</Botao>
                </div>
                <TableContainer component={Paper} className='clienteEmpr__table'>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell className='bold'> {t("clientLoan.book")} </TableCell>
                            <TableCell  className='bold' align="center"> {t("clientLoan.loanDate")} </TableCell>
                            <TableCell  className='bold'> {t("clientLoan.returnDate")} </TableCell>
                            <TableCell  className='bold' align="left"> {t("clientLoan.state")} </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {emprestimos.length ? emprestimos.map((empr) => (
                            <TableRow
                                key={empr.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" width={150}>
                                    {empr.nomeLivro}
                                </TableCell>
                                <TableCell align="center">{empr.dataEmprestimo}</TableCell>
                                <TableCell align="center">{empr.dataDevolucao}</TableCell>
                                <TableCell align="left">{empr.estado}</TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell colSpan={4} sx={{textAlign: 'center'}}> {t("clientLoan.warning")} </TableCell></TableRow>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </section>
     );
}

export default EmprestimosCliente;