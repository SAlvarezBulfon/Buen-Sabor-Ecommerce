import React, { useState, useEffect, useCallback } from 'react';
import { Typography, TextField, Box, Container, Grid, Button, CircularProgress } from '@mui/material';
import IPromocion from '../../types/IPromocion';
import PromocionService from '../../services/PromocionService';
import PromocionCard from '../ui/Cards/PromocionCard';


const promocionService = new PromocionService();

interface PromocionesPageProps {
  addToCart: (promocionId: number, promociones: IPromocion[]) => void;
}

const PromocionesPage: React.FC<PromocionesPageProps> = ({ addToCart }) => {
  const [promociones, setPromociones] = useState<IPromocion[]>([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTermPromo') || '');
  const [page, setPage] = useState(Number(localStorage.getItem('page')) || 0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  const fetchPromociones = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (searchTerm) {
        data = await promocionService.searchPromociones(searchTerm, page, pageSize);
      } else {
        data = await promocionService.getPaginatedPromociones(page, pageSize);
      }
      setPromociones(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, pageSize]);

  useEffect(() => {
    fetchPromociones();
  }, [fetchPromociones]);

  useEffect(() => {
    localStorage.setItem('searchTermPromo', searchTerm);
    localStorage.setItem('page', page.toString());
  }, [searchTerm, page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <Typography variant="h3" gutterBottom>
          Promociones
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Encuentra las mejores promociones en nuestra tienda
        </Typography>
        <Box display="flex" width="100%" mb={2} sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
          <TextField
            fullWidth
            label="Buscar promociones"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}
          />
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {promociones.map((promocion) => (
              <Grid item key={promocion.id} xs={12} sm={6} md={4} lg={3}>
                <Box display="flex" justifyContent="center" width="100%">
                  <PromocionCard promocion={promocion} addToCart={addToCart} />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt={2} mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Anterior
        </Button>
        <Typography variant="body1" style={{ margin: '0 20px', alignSelf: 'center' }}>
          Página {page + 1} de {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
        >
          Siguiente
        </Button>
      </Box>
    </Container>
  );
};

export default PromocionesPage;
