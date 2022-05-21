import BooksSVG from '../../assets/books.svg'
import BookmarkSVG from '../../assets/book-bookmark.svg'
import ReaderSVG from '../../assets/solid_book-reader.svg'
import UserSVG from '../../assets/user-multiple.svg'
import { Typography } from '@mui/material'
import './Dashboard.scss'

function Dashboard() {
   return ( 
      <>
         <section className='relatorios__title'>
            <Typography variant='h5'><br></br>Relatórios</Typography>
         </section>

         <div className='flex-container'>
            <section className='livrosCad'>
               <img src={BooksSVG} className='livrosCad__svg' alt='desenho de dois livros'/>
               <p>Livros Cadastrados: </p>
            </section>

            <section className='livrosRes'>
               <img src={BookmarkSVG} className='livrosRes__svg' alt='desenho de um livro com um marca página'/>
               <p>Livros Reservados: </p>
            </section>

            <section className='livrosEmp'>
               <img src={ReaderSVG} className='livrosEmp__svg' alt='desenho de um boneco com um livro'/>
               <p>Livros Emprestados: </p>
            </section>
         </div>
         <div className='flex-container2'>
            <section className='clientesCad'>
               <img src={UserSVG} className='clientesCad__svg' alt='desenho de dois bonecos'/>
               <p>Clientes Cadastrados: </p>
            </section>
         </div>
      </>
    );
}

export default Dashboard;