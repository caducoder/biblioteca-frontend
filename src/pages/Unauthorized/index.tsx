import { useNavigate } from 'react-router-dom'
import Botao from '../../components/Botao';
import Barricada from '../../assets/barricada.png'
import './Unauthorized.scss'
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next'

function Unauthorized() {
   const navigate = useNavigate()
   
   // volta para página anterior
   const goBack = () => navigate(-1)

   const { t } = useTranslation();
   return (
      <section className='back'>
         <Typography variant='h4'> {t("unauthorized.warning")} </Typography>
         <img src={Barricada} alt="desenho de uma barricada" />
         <Botao onClick={goBack}> {t("unauthorized.goBack")} </Botao>
      </section>
   );
}

export default Unauthorized;