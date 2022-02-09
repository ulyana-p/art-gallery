import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, IconButton, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { productContext } from '../../../Context/ProductsContext';

export default function EditProduct() {
    const ctx = React.useContext(productContext)
    const { edit, editProduct, saveEditedProduct } = ctx;

    const params = useParams();
    const { id } = params;

    const [values, setValues] = React.useState({
        id:'',
        title: '',
        painter: '',
        date: '',
        image: '',
        price: '',
        description: '',
        location: '',
        rights: ''
    })

    React.useEffect(() => {
        if(id){
            editProduct(id)
        }
    }, [id])

    React.useEffect(() => {
        if (edit) {
            setValues(edit)
        }
    }, [edit])

    const handleEditInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }

    const handleSave = () => {
        saveEditedProduct(id, values)
    }

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
        },

    })

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
                    <h3 style={{ textAlign: 'center' }}>Update Product</h3>
                    <div style={{ display: 'flex', justifyContent: 'spase-around', color: 'black' }}>
                        <div>
                            <img width='300' src={values.image} alt="product image" />
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
                                <TextField name='title' onChange={handleEditInp} value={values.title} multiline variant='outlined' label='Title' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='painter' onChange={handleEditInp} value={values.painter} multiline variant='outlined' label='Painter' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='date' onChange={handleEditInp} value={values.date} variant='outlined' label='Date' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='location' onChange={handleEditInp} value={values.location} variant='outlined' label='Location' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='rights' onChange={handleEditInp} value={values.rights} variant='outlined' label='Rights' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='price' onChange={handleEditInp} value={values.price} variant='outlined' label='Price' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='description' onChange={handleEditInp} value={values.description} multiline variant='outlined' label='Description' style={{ padding: '10px', width: '20em' }} color="secondary" />
                                <TextField name='image' onChange={handleEditInp} value={values.image} multiline variant='outlined' label='Image' style={{ padding: '10px', width: '20em' }} color="secondary" />
                            </form>
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <Button variant='contained' color='warning' onClick={() => handleSave()}>Save</Button>
                            </Link>
                        </div>
                    </div>
                </Paper>
            </Box>
        </ThemeProvider>
    )
}
