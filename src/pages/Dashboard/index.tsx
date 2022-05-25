import BooksSVG from '../../assets/books.svg'
import BookmarkSVG from '../../assets/book-bookmark.svg'
import ReaderSVG from '../../assets/solid_book-reader.svg'
import UserSVG from '../../assets/user-multiple.svg'
import { Typography } from '@mui/material'
import { contarLivros, contarReservas } from '../../api/LivroService'
import { contarClientes } from '../../api/ClienteService'
import { contarEmprestimos } from '../../api/EmprestimoService'
import './Dashboard.scss'
import { useState, useEffect, SetStateAction } from 'react'

function Dashboard() {
   const [numeroDeLivros, setNumeroDeLivros] = useState<any>();
   const [numeroDeClientes, setNumeroDeClientes] = useState<any>();
   const [numeroDeEmprestimos, setNumeroDeEmprestimos] = useState<any>();
   const [numeroDeReservas, setNumeroDeReservas] = useState<any>();

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
         <section className='relatorios__title'>
            <Typography variant='h5'><br></br>Relatórios</Typography>
         </section>

         <div className='flex-container'>
            <section className='livrosCad'>
               <img src={BooksSVG} className='livrosCad__svg' alt='desenho de dois livros'/>
               <p>Livros Cadastrados: <span className='numero'>{numeroDeLivros || 'N/A'}</span> </p>
            </section>

            <section className='livrosRes'>
               <img src={BookmarkSVG} className='livrosRes__svg' alt='desenho de um livro com um marca página'/>
               <p>Livros Reservados: <span className='numero'>{numeroDeReservas || 'N/A'}</span> </p>
            </section>

            <section className='livrosEmp'>
               <img src={ReaderSVG} className='livrosEmp__svg' alt='desenho de um boneco com um livro'/>
               <p>Livros Emprestados: <span className='numero'>{numeroDeEmprestimos || 'N/A'}</span> </p>
            </section>
         </div>
         <div className='flex-container2'>
            <section className='clientesCad'>
               <img src={UserSVG} className='clientesCad__svg' alt='desenho de dois bonecos'/>
               <p>Clientes Cadastrados: <span className='numero'>{numeroDeClientes || 'N/A'}</span> </p>
            </section>
         </div>
      </>
    );
}

export default Dashboard;