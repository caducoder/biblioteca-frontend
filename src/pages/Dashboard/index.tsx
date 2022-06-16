import BooksSVG from '../../assets/books.svg'
import BookmarkSVG from '../../assets/book-bookmark.svg'
import ReaderSVG from '../../assets/solid_book-reader.svg'
import UserSVG from '../../assets/user-multiple.svg'
import { Typography } from '@mui/material'
import { contarLivros, contarReservas } from '../../api/LivroService'
import { contarClientes } from '../../api/ClienteService'
import { contarEmprestimos } from '../../api/EmprestimoService'
import './Dashboard.scss'
import { useState, useEffect } from 'react'
import Botao from '../../components/Botao'
import { Link } from 'react-router-dom'

function Dashboard() {
   const [numeroDeLivros, setNumeroDeLivros] = useState<any>();
   const [numeroDeClientes, setNumeroDeClientes] = useState<any>();
   const [numeroDeEmprestimos, setNumeroDeEmprestimos] = useState<any>();
   const [numeroDeReservas, setNumeroDeReservas] = useState<any>();

   //função que busca os dados toda vez que a página é acessada
   useEffect(() => {
      const getTotal = async () => {
         const [numLivros, numClientes, numEmpr, numReservas] = await Promise.all([
            contarLivros(), contarClientes(), contarEmprestimos(), contarReservas()
         ])
         setNumeroDeLivros(numLivros)
         setNumeroDeClientes(numClientes)
         setNumeroDeEmprestimos(numEmpr)
         setNumeroDeReservas(numReservas)
      }

      getTotal()
   }, []);

   return ( 
      <>
         <div className='relatorios__title'>
            <Typography variant='h4'><br />Dashboard</Typography>
         </div>

         <section className='grid-container'>
            <div className='livrosCad'>
               <img src={BooksSVG} className='svg' alt='desenho de dois livros'/>
               <p>Livros Cadastrados: <span className='numero'>{numeroDeLivros || 'N/A'}</span> </p>
               {/* <a href="#">Ver relatório</a> */}
            </div>

            <div className='livrosRes'>
               <img src={BookmarkSVG} className='svg' alt='desenho de um livro com um marca página'/>
               <p>Livros Reservados: <span className='numero'>{numeroDeReservas || 'N/A'}</span> </p>
               {/* <a href="#">Ver relatório</a> */}
            </div>

            <div className='livrosEmp'>
               <img src={ReaderSVG} className='svg' alt='desenho de um boneco com um livro'/>
               <p>Livros Emprestados: <span className='numero'>{numeroDeEmprestimos || 'N/A'}</span> </p>
               {/* <a href="#">Ver relatório</a> */}
            </div>
            <div className='clientesCad'>
               <img src={UserSVG} className='svg' alt='desenho de dois bonecos'/>
               <p>Clientes Cadastrados: <span className='numero'>{numeroDeClientes || 'N/A'}</span> </p>
            </div>
            <div className='actions-box'>
               <h3>Ações</h3>
               <div className='buttons'>
                  <div className='empr'>  
                     <Link to='/emprestimo'>
                        <Botao>Realizar Emprestimo</Botao>
                     </Link>          
                  </div>
                  <div className='dev'>
                     <Link to='/devolucao'>
                        <Botao>Devolução/Renovação</Botao>
                     </Link>
                  </div>
                  <div className='clie'>
                     <Link to='/relatorios'>
                        <Botao>Relatórios</Botao>
                     </Link>
                  </div>
                  <div className='res'>
                     <Link to='/acervo'>
                        <Botao>Realizar Reserva</Botao>
                     </Link>
                  </div>
               </div>
            </div>
         </section>
      </>
    );
}

export default Dashboard;