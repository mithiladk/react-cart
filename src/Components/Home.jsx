import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const Home = () => {
    const [data, setData] = useState([]);

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

    return (
        <div style={{ padding: "20px" }}>
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
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
