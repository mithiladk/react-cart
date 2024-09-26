import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Grid, Typography, Button, IconButton, Badge } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';

const Home = ({ cart, setCart }) => {

    const [data, setData] = useState([]);

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            let res = await axios.get('https://fakestoreapi.com/products');
            let result = res?.data;
            setData(result);
            console.log("Products:", result);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // // Add product to cart
    // const handleAddToCart = (product) => {
    //     setCart((prevCart) => {
    //         const isItemInCart = prevCart.find((item) => item.id === product.id);
    //         if (isItemInCart) {
    //             return prevCart.map((item) =>
    //                 item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    //             );
    //         } else {
    //             return [...prevCart, { ...product, quantity: 1 }];
    //         }
    //     });
    // };
    const handleAddToCart = (product) => {
        const updatedCart = (prevCart) => {
            const exisitingItem = prevCart.find((item) => item.id === product.id);
            if (exisitingItem) {
                return prevCart.map((item) => item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
            } else {
                // if item is not in the cart return with qunatity 1
                return [...prevCart, { ...product, quantity: 1 }]
            }
        }
        setCart(updatedCart)
    }
    // Remove product from cart
    const handleRemoveFromCart = (product) => {
        setCart((prevCart) => {
            return prevCart
                .map((item) => (item.id === product.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0);  // Remove if quantity is 0
        });
    };

    // Get quantity of a product in the cart
    const getProductQuantity = (productId) => {
        const cartItem = cart.find((item) => item.id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <>
            {/* Cart button with badge showing total items */}
            <div style={{ position: 'relative', textAlign: 'right', margin: '10px 20px' }}>
                <Button variant="contained" color="primary" component={Link} to="/cartDetails">
                    Cart
                    <Badge badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)} color="secondary">
                        🛒
                    </Badge>
                </Button>
            </div>

            {/* Product Grid */}
            <div style={{ padding: '20px' }}>
                <Grid container spacing={3}>
                    {data.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={product.image}
                                    alt={product.title}
                                    style={{ objectFit: 'contain' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {product.category}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        {product.description.substring(0, 100)}...
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        ${product.price}
                                    </Typography>

                                    {/* Display quantity in cart */}
                                    <Typography variant="body1" color="secondary">
                                        In Cart: {getProductQuantity(product.id)}
                                    </Typography>

                                    {/* Add/Remove Buttons */}
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <IconButton onClick={() => handleRemoveFromCart(product)} color="secondary">
                                            <RemoveIcon />
                                        </IconButton>
                                        <Button variant="outlined" onClick={() => handleAddToCart(product)}>
                                            Add to cart
                                        </Button>
                                        <IconButton onClick={() => handleAddToCart(product)} color="primary">
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Home;
