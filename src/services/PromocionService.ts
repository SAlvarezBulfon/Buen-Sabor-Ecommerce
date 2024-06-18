import axios, { AxiosResponse } from 'axios';
import IPromocion from '../types/IPromocion';
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
const url = import.meta.env.VITE_API_URL;
export default class PromocionService extends BackendClient<IPromocion> {
  async getPaginatedPromociones(page: number, size: number): Promise<PaginatedResponse<IPromocion>> {
    const response: AxiosResponse<PaginatedResponse<IPromocion>> = await axios.get(`${url}/eCommerce/getPromociones`, {
      params: { page, size }
    });
    return response.data;
  }

  async searchPromociones(denominacion: string, page: number, size: number): Promise<PaginatedResponse<IPromocion>> {
    const response: AxiosResponse<PaginatedResponse<IPromocion>> = await axios.get(`${url}/eCommerce/buscadorPromociones/{denominacion}`, {
      params: { denominacion, page, size }
    });
    return response.data;
  }
}
