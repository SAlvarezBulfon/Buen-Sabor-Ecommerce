import React from 'react';
import { Box, Typography, Grid, Paper, useMediaQuery } from '@mui/material';

const TestimonialsSection: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        align="center"
        sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }}
      >
        Testimonios de Clientes
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
              "Increíble variedad de sabores"
            </Typography>
            <Typography variant="body2">
              Me encanta la variedad de opciones que ofrecen. Siempre tienen algo nuevo para probar y todo es delicioso.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
              "Entrega rápida y comida fresca"
            </Typography>
            <Typography variant="body2">
              Nunca tuve que esperar mucho tiempo por mi pedido y siempre llega caliente y fresco. ¡Recomiendo totalmente!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestimonialsSection;
