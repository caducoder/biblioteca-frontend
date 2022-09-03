import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './TabelaFinanceiro.scss'
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

interface Data {
  id: number,
  valor: number,
  tipo: string,
  assunto: string,
  pdf: JSX.Element,
  datatime: string
}

interface Props {
  rows: Data[]
}

export default function TabelaFinanceiro({ rows }: Props) {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, border: '1px solid black' }} size="medium" aria-label="a table">
        <TableHead >
          <TableRow >
            <TableCell className='headCell'>ID</TableCell>
            <TableCell className='headCell' align="center">{t("table.value")}</TableCell>
            <TableCell className='headCell' align="center">{t("table.opType")}</TableCell>
            <TableCell className='headCell' align="center">{t("table.subject")}</TableCell>
            <TableCell className='headCell' align="center">{t("table.pdf")}</TableCell>
            <TableCell className='headCell' align="right">{t("table.datetime")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">R$ {row.valor}</TableCell>
              <TableCell align="center">
                <span className={row.tipo == 'saida'? 'red' : 'green'}>{row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1)}</span>
              </TableCell>
              <TableCell align="center">{row.assunto}</TableCell>
              <TableCell align="center">{row.pdf}</TableCell>
              <TableCell align="right">
                {format(new Date(row.datatime), 'dd/MM/yyyy')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
