import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blue color
        },
        secondary: {
            main: '#ff4081', // Pink color
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

export default theme;
