import './Alteracao.scss'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MdReadMore } from 'react-icons/md';
import { listarLivros, ILivro } from '../../../api/LivroService'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {MdOutlineSearch, MdOutlineClear} from 'react-icons/md'
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router';

interface Column {
   id: 'titulo' | 'autor' | 'editora' | 'estado' | 'detalhes';
   label: string;
   minWidth?: number;
   align?: 'right';
}

const columns: readonly Column[] = [
   { id: 'titulo', label: 'Título', minWidth: 200 },
   { id: 'autor', label: 'Autor', minWidth: 150 },
   { id: 'editora', label: 'Editora', minWidth: 170 },
   { id: 'estado', label: 'Estado', minWidth: 60, },
   { id: 'detalhes', label: 'Detalhes', minWidth: 120, align: 'right' },
];

interface Data {
   id: number,
   titulo: string;
   autor: string;
   editora: string;
   estado: string;
   detalhes: JSX.Element;
}

function createData(
   id: number,
   titulo: string,
   autor: string,
   editora: string,
   estado: string,
   detalhes: JSX.Element
   ): Data {
   return { id, titulo, autor, editora, estado, detalhes };
}

export default function Alteracao() {
   const [livros, setlivros] = useState<Data[]>();
   const [livrosFiltrados, setLivrosFiltrados] = useState<Data[]>();
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const [busca, setBusca] = useState('');
   const navigate = useNavigate()

   useEffect(() => {
      const getLivros = async () => {
         popularTabela(await listarLivros())
      }

      getLivros()
   }, []);

   const popularTabela = (livros: Array<ILivro>)  => {
      const linhas = livros.map(livro => (
         createData(livro.id, livro.titulo, livro.autor, livro.editora, livro.estadoLivro, <MdReadMore className='botaoDetalhes' size={30} onClick={() => handleClickDetails(livro)}/>)
      ))

      setlivros(linhas)
      setLivrosFiltrados(linhas)
   }

   const handleClickDetails = (livro: ILivro) => {
      navigate(`livro/${livro.id}`, {state: {...livro}})
   }

   const handleClickSearch = () => {
      const livrosFilter = livros?.filter(livro => livro.titulo.toLowerCase().includes(busca.toLowerCase()))
      setLivrosFiltrados(livrosFilter)
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
        <h2>Alterar Livro</h2>

        <main className='group'>
            <div className='busca'>
               <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined" size="small">
               <InputLabel htmlFor="outlined-adornment-search">Digite a ISBN</InputLabel>
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
                  label="Buscar livro"
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
                        {livrosFiltrados ? livrosFiltrados
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
                           : <div><p>Não foram encontrados livros</p></div>
                        }
                     </TableBody>
                  </Table>
                  </TableContainer>
                  <TablePagination
                     labelRowsPerPage='Livros por página:'
                     rowsPerPageOptions={[5, 10, 15]}
                     component="div"
                     count={livrosFiltrados ? livrosFiltrados.length : 0}
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