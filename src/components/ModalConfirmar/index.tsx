import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Botao from '../Botao';
import './ModalConfirmar.scss'

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
};

interface IProps {
    title: string,
    message: string,
    open: {open: boolean, id: number | null},
    handleOpen: (id: number) => void,
    handleClose: () => void,
    onConfirm: (id: number) => void
}

export default function ModalConfirmar({title, message, open, handleOpen, handleClose, onConfirm}: IProps) {

  return (
    <div>
      <Modal
        open={open.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
          <div className='botoes'>
              <Botao onClick={() => onConfirm(open.id ? open.id : -1)}>Sim</Botao>
              <Botao onClick={handleClose}>Cancelar</Botao>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
