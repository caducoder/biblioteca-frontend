import './Consulta.scss'
import { buscarPorCodigo, ILivro } from '../../../api/LivroService'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import {MdOutlineSearch, MdOutlineClear} from 'react-icons/md'
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router';
import Livro from '../../../components/Livro';
import { useTranslation } from 'react-i18next'

export default function Consulta() {
   const [livro, setLivro] = useState<ILivro | undefined>(undefined);
   const [busca, setBusca] = useState('');
   const [msg, setMsg] = useState('');
   const navigate = useNavigate()

   // função que dispara a busca pelo código do livro
   const handleClickSearch = async () => {
      try {
         // faz a requisição ao servidor e aguarda resposta
         const livro = await buscarPorCodigo(busca)
         setLivro(livro)
      } catch (error) {
         setLivro(undefined)
         setMsg('Livro não encontrado')
      }
   }

   const handleClickConfirm = () => {
      handleClickClear()
   }

   // limpa o campo de busca e tira o livro
   const handleClickClear = () => {
      setLivro(undefined)
      setBusca('')
      setMsg('')
   }

   const { t } = useTranslation();
   return (
      <>
         <h2> {t("query.title")} </h2>

         <main className='group'>
            <div className='busca'>
               <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined" size="small">
               <InputLabel htmlFor="outlined-adornment-search">  {t("query.search")} </InputLabel>
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
                  label="Digite a ISBN/ISSN"
               />
               </FormControl>
            </div>
            {livro ? <Livro livro={livro} handleClickConfirm={handleClickConfirm}/> : <p>{msg}</p>}
         </main>
      </>
   );
}