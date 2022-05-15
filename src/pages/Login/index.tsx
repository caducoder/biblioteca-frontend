import { useState } from 'react';
import { TextField, Typography, Popover } from '@mui/material';
import Botao from '../../components/Botao';
import {MdInfoOutline} from 'react-icons/md'
import './Login.scss'

function Login() {
   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

   const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget)
   }

   const submitForm = (ev: any) => {
      ev.preventDefault();
      console.log({email, senha})
   }

   const handleClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;

   return ( 
      <section className='login'>
         <div className='login__box'>
            <div className='login__box__info'>
               <p><MdInfoOutline size={30} /> Área exclusiva da administração </p>
            </div>
            <Typography variant='h4' className='login__box__title'>Entrar</Typography>
            <form onSubmit={submitForm} className='login__box__form'>
               <TextField 
                  name='email' 
                  id="outlined-basic" 
                  label="Email" 
                  variant="outlined" 
                  size='small'
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
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
               />
               <button type='button' aria-describedby={id} className='login__box__form__forgetpass' onClick={handleClick}>Esqueci a senha</button>
               <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
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