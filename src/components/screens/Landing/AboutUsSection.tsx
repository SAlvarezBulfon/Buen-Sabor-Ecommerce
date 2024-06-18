import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';

const AboutUsSection: React.FC = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: '#c62828', color: '#fff', textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Quiénes Somos
      </Typography>
      <Typography variant="body1" gutterBottom>
        Somos una empresa dedicada a brindarte las mejores experiencias culinarias. Conoce más sobre nosotros:
      </Typography>
      <Container>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch" mt={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Equipo"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">
                  Nuestro Equipo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Conoce a las personas apasionadas detrás de cada plato delicioso que preparamos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1521321205814-9d673c65c167?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Misión"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">
                  Nuestra Misión
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estamos comprometidos a ofrecerte la mejor calidad y satisfacción en cada comida que servimos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Visión"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">
                  Nuestra Visión
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nos esforzamos por ser líderes en innovación culinaria y brindar experiencias memorables a nuestros clientes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Button variant="contained" color="secondary" size="large" style={{ marginTop: 20 }}>
        ¡Conócenos más!
      </Button>
    </Box>
  );
};

export default AboutUsSection;
