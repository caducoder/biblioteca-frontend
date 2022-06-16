import './Fichario.scss';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FaUserEdit, FaUserTimes, FaUserPlus } from "react-icons/fa";
import { listarClientes, ICliente, deletarCliente } from '../../api/ClienteService';
import { useEffect, useState, ChangeEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { MdOutlineSearch, MdOutlineClear } from 'react-icons/md';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router';
import ModalConfirmar from '../../components/ModalConfirmar';

interface Column {
   id: 'id' | 'nome' | 'cpf' | 'email' | 'telefone' | 'acoes';
   label: string;
   minWidth?: number;
   align?: 'right' | 'center';
}

const columns: readonly Column[] = [
   { id: 'id', label: 'ID', minWidth: 30 },
   { id: 'nome', label: 'Nome', minWidth: 150 },
   { id: 'cpf', label: 'CPF', minWidth: 170 },
   { id: 'email', label: 'Email', minWidth: 170 },
   { id: 'telefone', label: 'Telefone', minWidth: 120 },
   { id: 'acoes', label: 'Ações', minWidth: 150, align: 'center' },
];

interface Data {
   id: number,
   nome: string;
   cpf: string;
   email: string;
   telefone: string;
   acoes: JSX.Element;
}

function createData(
   id: number,
   nome: string,
   cpf: string,
   email: string,
   telefone: string,
   acoes: JSX.Element,
   ): Data {
   return { id, nome, cpf, email, telefone, acoes};
}

export default function Fichario() {
   const [clientes, setclientes] = useState<Data[]>([]);
   const [clientesFiltrados, setClientesFiltrados] = useState<Data[]>([]);
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [busca, setBusca] = useState('');
   const navigate = useNavigate()
   const [openConfirmModal, setOpenConfirmModal] = useState<{open: boolean, id: number | null}>({open: false, id: null});
   const handleOpen = (id: number) => setOpenConfirmModal({open: true, id: id})
   const handleClose = () => setOpenConfirmModal({open: false, id: null})

   // mock para teste
   const mock = createData(
      99,
      'Teste',
      '11122233344',
      'user@gmail.com',
      '21988887777',
      <div>
         <FaUserEdit className='botao Edit' size={30} onClick={() => handleClickEdit({
            id: 99,
            nome: 'Teste',
            cpf: '11122233344',
            email: 'user@gmail.com',
            telefone: '21988887777'
         })}/>
         <FaUserTimes className='botao Delete' size={30} onClick={() => handleClickDelete(99)}/>
      </div>
   )

   const handleRemoveConfirm = (id: number) => {
      deletarCliente(id)
      const newList = clientesFiltrados.filter(cliente => cliente.id !== id)
      setClientesFiltrados(newList)
      handleClose()
   }

   useEffect(() => {
      const getClientes = async () => {
         popularTabela(await listarClientes())
      }

      getClientes()
   }, []);

   const popularTabela = (clientes: Array<ICliente>)  => {
      const linhas = clientes.map(cliente => (
         createData(
            cliente.id, 
            cliente.nome, 
            cliente.cpf, 
            cliente.email, 
            cliente.telefone,
            <div>
               <FaUserEdit className='botao Edit' size={30} onClick={() => handleClickEdit(cliente)}/>
               <FaUserTimes className='botao Delete' size={30} onClick={() => handleClickDelete(cliente.id)}/>
            </div> 
         )
      ))

      setclientes(linhas)
      setClientesFiltrados(linhas)
   }

   const handleClickEdit = (cliente: ICliente) => {
      navigate(`cliente/${cliente.id}`)
   }

   const handleClickDelete = (clienteId: number) => {
      handleOpen(clienteId)
   }

   const handleClickAdd = () => {
      navigate('cadastro-cliente')
   }

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

   const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   return (
      <>
         <div className='title'>
            <h1>Fichário</h1>
         </div>
         
         <main className='group-fichario'>
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
                  <Table stickyHeader aria-label="sticky table" size='small'>
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
                           : <TableRow><TableCell colSpan={7} sx={{textAlign: 'center'}}>Não foram encontrados clientes</TableCell></TableRow>
                        }
                     </TableBody>
                  </Table>
                  </TableContainer>
                  <TablePagination
                     labelRowsPerPage='Clientes por página:'
                     rowsPerPageOptions={[5, 10, 25, 50]}
                     component="div"
                     count={clientesFiltrados.length}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                  />
               </Paper>
            </div>
         </main>
         <div className='newCliente'>
            <h4 className='addCliente'>Adicione um novo cliente:</h4>
            <FaUserPlus className='botaoAdd' size={30} onClick={() => handleClickAdd()}/>
         </div>
         <ModalConfirmar 
            title='Excluir cliente'
            message='Tem certeza que quer excluir o cliente selecionado?' 
            open={openConfirmModal}
            handleOpen={handleOpen} 
            handleClose={handleClose}
            onConfirm={handleRemoveConfirm}
         />
      </>
   );
}