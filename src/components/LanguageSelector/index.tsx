import { Button, MenuItem, Popover } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from 'react';

const languageOptions = [
  {
    name: 'Português',
    value: 'ptBR',
  },
  {
    name: 'English',
    value: 'en',
  }
]

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <Button
        variant='text'
        sx={{ color: "white", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }}
        startIcon={<LanguageIcon />}
        onClick={handleClick}
      >
        {i18n.resolvedLanguage === 'en' ? 'ENGLISH' : 'PORTUGUÊS'}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {languageOptions.map(lng => (
          <MenuItem
            key={lng.value}
            selected={i18n.resolvedLanguage === lng.value}
            onClick={() => { i18n.changeLanguage(lng.value); handleClose() }}
          >
            {lng.name}
          </MenuItem>
        ))}
      </Popover>
    </div>
  )
}