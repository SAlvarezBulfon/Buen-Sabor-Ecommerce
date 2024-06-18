import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';
import IPromocion from '../../../types/IPromocion';

interface PromocionCardProps {
  promocion: IPromocion;
  addToCart: (promocionId: number, promociones: IPromocion[]) => void;
}

const PromocionCard: React.FC<PromocionCardProps> = ({ promocion, addToCart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      addToCart(promocion.id, [promocion]);
    } catch (error) {
      console.error('Error adding promotion to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const imageUrl = promocion.imagenes && promocion.imagenes.length > 0 ? promocion.imagenes[0].url : '';

  return (
    <Card style={{ width: '100%'}}>
      <CardActionArea>
        {imageUrl && (
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt={promocion.denominacion}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {promocion.denominacion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {promocion.descripcionDescuento}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Precio Promocional: ${promocion.precioPromocional}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={handleAddToCart}
        fullWidth
        variant="contained"
        color="primary"
        disabled={isLoading}
        endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {isLoading ? 'Agregando...' : 'Agregar al carrito'}
      </Button>
    </Card>
  );
};

export default PromocionCard;
