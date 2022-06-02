import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Product} from "../types";
import {Alert, Box, CircularProgress} from "@mui/material";

interface ProductListProps {
    products: Product[]
    isLoading: boolean
    error?: string
}

export const ProductList: React.FC<ProductListProps> = ({products, isLoading, error}) => {
    if (isLoading) {
        return (
            <Box display={"flex"} justifyContent={"center"}>
                <CircularProgress />
            </Box>
        );
    }
    if (error) {
        return <Alert severity="error">{error}</Alert>
    }
    if (products.length < 1) {
        return <Alert severity="info">No products found for given criteria</Alert>
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="product list">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            sx={{
                                '&:last-child td, &:last-child th': {border: 0},
                                'backgroundColor': product.color
                            }}
                        >
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.year}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
