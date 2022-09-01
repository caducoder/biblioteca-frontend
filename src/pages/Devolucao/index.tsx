import { TextField } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { RiQrScan2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getEmprestimo, IEmprestimo } from "../../api/EmprestimoService";
import Botao from "../../components/Botao";
import EmprestimoDetails from "../../components/EmprestimoDetails";
import './Devolucao.scss'
import { useTranslation } from 'react-i18next'

function Devolucao() {
    const [codigoLivro, setCodigoLivro] = useState('');
    const [emprestimo, setEmprestimo] = useState<IEmprestimo | null>(null);
    const [msg, setMsg] = useState('');

    const buscarEmprestimo = async () => {
        try {
            // busca empréstimo no servidor
            const response = await getEmprestimo(codigoLivro)
            setCodigoLivro('')
            setEmprestimo(response)
        } catch (error: any) {
            setMsg(error?.response?.data)
        }
        
    }

    // apaga mensagem de feedback ao alterar o código do livro no campo
    useEffect(() => {
        setMsg('')
    }, [codigoLivro]);

    const { t } = useTranslation();
    return ( 
        <section className="container">
            <div className='container__bread'>
                <Breadcrumbs separator='>' aria-label="breadcrumb">
                    <Link to='/dashboard' className="no_style">
                        <Typography color="text.secondary"> {t("retrun.title")} </Typography>
                    </Link>
                    <Typography color="text.primary"> {t("retrun.performReturn")} </Typography>
                </Breadcrumbs>
            </div>
            <div className="buscaEmprestimo">
                {emprestimo ?  <EmprestimoDetails emprestimo={emprestimo} setEmprestimo={setEmprestimo} /> :
                <div className='scanCodeBox'>
                    <h2> {t("retrun.scan")} </h2>
                    <div>
                        <RiQrScan2Line size={80}/>
                    </div>
                    <p>
                        {t("retrun.insert")}
                    </p>
                    {/* fazer validação do código inserido */}
                    <TextField
                        className="codLivro_input"
                        variant="standard"
                        type="text" 
                        value={codigoLivro} 
                        onChange={e => setCodigoLivro(e.target.value)} 
                        size='small'
                        required
                    />
                    <Botao size="small" onClick={buscarEmprestimo} className='buscarBtn'>{t("retrun.search")}</Botao>
                    <p>{msg}</p>
                </div>
                }
            </div>
        </section>
     );
}

export default Devolucao;