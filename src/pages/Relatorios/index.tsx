import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { getRelatorio, IRelatorio } from '../../api/RelatorioService';
import CircularProgress from '@mui/material/CircularProgress';
import TabelaRelatorio from '../../components/TabelaRelatorio';
import './Relatorios.scss'
import { useTranslation } from 'react-i18next'

function createData(
    id: number,
    idUsuario: number | null,
    idCliente: number | null,
    idLivro: number | null, 
    tipoMovimentacao: string, 
    dataHora: string,
    ): IRelatorio {
  return { id, idUsuario, idCliente, idLivro, tipoMovimentacao, dataHora};
}

function Relatorios() {
  const [tipoRelatorio, setTipoRelatorio] = useState<string | undefined>(undefined);
  const [listaDados, setListaDados] = useState<IRelatorio[]>([]);
  const [msg, setMsg] = useState('Selecione um relatório');

  // busca os dados ao selecionar algum tipo de relatório
  const handleChange = async (event: SelectChangeEvent) => {
    setMsg('')
    setListaDados([])
    const tipo = event.target.value as string
    
    if(tipo) {
        setTipoRelatorio(tipo);
        const response = await getRelatorio(tipo);

        // verifica se tem dados na resposta para preencher a lista
        if(response.length > 0) {
          const rows = response.map(row => (
              createData(row.id, row.idUsuario, row.idCliente, row.idLivro, row.tipoMovimentacao, row.dataHora)
          )).reverse()

          setListaDados(rows)
        } else {
          // caso não tenha, mostra mensagem
          setMsg(`Não há registros de ${tipo}s.`)
        }
    }
  };

  const { t } = useTranslation();
  return (
    <section className='container'>
        <h1> {t("reports.title")} </h1>
    
        <Box sx={{ display: 'flex', gap: 5, minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> {t("reports.select")} </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tipoRelatorio}
                    label="Selecione"
                    onChange={handleChange}
                >
                    <MenuItem value='geral'> {t("reports.general")} </MenuItem>
                    <MenuItem value='livro'> {t("reports.books")} </MenuItem>
                    <MenuItem value='cliente'> {t("reports.clients")} </MenuItem>
                    <MenuItem value='emprestimo'> {t("reports.loan")} </MenuItem>
                    <MenuItem value='reserva'> {t("reports.reservations")} </MenuItem>
                </Select>
            </FormControl>
        </Box>
        {listaDados.length ? <TabelaRelatorio rows={listaDados} /> : <div className='resp'>{msg || <CircularProgress />}</div>}
    </section>
  );
}

export default Relatorios;