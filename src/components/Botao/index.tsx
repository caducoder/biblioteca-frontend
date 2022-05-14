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

export default function Botao({children}:{children: string}) {
  return (
      <ColorButton variant="contained">{children}</ColorButton> 
  );
}