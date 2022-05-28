import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Botao from '../../../components/Botao'
import './Popup.scss'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  borderRadius: '10px',  
};

interface Props {
    open: boolean,
    handleClose: any,
    msg: string,
    sucesso: boolean
}

export default function BasicModal({open, handleClose, msg, sucesso}: Props) {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography className={sucesso ? "title_blue" : "title_red"} variant="h6" component="h2">
              {msg}
            </Typography>
            {sucesso && 
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Você tem 5 dias para buscar o livro na biblioteca, após esse período, a reserva será desfeita.
              </Typography>
            }
            <Botao onClick={handleClose} className='okButton'>OK</Botao>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
