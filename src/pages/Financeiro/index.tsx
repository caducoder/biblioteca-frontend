import { Button, Divider } from "@mui/material";
import TabelaSimples from "../../components/TabelaSimples";
import './Financeiro.scss'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { Link } from "react-router-dom";

function createData(
   id: number,
   valor: number,
   tipo: string,
   arquivo: string,
   pdf: string,
   datatime: string
 ) {
   return { id, valor, tipo, arquivo, pdf, datatime };
 }
 
 const rows = [
   createData(1, 22.90, 'Entrada', 'compra de livros', 'Ver pdf', '21/05/2020'),
   createData(2, 12.90, 'Saída', 'multa', 'Ver pdf', '20/09/2020'),
 ];

function Financeiro() {
   return ( 
      <section className='financeiro_container'>
         <div className='cabecalho'>
            <h1 className="cabecalho__title">Financeiro</h1>
            <Link to='importar' className='cabecalho__importButton'>
               <Button  
                  variant='contained' 
                  startIcon={<MdOutlineAddCircleOutline />}
               >
                  Importar
               </Button>
            </Link>
         </div>
         <Divider sx={{margin: '0 0 20px 0', borderColor: '#000'}}/>
         <TabelaSimples rows={rows}/>
      </section>
    );
}

export default Financeiro;