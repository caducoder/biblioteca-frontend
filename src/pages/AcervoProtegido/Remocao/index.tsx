import './Remocao.scss'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { listarLivros, ILivro, removerLivro } from '../../../api/LivroService'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {MdOutlineSearch, MdOutlineClear, MdDelete} from 'react-icons/md'
import FormControl from '@mui/material/FormControl';
import ModalConfirmar from '../../../components/ModalConfirmar';
import { useTranslation } from 'react-i18next'

interface Column {
   id: 'titulo' | 'autor' | 'editora' | 'estado' | 'remover';
   label: string;
   minWidth?: number;
   align?: 'right';
}

const columns: readonly Column[] = [
   { id: 'titulo', label: 'Título', minWidth: 200 },
   { id: 'autor', label: 'Autor', minWidth: 150 },
   { id: 'editora', label: 'Editora', minWidth: 170 },
   { id: 'estado', label: 'Estado', minWidth: 60, },
   { id: 'remover', label: 'Remover', minWidth: 120, align: 'right' },
];

interface Data {
   id: number,
   titulo: string;
   autor: string;
   editora: string;
   estado: string;
   remover: JSX.Element;
}

function createData(
   id: number,
   titulo: string,
   autor: string,
   editora: string,
   estado: string,
   remover: JSX.Element
   ): Data {
   return { id, titulo, autor, editora, estado, remover };
}

export default function Remocao() {
   const [livros, setlivros] = useState<Data[]>([]);
   const [livrosFiltrados, setLivrosFiltrados] = useState<Data[]>([]);
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [busca, setBusca] = useState('');
   const [openConfirmModal, setOpenConfirmModal] = useState<{open: boolean, id: number | null}>({open: false, id: null});

   // abre o modal passando o id do livro
   const handleOpen = (id: number) => setOpenConfirmModal({open: true, id: id})
   const handleClose = () => setOpenConfirmModal({open: false, id: null})

   // ao confirmar a remoção, envia requisição para o servidor com o id do livro a ser removido
   const handleRemoveConfirm = (id: number) => {
      try {
         removerLivro(id)
         // filtra lista tirando livro que foi removido
         const newList = livrosFiltrados.filter(livro => livro.id !== id)
         setLivrosFiltrados(newList)
         handleClose()
      } catch (error) {
         console.log("ERRO", error)
      }
   }

   // efeito que busca os livros toda vez que a página é renderizada
   useEffect(() => {
      const getLivros = async () => {
         popularTabela(await listarLivros())
      }

      getLivros()
   }, []);

   // popula a tabela com os dados vindos do servidor
   const popularTabela = (livros: Array<ILivro>)  => {
      const linhas = livros.map(livro => (
         createData(livro.id, livro.titulo, livro.autor, livro.editora, livro.estadoLivro, <MdDelete className='botaoRemover' size={20} onClick={() => handleClickRemove(livro.id)}/>)
      ))

      setlivros(linhas)
      setLivrosFiltrados(linhas)
   }

   // abre janela de confirmação de remoção ao clicar no ícone de excluir
   const handleClickRemove = (id: number) => {
      handleOpen(id)
   }

   // filtra os livros de acordo com o título buscado
   const handleClickSearch = () => {
      const livrosFilter = livros.filter(livro => livro.titulo.toLowerCase().includes(busca.toLowerCase()))
      setLivrosFiltrados(livrosFilter)
   }

   // limpa campo de busca
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

   const { t } = useTranslation();
   return (
      <>
        <h2> {t("removal.title")} </h2>

        <main className='group-remocao'>
            <div className='busca'>
               <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined" size="small">
               <InputLabel htmlFor="outlined-adornment-search"> {t("removal.book")} </InputLabel>
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
                  label={t("removal.search")}
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
                           : <div><p> {t("removal.warning")} </p></div>
                        }
                     </TableBody>
                  </Table>
                  </TableContainer>
                  <TablePagination
                     labelRowsPerPage={t("removal.perPage")}
                     rowsPerPageOptions={[5, 10, 15]}
                     component="div"
                     count={livrosFiltrados.length}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                  />
               </Paper>
            </div>
            <ModalConfirmar 
               title={t("removal.delete")}
               message={t("removal.confirm")} 
               open={openConfirmModal}
               handleOpen={handleOpen} 
               handleClose={handleClose}
               onConfirm={handleRemoveConfirm}
            />
        </main>
      </>
   );
}