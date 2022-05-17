import { useNavigate } from 'react-router-dom'

function Unauthorized() {
   const navigate = useNavigate()
   
   const goBack = () => navigate(-1)

   return (
      <section>
         <h3>Você não tem permissão para acessar essa página.</h3>
         <br />
         <button onClick={goBack}>Voltar</button>
      </section>
   );
}

export default Unauthorized;