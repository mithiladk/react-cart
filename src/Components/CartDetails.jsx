import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartDetails = ({ cart, setCart }) => {

    const handleAddToCart = (product) => {

        const updatedCart =
            (prevCart) => {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            };
            setCart(updatedCart)
    };

    // Decrease quantity of item in cart
    const handleRemoveFromCart = (product) => {
        setCart((prevCart) => {
            return prevCart.reduce((acc, item) => {
                if (item.id === product.id) {
                    // If quantity is greater than 1, reduce it
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 });
                    }
                } else {
                    // Keep the item as it is
                    acc.push(item);
                }
                return acc;
            }, []).filter((item) => item.quantity > 0); // Remove item if quantity is zero
        });
    };
    

  

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Cart Details
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Actions</TableCell> {/* Add actions column for + and - buttons */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell align="right">${item.price}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleRemoveFromCart(item)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleAddToCart(item)}>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CartDetails;
