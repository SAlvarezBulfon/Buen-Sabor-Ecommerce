import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress, IconButton, Card, CardContent, useMediaQuery, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductoService from '../../../services/ProductoService';

const productoService = new ProductoService();

interface ProductoModalProps {
  open: boolean;
  onClose: () => void;
  productId: number;
}

const ProductoModal: React.FC<ProductoModalProps> = ({ open, onClose, productId }) => {
  const [producto, setProducto] = useState<any>();
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm')); // Consideramos 'sm' para dispositivos móviles

  useEffect(() => {
    if (productId) {
      const fetchProducto = async () => {
        setLoading(true);
        try {
          const data = await productoService.get(url + `/ArticuloManufacturado`, productId);
          setProducto(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducto();
    }
  }, [productId]);

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{
        ...modalStyle,
        width: isMobile ? '90%' : '50%', // Ancho del modal ajustado para móviles y pantallas mayores
        bgcolor: 'background.paper', // Añadido para asegurar el fondo blanco en todo el modal
      }}>
        {loading ? (
          <CircularProgress />
        ) : (
          producto && (
            <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
              <Box sx={{ flex: isMobile ? '1 1 auto' : '1 1 50%' }}>
                {producto.imagenes && producto.imagenes.length > 0 && (
                  <Carousel>
                    {producto.imagenes.map((imagen: any) => (
                      <Carousel.Item key={imagen.id}>
                        <img
                          className="d-block w-100"
                          src={imagen.url}
                          alt={imagen.name}
                          style={{ height: isMobile ? '200px' : '300px', objectFit: 'cover' }} // Ajuste de altura de la imagen
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </Box>
              <Box sx={{ flex: isMobile ? '1 1 auto' : '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: isMobile ? 2 : 4 }}>
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  <CloseIcon />
                </IconButton>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {producto.denominacion}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    ${producto.precioVenta}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Descripción:</strong> {producto.descripcion}
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
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default ProductoModal;
