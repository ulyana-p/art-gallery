import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, createTheme, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, ThemeProvider, Typography } from '@mui/material';
import { productContext } from '../../../Context/ProductsContext';
import './Sidebar.css'

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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const Sidebar = () => {
    const search = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const { getProducts } = useContext(productContext)
    const [date, setDate] = useState(search.get('date') || '')
    const [price, setPrice] = useState(search.get('price_lte') || '')

    const filterProducts = (key, value) => {
        search.set(key, value)
        let newPath = `${window.location.pathname}?${search.toString()}`
        navigate(newPath)
        setDate(search.get('date') || '')
        setPrice(search.get('price_lte' || ''))
        getProducts()
    }

    const handleChangeType = (e, value) => {
        if(value === 'all'){
            search.delete('date')
            let newPath = `${window.location.pathname}?${search.toString()}`
            navigate(newPath) 
            setDate(value)
            getProducts()
            return
        }
        search.set(e, value)
        let newPath = `${window.location.pathname}?${search.toString()}`
        navigate(newPath) 
        setDate(search.get('date') || '')
        getProducts()
    }

    const resetFilter = () => {
        navigate('/products')
        setDate('')
        setPrice('')
        getProducts()
    }


    return (
        <ThemeProvider theme={customTheme}>
            <Box sx={{ flexGrow: 1}} className='sidebar'>
                <Grid >
                    <Grid>
                        <Paper  sx={{height: '45em', px: 4, py: 8}}>
                            <FormControl component='fieldset'>
                                <FormLabel>
                                    <Typography variant='h6' sx={{color: "#1e2328"}}>Sort by Year:</Typography></FormLabel>
                                <RadioGroup aria-label='gender' name='gender1' value={date} onChange={(e) => handleChangeType('date', e.target.value)}>
                                    <FormControlLabel value='1493' control={<Radio/>} label='1493'/>
                                    <FormControlLabel value='1503' control={<Radio/>} label='1503'/>
                                    <FormControlLabel value='1665' control={<Radio/>} label='1665'/>
                                    <FormControlLabel value='1830' control={<Radio/>} label='1830'/>
                                    <FormControlLabel value='1839' control={<Radio/>} label='1839'/>
                                    <FormControlLabel value='1845' control={<Radio/>} label='1845'/>
                                    <FormControlLabel value='1872' control={<Radio/>} label='1872'/>
                                    <FormControlLabel value='1886' control={<Radio/>} label='1886'/>
                                    <FormControlLabel value='1888' control={<Radio/>} label='1888'/>
                                    <FormControlLabel value='1889' control={<Radio/>} label='1889'/>
                                    <FormControlLabel value='1908' control={<Radio/>} label='1908'/>
                                    <FormControlLabel value='1918' control={<Radio/>} label='1918'/>
                                    <FormControlLabel value='all' control={<Radio/>} label='all'/>
                                </RadioGroup>
                            </FormControl>
                            <Grid sx={{my: 4}}>
                                <Typography variant='body2' sx={{color: "#1e2328"}}>Sort by price:</Typography>
                                <Slider 
                                    onChange={(e) => filterProducts('price_lte', e.target.value)}
                                    valueLabelDisplay='auto'
                                    max={1000}
                                    step={10}
                                    sx={{color: "#1e2328"}}
                                />
                            </Grid>
                            <Button onClick={resetFilter} variant='contained' color='warning'>
                                Сбросить
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default Sidebar;