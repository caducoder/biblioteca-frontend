import './AcervoPublico.scss';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MdReadMore } from 'react-icons/md';
import { listarLivros, ILivro } from '../../api/LivroService';
import { ChangeEvent, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {MdOutlineSearch, MdOutlineClear} from 'react-icons/md';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';

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

export default function AcervoPublico() {
   const [livros, setlivros] = useState<Data[]>();
   const [livrosFiltrados, setLivrosFiltrados] = useState<Data[]>();
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [busca, setBusca] = useState('');
   const navigate = useNavigate()

   // função que busca os livros toda vez q a página é acessada
   useEffect(() => {
      const getLivros = async () => {
         popularTabela(await listarLivros())
      }

      getLivros()
   }, []);

   // preenche a tabela com os dados do livro
   const popularTabela = (livros: Array<ILivro>)  => {
      const linhas = livros.map(livro => (
         createData(livro.id, livro.titulo, livro.autor, livro.editora, livro.estadoLivro, <MdReadMore className='botaoDetalhes' size={30} onClick={() => handleClickDetails(livro)}/>)
      ))

      setlivros(linhas)
      setLivrosFiltrados(linhas)
   }

   // navega para página de detalhes ao clicar no botão de detalhes
   const handleClickDetails = (livro: ILivro) => {
      navigate(`livro/${livro.id}`, {state: {...livro}})
   }

   // filtra os livros de acordo com a busca ao clicar na lupa
   const handleClickSearch = () => {
      const livrosFilter = livros?.filter(livro => livro.titulo.toLowerCase().includes(busca.toLowerCase()))
      setLivrosFiltrados(livrosFilter)
   }

   // limpa campo de busca
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
            <Typography variant='h2'>Nosso Acervo</Typography>
         </div>
         
         <main className='group-acervoPublico'>
            <div className='busca'>
               <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined" size="small">
               <InputLabel htmlFor="outlined-adornment-search">Buscar livro</InputLabel>
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
                           : <TableRow><TableCell colSpan={5} sx={{textAlign: 'center'}}>Não foram encontrados livros</TableCell></TableRow>
                        }
                     </TableBody>
                  </Table>
                  </TableContainer>
                  <TablePagination
                     labelRowsPerPage='Livros por página:'
                     rowsPerPageOptions={[10, 25, 50]}
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
