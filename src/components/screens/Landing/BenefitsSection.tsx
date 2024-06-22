import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const BenefitsSection: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ py: 4, backgroundColor: '#c62828', color: '#fff' }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}
      >
        Nuestros Beneficios
      </Typography>
      <Carousel style={{ width: '100%' }}>
        <Carousel.Item>
          <Box sx={{ pb: 6, width: '100%' }}>
            <Typography variant="h6" align="center" sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
              Variedad de opciones
            </Typography>
            <Typography variant="body2" align="center">
              Ofrecemos una amplia gama de platos para satisfacer todos los gustos y preferencias.
            </Typography>
          </Box>
        </Carousel.Item>
        <Carousel.Item>
          <Box sx={{ pb: 6, width: '100%' }}>
            <Typography variant="h6" align="center" sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
              Entrega rápida
            </Typography>
            <Typography variant="body2" align="center">
              Nuestro servicio de entrega rápido garantiza que recibas tu comida caliente y fresca en poco tiempo.
            </Typography>
          </Box>
        </Carousel.Item>
        <Carousel.Item>
          <Box sx={{ pb: 6, width: '100%' }}>
            <Typography variant="h6" align="center" sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
              Calidad premium
            </Typography>
            <Typography variant="body2" align="center">
              Utilizamos ingredientes frescos y de alta calidad para asegurar el mejor sabor en cada plato que ofrecemos.
            </Typography>
          </Box>
        </Carousel.Item>
      </Carousel>
    </Box>
  );
};

export default BenefitsSection;
