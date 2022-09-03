import './Fichario.scss';
import { useEffect, useState, ChangeEvent } from 'react';
import {
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TablePagination,
   TableRow,
   Button,
   IconButton,
   InputLabel,
   OutlinedInput,
   InputAdornment,
   FormControl,
   Typography
} from '@mui/material';
import { MdOutlineSearch, MdOutlineClear, MdPictureAsPdf } from 'react-icons/md';
import { FaUserEdit, FaUserTimes, FaUserPlus } from "react-icons/fa";
import { listarClientes, ICliente, deletarCliente } from '../../api/ClienteService';
import ModalConfirmar from '../../components/ModalConfirmar';
import { useNavigate } from 'react-router';
import pdfMake from "pdfmake/build/pdfmake";
import { Alignment, PageSize } from 'pdfmake/interfaces';
import pt from 'date-fns/locale/pt';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next'

interface Column {
   id: 'id' | 'nome' | 'cpf' | 'email' | 'telefone' | 'acoes';
   label: string;
   minWidth?: number;
   align?: 'right' | 'center';
}

const columns: readonly Column[] = [
   { id: 'id', label: 'id', minWidth: 30 },
   { id: 'nome', label: 'name', minWidth: 150 },
   { id: 'cpf', label: 'cpf', minWidth: 170 },
   { id: 'email', label: 'email', minWidth: 170 },
   { id: 'telefone', label: 'phone', minWidth: 120 },
   { id: 'acoes', label: 'actions', minWidth: 150, align: 'center' },
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
   return { id, nome, cpf, email, telefone, acoes };
}

export default function Fichario() {
   const navigate = useNavigate()
   const [clientes, setClientes] = useState<Data[]>([]);
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [busca, setBusca] = useState('');
   const [openConfirmModal, setOpenConfirmModal] = useState<{ open: boolean, id: number | null }>({ open: false, id: null });
   const handleOpen = (id: number) => setOpenConfirmModal({ open: true, id: id })
   const handleClose = () => setOpenConfirmModal({ open: false, id: null })

   // deleta cliente ao confirmar
   const handleRemoveConfirm = (id: number) => {
      deletarCliente(id)
      // remove cliente da lista
      const newList = clientes.filter(cliente => cliente.id !== id)
      setClientes(newList)
      handleClose()
   }

   // efeito que busca clientes toda vez que acessar a página
   useEffect(() => {
      const getClientes = async () => {
         popularTabela(await listarClientes())
      }

      getClientes()
   }, []);

   const popularTabela = (clientes: Array<ICliente>) => {
      const linhas = clientes.map(cliente => (
         createData(
            cliente.id,
            cliente.nome,
            cliente.cpf,
            cliente.email,
            cliente.telefone,
            <div>
               <IconButton onClick={() => handleClickEdit(cliente)}>
                  <FaUserEdit className='botao Edit' size={30} />
               </IconButton>
               <IconButton onClick={() => handleClickDelete(cliente.id)}>
                  <FaUserTimes className='botao Delete' size={30} />
               </IconButton>
            </div>
         )
      ))

      setClientes(linhas)
   }

   const exportarLista = () => {
      const formatData = () => {
         let dt = clientes.map(cliente => {
            return [cliente.nome, cliente.cpf, cliente.email, cliente.telefone]
         })

         return dt
      }

      let docDefinition = {
         pageSize: 'A4' as PageSize,
         footer: function (currentPage: any, pageCount: number) {
            return [
               { text: currentPage.toString() + '/' + pageCount, alignment: 'right' as Alignment, margin: 20 }
            ]
         },
         content: [
            { text: 'Biblioteca', style: 'header', alignment: 'left' as Alignment, fontSize: 26 },
            '\n',
            { text: 'Lista de usuários', style: 'subheader', alignment: 'center' as Alignment },
            '\n',
            {
               table: {
                  widths: ['*', 'auto', '*', '*'],
                  headerRows: 1,
                  body: [
                     [{ text: 'Nome', style: 'tableHeader' }, { text: 'CPF', style: 'tableHeader' }, { text: 'E-mail', style: 'tableHeader' }, { text: 'Telefone', style: 'tableHeader' }],
                     ...formatData()
                  ]
               },
               layout: 'lightHorizontalLines'
            },
            '\n',
            { text: format(new Date(), "'Rio, ' dd 'de' MMMM 'de' yyyy'", { locale: pt }), alignment: 'right' as Alignment },
         ],
         styles: {
            header: {
               fontSize: 26,
               bold: true
            },
            subheader: {
               fontSize: 14
            },
            tableHeader: {
               bold: true,
               fontSize: 12
            },
         }
      }
      pdfMake.createPdf(docDefinition).open()
   }

   const handleClickEdit = (cliente: ICliente) => {
      // navega para página de edição do cliente ao clicar no ícone de editar
      navigate(`cliente/${cliente.id}`)
   }

   const handleClickDelete = (clienteId: number) => {
      // abre modal de confirmação de remoção ao clicar no icone de remover
      handleOpen(clienteId)
   }

   const handleClickAdd = () => {
      // navega para página de cadastro ao clicar no icone de adicionar cadastro
      navigate('cadastro-cliente')
   }

   // variável contendo a lista de cliente filtrada
   const filteredUsers = busca.length > 0
      ? clientes.filter(cliente => cliente.nome.toLowerCase().includes(busca.toLowerCase()))
      : []

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

   const { t } = useTranslation();
   return (
      <>
         <div className='title'>
            <Typography variant='h2'> {t("binder.title")} </Typography>
         </div>

         <main className='group-fichario'>
            <div className='action_bar'>
               <div>
                  <Button
                     onClick={() => handleClickAdd()}
                     variant='contained'
                     startIcon={<FaUserPlus />}
                  >
                     {t("binder.add")}
                  </Button>
               </div>
               <div className='busca'>
                  <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined" size="small">
                     <InputLabel htmlFor="outlined-adornment-search"> {t("binder.search")} </InputLabel>
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
                                 edge="end"
                                 disabled
                              >
                                 {<MdOutlineSearch />}
                              </IconButton>
                           </InputAdornment>
                        }
                        label={t("binder.search")}
                     />
                  </FormControl>
               </div>
               <div>
                  <Button variant='contained' startIcon={<MdPictureAsPdf />} onClick={() => exportarLista()}> {t("binder.export")} </Button>
               </div>
            </div>
            <div className='table'>
               <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                     <Table stickyHeader aria-label="tabela de clientes" size='small'>
                        <TableHead>
                           <TableRow>
                              {columns.map((column) => (
                                 <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                 >
                                    {t(`table.${column.label}`)}
                                 </TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {busca.length > 0 ? filteredUsers.length > 0 ? filteredUsers
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
                              : <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center' }}> {t("binder.warning")} </TableCell></TableRow>
                              : (clientes
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
                              )
                           }
                        </TableBody>
                     </Table>
                  </TableContainer>
                  <TablePagination
                     labelRowsPerPage={t("binder.perPage")}
                     rowsPerPageOptions={[5, 10, 25, 50]}
                     component="div"
                     count={clientes.length}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                  />
               </Paper>
            </div>
         </main>

         <ModalConfirmar
            title={t("binder.delete")}
            message={t("binder.confirm")}
            open={openConfirmModal}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onConfirm={handleRemoveConfirm}
         />
      </>
   );
}