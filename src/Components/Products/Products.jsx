import { Grid } from '@mui/material';
import React from 'react';
import PopUp from '../Home/Content/PopUp/PopUp';
import Sidebar from '../Home/Sidebar/Sidebar';
import ProductList from './List/ProductList';

const Products = () => {
    return (
        <div>
            
            <PopUp/>
            <Grid sx={{display: 'flex'}}>
                <Grid item md={3}>
                <Sidebar/>
            </Grid>
            <Grid item md={9}>
                <ProductList/>
            </Grid>
            </Grid>
        </div>
    );
};

export default Products;