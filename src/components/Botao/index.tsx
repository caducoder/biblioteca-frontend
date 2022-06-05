import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  fontWeight: 'bold', 
  color: theme.palette.getContrastText('#4360FF'),
  backgroundColor: '#4360FF',
  '&:hover': {
    backgroundColor: '#001fff',
  },
}));

interface Props {
  children: string,
  type?: "button" | "submit" | "reset" | undefined
  onClick?: any,
  className?: string,
  disabled?: boolean
}

export default function Botao({children, type = 'button', onClick, className, disabled = false}: Props) {
  return (
      <ColorButton 
        type={type} 
        variant="contained" 
        onClick={onClick}
        className={className}
        disabled={disabled}
      >
        {children}
      </ColorButton>
  );
}