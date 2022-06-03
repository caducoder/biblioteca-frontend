import { useNavigate } from 'react-router-dom'
import Botao from '../../components/Botao';
import Barricada from '../../assets/barricada.png'
import './Unauthorized.scss'
import { Typography } from '@mui/material';

function Unauthorized() {
   const navigate = useNavigate()
   
   const goBack = () => navigate(-1)

   return (
      <section className='back'>
         <Typography variant='h4'>Você não tem permissão para acessar essa página.</Typography>
         <img src={Barricada} alt="desenho de uma barricada" />
         <Botao onClick={goBack}>Voltar</Botao>
      </section>
   );
}

export default Unauthorized;