import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import { TextField, Typography, Popover } from '@mui/material';
import Botao from '../../components/Botao';
import {MdInfoOutline} from 'react-icons/md'
import './Login.scss'

import api from '../../api/axios';

function Login() {
   const { setAuth }: any = useContext(AuthContext);
   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const [errMsg, setErrMsg] = useState('');

   const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget)
   }
   
   const handleClosePopover = () => {
      setAnchorEl(null);
   };

   // função que sera chamada qnd o form for enviado
   const submitForm = async (ev: any) => {
      ev.preventDefault();

      try {
         const response = await api.post('/login',
            JSON.stringify({email, senha}),
            {
               headers: {'Content-Type': 'application/json'},
               withCredentials: true
            })
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const role = response?.data?.roles;
            setAuth({role, accessToken})
            setEmail('')
            setSenha('')
      } catch (error: any) {
         if(!error?.response) {
            setErrMsg('No server Response')
         } else if (error.response?.status === 403){
            setErrMsg('Email e/ou senha incorretos.')
         } else {
            setErrMsg('Login Failed')
         }
      }
   }

   useEffect(() => {
      setErrMsg('')
   }, [email, senha]);

   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;

   return ( 
      <section className='login'>
         <div className='login__box'>
            <div className='login__box__info'>
               <p><MdInfoOutline size={30} /> Área exclusiva da administração </p>
            </div>
            <Typography variant='h4' className='login__box__title'>Entrar</Typography>
            <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <form onSubmit={submitForm} className='login__box__form'>
               <TextField 
                  name='email' 
                  id="outlined-basic" 
                  label="Email" 
                  variant="outlined" 
                  size='small'
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
               />
               <TextField 
                  name='senha' 
                  id="outlined-basic" 
                  label="Senha" 
                  variant='outlined' 
                  type='password' 
                  size='small' 
                  value={senha}
                  onChange={ev => setSenha(ev.target.value)}
                  required
               />
               <button type='button' aria-describedby={id} className='login__box__form__forgetpass' onClick={handleClick}>Esqueci a senha</button>
               <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
                  >
                  <Typography sx={{ p: 2 }}>Contate o administrador do sistema.</Typography>
               </Popover>
               <Botao type='submit'>Login</Botao>
            </form>
         </div>
         
      </section>
    );
}

export default Login;