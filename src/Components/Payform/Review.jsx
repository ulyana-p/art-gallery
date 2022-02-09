import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Link, Typography } from '@mui/material';
import { calcTotalPrice } from '../../Helpers/CalcPrice';
import { useNavigate } from 'react-router-dom'
import { Payment } from '@mui/icons-material';
import { productContext } from '../../Context/ProductsContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function Cart() {
    const { cart, getCart, changeProductCount } = React.useContext(productContext)

    React.useEffect(() => {
        getCart()
    }, [])
    

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Count</StyledTableCell>
            <StyledTableCell align="right">Subprice</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {cart.products ? (
                <>
                    {cart.products.map((elem) => (
                        <StyledTableRow key={elem.item.id}>
                        <StyledTableCell component="th" scope="row">
                            <img width='30px' src={elem.item.image} alt={elem.item.title} />
                        </StyledTableCell>
                        <StyledTableCell align="right">{elem.item.title}</StyledTableCell>
                        <StyledTableCell align="right">{elem.item.price}</StyledTableCell>
                        <StyledTableCell align="right">
                            <input 
                                type="number"
                                value={elem.count}
                                onChange={(e) => changeProductCount(e.target.value, elem.item.id)}
                                min = '1'
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">{elem.subPrice}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </>
            ) : (<tr><td><h1>loading...</h1></td></tr>)}

            <TableRow>
                <TableCell rowSpan={3}/>
                <TableCell colSpan={2}>
                    <Typography variant='h5'>Total:</Typography>
                </TableCell>
                {
                    cart.products ? (
                        <TableCell align='right'>
                            <Typography variant='h5'>{calcTotalPrice(cart.products)}</Typography>
                        </TableCell>
                    ) : (null)
                }
            </TableRow>
        </TableBody>
      </Table>
      
    </TableContainer>
  );
}