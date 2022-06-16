import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaTimes } from 'react-icons/fa';
import './ModalEmprestimo.scss'
import { RiQrScan2Line } from 'react-icons/ri';
import Botao from '../Botao';
import { realizarEmprestimo } from '../../api/EmprestimoService';

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface IProps {
    idCliente: number,
    handleClose: () => void,
    open: boolean
}

export default function ModalEmprestimo({idCliente, open, handleClose}: IProps) {
  const [codigoLivro, setCodigoLivro] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  const emprestar = async () => {
    const msg = await realizarEmprestimo(idCliente, codigoLivro)
    setResponseMsg(msg)
  }

  useEffect(() => {
    setResponseMsg('')
  }, [codigoLivro]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className='closeBtn'><FaTimes onClick={handleClose}/></div>
          <div className='scanCodeBox'>
            <h2>Escaneie o código do livro</h2>
            <div>
              <RiQrScan2Line size={80}/>
            </div>
            <p>
              Ou insira-o no campo abaixo:
            </p>
            <input 
              type="text" 
              value={codigoLivro} 
              onChange={e => setCodigoLivro(e.target.value)} 
            />
            {responseMsg && <p>{responseMsg}</p>}
            <Botao size='small' className='scanCodeBox__btn' onClick={emprestar}>Confirmar</Botao>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
