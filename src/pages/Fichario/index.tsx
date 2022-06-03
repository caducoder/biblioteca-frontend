import './Fichario.scss'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
//import { MdReadMore } from 'react-icons/md';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { listarClientes, Cliente } from '../../api/ClienteService';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {MdOutlineSearch, MdOutlineClear} from 'react-icons/md'
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router';

interface Column {
   id: 'id' | 'nome' | 'sobrenome' | 'cpf' | 'email' | 'telefone' | 'acoes';
   label: string;
   minWidth?: number;
   align?: 'right';
}

const columns: readonly Column[] = [
   { id: 'id', label: 'ID', minWidth: 200 },
   { id: 'nome', label: 'Nome', minWidth: 150 },
   { id: 'sobrenome', label: 'Sobrenome', minWidth: 170 },
   { id: 'cpf', label: 'CPF', minWidth: 60, },
   { id: 'email', label: 'Email', minWidth: 120, align: 'right' },
   { id: 'telefone', label: 'Telefone', minWidth: 120, align: 'right' },
   { id: 'acoes', label: 'Ações', minWidth: 120, align: 'right' },
];

interface Data {
   id: number,
   nome: string;
   sobrenome: string;
   cpf: number;
   email: string;
   telefone: string;
   acoes: JSX.Element;
}

function createData(
   id: number,
   nome: string,
   sobrenome: string,
   cpf: number,
   email: string,
   telefone: string,
   acoes: JSX.Element
   ): Data {
   return { id, nome, sobrenome, cpf, email, telefone, acoes };
}

export default function Fichario() {
   const [clientes, setclientes] = useState<Data[]>();
   const [clientesFiltrados, setClientesFiltrados] = useState<Data[]>();
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [busca, setBusca] = useState('');
   const navigate = useNavigate()

   useEffect(() => {
      const getClientes = async () => {
         popularTabela(await listarClientes())
      }

      getClientes()
   }, []);

   const popularTabela = (clientes: Array<Cliente>)  => {
      const linhas = clientes.map(cliente => (
         createData(cliente.id, cliente.nome, cliente.sobrenome, cliente.cpf, cliente.email, cliente.telefone, /*<MdReadMore className='botaoDetails' size={30} onClick={() => handleClickDetails(cliente)}/> */)
      ))

      setclientes(linhas)
      setClientesFiltrados(linhas)
   }

   /*const handleClickDetails = (cliente: Cliente) => {
      navigate(`cliente/${cliente.id}`, {state: {...cliente}})
   }*/

   const handleClickSearch = () => {
      const clientesFilter = clientes?.filter(cliente => cliente.nome.toLowerCase().includes(busca.toLowerCase()))
      setClientesFiltrados(clientesFilter)
   }

   const handleClickClear = () => {
      setBusca('')
   }

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   return (
      <>
         <div className='title'>
            <h1>Fichário</h1>
         </div>
         
         <main className='group'>
            <div className='busca'>
               <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined" size="small">
               <InputLabel htmlFor="outlined-adornment-search">Buscar cliente</InputLabel>
               <OutlinedInput
                  id="outlined-adornment-search"
                  type='text'
                  value={busca}
                  onChange={ev => setBusca(ev.target.value)}
                  endAdornment={
                  <InputAdornment position="end">
                     {busca ? 
                        <IconButton
                           aria-label="clear button"
                           onClick={handleClickClear}
                           edge="end"
                        >
                           {<MdOutlineClear />}
                        </IconButton>
                        : ''
                     }
                     
                     <IconButton
                        aria-label="search button"
                        onClick={handleClickSearch}
                        edge="end"
                     >
                        {<MdOutlineSearch />}
                     </IconButton>
                  </InputAdornment>
                  }
                  label="Buscar cliente"
               />
               </FormControl>
            </div>
            <div className='table'>
               <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                     <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                           <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                           >
                              {column.label}
                           </TableCell>
                        ))}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {clientesFiltrados ? clientesFiltrados
                           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                           .map((row) => {
                              return (
                                 <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                 {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                       <TableCell key={column.id} align={column.align}>
                                       {value}
                                       </TableCell>
                                    );
                                 })}
                                 </TableRow>
                              );
                           })
                           : <div><p>Não foram encontrados clientes</p></div>
                        }
                     </TableBody>
                  </Table>
                  </TableContainer>
                  <TablePagination
                     labelRowsPerPage='Clientes por página:'
                     rowsPerPageOptions={[10, 25, 50]}
                     component="div"
                     count={clientesFiltrados ? clientesFiltrados.length : 0}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                  />
               </Paper>
            </div>
         </main>
      </>
   );
}