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
  children: string | any,
  type?: "button" | "submit" | "reset" | undefined
  onClick?: any,
  className?: string,
  disabled?: boolean
  size?: 'small'
  | 'medium'
  | 'large'
}

export default function Botao({children, type = 'button', onClick, className, disabled = false, size='medium'}: Props) {
  return (
      <ColorButton 
        type={type} 
        variant="contained" 
        onClick={onClick}
        className={className}
        disabled={disabled}
        size={size}
      >
        {children}
      </ColorButton>
  );
}