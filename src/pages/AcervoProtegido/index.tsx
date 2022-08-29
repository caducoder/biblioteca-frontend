import './AcervoProtegido.scss'
import livros_foto from '../../assets/imagem_livros.jpg'
import { Outlet, Link } from 'react-router-dom'
import {MdOutlineAddCircle, MdOutlineRemoveCircle, MdOutlineSearch} from 'react-icons/md'
import {
   Box,
   List,
   ListItemButton,
   ListItemText,
   ListItemIcon

} from '@mui/material'
import { useState } from 'react'

function AcervoProtegido() {
   const [selectedIndex, setSelectedIndex] = useState<number>();

   const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
   ) => {
      setSelectedIndex(index);
   }

   return (
      <>
         <section className='acervo_prot'>
            <Box 
               className='sidenav'
               sx={{ 
                  maxWidth: 230, 
                  backgroundColor: 'primary.dark',
                  minHeight: '100vh',
                  width: '100%',
                  color: 'white'
               }}
            >
               <h3>Gerencimanento do Acervo</h3>
               <List component='nav'>
                  <Link to='consulta'>
                     <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={ev => handleListItemClick(ev, 0)}
                     >
                        <ListItemIcon>
                           <MdOutlineSearch size={20} color='white'/>
                        </ListItemIcon>
                        <ListItemText primary="Consultar Livro" />  
                     </ListItemButton>
                  </Link>
                  <Link to='cadastro'>
                     <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={ev => handleListItemClick(ev, 1)}
                     >
                        <ListItemIcon>
                           <MdOutlineAddCircle size={20} color='white'/>
                        </ListItemIcon>
                        <ListItemText primary="Cadastrar Livro" /> 
                     </ListItemButton>
                  </Link>
                  <Link to='remover'>
                     <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={ev => handleListItemClick(ev, 2)}
                     >
                        <ListItemIcon>
                           <MdOutlineRemoveCircle size={20} color='white'/>
                        </ListItemIcon>
                        <ListItemText primary="Remover Livro" /> 
                     </ListItemButton>
                  </Link>
               </List>
            </Box>
            <div className='pageContent'>
               <div className="pagecon">
                  <img src={livros_foto} className='imagem' alt="Foto de uma estante de livros" />
               </div>
               <div className='conteudo'>
                  <Outlet />
               </div>
            </div>
         </section>
      </>
   );
}

export default AcervoProtegido;