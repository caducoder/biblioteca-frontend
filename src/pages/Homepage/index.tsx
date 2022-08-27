import {ReactComponent as WomanBookSVG} from '../../assets/book_lover.svg'
import MapSVG from '../../assets/map_dark.svg'
import EducSVG from '../../assets/education.svg'
import library_photo from '../../assets/imagem_biblioteca.jpg'
import './Homepage.scss'
import Botao from '../../components/Botao'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Homepage() {
   const { t } = useTranslation();
   return ( 
      <>
         <section className='banner'>
            <div className='banner__info'>
               <h1 className='banner__title'>
                  {t("homepage.title")}
               </h1>
               <p className='banner__subtitle'>{t("homepage.subtitle")}</p>
               <Link to='/acervo' className='no_style'>
                  <Botao>{t("homepage.consultCollection")}</Botao>
               </Link>
            </div>
            <WomanBookSVG className='banner__svg' />
         </section>
         <section className='endereco'>
            <img src={MapSVG} className='endereco__map' alt='desenho de um mapa'/>
            <div className='endereco__info'>
               <Typography variant='h3' className='endereco__info__title'>{t("homepage.localization")}</Typography>
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
               <Typography variant='h3' className='sobre__info__title'>{t("homepage.aboutUs")}</Typography>
               <p>{t("homepage.aboutUsText.1")}</p>
               <p>{t("homepage.aboutUsText.2")}</p>
               <p>{t("homepage.aboutUsText.3")}</p>
            </div>
            <img src={library_photo} className='sobre__imagem' alt="Foto do interior da biblioteca" />
         </section>
         <section className='acesso'>
            <img src={EducSVG} className='acesso__svg' alt='Desenho de uma moça em pé em cima de um livro' />
            <div className='acesso__info'>
               <h3 className='acesso__info__title'>{t("homepage.actionPhrase")}</h3>
               <Link to='/acervo' className='no_style'>
                  <Botao>{t("homepage.accessCollection")}</Botao>
               </Link>
            </div>
         </section>
         <footer className='rodape'>
            <div className='rodape__info'>
               <div>
                  <Typography variant='h4'>{t("homepage.contact")}</Typography>
                  <p>
                     <a href="tel:5521999999999"><strong>{t("homepage.cellPhone")}:</strong> (21) 99999-9999</a>
                  </p>
                  <p>
                     <a href="mailto:biblioteca@gmail.com.br"><strong>E-mail:</strong> biblioteca@gmail.com.br</a>
                  </p>
               </div>
               <div>
                  <p>
                     <span className='pointer'>{t("homepage.privacyPolicy")}</span> | <span className='pointer'>{t("homepage.terms")}</span>
                  </p>
               </div>
            </div>
            <p>© 2022 {t("homepage.rights")}</p>
         </footer>
      </>
    );
}

export default Homepage;