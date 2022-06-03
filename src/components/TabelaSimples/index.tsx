import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './TabelaSimples.scss'

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

export default function TabelaSimples({ rows }: Props) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, border: '1px solid black' }} size="medium" aria-label="a table">
        <TableHead >
          <TableRow >
            <TableCell className='headCell'>ID</TableCell>
            <TableCell className='headCell' align="center">Valor</TableCell>
            <TableCell className='headCell' align="center">Tipo de Operação</TableCell>
            <TableCell className='headCell' align="center">Assunto</TableCell>
            <TableCell className='headCell' align="center">PDF</TableCell>
            <TableCell className='headCell' align="right">Data e hora</TableCell>
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
              <TableCell align="center">{row?.valor}</TableCell>
              <TableCell align="center">{row?.tipo}</TableCell>
              <TableCell align="center">{row?.assunto}</TableCell>
              <TableCell align="center">{row?.pdf}</TableCell>
              <TableCell align="right">{row?.datatime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
