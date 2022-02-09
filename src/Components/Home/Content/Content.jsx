import { Grid } from '@mui/material';
import React from 'react';
import ProductList from '../../Products/List/ProductList';
import Cover from '../Cover';
import MainPage from '../MainPage'

const Content = () => {
    return (
        <div>
            <Cover/>
            <Grid item md={12}>
                <ProductList/>
            </Grid>
            <MainPage />
        </div>
    );
};

export default Content;

