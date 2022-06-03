import { Button, Input, InputLabel, MenuItem, Select } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { uploadForm } from "../../../api/FinanceiroService";

import './ImportarNotaFiscal.scss'

function ImportarNotaFiscal() {
    const [file, setFile] = useState<File>();
    const [valor, setValor] = useState('');
    const [assunto, setAssunto] = useState('');
    const [tipo, setTipo] = useState('');
    
    // função que junta as informações e envia para o backend
    const submit = async (ev: any) => {
        ev.preventDefault()
        const formD = new FormData()
        
        formD.append('assunto', assunto)
        formD.append('valor', valor)
        formD.append('tipo', tipo)
        formD.append('file', file ? file : '')

        try {
            let msg = await uploadForm(formD)
            clearForm()
            console.log(msg)
        } catch (error: any) {
            console.log('erro: ', error?.response)
        }
        
    }

    // função que pega o arquivo qnd ele é selecionado
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null) {
            let file = e.target.files[0]
            setFile(file)
        }
    }

    const clearForm = () => {
        setValor('')
        setTipo('')
        setAssunto('')
        setFile(undefined)
    }

    return ( 
        <>
            <div className="bread">
                <Breadcrumbs separator='>' aria-label="breadcrumb">
                    <Link to='/financeiro' color="inherit">
                        Financeiro
                    </Link>
                    <Typography color="text.primary">Importação</Typography>
                </Breadcrumbs>
            </div>
            <section className='importContainer'>
                <Typography variant="h4">Importação de Nota Fiscal</Typography>
                <div className='importContainer__form'>
                    <form onSubmit={submit}>
                        <TextField
                            label="Valor"
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                            }}
                            placeholder='0.00'
                            value={valor}
                            onChange={e => setValor(e.target.value)}
                            size='small'
                            type='text'
                        />
                        <FormControl sx={{ m: 1,width: 200}} size='small'>
                            <InputLabel id="demo-simple-select-label">Tipo de Operação</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tipo}
                                onChange={e => setTipo(e.target.value)}
                                label="Tipo de Operação"
                                defaultValue=''       
                            >
                                <MenuItem value='entrada'>Entrada</MenuItem>
                                <MenuItem value='saida'>Saída</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField 
                            sx={{ m: 1 , width: '96.5%'}}
                            label='Assunto'
                            value={assunto}
                            onChange={e => setAssunto(e.target.value)}
                            size='small'
                            type='text'
                        />
                        <input
                            accept=".pdf"
                            style={{ display: 'none' }}
                            id="arquivo"
                            type="file"
                            onChange={e => handleFile(e)}
                        />
                        <label htmlFor="arquivo">
                            <Button variant="contained" component="span" className="btn">
                                Selecionar Arquivo
                            </Button>
                        </label>
                        <Button color="success" variant="contained" className="btn submitBtn" type="submit">
                            Confirmar
                        </Button>
                    </form>
                </div>
            </section>
            
        </>
     );
}

export default ImportarNotaFiscal;
