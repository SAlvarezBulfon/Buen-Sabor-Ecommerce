import React, { useState, useEffect, useCallback } from 'react';
import { Typography, TextField, Box, Container, Grid, Button, CircularProgress, useMediaQuery } from '@mui/material';
import IPromocion from '../../types/IPromocion';
import PromocionService from '../../services/PromocionService';
import PromocionCard from '../ui/Cards/PromocionCard';
import NoResultsCard from '../ui/Cards/NoResultsCard';

const promocionService = new PromocionService();

interface PromocionesPageProps {
  addToCart: (promocionId: number, promociones: IPromocion[]) => void;
}

const PromocionesPage: React.FC<PromocionesPageProps> = ({ addToCart }) => {
  const [promociones, setPromociones] = useState<IPromocion[]>([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTermPromo') || '');
  const [page, setPage] = useState(Number(localStorage.getItem('pagePromo')) || 0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const pageSize = 10;


  //Esta función se encarga de buscar las promociones, ya sea filtradas por un término de búsqueda o todas, dependiendo de si searchTerm está vacío o no. Utiliza useCallback para memorizar la función y evitar que se recree en cada renderizado.
  const fetchPromociones = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (searchTerm.trim()) {
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
    localStorage.setItem('pagePromo', page.toString());
  }, [searchTerm, page]);


  // Actualiza el estado del término de búsqueda y resetea la página a 0 cada vez que el usuario escribe en el campo de búsqueda.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontSize: isMobile ? '2rem' : '3rem' }}
        >
          Promociones
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          textAlign='center'
          sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
        >
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
          promociones.length === 0 ? (
            <NoResultsCard />
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
          )
        )}
      </Box>
      {promociones.length > 0 && (
        <Box display="flex" justifyContent="center" mt={2} mb={2}>
          {page > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            >
              Anterior
            </Button>
          )}
          <Typography variant="body1" sx={{ margin: '0 20px', alignSelf: 'center', fontSize: isMobile ? '0.875rem' : '1rem' }}>
            Página {page + 1} de {totalPages}
          </Typography>
          {page < totalPages - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            >
              Siguiente
            </Button>
          )}
        </Box>
      )}
    </Container>
  );
};

export default PromocionesPage;
