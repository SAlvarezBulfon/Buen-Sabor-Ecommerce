import React from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';

const ContactSection: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align='center'>
        Contáctanos
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Nombre" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Correo electrónico" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={4} label="Mensaje" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;
