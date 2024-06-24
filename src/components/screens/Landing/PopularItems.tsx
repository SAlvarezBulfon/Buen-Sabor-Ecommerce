import { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Container, Button, Box, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductoService from '../../../services/ProductoService';
import IProducto from '../../../types/IProducto';
import ProductCard from '../../ui/Cards/ProductCard';
import { Carousel } from 'react-bootstrap';
import './customCarousel.css';

const productoService = new ProductoService();

interface PopularItemsProps {
    addToCart: (productId: number, products: IProducto[]) => void;
}

const PopularItems: React.FC<PopularItemsProps> = ({ addToCart }) => {
    const [products, setProducts] = useState<IProducto[]>([]);
    const [loading, setLoading] = useState(true);
    const url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productoService.getPaginatedProducts(0, 3, `${url}/eCommerce/allArticulos`);
                setProducts(data.content);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [url]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ my: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>
                Explora nuestra variedad de productos
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom sx={{ mb: 3, fontSize: isMobile ? '1rem' : '1.25rem' }}>
                Descubre una selección de nuestros productos para satisfacer tus gustos y necesidades
            </Typography>
            <Box display={{ xs: 'none', md: 'block' }}>
                <Grid container spacing={4}>
                    {products.slice(0, 3).map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <ProductCard product={product} addToCart={addToCart} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box display={{ xs: 'block', md: 'none' }} className="custom-carousel-container">
                <Carousel className="custom-carousel">
                    {products.slice(0, 3).map((product) => (
                        <Carousel.Item key={product.id}>
                            <ProductCard product={product} addToCart={addToCart} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Box>
            <Box textAlign="center" sx={{ mt: 4 }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/productos')}>
                    Ver todos los productos
                </Button>
            </Box>
        </Container>
    );
};

export default PopularItems;
