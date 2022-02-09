import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { IconButton, createTheme, ThemeProvider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { productContext } from '../../Context/ProductsContext';


export default function FavoritesCard({item}) { 
    const { deleteFromFavorites, addProductInCart, checkProductInCart } = React.useContext(productContext)

    const customTheme = createTheme({
        palette: {
          secondary: {
            main: "#1e2328",
            contrastText: "#ffff"
          },
          warning: {
            main: 'rgb(31, 96, 124)',
            contrastText: "#3b3f46"
    
          }
        }
      });
    let data = item.item
    let icons = (
        <CardActions disableSpacing>
            <IconButton onClick={() => deleteFromFavorites(data.id)}>
                <FavoriteIcon/>
            </IconButton>
            <IconButton 
                aria-label='share' 
                onClick={() => addProductInCart(data)} 
                color={checkProductInCart(data.id) ? 'warning': 'secondary'}>
                <ShoppingCartIcon/>
            </IconButton>
        </CardActions>
    )

    
  return (
    <ThemeProvider theme={customTheme}>
        <Card sx={{ maxWidth: 420 }}>
            <Link to={`/detail/${data.id}`} style={{textDecoration: 'none', color: 'black'}}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                    {data.name}
                    </Typography>
                    <Typography gutterBottom variant="p" component="div" sx={{ fontWeight: 'bold'}}>
                    {data.artist}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {data.year}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    alt="item image"
                    height="300"
                    image={data.image}
                    className='cardImg'
                />
            </Link>
        <CardContent>
            <Typography size="small">$ {data.price}</Typography>
        </CardContent>
        {icons}
        </Card>
    </ThemeProvider>
  );
}
