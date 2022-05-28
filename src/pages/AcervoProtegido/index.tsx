import './AcervoProtegido.scss'
import SearchSVG from '../../assets/search-small.svg'
import AddSVG from '../../assets/add-circle.svg'
import ChangesSVG from '../../assets/recent-changes.svg'
import RemoveSVG from '../../assets/remove-circle.svg'
import livros_foto from '../../assets/imagem_livros.jpg'

function AcervoProtegido() {
   return ( 
      <>
         <section className='sideNavigation'>
            <div className="sidenav">
               <h3>Gerencimanento do Acervo</h3>
               <a href="#"><img src={SearchSVG} className='search' alt='desenho de uma lupa'/>  Consultar Livro</a>
               <a href="#"><img src={AddSVG} className='add' alt='desenho de um círculo com um mais no meio'/>  Cadastrar Livro</a>
               <a href="#"><img src={ChangesSVG} className='changes' alt='desenho de linhas com um lápis'/>  Alterar Livro</a>
               <a href="#"><img src={RemoveSVG} className='remove' alt='desenho de um círculo com um menos no meio'/>  Remover Livro</a>
            </div>  
         </section>
         <section className='pageContent'>
            <div className="pagecon">
                  <img src={livros_foto} className='imagem' alt="Foto de uma estante de livros" />
                  <h2>Selecione uma opção.</h2>
            </div>
         </section>
      </>
    );
}

export default AcervoProtegido;