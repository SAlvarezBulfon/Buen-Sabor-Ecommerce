import BackendClient from './BackendClient';
import IDetallePedido from '../types/IDetallePedido';

export default class DetallePedidoService extends BackendClient<IDetallePedido> {
  async createDetalle(data: IDetallePedido): Promise<IDetallePedido> {
    return this.post('http://localhost:8080/detallePedidos', data);
  }
}
