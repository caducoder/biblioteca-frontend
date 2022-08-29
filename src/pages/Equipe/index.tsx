import './Equipe.scss'
import { useEffect, useState } from 'react';
import {
   Button,
   Tooltip,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   IconButton,
   InputLabel,
   OutlinedInput,
   InputAdornment,
   FormControl,
   Typography,
} from '@mui/material';
import { CgPassword } from 'react-icons/cg'
import { FaUserEdit, FaUserTimes, FaUserPlus } from "react-icons/fa";
import { MdOutlineSearch, MdOutlineClear, MdPictureAsPdf } from 'react-icons/md'
import { listarFuncionarios, IFuncionario, deletarFuncionario } from '../../api/FuncionarioService';
import ModalTrocarSenha from '../../components/ModalTrocarSenha';
import ModalConfirmar from '../../components/ModalConfirmar';
import { Alignment, PageSize } from 'pdfmake/interfaces';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt';
import pdfMake from 'pdfmake/build/pdfmake';
import { useNavigate } from 'react-router';

interface Column {
   id: 'id' | 'nome' | 'cpf' | 'email' | 'telefone' | 'acoes';
   label: string;
   minWidth?: number;
   align?: 'right' | 'center';
}

const columns: readonly Column[] = [
   { id: 'id', label: 'ID', minWidth: 50 },
   { id: 'nome', label: 'Nome', minWidth: 150 },
   { id: 'cpf', label: 'CPF', minWidth: 170 },
   { id: 'email', label: 'Email', minWidth: 170 },
   { id: 'telefone', label: 'Telefone', minWidth: 120 },
   { id: 'acoes', label: 'Ações', minWidth: 150, align: 'center' },
];

interface Data {
   id: number,
   nome: string,
   cpf: string,
   email: string,
   telefone: string,
   acoes: JSX.Element
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

export default function Equipe() {
   const navigate = useNavigate()
   const [busca, setBusca] = useState('');
   const [funcionarios, setFuncionarios] = useState<Data[]>([]);
   const [openConfirmModal, setOpenConfirmModal] = useState<{ open: boolean, id: number | null }>({ open: false, id: null });
   const handleOpen = (id: number) => setOpenConfirmModal({ open: true, id: id })
   const handleClose = () => setOpenConfirmModal({ open: false, id: null })
   const [openChangePasswModal, setChangePasswModal] = useState<{ open: boolean, id: number | null }>({ open: false, id: null });
   const handleOpenChangePass = (id: number) => setChangePasswModal({ open: true, id: id })
   const handleCloseChangePass = () => setChangePasswModal({ open: false, id: null })

   // função que remove funcionário ao confirmar
   const handleRemoveConfirm = (id: number) => {
      deletarFuncionario(id)
      // remove funcionario da lista
      const newList = funcionarios.filter(cliente => cliente.id !== id)
      setFuncionarios(newList)
      handleClose()
   }

   // efeito que busca os funcionários toda vez q a página é acessada
   useEffect(() => {
      const getFuncionarios = async () => {
         const list = await listarFuncionarios()
         // resposta vem com dois arrays, um de admin e outro de bibliotecários. Faço a junção dos arrays
         const arrBiblioAdmin = list[0].concat(list[1])
         popularTabela(arrBiblioAdmin)
      }

      getFuncionarios()
   }, []);

   // popula a tabela com os dados vindos do servidor
   const popularTabela = (funcionarios: Array<IFuncionario>) => {
      const linhas = funcionarios.map(funcionario => (
         createData(
            funcionario.id,
            funcionario.nome,
            funcionario.cpf,
            funcionario.email,
            funcionario.telefone,
            <div>
               <Tooltip title='Editar'>
                  <IconButton onClick={() => handleClickEdit(funcionario)}>
                     <FaUserEdit className='botao' size={30} />
                  </IconButton>
               </Tooltip>
               <Tooltip title='Deletar'>
                  <IconButton onClick={() => handleClickDelete(funcionario.id)}>
                     <FaUserTimes className='botao' size={30} />
                  </IconButton>
               </Tooltip>
               <Tooltip title='Mudar senha'>
                  <IconButton onClick={() => handleOpenChangePass(funcionario.id)}>
                     <CgPassword className='botao' size={30} />
                  </IconButton>
               </Tooltip>
            </div>
         )
      ))

      setFuncionarios(linhas)
   }

   const exportarLista = () => {
      const formatData = () => {
         let dt = funcionarios.map(fc => {
            return [fc.nome, fc.cpf, fc.email, fc.telefone]
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
            { text: 'Lista de funcionários', style: 'subheader', alignment: 'center' as Alignment },
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

   const handleClickEdit = (funcionario: IFuncionario) => {
      // navega para a página de edição  do funcionário
      navigate(`funcionario/${funcionario.cpf}`)
   }

   const handleClickDelete = (funcionarioId: number) => {
      // abre modal de confirmação de remoção
      handleOpen(funcionarioId)
   }

   const handleClickAdd = () => {
      // navega para a página de cadastro ao clicar em adicionar
      navigate('cadastro-funcionario')
   }

   const filteredEmployees = busca.length > 0
      ? funcionarios.filter(funcionario => funcionario.nome.toLowerCase().includes(busca.toLowerCase()))
      : []

   // limpa campo de busca
   const handleClickClear = () => {
      setBusca('')
   }

   return (
      <>
         <div className='title'>
            <Typography variant='h2'>Equipe</Typography>
         </div>

         <main className='group-equipe'>
            <div className='action_bar'>
               <div>
                  <Button variant='contained' startIcon={<FaUserPlus />} onClick={() => handleClickAdd()}>
                     ADICIONAR
                  </Button>
               </div>
               <div className='busca'>
                  <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined" size="small">
                     <InputLabel htmlFor="outlined-adornment-search">Buscar funcionário</InputLabel>
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
                        label="Buscar funcionário"
                     />
                  </FormControl>
               </div>
               <div>
                  <Button variant='contained' startIcon={<MdPictureAsPdf />} onClick={() => exportarLista()}>
                     EXPORTAR
                  </Button>
               </div>
            </div>

            <div className='table'>
               <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                     <Table size="small" aria-label="tabela de funcionários">
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
                           {busca.length > 0 ? filteredEmployees.length ? filteredEmployees
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
                              : <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center' }}>Não foram encontrados funcionários</TableCell></TableRow>
                              : (funcionarios
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
               </Paper>
            </div>
         </main>

         <ModalConfirmar
            title='Excluir funcionário'
            message='Tem certeza que quer excluir o funcionário selecionado?'
            open={openConfirmModal}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onConfirm={handleRemoveConfirm}
         />
         <ModalTrocarSenha
            open={openChangePasswModal}
            handleClose={handleCloseChangePass}
         />
      </>
   );
}