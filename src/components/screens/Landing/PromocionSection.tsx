import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button, Container, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import PromocionService from '../../../services/PromocionService';
import IPromocion from '../../../types/IPromocion';
import PromocionModal from '../../ui/modals/PromocionModal';

interface PromotionsSectionProps {
  addToCart: (promocionId: number, promociones: IPromocion[]) => void;
}

const PromotionsSection: React.FC<PromotionsSectionProps> = ({ addToCart }) => {
  const [promocion, setPromocion] = useState<IPromocion | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchPromocion = async () => {
      try {
        const promocionService = new PromocionService();
        const response = await promocionService.getPaginatedPromociones(0, 1);
        if (response.content.length > 0) {
          setPromocion(response.content[0]);
        }
      } catch (error) {
        console.error('Error fetching promotion:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromocion();
  }, []);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      if (promocion) {
        addToCart(promocion.id, [promocion]);
      }
    } catch (error) {
      console.error('Error adding promotion to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCarouselItems = () => {
    if (promocion && promocion.imagenes && promocion.imagenes.length > 0) {
      return promocion.imagenes.map((imagen, index) => (
        <Carousel.Item key={index}>
          <Box
            component="img"
            src={imagen.url}
            alt={promocion.denominacion}
            sx={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '1rem' }}
          />
        </Carousel.Item>
      ));
    }
    return null;
  };

  const handleNavigateToPromotions = () => {
    navigate('/promociones');
  };

  return (
    <Container sx={{ my: 4, display: 'flex', alignItems: 'stretch', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <CircularProgress />
        </Box>
      ) : (
        promocion && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}
                >
                  Especial del día
                </Typography>
                <Typography
                  variant="h2"
                  color="primary"
                  gutterBottom
                  sx={{ fontSize: isMobile ? '2rem' : '2.5rem' }}
                >
                  {promocion.denominacion}
                </Typography>
                <Typography variant="body1" paragraph>
                  {promocion.descripcionDescuento}
                </Typography>
                <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                  ${promocion.precioPromocional}
                </Typography>
                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                  endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                  sx={{ mt: 2 }}
                >
                  {isLoading ? 'Agregando...' : 'Ordenar Ahora'}
                </Button>
              </Box>
              <Box sx={{ maxWidth: '500px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ height: '300px', width: '100%' }}>
                  <Carousel indicators={false} controls={true} style={{ height: '100%' }}>
                    {renderCarouselItems()}
                  </Carousel>
                </Box>
              </Box>
              <PromocionModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                promocionId={promocion.id}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                onClick={handleNavigateToPromotions}
                variant="contained"
                color="primary"
              >
                Ver más promociones
              </Button>
            </Box>
          </>
        )
      )}
    </Container>
  );
};

export default PromotionsSection;
