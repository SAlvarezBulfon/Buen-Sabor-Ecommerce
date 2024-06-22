import axios, { AxiosResponse } from 'axios';
import IProducto from '../types/IProducto';
import BackendClient from './BackendClient';


// es una interfaz que define la estructura de una respuesta paginada.
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


//  Realiza una solicitud GET a la URL proporcionada con page y size como parámetros de consulta. La respuesta se tipa como AxiosResponse<PaginatedResponse<IProducto>> y se devuelve la propiedad data de la respuesta
export default class ProductoService extends BackendClient<IProducto> {
  async getPaginatedProducts(page: number, size: number, url: string): Promise<PaginatedResponse<IProducto>> {
    const response: AxiosResponse<PaginatedResponse<IProducto>> = await axios.get(url, {
      params: { page, size }
    });
    return response.data;
  }

  // Realiza una solicitud GET a una URL específica para obtener productos por categoría, incluyendo categoryId en la URL. Los parámetros page y size se pasan como parámetros de consulta. La respuesta se tipa como AxiosResponse<PaginatedResponse<IProducto>> y se devuelve la propiedad data de la respuesta.
  async getPaginatedProductsByCategory(page: number, size: number, categoryId: number, url: string): Promise<PaginatedResponse<IProducto>> {
    const response: AxiosResponse<PaginatedResponse<IProducto>> = await axios.get(`${url}/eCommerce/allArticulosByCategoriaId${categoryId}`, {
      params: { page, size }
    });
    return response.data;
  }
}
