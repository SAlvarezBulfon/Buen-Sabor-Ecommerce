import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, CircularProgress, Box } from '@mui/material';
import IProducto from '../../../types/IProducto';
import ProductoModal from '../modals/ProductoModal';
import InsumoModal from '../modals/InsumoModal';

interface ProductCardProps {
  product: IProducto;
  addToCart: (productId: number, products: IProducto[]) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showInsumoModal, setShowInsumoModal] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      addToCart(product.id, [product]);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async () => {
    if (product.esInsumo) {
      setShowInsumoModal(true);
    } else {
      setShowProductModal(true);
    }
  };

  const handleCloseModals = () => {
    setShowProductModal(false);
    setShowInsumoModal(false);
  };

  const imageUrl = product.imagenUrls && product.imagenUrls.length > 0
    ? product.imagenUrls[0]
    : product.imagenes && product.imagenes.length > 0
      ? product.imagenes[0]
      : '';

  return (
    <>
      <Card style={{ width: '100%' }}>
        <CardActionArea onClick={handleViewDetails}>
          {imageUrl && (
            <CardMedia
              component="img"
              height="140"
              image={String(imageUrl)}
              alt={product.denominacion}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.denominacion}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Precio: ${product.precioVenta}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box p={1}>
          <Button
            onClick={handleAddToCart}
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ mb: 1 }}
          >
            {isLoading ? 'Agregando...' : 'Agregar al carrito'}
          </Button>
        </Box>
      </Card>
      {showProductModal && (
        <ProductoModal
          open={showProductModal}
          onClose={handleCloseModals}
          productId={product.id}
        />
      )}
      {showInsumoModal && (
        <InsumoModal
          open={showInsumoModal}
          onClose={handleCloseModals}
          productId={product.id}
        />
      )}
    </>
  );
};

export default ProductCard;
