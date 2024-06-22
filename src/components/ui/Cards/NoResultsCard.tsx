import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const NoResultsCard: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      mt={5}
    >
      <SearchOffIcon color="action" sx={{ fontSize: isMobile ? '4rem' : '6rem' }} />
      <Typography variant="h6" sx={{ fontSize: isMobile ? '1.25rem' : '1.5rem', mt: 2 }}>
        No se encontraron productos
      </Typography>
      <Typography variant="body1" sx={{ fontSize: isMobile ? '0.875rem' : '1rem', mt: 1 }}>
        Intenta realizar otra búsqueda o ajustar los filtros.
      </Typography>
    </Box>
  );
};

export default NoResultsCard;
