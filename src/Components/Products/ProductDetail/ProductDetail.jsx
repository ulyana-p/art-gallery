import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { productContext } from '../../../Context/ProductsContext';
import AddComment from './Comments/AddComment';
import Comments from './Comments/Comments';

const ProductDetail = () => {
    const { id } = useParams()
    const { detail, getDetail } = useContext(productContext)

    useEffect(() => {
        getDetail(id)
    }, [id])


    return (
           <Paper elevation={0} variant="outlined">
                <Typography variant='h4' style={{textAlign: 'center', marginTop: '2rem'}}>Description</Typography>
                {
                    detail ? (
                        <div style={{margin: '20px 180px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <img style={{width: '30rem'}} src={detail.image} alt={detail.name} />
                            </div>
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                marginLeft: "4rem"
                            }}
                            >
                                <Typography variant='h5'>{detail.title}</Typography>
                                <Typography variant='h6'>{detail.painter}</Typography>
                                <Typography variant='subtitle1'>{detail.date}</Typography>
                                <Typography variant='subtitle1'>{detail.location}</Typography>
                                <Typography variant='subtitle1' sx={{color: 'secondary'}}>Location: {detail.rights}</Typography>
                                <Typography variant='h6'>$ {detail.price} million</Typography>
                            </div>
                        </div>
                            <div style={{marginTop: '20px'}}>
                                <Typography variant='p'>{detail.description}</Typography>
                            </div>
                            <Comments/>
                            <AddComment/>
                        </div>

                    ) : (<h1>loading...</h1>)
                }
            </Paper> 
    );
};

export default ProductDetail;