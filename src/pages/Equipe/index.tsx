import './Equipe.scss'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaUserEdit, FaUserTimes, FaUserPlus } from "react-icons/fa";
import { listarFuncionarios, IFuncionario } from '../../api/FuncionarioService';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {MdOutlineSearch, MdOutlineClear} from 'react-icons/md'
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router';

interface Column {
   id: 'id' | 'nome' | 'cpf' | 'email' | 'telefone' | 'tipo' | 'senha' | 'acoes';
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
   { id: 'tipo', label: 'Tipo', minWidth: 120 },
   { id: 'senha', label: 'Senha', minWidth: 120 },
   { id: 'acoes', label: 'Ações', minWidth: 150, align: 'center' },
];

interface Data {
   id: number,
   nome: string;
   cpf: number;
   email: string;
   telefone: string;
   tipo: string;
   senha: string;
   acoes: JSX.Element;
}

function createData(
   id: number,
   nome: string,
   cpf: number,
   email: string,
   telefone: string,
   tipo: string,
   senha: string,
   acoes: JSX.Element,
   ): Data {
   return { id, nome, cpf, email, telefone, tipo, senha, acoes};
}

export default function Equipe() {
   const [funcionarios, setfuncionarios] = useState<Data[]>();
   const [funcionariosFiltrados, setFuncionariosFiltrados] = useState<Data[]>();
   const [busca, setBusca] = useState('');
   const navigate = useNavigate()

   useEffect(() => {
      const getFuncionarios= async () => {
         popularTabela(await listarFuncionarios())
      }

      getFuncionarios()
   }, []);

   const popularTabela = (funcionarios: Array<IFuncionario>)  => {
      const linhas = funcionarios.map(funcionario => (
         createData(
            funcionario.id, 
            funcionario.nome, 
            funcionario.cpf, 
            funcionario.email, 
            funcionario.telefone,
            funcionario.tipo,
            funcionario.senha,
            <div>
               <FaUserEdit className='botaoEdit' size={30} onClick={() => handleClickEdit(funcionario)}/>
               <FaUserTimes className='botaoDelete' size={30} onClick={() => handleClickDelete(funcionario.id)}/>
            </div> 
         )
      ))

      
      setfuncionarios(linhas)
      setFuncionariosFiltrados(linhas)
   }

   const handleClickEdit = (funcionario: IFuncionario) => {
      // --vai ser rota para pág de edição
   }

   const handleClickDelete = (funcionarioId: number) => {
      // --chamar a função deletar funcionario
   }

   const handleClickAdd = () => {
      navigate('cadastro-funcionario')
   }

   const handleClickSearch = () => {
      const funcionariosFilter = funcionarios?.filter(funcionario => funcionario.nome.toLowerCase().includes(busca.toLowerCase()))
      setFuncionariosFiltrados(funcionariosFilter)
   }

   const handleClickClear = () => {
      setBusca('')
   }

   return (
      <>
         <div className='title'>
            <h1>Equipe</h1>
         </div>

         <main className='group-equipe'>
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
                        onClick={handleClickSearch}
                        edge="end"
                     >
                        {<MdOutlineSearch />}
                     </IconButton>
                  </InputAdornment>
                  }
                  label="Buscar funcionário"
               />
               </FormControl>
            </div>
            <div className='table'>
               <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                     <Table size="small" aria-label="a dense table">
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
                        {funcionariosFiltrados ? funcionariosFiltrados
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
                           : <TableRow><TableCell colSpan={7} sx={{textAlign: 'center'}}>Não foram encontrados funcionários</TableCell></TableRow>
                        }  
                     </TableBody>
                     </Table>
                  </TableContainer>
               </Paper>
            </div>
      </main>
      <div className='newFuncionario'>
         <h4 className='addFuncionario'>Adicione um novo funcionário:</h4>
         <FaUserPlus className='botaoAdd' size={30} onClick={() => handleClickAdd()}/>
      </div>
      </>
   );
}