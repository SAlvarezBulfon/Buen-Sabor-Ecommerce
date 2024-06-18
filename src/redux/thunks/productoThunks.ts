import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductoService from '../../services/ProductoService';
import IProducto from '../../types/IProducto';
import { setProducto } from '../slices/ProductoReducer';

const productoService = new ProductoService();
const URL = import.meta.env.VITE_API_URL;

export const fetchProductos = createAsyncThunk(
  'productos/fetchProductos',
  async (_, { dispatch }) => {
    try {
      const productos: IProducto[] = await productoService.getAll(URL +'/ArticuloManufacturado');
      dispatch(setProducto(productos));
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }
);
