import { useEffect } from 'react';
import { listarLivros } from '../../api/LivroService'

function AcervoPublico() {

   useEffect(() => {
      const getLivros = async () => {
         console.log(await listarLivros())
      }

      getLivros()
   }, []);

   return ( 
      <section>
         <h2>Nosso Acervo</h2>
      </section>
    );
}

export default AcervoPublico;