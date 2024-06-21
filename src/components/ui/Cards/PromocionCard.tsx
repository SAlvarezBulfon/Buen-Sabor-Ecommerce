import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, CircularProgress, Box } from '@mui/material';
import IPromocion from '../../../types/IPromocion';
import PromocionModal from '../modals/PromocionModal';


interface PromocionCardProps {
  promocion: IPromocion;
  addToCart: (promocionId: number, promociones: IPromocion[]) => void;
}

const PromocionCard: React.FC<PromocionCardProps> = ({ promocion, addToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    <>
      <Card style={{ width: '100%' }}>
        <CardActionArea onClick={() => setModalOpen(true)}>
          {imageUrl && (
            <CardMedia component="img" height="140" image={imageUrl} alt={promocion.denominacion} />
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
        <Box p={1}>
          <Button
            onClick={handleAddToCart}
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{mb: 1}}
          >
            {isLoading ? 'Agregando...' : 'Agregar al carrito'}
          </Button>
        </Box>
      </Card>
      <PromocionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        promocionId={promocion.id}
      />
    </>
  );
};

export default PromocionCard;
