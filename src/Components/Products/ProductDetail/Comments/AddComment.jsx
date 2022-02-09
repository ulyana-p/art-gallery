import React from 'react';
import { productContext } from '../../../../Context/ProductsContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, createTheme, IconButton, TextField, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AddComment = () => {

    const { addUserData, getUserData } = React.useContext(productContext)

    const auth = getAuth();
    // console.log(auth);
    const curuser = auth.currentUser;

    const user = curuser?.email

    // console.log('user:', user);

    const getCurrentDate=()=>{

        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let hours = new Date().getHours()
        let minutes = new Date().getMinutes()
 
        return date + '-' + month + '-' + year + " "+ hours + ":" + minutes
  }

  const date = getCurrentDate()
//   console.log(date);

    const [values, setValues] = React.useState({
        userEmail: '', 
        comment: '',
        date: date
    })



    // console.log('here', values);

    const customTheme = createTheme({
        palette: {
            secondary: {
                main: "#1e2328",
                contrastText: "#ffff"
            },
            warning: {
                main: 'rgb(31, 96, 124)',
                contrastText: "#ffff"
            
            }
        }
    });

    const handleInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }

    const handleSave = (e) => {
        addUserData({ ...values, userEmail: user, date: date })
        getUserData()
        setValues('')
    }


    return (
        <ThemeProvider theme={customTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: '40px auto',
                        width: '100%',
                        height: 'auto',
                        p: '10px'
                    },
                }}
            >
                <Paper elevation={3}>
                    <h3 style={{ textAlign: 'center' }}>Add Comment</h3>
                    <div style={{ display: 'flex', justifyContent: 'spase-around', color: 'black' }}>
                        <div
                            style={{
                                width: '100%',
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
                                <TextField name='comment' onChange={handleInp} value={values.comment} multiline variant='outlined' label='Comment' style={{ padding: '10px', width: '50rem' }} color="secondary" />
                            </form>
                            
                                <Button onClick={handleSave} variant='contained' color='warning'>Add Comment</Button>
                            
                        </div>
                    </div>
                </Paper>
            </Box>
        </ThemeProvider>
    );
};

export default AddComment;