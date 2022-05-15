import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  fontWeight: 'bold', 
  color: theme.palette.getContrastText('#4360FF'),
  backgroundColor: '#4360FF',
  '&:hover': {
    backgroundColor: '#001fcc',
  },
}));

interface Props {
  children: string,
  type?: "button" | "submit" | "reset" | undefined
}

export default function Botao({children, type = 'button'}: Props) {
  return (
      <ColorButton type={type} variant="contained">{children}</ColorButton> 
  );
}