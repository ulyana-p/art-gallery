import { Box, Button, Card, CardContent, Grid, Pagination, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { productContext } from '../../../../Context/ProductsContext';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';



const customTheme = createTheme({
    palette: {
        primary: {
        main: 'rgb(31, 96, 124)',
        contrastText: "#ffff"
      },
      warning: {
        main: "#EFEAE4",
        contrastText: "#3b3f46"

      },

    }
  });

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Comments = () => {
    const { userData, getUserData } = useContext(productContext)

    useEffect(() => {
        getUserData()
    }, [])

    // console.log('get here', userData)

    
    return (
        <ThemeProvider theme={customTheme}>

        <Box sx={{marginTop: 8}}>
            {
                userData ? (
                    userData.map((item, index) => (
                        
                            <Card sx={{ width: "100%" }} key={index}>
                                <CardContent>
                                    <Typography gutterBottom variant="p" component="div" color='primary' sx={{ fontWeight: 'bold'}}>
                                    {item.userEmail}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {item.date}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography size="small">{item.comment}</Typography>
                                </CardContent>
                                </Card>
                    
                    ))
                ) : (<h1>loading...</h1>)
            }
        </Box>
        </ThemeProvider>
    );
};

export default Comments;