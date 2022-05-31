import { Button, Input, InputLabel, MenuItem, Select } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Field, Formik, useFormik } from "formik";
import { Link } from "react-router-dom";

import './ImportarNotaFiscal.scss'

function ImportarNotaFiscal() {
    const handleSubmit = (values: any) => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues: {
            valor: 0,
            tipoOperacao: '',
            assunto: '',
            arquivo: ''
        },
        validationSchema: '',
        onSubmit: handleSubmit
    })


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
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Valor"
                            name='valor'
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                            }}
                            value={formik.values.valor}
                            onChange={formik.handleChange}
                            size='small'
                            type='number'
                        />
                        <FormControl sx={{ m: 1,width: 200}} size='small'>
                            <InputLabel id="demo-simple-select-label">Tipo de Operação</InputLabel>
                            <Select
                                name='tipoOperacao'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.tipoOperacao}
                                label="Tipo de Operação"
                                onChange={formik.handleChange}                           
                            >
                                <MenuItem value='entrada'>Entrada</MenuItem>
                                <MenuItem value='saída'>Saída</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField 
                            sx={{ m: 1 , width: '96.5%'}}
                            
                            label='Assunto'
                            name='assunto'
                            value={formik.values.assunto}
                            onChange={formik.handleChange}
                            size='small'
                            type='text'
                        />
                        <input
                            accept=".pdf"
                            style={{ display: 'none' }}
                            id="arquivo"
                            name='arquivo'
                            type="file"
                            value={formik.values.arquivo}
                            onChange={(event) => {
                                // const fileReader = new FileReader();
                                // fileReader.onload = () => {
                                //     if (fileReader.readyState === 2) {
                                //         setFieldValue('arquivo', fileReader.);
                                    
                                //     }
                                // };
                                if(event.currentTarget.files != null) {
                                    setFieldValue('arquivo',  event.currentTarget.files[0]);
                                }  
                              }}
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

function setFieldValue(arg0: string, arg1: File) {
    throw new Error("Function not implemented.");
}