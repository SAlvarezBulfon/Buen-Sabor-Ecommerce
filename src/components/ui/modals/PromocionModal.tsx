import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress, IconButton, Divider, useMediaQuery, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PromocionService from '../../../services/PromocionService';

const promocionService = new PromocionService();

interface PromocionModalProps {
  open: boolean;
  onClose: () => void;
  promocionId: number | null;
}

const PromocionModal: React.FC<PromocionModalProps> = ({ open, onClose, promocionId }) => {
  const [promocion, setPromocion] = useState<any>();
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (promocionId !== null) {
      const fetchPromocion = async () => {
        setLoading(true);
        try {
          const data = await promocionService.get(url + '/promocion', promocionId);
          setPromocion(data);
        } catch (error) {
          console.error('Error fetching promotion:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPromocion();
    }
  }, [promocionId]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, width: isMobile ? '90%' : '80%', maxHeight: '80%', overflowY: 'auto' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          promocion && (
            <>
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
              >
                <CloseIcon />
              </IconButton>
              <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
                <Box sx={{ flex: '1 1 50%' }}>
                  {promocion.imagenes && promocion.imagenes.length > 0 && (
                    <Carousel>
                      {promocion.imagenes.map((imagen: any) => (
                        <Carousel.Item key={imagen.id}>
                          <img
                            className="d-block w-100"
                            src={imagen.url}
                            alt={imagen.name}
                            style={{ maxHeight: isMobile ? '200px' : '400px', objectFit: 'cover' }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  )}
                </Box>
                <Box sx={{ flex: '1 1 50%', paddingLeft: isMobile ? 0 : 2 }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {promocion.denominacion}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {promocion.descripcionDescuento}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    ${promocion.precioPromocional}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1" gutterBottom>
                    <strong>Detalles:</strong>
                  </Typography>
                  {promocion.detalles.map((detalle: any) => (
                    <Typography key={detalle.id} variant="body2" gutterBottom>
                      {detalle.cantidad} x{' '}
                      {detalle.insumo
                        ? `${detalle.insumo.denominacion} (${detalle.insumo.categoriaNombre})`
                        : `${detalle.manufacturado?.denominacion} (${detalle.manufacturado?.categoriaNombre})`}
                    </Typography>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1" gutterBottom>
                    <strong>Periodo de la promoción:</strong> {new Date(promocion.fechaDesde).toLocaleDateString()} - {new Date(promocion.fechaHasta).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </>
          )
        )}
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default PromocionModal;
