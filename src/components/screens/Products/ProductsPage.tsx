import React, { useState, useEffect, useCallback } from 'react';
import { Typography, TextField, Box, Container, Grid, Button, CircularProgress, MenuItem, Select, FormControl, InputLabel, useMediaQuery } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import IProducto from '../../../types/IProducto';
import ICategoria from '../../../types/ICategoria';
import ProductCard from '../../ui/Cards/ProductCard';
import ProductoService from '../../../services/ProductoService';
import CategoriaService from '../../../services/CategoriaService';
import NoResultsCard from '../../ui/Cards/NoResultsCard';

const productoService = new ProductoService();
const categoriaService = new CategoriaService();

interface ProductosPageProps {
  addToCart: (productId: number, products: IProducto[]) => void;
}

const ProductosPage: React.FC<ProductosPageProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<IProducto[]>([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const [page, setPage] = useState(Number(localStorage.getItem('page')) || 0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(Number(localStorage.getItem('selectedCategory')) || null);
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || '');
  const isMobile = useMediaQuery('(max-width:600px)');
  const pageSize = 10;
  const url = import.meta.env.VITE_API_URL;

  // Obtener categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriaService.getAll(url + '/eCommerce/getCategorias');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [url]);


// Esta función construye dinámicamente el endpoint adecuado basado en el término de búsqueda, la categoría seleccionada y el orden de clasificación, y luego obtiene los productos paginados desde el backend.
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint = `${url}/eCommerce/allArticulos`;

      if (searchTerm.trim()) {
        endpoint = `${url}/eCommerce/buscador/${searchTerm}`;
      } else if (selectedCategory !== null && sortOrder === 'menosPrecio') {
        endpoint = `${url}/eCommerce/menoPrecio/${selectedCategory}`;
      } else if (selectedCategory !== null) {
        endpoint = `${url}/eCommerce/allArticulosByCategoriaId${selectedCategory}`;
      } else if (sortOrder === 'menosPrecio') {
        endpoint = `${url}/eCommerce/menoPrecio`;
      }

      const data = await productoService.getPaginatedProducts(page, pageSize, endpoint);
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, selectedCategory, sortOrder, url, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

    // Guardar el estado en localStorage
  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('page', page.toString());
    localStorage.setItem('selectedCategory', selectedCategory?.toString() || '');
    localStorage.setItem('sortOrder', sortOrder);
  }, [searchTerm, page, selectedCategory, sortOrder]);

    // Manejadores de cambios en búsqueda, categoría, y orden de clasificación

    //Estos manejadores actualizan los estados correspondientes y reinician la página a 0 cada vez que el usuario realiza un cambio en la búsqueda, categoría o el orden de clasificación.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleCategoryChange = (event: SelectChangeEvent<number | string>) => {
    const value = event.target.value as number | string;
    if (value === "") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(value as number);
    }
    setPage(0);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSortOrder(value);
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
          Delicias Rápidas
        </Typography>
        <Typography 
          variant="subtitle1" 
          gutterBottom
          textAlign='center'
          sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}
        >
          Encuentra tu comida favorita en nuestra tienda
        </Typography>
        <Box
          display="flex"
          width="100%"
          mb={2}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <TextField
            fullWidth
            label="Buscar productos"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}
          />
          <FormControl variant="outlined" fullWidth sx={{ mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}>
            <InputLabel id="category-select-label">Categoría</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory ?? ''}
              onChange={handleCategoryChange}
              label="Categoría"
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.denominacion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="sort-select-label">Ordenar por</InputLabel>
            <Select
              labelId="sort-select-label"
              value={sortOrder}
              onChange={handleSortChange}
              label="Ordenar por"
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value="menosPrecio">Menor Precio</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          products.length === 0 ? (
            <NoResultsCard />
          ) : (
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <Box display="flex" justifyContent="center" width="100%">
                    <ProductCard product={product} addToCart={addToCart} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )
        )}
      </Box>
      {products.length > 0 && (
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

export default ProductosPage;
