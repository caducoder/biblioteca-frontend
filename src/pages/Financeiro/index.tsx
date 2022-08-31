import { Button, Divider } from "@mui/material";
import TabelaFinanceiro from "../../components/TabelaFinanceiro";
import './Financeiro.scss'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { listarFinancas, Finance, buscarPdf } from "../../api/FinanceiroService";
import { useTranslation } from 'react-i18next'

export interface Data {
   id: number;
   valor: number;
   tipo: string;
   assunto: string;
   pdf: JSX.Element;
   datatime: string;
}

function createData(
   id: number,
   valor: number,
   tipo: string,
   assunto: string,
   pdf: JSX.Element,
   datatime: string
   ) {
   return { id, valor, tipo, assunto, pdf, datatime };
}

function Financeiro() {
   const [rows, setRows] = useState<Data[]>([]);

   // efeito que busca a lista de finanças todas vez que a página é acessada
   useEffect(() => {
      const getFinancas = async () => {
         popularTabela(await listarFinancas())
      }

      getFinancas()
   }, []);

   // função que popula a tabela com a resposta do servidor
   const popularTabela = (financas: Array<Finance>) => {
      const linhas = financas.map(fin => (
         createData(fin.id, fin.valor, fin.tipoOperacao, fin.assunto, <button className='pdfButton' onClick={() => showPDF(fin.id)}>Ver pdf</button>, fin.data)
      ))

      setRows(linhas)
   }

   // função que mostra pdf em outra janela
   const showPDF = async (id: number) => {
      // aguarda servidor enviar os dados do pdf
      const data = await buscarPdf(id)

      // pega o buffer de dados e cria um blob (Binary Large OBject)
      const file = new Blob([data], {
         type: 'application/pdf'
      })

      // cria a url e abre uma janela
      const fileURL = window.URL.createObjectURL(file)
      window.open(fileURL)
   }

   const { t } = useTranslation();
   return ( 
      <section className='financeiro_container'>
         <div className='cabecalho'>
            <h1 className="cabecalho__title"> {t("financial.title")} </h1>
            <Link to='importar' className='cabecalho__importButton no_style'>
               <Button  
                  variant='contained' 
                  startIcon={<MdOutlineAddCircleOutline />}
               >
                  {t("financial.import")} 
               </Button>
            </Link>
         </div>
         <Divider sx={{margin: '0 0 20px 0', borderColor: '#000'}}/>
         <TabelaFinanceiro rows={rows}/>
      </section>
    );
}

export default Financeiro;