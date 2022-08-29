import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from 'react'
import { ColorModeContext } from "../../globalStyle";
import { MdDarkMode, MdOutlineWbSunny } from 'react-icons/md'

function DarkmodeToggle() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext)
  return ( 
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        p: 0.5,
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'light' ? <MdDarkMode /> : <MdOutlineWbSunny />}
      </IconButton>
    </Box>
   );
}

export default DarkmodeToggle;