import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress, IconButton, Card, CardContent, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InsumoService from '../../../services/InsumoService';

const insumoService = new InsumoService();

interface InsumoModalProps {
  open: boolean;
  onClose: () => void;
  productId: number;
}

const InsumoModal: React.FC<InsumoModalProps> = ({ open, onClose, productId }) => {
  const [insumo, setInsumo] = useState<any>();
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL;
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (productId) {
      const fetchInsumo = async () => {
        setLoading(true);
        try {
          const data = await insumoService.get(url + `/ArticuloInsumo`, productId);
          setInsumo(data);
        } catch (error) {
          console.error('Error fetching insumo:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchInsumo();
    }
  }, [productId]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, width: isMobile ? '80%' : '40%' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          insumo && (
            <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Box sx={{ flex: '1 1 50%' }}>
                {insumo.imagenes && insumo.imagenes.length > 0 && (
                  <Carousel>
                    {insumo.imagenes.map((imagen: any) => (
                      <Carousel.Item key={imagen.id}>
                        <img
                          className="d-block w-100"
                          src={imagen.url}
                          alt={imagen.name}
                          style={{ maxHeight: isMobile ? '200px' : '250px', objectFit: 'cover' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </Box>
              <Box sx={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  <CloseIcon />
                </IconButton>
                <CardContent>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {insumo.denominacion}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    ${insumo.precioVenta}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
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
  p: 3,
};

export default InsumoModal;
