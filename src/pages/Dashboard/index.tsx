import BooksSVG from '../../assets/books.svg'
import BookmarkSVG from '../../assets/book-bookmark.svg'
import ReaderSVG from '../../assets/solid_book-reader.svg'
import UserSVG from '../../assets/user-multiple.svg'
import { Typography, Card, useTheme  } from '@mui/material'
import { contarLivros, contarReservas } from '../../api/LivroService'
import { contarClientes } from '../../api/ClienteService'
import { contarEmprestimos } from '../../api/EmprestimoService'
import './Dashboard.scss'
import { useState, useEffect } from 'react'
import Botao from '../../components/Botao'
import { Link } from 'react-router-dom'

function Dashboard() {
   const [numeroDeLivros, setNumeroDeLivros] = useState<number>();
   const [numeroDeClientes, setNumeroDeClientes] = useState<number>();
   const [numeroDeEmprestimos, setNumeroDeEmprestimos] = useState<number>();
   const [numeroDeReservas, setNumeroDeReservas] = useState<number>();
   const theme = useTheme();
   let svgColor = theme.palette.mode === 'dark' ? 1 : 0;

   //função que busca os dados toda vez que a página é acessada
   useEffect(() => {
      const getTotal = async () => {
         // faz as requisições de uma vez só, bem mais rápido
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
            <Card className='livrosCad'>
               <img src={BooksSVG} style={{filter: `invert(${svgColor})`}} className='svg' alt='desenho de dois livros'/>
               <p>Livros Cadastrados: <span className='numero'>{numeroDeLivros || 'N/A'}</span> </p>
               {/* <a href="#">Ver relatório</a> */}
            </Card>

            <Card className='livrosRes'>
               <img src={BookmarkSVG} style={{filter: `invert(${svgColor})`}} className='svg' alt='desenho de um livro com um marca página'/>
               <p>Livros Reservados: <span className='numero'>{numeroDeReservas || 'N/A'}</span> </p>
               {/* <a href="#">Ver relatório</a> */}
            </Card>

            <Card className='livrosEmp'>
               <img src={ReaderSVG} style={{filter: `invert(${svgColor})`}} className='svg' alt='desenho de um boneco com um livro'/>
               <p>Livros Emprestados: <span className='numero'>{numeroDeEmprestimos || 'N/A'}</span> </p>
               {/* <a href="#">Ver relatório</a> */}
            </Card>
            <Card className='clientesCad'>
               <img src={UserSVG} style={{filter: `invert(${svgColor})`}} className='svg' alt='desenho de dois bonecos'/>
               <p>Clientes Cadastrados: <span className='numero'>{numeroDeClientes || 'N/A'}</span> </p>
            </Card>
            <Card className='actions-box'>
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
            </Card>
         </section>
      </>
    );
}

export default Dashboard;