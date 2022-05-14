import {ReactComponent as WomanBookSVG} from '../../assets/book_lover.svg'
import MapSVG from '../../assets/map_dark.svg'
import EducSVG from '../../assets/education.svg'
import library_photo from '../../assets/imagem_biblioteca.jpg'
import './Homepage.scss'
import Botao from '../../components/Botao'
import { Typography } from '@mui/material'

function Homepage() {
   return ( 
      <>
         <section className='banner'>
            <div className='banner__info'>
               <h1 className='banner__title'>
                  Venha explorar o incrível mundo da leitura!
               </h1>
               <p className='banner__subtitle'>Mais de 10.000 exemplares a sua disposição</p>
               <Botao>Consultar Acervo</Botao>
            </div>
            <WomanBookSVG className='banner__svg' />
         </section>
         <section className='endereco'>
            <img src={MapSVG} className='endereco__map' alt='desenho de um mapa'/>
            <div className='endereco__info'>
               <Typography variant='h3' className='endereco__info__title'>Nossa Localização</Typography>
               <p>
                  Biblioteca XXXX <br/>
                  Rua Carlos Machado 133<br/>
                  Barra da Tijuca<br/>
                  Rio de Janeiro - RJ<br/>
                  CEP 22.775-042<br/>
                  Brasil
               </p>
            </div>
         </section>
         <section className='sobre'>
            <div className="sobre__info">
               <Typography variant='h3' className='sobre__info__title'>Sobre nós</Typography>
               <p>Somos uma biblioteca tradicional no Rio de Janeiro. </p>
               <p>Nosso acervo é composto por livros  de qualidade.</p>
               <p>Disponibilizamos espaços confortáveis para sua leitura.</p>
            </div>
            <img src={library_photo} className='sobre__imagem' alt="Foto do interior da biblioteca" />
         </section>
         <section className='acesso'>
            <img src={EducSVG} className='acesso__svg' alt='Desenho de uma moça em pé em cima de um livro' />
            <div className='acesso__info'>
               <h3 className='acesso__info__title'>Acesse nosso acervo e faça uma reserva!</h3>
               <Botao>Acessar Acervo</Botao>
            </div>
         </section>
         <footer className='rodape'>
            <div className='rodape__info'>
               <div>
                  <Typography variant='h4'>Contato</Typography>
                  <p>
                     <a href="tel:5521999999999"><strong>Telefone:</strong> (21) 99999-9999</a>
                  </p>
                  <p>
                     <a href="mailto:biblioteca@gmail.com.br"><strong>E-mail:</strong> biblioteca@gmail.com.br</a>
                  </p>
               </div>
               <div>
                  <p>
                     <span className='pointer'>Políticas de Privacidade</span> | <span className='pointer'>Termos de uso</span>
                  </p>
               </div>
            </div>
            <p>© 2022 Todos os direitos reservados.</p>
         </footer>
      </>
    );
}

export default Homepage;