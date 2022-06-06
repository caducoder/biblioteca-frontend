import './AcervoProtegido.scss'
import SearchSVG from '../../assets/search-small.svg'
import AddSVG from '../../assets/add-circle.svg'
import RemoveSVG from '../../assets/remove-circle.svg'
import livros_foto from '../../assets/imagem_livros.jpg'
import { Outlet, Link } from 'react-router-dom'

function AcervoProtegido() {
   return ( 
      <>
         <section className='acervo_prot'>
            <div className="sidenav">
               <h3>Gerencimanento do Acervo</h3>
               <Link to='consulta'><img src={SearchSVG} className='search' alt='desenho de uma lupa'/>  Consultar Livro</Link>
               <Link to='cadastro'><img src={AddSVG} className='add' alt='desenho de um círculo com um mais no meio'/>  Cadastrar Livro</Link>
               <Link to='remover'><img src={RemoveSVG} className='remove' alt='desenho de um círculo com um menos no meio'/>  Remover Livro</Link>
            </div>  
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