import { Box, Button, Grid, Pagination, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productContext } from '../../../Context/ProductsContext';
import ProductCard from '../Card/PtoductCard';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const ProductList = () => {
    const { products, getProducts, paginatedPages} = useContext(productContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const [limit, setLimit] = React.useState(2)
    const [page, setPage] = React.useState(searchParams.get('_page') ? searchParams.get('_page') : 1)


    // console.log(paginatedPages);

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        setSearchParams({
          '_limit' : limit,
          '_page': page
        })
      }, [limit, page])

    const handlePage = (e, pageVal) => {
        setSearchParams({'_page': pageVal, '_limit': limit})
        getProducts()
        setPage(pageVal)
      }

    
    return (
        <Box sx={{ flexGrow: 1, margin: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: "wrap"}} >         
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                products ? (
                    products.map((item, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <ProductCard item={item} key={index}/>
                        </Grid>
                    ))
                ) : (<h1>loading...</h1>)
            }
      </Grid>
      <Stack spacing={2} sx={{margin: 5}}>
        <Pagination 
          count={paginatedPages}
          onChange={handlePage}
          page={+page} />
      </Stack>
    </Box>
    );
};

export default ProductList;