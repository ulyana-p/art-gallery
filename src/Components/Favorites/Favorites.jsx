import * as React from 'react';
import { styled } from '@mui/material/styles';
import { productContext } from '../../Context/ProductsContext';
import Paper from '@mui/material/Paper';
import { Button, Link, Typography, createTheme, ThemeProvider, Box, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material';
import FavoritesCard from './FavoritesCard';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const customTheme = createTheme({
  palette: {
    secondary: {
      main: "#1e2328",
      contrastText: "#ffff"
    },
    warning: {
      main: "#f5b301",
      contrastText: "#3b3f46"

    }
  }
});

export default function Favorites() {
    const { favorites, getFavorites } = React.useContext(productContext)

    
    React.useEffect(() => {
      getFavorites()
    }, [])


  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ flexGrow: 1, margin: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}} >         
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                favorites.products ? (
                  favorites.products.map((item, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <FavoritesCard item={item} key={index}/>
                        </Grid>
                    ))
                ) : (<h1>loading...</h1>)
            }
      </Grid>

    </Box>
    </ThemeProvider>
  );
}
