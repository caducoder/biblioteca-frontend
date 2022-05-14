import {ReactComponent as WomanBookSVG} from '../../assets/book_lover.svg'
import './Homepage.scss'

function Homepage() {
   return ( 
      <section className='banner'>
         <div>
            <h1 className='banner__title'>
               Venha explorar o incrível mundo da leitura!
            </h1>
            <p className='banner__subtitle'>Mais de 10.000 exemplares a sua disposição</p>
            <button>Consultar Acervo</button>
         </div>
         <WomanBookSVG className='banner__svg' />
      </section>
    );
}

export default Homepage;