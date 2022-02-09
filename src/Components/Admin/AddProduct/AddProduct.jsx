import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, createTheme, IconButton, TextField, ThemeProvider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { productContext } from '../../../Context/ProductsContext';

export default function AddProduct() {
    const navigate = useNavigate()
    const [values, setValues] = React.useState({
        title: '',
        painter: '',
        date: '',
        image: '',
        price: '',
        description: '',
        location: '',
        rights: ''
    })

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


    const { addProduct } = React.useContext(productContext)

    const handleInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }

    const handleSave = () => {
        if (!values.image) values.image = 'https://content.onliner.by/news/1100x5616/472baa6904f365c4bae96d6b77c13010.jpeg'
        addProduct({ ...values, price: +values.price })
        navigate('/')
    }

    return (
        <ThemeProvider theme={customTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: '40px auto',
                        maxWidth: 1000,
                        height: 'auto',
                        p: '10px'
                    },
                }}
            >
                <Paper elevation={3}>
                    <h3 style={{ textAlign: 'center' }}>Add Product</h3>
                    <div style={{ display: 'flex', justifyContent: 'spase-around', color: 'black' }}>
                        <div>
                            <img src={values.image ? values.image : 'https://content.onliner.by/news/1100x5616/472baa6904f365c4bae96d6b77c13010.jpeg'} alt="product image" style={{ width: '300px' }} />
                        </div>
                        <div
                            style={{
                                width: '450px',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                            <form noValidate autoComplete='off'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <TextField name='title' onChange={handleInp} value={values.title} multiline variant='outlined' label='Title' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='painter' onChange={handleInp} value={values.painter} multiline variant='outlined' label='Painter' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='date' onChange={handleInp} value={values.date} variant='outlined' label='Date' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='location' onChange={handleInp} value={values.location} variant='outlined' label='Location' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='rights' onChange={handleInp} value={values.rights} variant='outlined' label='Rights' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='price' onChange={handleInp} value={values.price} variant='outlined' label='Price' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='description' onChange={handleInp} value={values.description} multiline variant='outlined' label='Description' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='image' onChange={handleInp} value={values.image} multiline variant='outlined' label='Image' style={{ padding: '10px', width: '20em' }} color="secondary" />
                            </form>
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <Button onClick={handleSave} variant='contained' color='warning'>Add</Button>
                            </Link>
                        </div>
                    </div>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}
