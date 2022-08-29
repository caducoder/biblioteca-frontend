import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {MdAccountBox, MdOutlineMenu} from 'react-icons/md'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './MenuResponsivo.scss'
import { useState, useEffect, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../LanguageSelector';
import DarkmodeToggle from '../DarkmodeToggle';

const publicPages = [
  {
    name: 'Acervo',
    to: '/acervo'
  }
];

const protectedPages = [
  {
    name: 'Dashboard',
    to: '/dashboard'
  },
  {
    name: 'Acervo',
    to: '/acervo-gestao'
  },
  {
    name: 'Fichário',
    to: '/fichario'
  },
  {
    name: 'Equipe',
    to: '/equipe'
  },
  {
    name: 'Financeiro',
    to: '/financeiro'
  }
]

function MenuResponsivo() {
  const { auth, setAuth }: any = useAuth();// pegando auth e setAuth do contexto global
  const [pages, setPages] = useState(publicPages);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  // funções para abrir e fechar o menu caso o usuário esteja no celular
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  /* ------------------------ */
  
  useEffect(() => {
    // verificando se o usuário está logado para decidir se mostra a barra completa ou não
    if(auth?.role/*true*/) {
      setPages(protectedPages)
    } else {
      setPages(publicPages)
    }
  }, [auth]);
  
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // função que desloga o usuário
  const handleLogout = () => {
    setAuth({})// apaga o conteúdo do contexto global
    handleClose()
  }

  return (
    <AppBar position="static" color='primary'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none'
            }}
          >
            <Link className='no_style' to='/'>
              Biblioteca
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MdOutlineMenu />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.to} style={{textDecoration: 'none'}}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* desktop */}
          <Link to='/' className='no_style'>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'sans-serif',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Biblioteca
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.name} to={page.to} className='no_style hov'>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'inherit', display: 'block', fontWeight: 'bold' }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center'}}>
            <DarkmodeToggle />
            <LanguageSelector />
            {auth?.role ? 
              (
                <div>
                  <div className='user'>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <MdAccountBox size={40}/>
                    </IconButton>
                    <div>
                      <span className='user__name'>{auth.username}</span><br/>
                      <span className='user__role'>
                        {auth.role[0] === 2205 ? 'Administrador' : 'Bibliotecário'}
                      </span>
                    </div>
                    
                  </div>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleLogout}>Sair</MenuItem>
                  </Menu>
                </div>
              )
                :
              ( 
                <Link to='/login' className='no_style'>
                  <Button color="inherit" sx={{fontWeight: 'bold', color: 'white'}}>Login</Button>
                </Link>
              )
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MenuResponsivo;