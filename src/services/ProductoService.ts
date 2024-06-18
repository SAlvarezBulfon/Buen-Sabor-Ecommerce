import axios, { AxiosResponse } from 'axios';
import IProducto from '../types/IProducto';
import BackendClient from './BackendClient';

interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export default class ProductoService extends BackendClient<IProducto> {
  async getPaginatedProducts(page: number, size: number, url: string): Promise<PaginatedResponse<IProducto>> {
    const response: AxiosResponse<PaginatedResponse<IProducto>> = await axios.get(url, {
      params: { page, size }
    });
    return response.data;
  }

  async getPaginatedProductsByCategory(page: number, size: number, categoryId: number, url: string): Promise<PaginatedResponse<IProducto>> {
    const response: AxiosResponse<PaginatedResponse<IProducto>> = await axios.get(`${url}/eCommerce/allArticulosByCategoriaId${categoryId}`, {
      params: { page, size }
    });
    return response.data;
  }
}
