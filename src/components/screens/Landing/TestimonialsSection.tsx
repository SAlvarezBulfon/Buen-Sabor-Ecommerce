import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const TestimonialsSection: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Testimonios de Clientes
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>"Increíble variedad de sabores"</Typography>
            <Typography variant="body2">
              Me encanta la variedad de opciones que ofrecen. Siempre tienen algo nuevo para probar y todo es delicioso.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>"Entrega rápida y comida fresca"</Typography>
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
