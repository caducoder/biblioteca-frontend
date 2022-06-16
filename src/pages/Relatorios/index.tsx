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

  const handleChange = async (event: SelectChangeEvent) => {
    setMsg('')
    setListaDados([])
    const tipo = event.target.value as string
    
    if(tipo) {
        setTipoRelatorio(tipo);
        const response = await getRelatorio(tipo);
        if(response.length > 0) {
          const rows = response.map(row => (
              createData(row.id, row.idUsuario, row.idCliente, row.idLivro, row.tipoMovimentacao, row.dataHora)
          )).reverse()

          setListaDados(rows)
        } else {
          setMsg(`Não há registros de ${tipo}s.`)
        }
    }
  };

  return (
    <section className='container'>
        <h1>Relatórios</h1>
    
        <Box sx={{ display: 'flex', gap: 5, minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Selecione</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tipoRelatorio}
                    label="Selecione"
                    onChange={handleChange}
                >
                    <MenuItem value='geral'>Geral</MenuItem>
                    <MenuItem value='livro'>Livros - Cadastros/Exclusões/Alterações</MenuItem>
                    <MenuItem value='cliente'>Clientes - Cadastros/Exclusões/Alterações</MenuItem>
                    <MenuItem value='emprestimo'>Empréstimos e Devoluções</MenuItem>
                    <MenuItem value='reserva'>Reservas</MenuItem>
                </Select>
            </FormControl>
        </Box>
        {listaDados.length ? <TabelaRelatorio rows={listaDados} /> : <div className='resp'>{msg || <CircularProgress />}</div>}
    </section>
  );
}

export default Relatorios;